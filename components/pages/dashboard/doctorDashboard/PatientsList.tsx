import { SafeUser } from "@/app/types/SafeUser";
import React from "react";

const PatientsList = ({ currentUser }: { currentUser: SafeUser }) => {
	return (
		<div className="mt-[3vh]">
			<h2 className="text-[5vh] mb-[2vh]">Patients</h2>
			<div className="flex flex-col border-t-1 border-neutral-400 max-h-[40vh] overflow-scroll">
				{currentUser.connectedUsers.map((user, i) => {
					{
						currentUser.userEvents = currentUser.userEvents || [];
					}
					const calls = currentUser.userEvents.filter(
						(event) => event.patientId === user.id || event.doctorId === user.id
					);

					return (
						<div
							className="flex w-full items-center justify-between py-[2vh] px-[1vw] border-b-1 border-neutral-400"
							key={i}
						>
							<h3 className="text-[2.75vh]">{user.name}</h3>
							<div className="flex gap-[1vw]">
								{/* 	<div className="font-semibold text-black border-1 border-neutral-900 text-[2vh] rounded-full py-[0.5vh] px-[2.25vw]">
									{user.email}
								</div> */}
								<div className="font-semibold text-amber-800 border-1 border-amber-600 bg-amber-100 text-[2vh] rounded-full py-[0.5vh] px-[2.25vw]">
									{calls.length === 0
										? "No Calls"
										: `${calls.length} Call${calls.length > 1 ? "s" : ""}`}
								</div>
								<div className="font-semibold text-green-800 border-1 border-green-600 bg-green-100 text-[2vh] rounded-full py-[0.5vh] px-[2.25vw]">
									{user.code}
								</div>
								{/* 	<div className="font-semibold text-black border-1 border-neutral-900 text-[2vh] rounded-full py-[0.5vh] px-[2.25vw]">
									2 Updates
								</div> */}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default PatientsList;
