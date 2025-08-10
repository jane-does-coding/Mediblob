import { SafeUser } from "@/app/types/SafeUser";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SymptomsView = ({ user }: { user: SafeUser }) => {
	const [symptoms, setSymptoms] = useState(user?.symptoms || []);

	const handleDelete = async (symptomId: string) => {
		try {
			const res = await fetch(`/api/symptoms/${symptomId}`, {
				method: "DELETE",
			});

			if (!res.ok) throw new Error("Failed to delete symptom");

			setSymptoms((prev) => prev.filter((s) => s.id !== symptomId));
			toast.success("Symptom removed");
		} catch (err) {
			console.error(err);
			toast.error("Could not delete symptom");
		}
	};

	if (!symptoms || symptoms.length === 0) {
		return (
			<div className="mt-[3vh]">
				<h2 className="text-[3.5vh] font-light mb-[2vh]">
					No Symptoms Reported
				</h2>
			</div>
		);
	}

	return (
		<div className="mt-[3vh]">
			<h2 className="text-[3.5vh] font-light mb-[2vh]">Symptoms Reported</h2>
			<div className="flex gap-[2vw]">
				<div className="flex gap-[1vw] items-center justify-center">
					<div className="w-[2vw] h-[2vw] rounded-full bg-neutral-200 border-1 border-neutral-900"></div>
					<span className="text-[2.5vh] font-light">Severe</span>
				</div>
				<div className="flex gap-[1vw] items-center justify-center">
					<div className="w-[2vw] h-[2vw] rounded-full bg-neutral-200/0 border-2 border-dashed border-neutral-900"></div>
					<span className="text-[2.5vh] font-light">Mild</span>
				</div>
			</div>
			<div className="flex gap-x-[2vw] gap-y-[2vh] flex-wrap mt-[3vh]">
				{symptoms.map((symptom) => (
					<div
						key={symptom.id}
						className={`relative rounded-full border-1 border-black px-[3vw] py-[1vh] text-[2.5vh] flex items-center gap-2
              ${
								symptom.level === "severe"
									? "bg-neutral-200"
									: "bg-neutral-200/0 border-dashed"
							}`}
					>
						{symptom.symptom}
						<button
							onClick={() => handleDelete(symptom.id)}
							className="ml-2 text-red-800 hover:text-red-800 text-[2vh]"
						>
							✕
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default SymptomsView;
