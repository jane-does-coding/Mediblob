import { SafeUser } from "@/app/types/SafeUser";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const CallList = ({ currentUser }: { currentUser: SafeUser }) => {
	const events = [...(currentUser?.userEvents || [])]
		.filter((event) => event.type === "online")
		.sort(
			(a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
		);

	if (events.length === 0) {
		return (
			<p className="text-center text-sm text-gray-400">No events found.</p>
		);
	}

	return (
		<div className="space-y-[0vh] max-h-[40vh] overflow-scroll">
			{events.map((event) => {
				const dateObj = new Date(event.dateTime);
				const date = dateObj.toLocaleDateString();
				const time = dateObj.toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				});

				return (
					<div
						key={event.id}
						className="flex items-center justify-between py-[1.75vh] px-[1vw] border-y-[0.5px] border-neutral-300"
					>
						<p className="mt-[0vh] text-[1.75vh] w-5/10">
							with{" "}
							<span className="text-[2.5vh] ml-[0.25vw]">
								{event.patient?.name || "—"}
							</span>
						</p>
						<div className="flex items-center justify-between mt-[0vh]  gap-[2vw] w-4/10">
							<p>{date}</p>
							<p>{time}</p>
						</div>
						<div className=" w-1/10 flex items-center justify-center">
							<FaArrowRight
								className="text-[2.5vh] text-neutral-900 cursor-pointer"
								onClick={() => {
									window.location.href = `/events/${event.id}`;
								}}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default CallList;
