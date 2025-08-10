import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function DELETE(request, { params }) {
	try {
		const { id } = params;

		await prisma.symptom.delete({
			where: { id },
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("Error deleting symptom:", err);
		return new NextResponse("Error deleting symptom", { status: 500 });
	}
}
