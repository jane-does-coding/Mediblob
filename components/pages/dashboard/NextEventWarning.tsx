import { SafeUser } from "@/app/types/SafeUser";
import React from "react";

const NextEventWarning = ({ currentUser }: { currentUser: SafeUser }) => {
	const now = new Date();

	const upcomingEvents = [...(currentUser?.userEvents || [])]
		.filter((e) => new Date(e.dateTime) > now)
		.sort(
			(a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
		);

	const nextEvent = upcomingEvents[0];

	if (!nextEvent) return null;

	const eventDate = new Date(nextEvent.dateTime);
	const day = eventDate.toLocaleDateString(undefined, {
		weekday: "long",
	});
	const time = eventDate.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<div>
			<h3 className="w-full py-[1.5vh] px-[2vw] mt-[2vh] text-[2vh] bg-gradient-to-r from-yellow-100 to-yellow-100/70 border-l-8 border-amber-300">
				Next {nextEvent.type == "inperson" ? "Call" : "Appointment"} is {day},{" "}
				{time}
			</h3>
		</div>
	);
};

export default NextEventWarning;
