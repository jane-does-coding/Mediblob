import React from "react";
import PatientDashboard from "./patientDashboard/PatientDashboard";
import DoctorDashboard from "./doctorDashboard/DoctorDashboard";
import { SafeUser } from "@/app/types/SafeUser";

interface DashboardPageProps {
	currentUser: SafeUser;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ currentUser }) => {
	return (
		<div className="flex items-start justify-start">
			{currentUser.access == "patient" ? (
				<PatientDashboard currentUser={currentUser} />
			) : (
				<DoctorDashboard currentUser={currentUser} />
			)}
		</div>
	);
};

export default DashboardPage;
