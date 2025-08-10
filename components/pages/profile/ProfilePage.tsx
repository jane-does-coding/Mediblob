import React from "react";
import { SafeUser } from "@/app/types/SafeUser";
import PatientProfilePage from "./PatientProfilePage";
import DoctorProfilePage from "./DoctorProfilePage";

interface ProfilePageProps {
	currentUser: SafeUser;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser }) => {
	return (
		<div className="flex items-start justify-start">
			{currentUser.access == "patient" ? (
				<PatientProfilePage currentUser={currentUser} />
			) : (
				<DoctorProfilePage currentUser={currentUser} />
			)}
		</div>
	);
};

export default ProfilePage;
