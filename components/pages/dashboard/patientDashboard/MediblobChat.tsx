"use client";
import { SafeUser } from "@/app/types/SafeUser";
import React, { useState, useEffect, useRef } from "react";

const MediblobChat = ({ currentUser }: { currentUser: SafeUser }) => {
	const [chatStarted, setChatStarted] = useState(false);
	const [messages, setMessages] = useState<
		{ sender: "user" | "bot"; text: string }[]
	>([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages, loading]);

	const handleSend = async () => {
		if (!input.trim()) return;

		const userMessage = input.trim();
		setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
		setInput("");
		setLoading(true);

		try {
			const res = await fetch("/api/gemini", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt: userMessage, userInfo: currentUser }),
			});
			const data = await res.json();
			setMessages((prev) => [
				...prev,
				{ sender: "bot", text: data.text || "Sorry, I didn’t get that." },
			]);
		} catch (err) {
			console.error("Error fetching response:", err);
			setMessages((prev) => [
				...prev,
				{ sender: "bot", text: "Oops! Something went wrong." },
			]);
		}

		setLoading(false);
	};

	if (!chatStarted) {
		return (
			<div className="w-full border-2 border-black min-h-[55vh] items-center justify-center rounded-[10vh] flex flex-col px-[3vw] pt-[2vh] pb-[5vh]">
				<h2 className="text-[3.5vh] font-medium mb-[2vh]">MediBlob</h2>
				<img src="/mediblob.png" alt="MediBlob" className="w-[70%]" />
				<p className="text-center font-light mt-[3vh] text-[2vh]">
					MediBlob is an AI you can chat with while waiting for your doctor’s
					response.
				</p>
				<button
					onClick={() => setChatStarted(true)}
					className="border-2 border-black font-semibold w-full mx-[0.5vw] rounded-[2.5vh] py-[1vh] text-[2.5vh] mt-[2vh] cursor-pointer"
				>
					Start a Chat
				</button>
			</div>
		);
	}

	return (
		<div className="w-full border-2 border-black min-h-[55vh] max-h-[70vh] rounded-[10vh] flex flex-col justify-between pt-[2vh] pb-[2vh] bg-white">
			<h2 className="text-[3vh] font-medium text-center mb-[1.25vh] px-[2vw] flex items-center justify-center gap-[1vw]">
				MediBlob <img src="/mediblob.png" className="h-[5vh]" alt="" />
			</h2>
			<div className="flex-1 overflow-y-auto border-y-2 border-black p-[1vh] mb-[1vh] bg-white">
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`my-[0.5vh] p-[1.25vh] px-[1.5vw] rounded-[2vh] border-1 w-fit max-w-[75%] ${
							msg.sender === "user"
								? "bg-blue-100 self-end text-right ml-auto"
								: "bg-gray-200 self-start"
						}`}
					>
						{msg.text}
					</div>
				))}
				{loading && (
					<div className="my-[0.5vh] p-[1.25vh] px-[1.5vw] h-[6vh] rounded-[2vh] bg-gray-200 border-1 w-fit flex gap-[0.4vw] items-center self-start">
						<span
							className="w-[0.75vh] h-[0.75vh] bg-neutral-800 rounded-full animate-bounce"
							style={{
								animationDelay: "0s",
							}}
						></span>
						<span
							className="w-[0.75vh] h-[0.75vh] bg-neutral-800 rounded-full animate-bounce"
							style={{
								animationDelay: "0.1s",
							}}
						></span>
						<span
							className="w-[0.75vh] h-[0.75vh] bg-neutral-800 rounded-full animate-bounce"
							style={{
								animationDelay: "0.2s",
							}}
						></span>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>
			<div className="flex gap-2 items-center px-[2vw]">
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
					disabled={loading}
					placeholder="Type your message..."
					className={`flex-1 border border-black/0 p-2 rounded-[1.5vh] text-[2vh] outline-none px-[1vw] ${
						loading ? "opacity-50" : ""
					}`}
				/>
			</div>
		</div>
	);
};

export default MediblobChat;
