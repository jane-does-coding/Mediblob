"use client";
import React from "react";
import AboutSection from "./AboutSection";
import Pharagraph from "./Word";
import CardsSection from "./CardsSection";
import BannerSection from "./BannerSection";
import Carousel from "./Carousel";

const LandingPage = () => {
	return (
		<div className="">
			<BannerSection />
			<img src="/border.png" className="w-[100vw] object-cover" alt="" />
			<AboutSection />
			<Carousel />
			<img src="/border.png" className="w-[100vw] object-cover" alt="" />
			<div className="min-relative h-[105vh] flex flex-col items-center justify-center relative">
				<Pharagraph value="MediBlob is a healthcare platform that connects patients and doctors _image_ through real-time data sharing and AI-powered communication. _image2_ Patients can log symptoms, track medications, and receive personalized insights, _image3_ while doctors monitor progress and adjust treatments." />
			</div>
			<img src="/border.png" className="w-[100vw] object-cover" alt="" />
			<CardsSection />
			<img src="/border.png" className="w-[100vw] object-cover" alt="" />
		</div>
	);
};

export default LandingPage;
