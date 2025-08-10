import getCurrentUser from "@/app/actions/getCurrentUser";
import CalendarPage from "@/components/pages/calendar/CalendarPage";
import DoctorNavbar from "@/components/pages/dashboard/doctorDashboard/DoctorNavbar";
import React from "react";

const Page = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) return;
	return (
		<div className="flex">
			<DoctorNavbar />

			<div className="w-[93.5vw] flex flex-col py-[5vh] px-[4vw]">
				<CalendarPage currentUser={currentUser} />
			</div>
		</div>
	);
};

export default Page;
