"use client";

import { useMemo } from "react";
import { Calendar, dateFnsLocalizer, ToolbarProps } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { SafeUser } from "@/app/types/SafeUser";
import { enUS } from "date-fns/locale/en-US";

type CalendarEvent = {
	title: string;
	start: Date;
	end: Date;
	allDay: boolean;
};

const locales = {
	"en-US": enUS,
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
	getDay,
	locales,
});

export default function CalendarPage({
	currentUser,
}: {
	currentUser: SafeUser;
}) {
	const events = useMemo<CalendarEvent[]>(() => {
		return (currentUser.userEvents ?? []).map((event) => {
			const doctor = event.doctor!;
			const patient = event.patient!;

			const otherPerson =
				doctor.id === currentUser.id
					? patient?.name ?? "Unknown"
					: doctor?.name ?? "Unknown";

			return {
				title: `${event.type === "online" ? "" : ""} With ${otherPerson}`,
				start: new Date(event.dateTime),
				end: new Date(new Date(event.dateTime).getTime() + 60 * 60 * 1000),
				allDay: false,
			};
		});
	}, [currentUser]);

	return (
		<div className="p-[2vh'] h-[80vh]">
			<h1 className="text-[4vh] mb-[5vh] font-bold maestro">My Calendar</h1>
			<Calendar<CalendarEvent, object>
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: "100%" }}
				components={{
					toolbar: CustomToolbar,
				}}
			/>
		</div>
	);
}

function CustomToolbar({
	label,
	onNavigate,
	onView,
}: ToolbarProps<CalendarEvent, object>) {
	return (
		<div className="flex justify-between p-2">
			<div className="space-x-2">
				<button
					className="px-[2vw] rounded-full bg-blue-100 border-2 border-blue-300 cursor-pointer font-medium"
					onClick={() => onNavigate("TODAY")}
				>
					Today
				</button>
				<button
					className="px-[2vw] rounded-full bg-blue-100 border-2 border-blue-300 cursor-pointer font-medium"
					onClick={() => onNavigate("PREV")}
				>
					Back
				</button>
				<button
					className="px-[2vw] rounded-full bg-blue-100 border-2 border-blue-300 cursor-pointer font-medium"
					onClick={() => onNavigate("NEXT")}
				>
					Next
				</button>
			</div>
			<div className="font-bold">{label}</div>
			<div className="space-x-2">
				<button
					className="px-[2vw] rounded-full bg-blue-100 border-2 border-blue-300 cursor-pointer font-medium"
					onClick={() => onView("month")}
				>
					Month
				</button>
				<button
					className="px-[2vw] rounded-full bg-blue-100 border-2 border-blue-300 cursor-pointer font-medium"
					onClick={() => onView("week")}
				>
					Week
				</button>
				<button
					className="px-[2vw] rounded-full bg-blue-100 border-2 border-blue-300 cursor-pointer font-medium"
					onClick={() => onView("day")}
				>
					Day
				</button>
				<button
					className="px-[2vw] rounded-full bg-blue-100 border-2 border-blue-300 cursor-pointer font-medium"
					onClick={() => onView("agenda")}
				>
					Agenda
				</button>
			</div>
		</div>
	);
}
