"use client";

import { SafeUser } from "@/app/types/SafeUser";
import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
	symptom: string;
	level: "severe" | "mild";
};

const SymptomForm = ({ user }: { user: SafeUser }) => {
	const { register, handleSubmit } = useForm<FormValues>();

	const onSubmit = async (data: FormValues) => {
		try {
			const res = await fetch("/api/symptoms", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: user.id,
					...data,
				}),
			});

			if (!res.ok) throw new Error("Failed to add symptom");

			const result = await res.json();
			console.log("Symptom saved!", result);
		} catch (err) {
			console.error("Failed to submit symptom", err);
		}
	};

	return (
		<div className="flex">
			<div className="w-full mt-[3vh]">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="gap-x-[0.5vw] flex items-center justify-center"
				>
					<input
						type="text"
						placeholder="Enter your symptom"
						required
						{...register("symptom")}
						className="bg-white px-[2vw] py-[1vh] text-[2.5vh] rounded-full border-2 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
					/>
					<div className="border-2 border-neutral-300 rounded-full">
						<select
							{...register("level")}
							required
							className="bg-white px-[2vw] text-[2.5vh] py-[1vh] rounded-full focus:outline-none focus:ring-2 border-r-16 border-white focus:ring-blue-200 min-w-[15vw]"
						>
							<option value="">Select level</option>
							<option value="severe">Severe</option>
							<option value="mild">Mild</option>
						</select>
					</div>

					<button
						type="submit"
						className="bg-neutral-800 text-[2.5vh] text-white px-[2vw] py-[1vh] rounded-full cursor-pointer"
					>
						{">"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default SymptomForm;
