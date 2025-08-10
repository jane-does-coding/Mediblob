"use client";
import useConnectModal from "@/app/hooks/useConnectModal";
import useUnconnectModal from "@/app/hooks/useUnconnectModal";
import { SafeUser } from "@/app/types/SafeUser";
import React from "react";
import NoPatients from "./NoPatients";

const PatientsPage = ({ currentUser }: { currentUser: SafeUser }) => {
	const connectModal = useConnectModal();
	const unconnectModal = useUnconnectModal();

	return (
		<div className="mt-[3vh] w-full">
			<h2 className="text-[5vh] mb-[2vh] flex items-center justify-between w-full">
				Patients
				<button
					onClick={() => connectModal.onOpen()}
					className="px-[2vw] py-[1vh] text-[2vh] rounded-[2vh] bg-neutral-900 text-white cursor-pointer"
				>
					Add Patient +
				</button>
			</h2>
			<div className="flex flex-col  border-t-1 border-neutral-400">
				{currentUser.connectedUsers.length > 0 ? (
					currentUser.connectedUsers.map((user, i) => (
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
									0 Updates
								</div>
								<button
									onClick={() =>
										unconnectModal.onOpen({ name: user.name, code: user.code })
									}
									className="bg-red-300 font-bold text-red-950 text-[2vh] rounded-[1.5vh] py-[0.5vh] px-[2.25vw] ml-[2vw] cursor-pointer"
								>
									Delete
								</button>
							</div>
						</div>
					))
				) : (
					<NoPatients />
				)}
			</div>
		</div>
	);
};

export default PatientsPage;
