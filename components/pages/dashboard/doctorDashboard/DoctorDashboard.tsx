"use client";
import React from "react";
import Heading from "../Heading";
import { SafeUser } from "@/app/types/SafeUser";
import DoctorNavbar from "./DoctorNavbar";
import PatientsList from "./PatientsList";
import NoPatients from "../../doctorPatients/NoPatients";
import useEventModal from "@/app/hooks/useEventModal";
import EventsList from "../EventsList";
import CallList from "../CallList";
import NextEventWarning from "../NextEventWarning";

const DoctorDashboard = ({ currentUser }: { currentUser: SafeUser }) => {
	const createEventModal = useEventModal();
	const hasUsers = currentUser.connectedUsers.length > 0;

	return (
		<div className="flex">
			<DoctorNavbar />

			{hasUsers ? (
				<>
					<div className="w-[93.5vw] flex py-[5vh] px-[4vw]">
						<div className="w-14/20 pr-[3vw]">
							<Heading />
							<h1 className="mt-[2vh]">
								{currentUser.name}, {currentUser.access}
							</h1>

							<NextEventWarning currentUser={currentUser} />

							{currentUser.connectedUsers.length > 0 ? (
								<PatientsList currentUser={currentUser} />
							) : (
								<>
									<h2 className="text-[5vh] mt-[2vh] pb-[1vh] border-b-2 border-neutral-300">
										Patients
									</h2>
									<NoPatients />
								</>
							)}
							{currentUser.connectedUsers.length > 0 ? (
								<>
									<h2 className="text-[5vh] mt-[2vh] pb-[1vh] border-b-2 border-neutral-300">
										Calls
									</h2>
									<CallList currentUser={currentUser} />
								</>
							) : (
								<>
									<h2 className="text-[5vh] mt-[2vh] pb-[1vh] border-b-2 border-neutral-300">
										Patients
									</h2>
									<NoPatients />
								</>
							)}
						</div>
						<div className="w-6/20">
							<h2 className="text-[5vh] mt-[0vh] pb-[1vh] border-b-2 border-neutral-300">
								Events
							</h2>
							<button
								className="w-full bg-neutral-100 border-2 border-neutral-200 rounded-[2vh] py-[1vh] mt-[2vh] mb-[2vh] text-[2.25vh] cursor-pointer"
								onClick={() => createEventModal.onOpen(currentUser.id)}
							>
								Create an Event +
							</button>
							<EventsList currentUser={currentUser} />
						</div>
					</div>
				</>
			) : (
				<div className="w-[93.5vw] flex py-[5vh] px-[4vw]">
					<div className="w-17/20 pr-[3vw]">
						<Heading />
						<h1 className="mt-[2vh]">
							{currentUser.name}, {currentUser.access}
						</h1>
						<NoPatients />
					</div>
				</div>
			)}
		</div>
	);
};

export default DoctorDashboard;
