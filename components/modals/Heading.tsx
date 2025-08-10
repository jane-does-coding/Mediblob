"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

interface HeadingProps {
	title: string;
	subtitle?: string;
	center?: boolean;
	redirect?: boolean;
}

const Heading = ({ title, subtitle, center, redirect }: HeadingProps) => {
	const router = useRouter();

	return (
		<div className={center ? "text-center" : "text-start"}>
			<h2 className="text-[3.5vh] text-black">{title}</h2>
			{subtitle && (
				<h3 className="font-light text-neutral-600 text-lg mt-[0.25vh]">
					{subtitle}
				</h3>
			)}
			{redirect && (
				<Button onClick={() => router.push("/")} label="Home Page" rounded />
			)}
		</div>
	);
};

export default Heading;
