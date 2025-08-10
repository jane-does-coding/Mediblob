import getCurrentUser from "@/app/actions/getCurrentUser";
import ProfilePage from "@/components/pages/profile/ProfilePage";
import React from "react";

const Page = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) return <div>You must be logged in to view this page.</div>;

	return (
		<div>
			<ProfilePage currentUser={currentUser} />
		</div>
	);
};

export default Page;
