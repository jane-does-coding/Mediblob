import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser || currentUser.access !== "doctor") {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const body = await req.json();
		const { userId, title, dosage, instructions, startDate, endDate } = body;

		if (!userId || !title || !dosage || !startDate || !endDate) {
			return new NextResponse("Missing fields", { status: 400 });
		}

		const medication = await prisma.medication.create({
			data: {
				title,
				dosage,
				instructions,
				startDate: new Date(startDate),
				endDate: new Date(endDate),
				patientId: userId,
				doctorId: currentUser.id,
			},
		});

		return NextResponse.json(medication);
	} catch (error) {
		console.error("[MEDICATION_CREATE]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function DELETE(req: Request) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser || currentUser.access !== "doctor") {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const { medicationId } = await req.json();
		if (!medicationId) {
			return new NextResponse("Missing medicationId", { status: 400 });
		}

		await prisma.medication.delete({
			where: { id: medicationId },
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("[MEDICATION_DELETE]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
