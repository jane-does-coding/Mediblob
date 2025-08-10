import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

function generateUserCode(length = 6) {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

export async function POST(req: Request) {
	const body = await req.json();
	console.log(body);
	const { email, name, password, username, access } = body;
	const userCode = generateUserCode();

	const hashedPassword = await bcrypt.hash(password, 12);

	const user = await prisma.user.create({
		data: {
			email,
			name,
			hashedPassword,
			username,
			access,
			code: userCode,
		},
	});

	return NextResponse.json(user);
}
