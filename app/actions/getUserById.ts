import prisma from "@/app/libs/prismadb";
import { Event, User } from "@prisma/client";

interface IParams {
	userId?: string;
}

export default async function getUserById(params: IParams) {
	try {
		const { userId } = params;

		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				connectionsFrom: {
					include: {
						to: { include: { prescribedMedications: true } },
					},
				},
				connectionsTo: {
					include: {
						from: { include: { prescribedMedications: true } },
					},
				},

				symptoms: true,
				prescribedMedications: true,
				assignedMedications: true,
				doctorEvents: {
					include: { doctor: true, patient: true },
				},
				patientEvents: {
					include: { doctor: true, patient: true },
				},
			},
		});

		if (!user) return null;

		const connectedUsers: User[] = [
			...(user.connectionsFrom?.map((c) => c.to) || []),
			...(user.connectionsTo?.map((c) => c.from) || []),
		];

		const userEvents: Event[] = [
			...(user.doctorEvents || []),
			...(user.patientEvents || []),
		];

		const { ...safeUser } = user;

		return {
			...safeUser,
			connectedUsers,
			userEvents,
		};
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw new Error("Unknown error occurred while fetching user");
		}
	}
}
