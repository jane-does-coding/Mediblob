import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
import { User } from "@prisma/client";

export async function getSession() {
	return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
	try {
		const session = await getSession();

		if (!session?.user?.email) return null;

		const currentUser = await prisma.user.findUnique({
			where: {
				email: session.user.email,
			},
			include: {
				connectionsFrom: {
					include: { to: true },
				},
				connectionsTo: {
					include: { from: true },
				},
			},
		});

		if (!currentUser) return null;

		const connectedUsers: User[] = [
			...(currentUser.connectionsFrom?.map((c) => c.to) || []),
			...(currentUser.connectionsTo?.map((c) => c.from) || []),
		];

		const { ...safeUser } = currentUser;

		return {
			...safeUser,
			connectedUsers,
		};
	} catch (err) {
		console.log("[GET_CURRENT_USER_ERROR]", err);
		return null;
	}
}
