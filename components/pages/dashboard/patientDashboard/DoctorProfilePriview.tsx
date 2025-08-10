import { SafeUser } from "@/app/types/SafeUser";
import React from "react";

const DoctorProfilePriview = ({ user }: { user: SafeUser }) => {
	return (
		<div className="mt-[6vh] mb-[3vh]">
			<ul className="list-disc ml-5">
				{user.connectedUsers.map((user, i) => (
					<div
						className="flex gap-[3vw] items-center justify-start w-full"
						key={i}
					>
						<img
							src="/pfp1.png"
							className="rounded-full p-[3vh] border-2 border-black w-[12.5vw] object-cover h-[12.5vw]"
							alt=""
						/>
						<div className="w-full">
							<h2 className="text-[3.5vh] font-semibold">Your Doctor</h2>
							<h3 className="font-light text-[2.5vh]">{user.name}</h3>
							<h3 className="font-light text-[2.5vh]">{user.email}</h3>
							<div className="flex gap-[0.5vw] w-full mt-[2vh]">
								<button className="w-full rounded-[2vh] py-[1vh] text-[2vh] border-[1.5px] border-black font-semibold">
									Start a chat
								</button>
								<button className="w-full rounded-[2vh] py-[1vh] text-[2vh] border-[1.5px] border-black font-semibold">
									Schedule a call
								</button>
								<button className="w-full rounded-[2vh] py-[1vh] text-[2vh] border-[1.5px] border-black font-semibold">
									Leave a review
								</button>
							</div>
						</div>
					</div>
				))}
			</ul>
		</div>
	);
};

export default DoctorProfilePriview;
