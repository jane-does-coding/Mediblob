import { SafeUser } from "@/app/types/SafeUser";
import React from "react";

const PatientsList = ({ currentUser }: { currentUser: SafeUser }) => {
	return (
		<div className="mt-[3vh]">
			<h2 className="text-[5vh] mb-[2vh]">Patients</h2>
			<div className="flex flex-col  border-t-1 border-neutral-400">
				{currentUser.connectedUsers.map((user, i) => (
					<div
						className="flex w-full items-center justify-between py-[2vh] px-[1vw] border-b-1 border-neutral-400"
						key={i}
					>
						<h3 className="text-[2.75vh]">{user.name}</h3>
						<div className="flex gap-[1vw]">
							<div className="bg-green-200/75 font-semibold text-green-900 text-[2vh] rounded-full py-[0.5vh] px-[2.25vw]">
								Regular
							</div>
							<div className="font-semibold text-black border-1 border-neutral-900 text-[2vh] rounded-full py-[0.5vh] px-[2.25vw]">
								No Calls
							</div>
							<div className="font-semibold text-black border-1 border-neutral-900 text-[2vh] rounded-full py-[0.5vh] px-[2.25vw]">
								2 Updates
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PatientsList;
