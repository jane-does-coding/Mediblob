"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";

interface ModalProps {
	isOpen?: boolean;
	wide: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	actionLabel: string;
	disabled: boolean;
	secondaryAction?: () => void;
	secondaryActionLabel?: string;
}

const Modal = ({
	isOpen,
	wide,
	onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled,
	secondaryAction,
	secondaryActionLabel,
}: ModalProps) => {
	const [showModal, setShowModal] = useState(isOpen);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	const handleClose = useCallback(() => {
		if (disabled) return;

		setShowModal(false);

		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if (disabled) return;
		onSubmit();
	}, [disabled, onSubmit]);

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) return;

		secondaryAction();
	}, [disabled, secondaryAction]);

	if (!isOpen) return null;

	return (
		<>
			<div
				className={`justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 backdrop-blur-md h-screen z-[999]`}
			>
				<div
					className={`relative ${
						wide
							? "w-full md:w-[55vw] xl:w-[50vw]"
							: "w-full md:w-[45vw] xl:w-[40vw]"
					} my-6 mx-auto h-screen lg:h-auto md:h-auto overflow-y-hidden`}
				>
					{/* CONTENT */}
					<div
						className={`translate duration-300 h-full ${
							showModal
								? "translate-y-0 opacity-100"
								: "translate-y-full opacity-0"
						}`}
					>
						<div className="translate h-full lg:h-auto md:h-auto border-0 rounded-[10vh] relative flex flex-col w-full bg-white/[70%] outline-none focus:outline-none text-black">
							{/* HEADER */}
							<div className="flex items-center p-6 rounded-t justify-center relative border-b-[1.5px] border-neutral-800/50">
								<button
									className="p-2 text-black rounded-full hover:bg-neutral-400/50 cursor-pointer border-0 transition absolute right-[4vw]"
									onClick={handleClose}
								>
									<IoMdClose size={24} />
								</button>
								<div className="text-xl text-black maestro">{title}</div>
							</div>
							{/* BODY */}
							<div className="relative p-6 py-4 flex-auto">{body}</div>
							{/* FOOTER */}
							<div className="flex flex-col gap-0 p-6 py-4 w-full">
								<div className="flex flex-row items-center gap-4 w-full">
									{secondaryAction && secondaryActionLabel && (
										<Button
											disabled={disabled}
											label={secondaryActionLabel}
											onClick={handleSecondaryAction}
										/>
									)}
									<Button
										disabled={disabled}
										label={actionLabel}
										onClick={handleSubmit}
									/>
								</div>
								{footer}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
