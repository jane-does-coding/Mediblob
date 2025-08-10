import getCurrentUser from "@/app/actions/getCurrentUser";
import Heading from "@/components/pages/dashboard/Heading";
import DoctorNavbar from "@/components/pages/dashboard/doctorDashboard/DoctorNavbar";
import PatientsPage from "@/components/pages/doctorPatients/PatientsPage";
import React from "react";

const Page = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return <div>Please log in to view this page.</div>;
	}

	return (
		<div className="flex">
			<DoctorNavbar />

			<div className="w-[93.5vw] flex flex-col py-[5vh] px-[4vw]">
				<Heading />
				<PatientsPage currentUser={currentUser} />
			</div>
		</div>
	);
};

export default Page;
