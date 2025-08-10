"use client";
import { useScroll, motion, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";

type PharagraphProps = {
	value: string;
};

const Pharagraph = ({ value }: PharagraphProps) => {
	const element = useRef<HTMLParagraphElement>(null);
	const { scrollYProgress } = useScroll({
		target: element,
		offset: ["start 0.7", "start 0.1"],
	});

	const imageMap: Record<string, string> = {
		_image_: "/stars/star6.png",
		_image2_: "/stars/image 3.png",
		_image3_: "/stars/star7.png",
	};

	const words = value.split(" ");

	return (
		<div>
			<h3 className="w-fit mx-auto px-[2vw] py-[1vh] border-dashed border-black border-2 text-[2vh] tracking-[0.25vw] rounded-full maestro">
				MEDIBLOB
			</h3>
			<p
				className="text-[5.25vh] max-w-full md:max-w-[70vw] p-[40px] flex flex-wrap text-center items-center justify-center pt-6"
				ref={element}
			>
				{words.map((word, i) => {
					const start = i / words.length;
					const end = start + 1 / words.length;

					if (imageMap[word]) {
						return (
							<Word range={[start, end]} progress={scrollYProgress} key={i}>
								<img
									src={imageMap[word]}
									alt=""
									className="inline-block w-full h-[9vh] align-middle object-cover border-0 border-black"
								/>
							</Word>
						);
					}

					return (
						<Word range={[start, end]} progress={scrollYProgress} key={i}>
							{word}
						</Word>
					);
				})}
			</p>
		</div>
	);
};

type WordProps = {
	children: React.ReactNode;
	range: [number, number];
	progress: MotionValue<number>;
};

const Word = ({ children, range, progress }: WordProps) => {
	const opacity = useTransform(progress, range, [0.1, 1]);
	return (
		<motion.span style={{ opacity }} className="mr-4">
			{children}
		</motion.span>
	);
};

export default Pharagraph;
