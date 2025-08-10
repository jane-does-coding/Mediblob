"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { easeOut } from "framer-motion";
import Link from "next/link";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

const BannerSection = () => {
	const controls = useAnimation();
	const [ref, inView] = useInView({ triggerOnce: true });

	const RegisterModal = useRegisterModal();
	const LoginModal = useLoginModal();

	useEffect(() => {
		if (inView) {
			controls.start("visible");
		}
	}, [controls, inView]);

	const fadeInUp = (delay = 0) => ({
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.3, delay, ease: easeOut },
		},
	});

	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<motion.h1
				ref={ref}
				initial="hidden"
				animate={controls}
				variants={fadeInUp(0)}
				className="text-[7vh] maestro pb-[1.5vh] mx-auto w-fit tracking-[1vh]"
			>
				Mediblob
			</motion.h1>
			<nav className="flex items-center justify-between w-full md:w-[50vw] mx-auto">
				<motion.div
					ref={ref}
					initial="hidden"
					animate={controls}
					variants={fadeInUp(0.1)}
					className=""
				>
					<p
						onClick={() => RegisterModal.onOpen()}
						className="font-extralight text-[3vh] cursor-pointer"
					>
						Register
					</p>
				</motion.div>
				<motion.div
					ref={ref}
					initial="hidden"
					animate={controls}
					variants={fadeInUp(0.2)}
					className=""
				>
					<p
						onClick={() => LoginModal.onOpen()}
						className="font-extralight text-[3vh] cursor-pointer"
					>
						Login
					</p>
				</motion.div>
				<motion.div
					ref={ref}
					initial="hidden"
					animate={controls}
					variants={fadeInUp(0.3)}
					className=""
				>
					<Link
						href={"/"}
						className="font-extralight text-[3vh] cursor-pointer"
					>
						Contact
					</Link>
				</motion.div>
			</nav>
			<motion.img
				ref={ref}
				initial="hidden"
				animate={controls}
				variants={fadeInUp(0.4)}
				src="/banner.jpg"
				className="rounded-[10vh] w-[90vw] mx-auto h-[55vh] object-cover mt-[3vh]"
				alt="banner image"
			/>
			<motion.p
				ref={ref}
				initial="hidden"
				animate={controls}
				variants={fadeInUp(0.5)}
				className="text-[4vh] w-[85vw] mx-auto text-center font-extralight mt-[2vh]"
			>
				MediBlob connects doctors and patients through real-time health
				tracking, symptom logs, and video consultations, all linked by a unique
				profile code.
			</motion.p>
		</div>
	);
};

export default BannerSection;
