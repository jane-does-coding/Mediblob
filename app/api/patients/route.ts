import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET() {
	const patients = await prisma.user.findMany({
		//		where: { type: "patient" },
		select: { id: true, name: true },
	});
	return NextResponse.json(patients);
}
