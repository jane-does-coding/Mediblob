import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { userId, symptom, level } = body;

		const newSymptom = await prisma.symptom.create({
			data: {
				symptom,
				level,
				user: { connect: { id: userId } },
			},
		});

		return NextResponse.json(newSymptom);
	} catch (err) {
		console.error(err);
		return new NextResponse("Error creating symptom", { status: 500 });
	}
}
