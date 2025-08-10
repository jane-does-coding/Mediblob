"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const ConnectBox = () => {
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);

	const handleConnect = async () => {
		if (!code.trim()) return toast.error("Please enter a code");

		setLoading(true);
		try {
			const res = await axios.post("/api/connect", { code });

			if (res.data.success) {
				toast.success("Connected successfully!");
				setCode("");
			}
		} catch (err) {
			const error = err as AxiosError<{ error: string }>;
			toast.error(error.response?.data?.error || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-4 border-2 border-black rounded-lg w-full max-w-md mx-auto mt-4">
			<h3 className="text-[2.25vh] font-medium mb-2">Connect with a User</h3>
			<input
				value={code}
				onChange={(e) => setCode(e.target.value)}
				placeholder="Enter user code"
				className="border px-3 py-2 rounded-md w-full text-black text-[2vh]"
			/>
			<button
				onClick={handleConnect}
				disabled={loading}
				className="bg-black text-white mt-2 px-4 py-2 rounded-md w-full text-[2vh]"
			>
				{loading ? "Connecting..." : "Connect"}
			</button>
		</div>
	);
};

export default ConnectBox;
