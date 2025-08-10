"use client";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";
import Heading from "./Heading";
import Input from "../Inputs/Input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useConnectModal from "@/app/hooks/useConnectModal";

const ConnectModal = () => {
	const connectModal = useConnectModal();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

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
		setIsLoading(true);

		try {
			const res = await axios.post("/api/connect", { code: data.code });

			if (res.data.success) {
				toast.success("User connected successfully!");
				connectModal.onClose();
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
		<div className="flex flex-col gap-[2vh] py-[1vh] px-[1vw]">
			<Heading
				title="Enter a code"
				subtitle="Enter a code to connect a patient."
			/>

			<Input
				id="code"
				label="User Code"
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
			isOpen={connectModal.isOpen}
			title={"Add • Patient"}
			actionLabel="Add a User"
			onClose={() => {
				connectModal.onClose();
				reset();
			}}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			wide={false}
			footer={footerContent}
		/>
	);
};

export default ConnectModal;
