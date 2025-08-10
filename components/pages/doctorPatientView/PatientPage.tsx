"use client";
import { SafeUser } from "@/app/types/SafeUser";
import React, { useEffect, useState } from "react";
import DoctorNavbar from "../dashboard/doctorDashboard/DoctorNavbar";
import Heading from "../dashboard/Heading";
import SymptomsView from "./SymptomsView";
import useMedicationsModal from "@/app/hooks/useMedicationModal";
import { PiStarFourFill } from "react-icons/pi";
import EventsList from "../dashboard/EventsList";
import MedicationTableWithDeletion from "./MedicationTableWithDeletion";

const PatientPage = ({ user }: { user: SafeUser }) => {
	const medicationModal = useMedicationsModal();
	const [summary, setSummary] = useState("Loading AI summary...");

	useEffect(() => {
		const fetchSummary = async () => {
			try {
				const res = await fetch("/api/gemini", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						prompt:
							"Give a quick summary about this patient the information of which is provided, im a doctor and I need a summary of this patient to help me understand them better.",
						userInfo: user,
					}),
				});

				if (!res.ok) throw new Error("Failed to fetch summary");

				const data = await res.json();
				setSummary(data.text || "No summary available.");
			} catch (err) {
				console.error(err);
				setSummary("Could not load AI summary.");
			}
		};

		fetchSummary();
	}, [user]);

	return (
		<div className="flex">
			<DoctorNavbar />
			<div className="w-[93.5vw] flex flex-col md:flex-row py-[5vh] px-[4vw]">
				<div className="w-14/20 pr-[3vw]">
					<Heading />
					<h2 className="text-[3.5vh] mt-[2.5vh] font-medium">{user.name}</h2>

					{/* Symptoms */}
					<SymptomsView user={user} />

					<div className="flex items-center justify-between mt-[5vh] mb-[3vh]">
						<h2 className="text-[3.5vh] font-light">Medications</h2>
						<button
							className="bg-neutral-900 text-white px-4 py-2 rounded-[1.5vh] cursor-pointer transition"
							onClick={() => medicationModal.onOpen(user.id)}
						>
							Assign Medication
						</button>
					</div>
					<MedicationTableWithDeletion
						medications={user.prescribedMedications || []}
					/>
				</div>

				<div className="w-6/20">
					<h2 className="flex items-center justify-center gap-[1vw] text-[2.5vh] mb-[2vh]">
						AI Summary <PiStarFourFill className="text-[2.75vh]" />
					</h2>
					<p className="leading-[3.5vh] text-[2vh] py-[2vh] px-[1.5vw] rounded-[2vh] border-2 border-black">
						{summary}
					</p>

					<h2 className="text-[4vh] mt-[2vh] pb-[1vh] border-b-2 border-neutral-300 mb-[2vh]">
						Events
					</h2>
					<EventsList currentUser={user} />
				</div>
			</div>
		</div>
	);
};

export default PatientPage;
