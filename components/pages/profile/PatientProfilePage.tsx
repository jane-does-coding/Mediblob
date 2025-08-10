"use client";
import { SafeUser } from "@/app/types/SafeUser";
import React from "react";
import Heading from "../dashboard/Heading";
import PatientNavbar from "../dashboard/patientDashboard/PatientNavbar";
import { FaPerson } from "react-icons/fa6";
import EventsList from "../dashboard/EventsList";

const PatientProfilePage = ({ currentUser }: { currentUser: SafeUser }) => {
	return (
		<div className="flex">
			<PatientNavbar />

			<div className="w-[93.5vw] flex flex-col py-[5vh] px-[4vw]">
				<div className="w-15/20">
					<Heading />
				</div>
				<div className="flex mt-[5vh] gap-[4vw]">
					<div className="w-[15vw] aspect-[1] rounded-full border-2 border-black flex items-center justify-center">
						<FaPerson className="text-[10vh]" />
					</div>
					<div className="flex flex-col w-full items-start justify-center">
						<h2 className="text-[3vh] font-semibold">{currentUser.name}</h2>
						<h3 className="text-[2.5vh]">{currentUser.email}</h3>
						<div className="grid grid-cols-2 w-full mt-[2vh]">
							<div className="w-full text-[2.5vh]">
								Code:{" "}
								<span className="font-semibold ml-[1vw]">
									{currentUser.code}
								</span>
							</div>
						</div>
					</div>
				</div>
				<img src="/border.png" className="mt-[5vh]" alt="" />
				<div className="flex mt-[4vh]">
					<div className="w-2/3 pr-[3vw]">
						<p className="text-[3vh] font-extralight leading-[4vh]">
							No bio added yet
						</p>
					</div>
					<div className="w-1/3">
						<EventsList currentUser={currentUser} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PatientProfilePage;
