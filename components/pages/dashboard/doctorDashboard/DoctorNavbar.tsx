"use client";
import Link from "next/link";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { signOut } from "next-auth/react";

const DoctorNavbar = () => {
	return (
		<div className="w-[6.5vw] border-r-2 border-black sticky top-0 left-0 h-screen z-[980]">
			<div className="flex flex-col items-center h-full justify-center pt-[3vh] pb-[5vh] relative">
				<Link href={"/"}>
					<img src="/stars/star5.png" className="w-[4.5vw]" alt="" />
				</Link>

				<div className="flex flex-col gap-[4vh] mt-[6vh]">
					<Link href={"/"} className="relative group flex justify-center">
						<BiSolidDashboard className="text-[4vh]" />
						<span
							className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap
                         opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-[2vw] py-[0.5vh] rounded-[1vh] border-1 border-black text-[1.75vh] shadow-lg pointer-events-none"
						>
							Dashboard
						</span>
					</Link>

					<Link
						href={"/patients"}
						className="relative group flex justify-center"
					>
						<FaPeopleGroup className="text-[4vh]" />
						<span
							className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap
                         opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-[2vw] py-[0.5vh] rounded-[1vh] border-1 border-black text-[1.75vh] shadow-lg pointer-events-none"
						>
							Patients
						</span>
					</Link>

					<Link
						href={"/calendar"}
						className="relative group flex justify-center"
					>
						<FaCalendarAlt className="text-[4vh]" />
						<span
							className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap
                         opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-[2vw] py-[0.5vh] rounded-[1vh] border-1 border-black text-[1.75vh] shadow-lg pointer-events-none"
						>
							Calendar
						</span>
					</Link>

					<Link
						href={"/profile"}
						className="relative group flex justify-center"
					>
						<CgProfile className="text-[4vh]" />
						<span
							className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap
                         opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-[2vw] py-[0.5vh] rounded-[1vh] border-1 border-black text-[1.75vh] shadow-lg pointer-events-none"
						>
							Profile
						</span>
					</Link>
				</div>

				<button
					onClick={() => signOut()}
					className="relative group flex justify-center text-[4vh] mt-auto cursor-pointer"
				>
					<MdLogout />
					<span
						className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap 
                       opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-[2vw] py-[0.5vh] rounded-[1vh] border-1 border-black text-[1.75vh] shadow-lg pointer-events-none"
					>
						Logout
					</span>
				</button>
			</div>
		</div>
	);
};

export default DoctorNavbar;
