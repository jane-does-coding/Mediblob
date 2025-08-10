"use client";

import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Modal from "./Modal";
import Heading from "./Heading";
import Input from "../Inputs/Input";
import useMedicationsModal from "@/app/hooks/useMedicationModal";

const AssignMedicationModal = () => {
	const medicationModal = useMedicationsModal();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			title: "",
			dosage: "",
			instructions: "",
			startDate: "",
			endDate: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);

		try {
			const res = await fetch("/api/medications", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...data, userId: medicationModal.userId }),
			});

			if (res.ok) {
				toast.success("Medication assigned!");
				reset();
				router.refresh();
				medicationModal.onClose();
			} else {
				toast.error("Failed to assign medication");
			}
		} catch (error) {
			console.error("Assign Medication Error:", error);
			toast.error("Something went wrong.");
		} finally {
			setIsLoading(false);
		}
	};

	const bodyContent = (
		<div className="flex flex-col gap-3">
			<Heading title="Assign Medication" subtitle="Fill in the details below" />
			{/* 	<Input
				id="userId"
				label="Patient ID"
				disabled={isLoading}
				errors={errors}
				required
				register={register}
			/> */}
			<div className="flex gap-[1vw]">
				<Input
					id="title"
					label="Medication Name"
					disabled={isLoading}
					errors={errors}
					required
					register={register}
				/>
				<Input
					id="dosage"
					label="Dosage (e.g. 200mg)"
					disabled={isLoading}
					errors={errors}
					required
					register={register}
				/>
			</div>
			<Input
				id="instructions"
				label="Instructions (optional)"
				disabled={isLoading}
				errors={errors}
				register={register}
			/>
			<div className="flex gap-[1vw]">
				<Input
					id="startDate"
					label="Start Date"
					type="date"
					disabled={isLoading}
					errors={errors}
					required
					register={register}
				/>
				<Input
					id="endDate"
					label="End Date"
					type="date"
					disabled={isLoading}
					errors={errors}
					required
					register={register}
				/>
			</div>
		</div>
	);

	const footerContent = <div className="py-[1.5vh]"></div>;

	return (
		<Modal
			disabled={isLoading}
			isOpen={medicationModal.isOpen}
			title="Assign Medication"
			actionLabel="Assign"
			onClose={medicationModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			wide
			footer={footerContent}
		/>
	);
};

export default AssignMedicationModal;
