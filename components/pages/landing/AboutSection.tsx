"use client";
import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { easeOut } from "framer-motion";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

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

const AboutSection = () => {
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

	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	return (
		<div className="">
			<div className="relative h-[105vh] flex flex-col gap-[3vh] items-center justify-center">
				{/* Card 1 */}
				<motion.div
					ref={ref1}
					initial="hidden"
					animate={controls1}
					variants={fadeInUp(0)}
					className="w-[85vw] border-2 border-black rounded-[10vh] flex min-h-[40vh] px-[3vw] py-[3vh]"
				>
					<div className="w-3/5 flex flex-col pl-[3vw] items-start justify-center pr-[3vw]">
						<motion.div
							initial="hidden"
							animate={controls1}
							variants={fadeInUp(0.3)}
							className="flex items-center justify-start gap-[2vw]"
						>
							<span className="maestro text-[4vh]">Mediblob</span>
							<img
								src="/stars/star5.png"
								className="h-[7vh] aspect-[1]"
								alt=""
							/>
						</motion.div>

						<motion.p
							initial="hidden"
							animate={controls1}
							variants={fadeInUp(0.5)}
							className="text-[3vh] font-extralight pt-[1vh] pb-[2.5vh]"
						>
							Mediblob is a smart healthcare platform where doctors and patients
							actually stay connected. Patients track symptoms, medications, and
							progress, while doctors see updates in real-time. It makes follo
							ups way smoother and helps catch problems early.
						</motion.p>

						<motion.div
							initial="hidden"
							animate={controls1}
							variants={fadeInUp(0.7)}
							className="flex items-center justify-center w-full gap-[1vw]"
						>
							<button
								onClick={() => loginModal.onOpen()}
								className="flex items-center justify-center rounded-[2.75vh] w-full py-[1.5vh] font-bold border-2 border-black bg-neutral-800 text-white text-[2.25vh]"
							>
								Sign in
							</button>
							<button
								onClick={() => registerModal.onOpen()}
								className="flex items-center justify-center rounded-[2.75vh] w-full font-bold border-2 border-black relative py-[1.5vh] overflow-hidden"
							>
								<span className="pr-[3vw] text-[2.25vh]">Sign up</span>
								<span className="h-full bg-neutral-100 px-[1.5vw] flex items-center justify-center border-l-2 absolute right-0 top-0 text-[2.25vh]">
									<FaArrowRight />
								</span>
							</button>
						</motion.div>
					</div>

					<motion.div
						initial="hidden"
						animate={controls1}
						variants={fadeInUp(0.9)}
						className="w-2/5"
					>
						<img
							src="/imgs/img1.png"
							className="w-full h-full object-cover rounded-[10vh] border-2 border-black"
							alt="Dashboard preview"
						/>
					</motion.div>
				</motion.div>

				{/* Card 2 */}
				<motion.div
					ref={ref2}
					initial="hidden"
					animate={controls2}
					variants={fadeInUp(0.3)}
					className="w-[85vw] border-2 border-black rounded-[10vh] flex items-center justify-between min-h-[15vh] px-[3vw] py-[2vh]"
				>
					<motion.div
						initial="hidden"
						animate={controls2}
						variants={fadeInUp(0.5)}
						className="text-[3vh] pl-[1vw]"
					>
						Track symptoms and log medications in just a few clicks.
					</motion.div>
					<motion.div
						initial="hidden"
						animate={controls2}
						variants={fadeInUp(0.7)}
						className="flex gap-[1vw]"
					>
						<img
							src="/imgs/img2.png"
							className="w-[15vw] h-[13vh] object-cover rounded-[6vh] border-2 border-black"
							alt="Tracking feature"
						/>
						<img
							src="/imgs/img3.png"
							className="w-[15vw] h-[13vh] object-cover rounded-[6vh] border-2 border-black"
							alt="Progress screen"
						/>
					</motion.div>
				</motion.div>

				{/* Card 3 */}
				<motion.div
					ref={ref3}
					initial="hidden"
					animate={controls3}
					variants={fadeInUp(0.5)}
					className="w-[85vw] border-2 border-black rounded-[10vh] flex items-center justify-between min-h-[15vh] px-[3vw] py-[2vh]"
				>
					<motion.div
						initial="hidden"
						animate={controls3}
						variants={fadeInUp(0.7)}
						className="text-[3vh] pl-[1vw]"
					>
						Secure video calls, live updates, and insights
					</motion.div>
					<motion.div
						initial="hidden"
						animate={controls3}
						variants={fadeInUp(0.9)}
						className="flex gap-[1vw]"
					>
						<img
							src="/imgs/img4.png"
							className="w-[15vw] h-[13vh] object-cover rounded-[6vh] border-2 border-black"
							alt="Video call"
						/>
						<img
							src="/imgs/img5.png"
							className="w-[15vw] h-[13vh] object-cover rounded-[6vh] border-2 border-black"
							alt="Insights feature"
						/>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};

export default AboutSection;
