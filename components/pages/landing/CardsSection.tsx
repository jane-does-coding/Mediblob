"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { easeOut } from "framer-motion";

const fadeInUp = (delay = 0) => ({
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			delay,
			ease: easeOut,
		},
	},
});

const CardsSection = () => {
	const controls1 = useAnimation();
	const controls2 = useAnimation();
	const controls3 = useAnimation();

	const [ref1, inView1] = useInView({ triggerOnce: true });
	const [ref2, inView2] = useInView({ triggerOnce: true });
	const [ref3, inView3] = useInView({ triggerOnce: true });

	useEffect(() => {
		if (inView1) controls1.start("visible");
		if (inView2) controls2.start("visible");
		if (inView3) controls3.start("visible");
	}, [inView1, inView2, inView3, controls1, controls2, controls3]);

	return (
		<div className="">
			<div className="relative h-[105vh] flex flex-col gap-[3vh] items-center justify-center w-[85vw] mx-auto relative">
				{/* Star images (static) */}
				<img
					src="/stars/image 1.png"
					className="absolute top-[6vh] right-[-5vw] w-[20vw]"
					alt=""
				/>
				<img
					src="/stars/image 3.png"
					className="absolute bottom-[4vh] z-[-1] left-[-5vw] w-[10vw]"
					alt=""
				/>

				{/* Cards Row */}
				<div className="flex gap-[2vw] w-full">
					{/* Card 1 */}
					<motion.div
						ref={ref1}
						initial="hidden"
						animate={controls1}
						variants={fadeInUp(0)}
						className="flex flex-col w-1/3 gap-[3vh]"
					>
						<motion.div
							initial="hidden"
							animate={controls1}
							variants={fadeInUp(0.2)}
							className="w-full h-[55vh] rounded-[12.5vh] overflow-hidden box-border border-2 border-black relative"
						>
							<motion.div
								initial="hidden"
								animate={controls1}
								variants={fadeInUp(0.4)}
								className="absolute top-[1vh] left-[50%] translate-x-[-50%] border-[1.5px] border-black py-[0.5vh] px-[2vw] bg-white rounded-full"
							>
								<p className="font-light text-[2vh]">Real‑Time Tracking</p>
							</motion.div>
							<motion.img
								src="/imgs/img6.png"
								className="w-full h-full object-cover"
								alt="Track symptoms and medications"
							/>
						</motion.div>

						<motion.div
							initial="hidden"
							animate={controls1}
							variants={fadeInUp(0.8)}
							className="bg-neutral-100 rounded-[6.5vh] min-h-[17.5vh] w-full box-border border-2 border-black flex flex-col items-start justify-center px-[3vw]"
						>
							<h2 className="text-[3vh] font-medium mb-[0.25vh]">
								Stay On Top Of Health
							</h2>
							<p className="text-[2.25vh] font-extralight">
								Track your symptoms, meds, and habits in one simple place.
							</p>
						</motion.div>
					</motion.div>

					{/* Card 2 */}
					<motion.div
						ref={ref2}
						initial="hidden"
						animate={controls2}
						variants={fadeInUp(0.1)}
						className="flex flex-col w-1/3 gap-[2vh]"
					>
						<motion.div
							initial="hidden"
							animate={controls2}
							variants={fadeInUp(0.3)}
							className="w-full h-[55vh] rounded-[12.5vh] overflow-hidden box-border border-2 border-black relative"
						>
							<motion.div
								initial="hidden"
								animate={controls2}
								variants={fadeInUp(0.5)}
								className="absolute top-[1vh] left-[50%] translate-x-[-50%] border-[1.5px] border-black py-[0.5vh] px-[2vw] bg-white rounded-full"
							>
								<p className="font-light text-[2vh]">Doctor Insights</p>
							</motion.div>
							<motion.img
								src="/imgs/img3.png"
								className="w-full h-full object-cover"
								alt="Doctor monitoring dashboard"
							/>
						</motion.div>

						<motion.div
							initial="hidden"
							animate={controls2}
							variants={fadeInUp(0.9)}
							className="bg-neutral-100 rounded-[6.5vh] min-h-[17.5vh] w-full box-border border-2 border-black flex flex-col items-start justify-center px-[3vw]"
						>
							<h2 className="text-[3vh] font-medium mb-[0.25vh]">
								Share With Your Doctor
							</h2>
							<p className="text-[2.25vh] font-extralight">
								Your updates go straight to your doctor, in real-time.
							</p>
						</motion.div>
					</motion.div>

					{/* Card 3 */}
					<motion.div
						ref={ref3}
						initial="hidden"
						animate={controls3}
						variants={fadeInUp(0.2)}
						className="flex flex-col w-1/3 gap-[2vh]"
					>
						<motion.div
							initial="hidden"
							animate={controls3}
							variants={fadeInUp(0.4)}
							className="w-full h-[55vh] rounded-[12.5vh] overflow-hidden box-border border-2 border-black relative"
						>
							<motion.div
								initial="hidden"
								animate={controls3}
								variants={fadeInUp(0.6)}
								className="absolute top-[1vh] left-[50%] translate-x-[-50%] border-[1.5px] border-black py-[0.5vh] px-[2vw] bg-white rounded-full"
							>
								<p className="font-light text-[2vh]">Video & Chat</p>
							</motion.div>
							<motion.img
								src="/imgs/img8.png"
								className="w-full h-full object-cover"
								alt="Video call feature"
							/>
						</motion.div>

						<motion.div
							initial="hidden"
							animate={controls3}
							variants={fadeInUp(1.0)}
							className="bg-neutral-100 rounded-[6.5vh] min-h-[17.5vh] w-full box-border border-2 border-black flex flex-col items-start justify-center px-[3vw]"
						>
							<h2 className="text-[3vh] font-medium mb-[0.25vh]">
								Talk Without Stress
							</h2>
							<p className="text-[2.25vh] font-extralight">
								Secure calls and messages so you and your doctor are always
								connected.
							</p>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default CardsSection;
