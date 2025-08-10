"use client";
import useConnectModal from "@/app/hooks/useConnectModal";
import React from "react";

const NoPatients = () => {
	const connectModal = useConnectModal();
	return (
		<div className="rounded-[7vh] border-2 border-black mt-[3vh] py-[6vh] flex flex-col items-center justify-center">
			<p className="text-[4vh]">No Patients Connected</p>
			<button
				onClick={() => connectModal.onOpen()}
				className="px-[2vw] py-[1vh] text-[2vh] rounded-[2vh] bg-neutral-900 text-white cursor-pointer mt-[2vh]"
			>
				Add a Connection
			</button>
		</div>
	);
};

export default NoPatients;
