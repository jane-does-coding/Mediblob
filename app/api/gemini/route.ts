import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
	const { prompt } = await req.json();
	const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

	const fullPrompt = `
Answer the following in under 300 characters. Keep it clear and helpful.

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
