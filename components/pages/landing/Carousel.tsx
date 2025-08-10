"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const slides = [
	{
		image: "/imgs/img1.png",
		title: "Calendar & Appointments",
		description: "Events — Scheduling — Reminders",
	},
	{
		image: "/imgs/img2.png",
		title: "Patient Dashboard",
		description: "Progress — Medications — Tracking",
	},
	{
		image: "/imgs/img3.png",
		title: "Doctor Dashboard",
		description: "Insights — Connections — Care Plans",
	},
	{
		image: "/imgs/img4.png",
		title: "Mediblob AI",
		description: "Suggestions — Predictions — Support",
	},
	{
		image: "/imgs/img5.png",
		title: "Patients Overview",
		description: "Profiles — History — Quick Actions",
	},
];

const Carousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	/* 	const { ref: bottomRef, inView: bottomInView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
	}); */

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 6000);

		return () => clearInterval(interval); // <--- fixes the warning + good practice
	}, []);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
	});

	return (
		<div className="mb-[7.5vh]">
			<div className="w-[90vw] mx-auto flex justify-center items-end mb-[3vh]">
				<motion.h2
					ref={ref}
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
					className="text-[5vh] maestro mb-[2vh]"
				>
					See It in Action
				</motion.h2>
			</div>
			<div className="w-full max-w-[100vw] h-[80vh] mx-auto overflow-hidden relative ">
				{/* Slides */}
				{/* Slides */}
				<div
					className="w-[500vw] flex gap-[1.5vw] pl-[15vw] transition-transform duration-[1100ms] ease-in-out"
					style={{ transform: `translateX(-${currentSlide * 71.5}vw)` }}
				>
					{slides.map((slide, index) => (
						<div
							key={index}
							className="w-[70vw] h-[70vh] border-2 border-black box-border overflow-hidden rounded-[3vh] flex items-center justify-center relative"
						>
							<img
								src={slide.image}
								className="w-[70vw] h-[70vh] object-cover rounded-[0.5rem]"
								alt={slide.title}
							/>
							{/* Tags at the top */}
							<div className="absolute top-[2vh] left-[50%] translate-x-[-50%] text-[2vh] rounded-full flex items-center justify-center gap-[1vw]">
								{slide.description.split(" — ").map((tag, i) => (
									<span
										key={i}
										className="px-[1.5vw] py-[0.25vh] font-semibold text-[1.5vh] bg-white border-[1px] border-black rounded-full"
									>
										{tag}
									</span>
								))}
							</div>

							<div className="absolute bottom-[2vh] left-[50%] translate-x-[-50%] bg-neutral-50 font-semibold text-[2vh] border-[1px] border-black rounded-full px-[3vw] py-[1vh]">
								{slide.title}
							</div>
						</div>
					))}
				</div>

				{/* Dots */}
				<div className="flex w-fit mx-auto gap-[0.5vw] mt-[5vh]">
					<div
						className={`w-[7px] h-[7px] bg-black ${
							currentSlide == 0 ? "bg-black" : "bg-neutral-300 transition"
						} rounded-full`}
					></div>
					<div
						className={`w-[7px] h-[7px] bg-black ${
							currentSlide == 1 ? "bg-black" : "bg-neutral-300 transition"
						} rounded-full`}
					></div>
					<div
						className={`w-[7px] h-[7px] bg-black ${
							currentSlide == 2 ? "bg-black" : "bg-neutral-300 transition"
						} rounded-full`}
					></div>
					<div
						className={`w-[7px] h-[7px] bg-black ${
							currentSlide == 3 ? "bg-black" : "bg-neutral-300 transition"
						} rounded-full`}
					></div>
					<div
						className={`w-[7px] h-[7px] bg-black ${
							currentSlide == 4 ? "bg-black" : "bg-neutral-300 transition"
						} rounded-full`}
					></div>
				</div>
			</div>
		</div>
	);
};

export default Carousel;
