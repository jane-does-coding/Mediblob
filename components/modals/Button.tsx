"use client";

import { IconType } from "react-icons/lib";

interface ButtonProps {
	label: string;
	rounded?: boolean;
	wave?: boolean;
	disabled?: boolean;
	small?: boolean;
	beforeIcon?: IconType;
	afterIcon?: IconType;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
	beforeIcon: BeforeIcon,
	afterIcon: AfterIcon,
	label,
	rounded,
	small,
	disabled,
	onClick,
}: ButtonProps) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`bg-black text-white w-full flex flex-row items-center justify-center relative hover:opacity-90 transition cursor-pointer
      ${small ? "p-2 text-sm" : "p-4"}
      ${rounded ? "rounded-full" : " rounded-[1.75vw]"}
      `}
		>
			{BeforeIcon && (
				<span className="absolute top-[50%] translate-y-[-50%] left-4 md:left-6">
					<BeforeIcon size={26} />
				</span>
			)}
			{label}
			{AfterIcon && (
				<span className="absolute top-[50%] translate-y-[-50%] right-4 md:right-6">
					<AfterIcon size={26} />
				</span>
			)}
		</button>
	);
};

export default Button;
