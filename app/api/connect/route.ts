import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function POST(req: Request) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		const { code } = body;

		if (!code) {
			return NextResponse.json({ error: "Code is required" }, { status: 400 });
		}

		const currentUser = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		const targetUser = await prisma.user.findUnique({
			where: { code },
		});

		if (!targetUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		if (targetUser.id === currentUser?.id) {
			return NextResponse.json(
				{ error: "You can't connect to yourself" },
				{ status: 400 }
			);
		}

		// Check if already connected
		const existingConnection = await prisma.connection.findFirst({
			where: {
				fromId: currentUser?.id,
				toId: targetUser.id,
			},
		});

		if (existingConnection) {
			return NextResponse.json({ error: "Already connected" }, { status: 400 });
		}

		await prisma.connection.create({
			data: {
				from: { connect: { id: currentUser!.id } },
				to: { connect: { id: targetUser.id } },
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("[CONNECT_ERROR]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req: Request) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { code } = await req.json();

		if (!code) {
			return NextResponse.json({ error: "Code is required" }, { status: 400 });
		}

		const currentUser = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		const targetUser = await prisma.user.findUnique({
			where: { code },
		});

		if (!targetUser || !currentUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		await prisma.connection.deleteMany({
			where: {
				OR: [
					{ fromId: currentUser.id, toId: targetUser.id },
					{ fromId: targetUser.id, toId: currentUser.id },
				],
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("[UNCONNECT_ERROR]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
