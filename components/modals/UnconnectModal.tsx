"use client";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";
import Heading from "./Heading";
import Input from "../Inputs/Input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useUnconnectModal from "@/app/hooks/useUnconnectModal";

const UnconnectModal = () => {
	const unconnectModal = useUnconnectModal();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const selectedUser = unconnectModal.selectedUser;

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			code: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		if (!selectedUser) return;

		if (data.code !== selectedUser.code) {
			toast.error("Code does not match. Try again.");
			return;
		}

		setIsLoading(true);

		try {
			const res = await axios.delete("/api/connect", {
				data: { code: data.code },
			});

			if (res.data.success) {
				toast.success(`Disconnected from ${selectedUser.name}.`);
				unconnectModal.onClose();
				reset();
				router.refresh();
			}
		} catch (err) {
			const error = err as AxiosError<{ error: string }>;
			toast.error(error.response?.data?.error || "Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	const bodyContent = (
		<div className="flex flex-col gap-[2vh] py-[2vh] px-[1vw]">
			<Heading
				title={`Remove ${selectedUser?.name || "a user"}`}
				subtitle={`Type the code to confirm removal.`}
			/>

			<div className="flex items-center justify-between">
				<h2 className="text-[2.5vh] w-1/2">User: {selectedUser?.name}</h2>
				<h2 className="text-[2.5vh] w-1/2">User Code: {selectedUser?.code}</h2>
			</div>

			<Input
				id="code"
				label="Confirm Code"
				disabled={isLoading}
				errors={errors}
				required
				register={register}
			/>
		</div>
	);

	const footerContent = <div className="py-[2vh]"></div>;

	return (
		<Modal
			disabled={isLoading}
			isOpen={unconnectModal.isOpen}
			title="Remove • Connection"
			actionLabel="Remove Connection"
			onClose={() => {
				unconnectModal.onClose();
				reset();
			}}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
			wide
		/>
	);
};

export default UnconnectModal;
