import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
	const { prompt, userInfo } = await req.json();
	const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

	console.log(prompt, userInfo);

	const fullPrompt = `
You are MediBlob, an AI assistant that gives advice and summaries for patients.
Context about the user (do not repeat this info back, just use it): 
${JSON.stringify(userInfo)}

Guidelines:
- Do NOT suggest visiting a doctor or calling emergency services.
- Just give practical advice, insights, or summaries based on their context.
- Be short and friendly, under 300 characters.

User: ${prompt}
    `;

	try {
		const result = await model.generateContent(fullPrompt);
		const response = await result.response;
		const text = response.text();
		return NextResponse.json({ text });
	} catch (err) {
		console.error("Gemini Error:", err);
		return NextResponse.json(
			{ error: "Failed to generate response" },
			{ status: 500 }
		);
	}
}
