// app/(pages)/patients/[userId]/page.tsx

import React from "react";
import getUserById from "@/app/actions/getUserById";
import PatientPage from "@/components/pages/doctorPatientView/PatientPage";
import { SafeUser } from "@/app/types/SafeUser";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
	params: Promise<{ userId: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { userId } = await params;

	const user = await getUserById({ userId });

	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: user ? `${user.name}'s Profile` : "Patient Not Found",
		openGraph: {
			images: ["/default-og.jpg", ...previousImages],
		},
	};
}

export default async function Page({ params }: Props) {
	const { userId } = await params;

	const user = await getUserById({ userId });

	if (!user) return <div>User not found</div>;

	const connectedUsers = [
		...(user.connectionsFrom || []).map((c) => c.to),
		...(user.connectionsTo || []).map((c) => c.from),
	];

	const safeUser: SafeUser = {
		...user,
		connectedUsers,
	};

	return (
		<div>
			<PatientPage user={safeUser} />
		</div>
	);
}
