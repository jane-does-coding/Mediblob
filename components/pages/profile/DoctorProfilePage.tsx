import { SafeUser } from "@/app/types/SafeUser";
import React from "react";
import Heading from "../dashboard/Heading";
import DoctorNavbar from "../dashboard/doctorDashboard/DoctorNavbar";
import { FaStar } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

const DoctorProfilePage = ({ currentUser }: { currentUser: SafeUser }) => {
	const now = new Date();

	const upcomingEvent = currentUser.doctorEvents
		?.filter((event) => new Date(event.dateTime) > now)
		.sort(
			(a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
		)[0];

	return (
		<div className="flex">
			<DoctorNavbar />

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
							<div className="w-full text-[2.5vh]">
								Degree: <span className="font-semibold ml-[1vw]">-</span>
							</div>
							<div className="w-full text-[2.5vh]">
								Years in the field:{" "}
								<span className="font-semibold ml-[1vw]">-</span>
							</div>
							<div className="w-full text-[2.5vh]">
								Reviews: <span className="font-semibold ml-[1vw]">-</span>
							</div>
						</div>
					</div>
				</div>
				<img src="/border.png" className="mt-[5vh]" alt="" />
				<div className="flex mt-[4vh]">
					<div className="w-2/3 pr-[3vw]">
						<p className="text-[3vh] font-extralight leading-[4vh]">
							{currentUser.bio}
						</p>
						<div className="flex flex-col mt-[6vh]">
							<div className="flex">
								<div className="flex flex-col items-center justify-center py-[3vh] w-full border-r-2 border-black">
									<h2 className="text-[3vh] font-semibold">Working at</h2>
									<p className="text-[2vh] font-light">Mediblob</p>
								</div>
								<div className="flex flex-col items-center justify-center py-[3vh] w-full">
									<h2 className="text-[3vh] font-semibold">Total Users</h2>
									<p className="text-[2vh] font-light">
										{currentUser.connectedUsers.length} active users connected
									</p>
								</div>
							</div>
							<div className="flex border-t-2 border-black">
								<div className="flex flex-col items-center justify-center py-[3vh] w-full border-r-2 border-black">
									<h2 className="text-[3vh] font-semibold">Upcoming Event</h2>
									<p className="text-[2vh] font-light">
										{upcomingEvent
											? `${
													upcomingEvent.type === "online"
														? "Online"
														: "In-person"
											  } session on ${new Date(
													upcomingEvent.dateTime
											  ).toLocaleDateString("en-US", {
													month: "long",
													day: "numeric",
													year: "numeric",
											  })}`
											: "No upcoming events"}
									</p>
								</div>
								<div className="flex flex-col items-center justify-center py-[3vh] w-full">
									<h2 className="text-[3vh] font-semibold">
										Medications Assigned
									</h2>
									<p className="text-[2vh] font-light">
										{currentUser.assignedMedications
											? currentUser.assignedMedications.length
											: ""}{" "}
										prescriptions currently active
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="w-1/3">
						<h2 className="font-semibold text-[3vh] mb-[2vh]">Reviews</h2>
						<div className="flex flex-col gap-[1.5vh]">
							{[0, 1, 2].map((item, i) => (
								<div
									className="border-2 border-black rounded-[6vh] py-[3.5vh] px-[3vw]"
									key={i}
								>
									<div className="flex mb-[1vh] gap-[0.2vw]">
										<FaStar className="text-[2.75vh] text-black" />
										<FaStar className="text-[2.75vh] text-black" />
										<FaStar className="text-[2.75vh] text-black" />
										<FaStar className="text-[2.75vh] text-black" />
										<FaStar className="text-[2.75vh] text-black" />
									</div>
									<h2 className="text-[3vh] font-semibold">Lorem, ipsum.</h2>
									<p className="text-[2vh] font-light">
										Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur
										adipisicing.
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorProfilePage;
