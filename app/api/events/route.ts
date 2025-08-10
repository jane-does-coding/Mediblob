import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { type, zoomLink, dateTime, notes, doctorId, patientId } = body;

		if (!type || !dateTime || !doctorId || !patientId) {
			return new NextResponse("Missing required fields", { status: 400 });
		}

		const newEvent = await prisma.event.create({
			data: {
				type,
				zoomLink,
				dateTime: new Date(dateTime),
				notes,
				doctor: { connect: { id: doctorId } },
				patient: { connect: { id: patientId } },
			},
		});

		return NextResponse.json(newEvent);
	} catch (err) {
		console.error("Error creating event:", err);
		return new NextResponse("Server error", { status: 500 });
	}
}
