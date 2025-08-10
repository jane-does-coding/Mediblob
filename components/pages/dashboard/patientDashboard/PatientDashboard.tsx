"use client";
import PatientNavbar from "./PatientNavbar";
import Heading from "../Heading";
import MediblobChat from "./MediblobChat";
import { SafeUser } from "@/app/types/SafeUser";
import SymptomsView from "../../doctorPatientView/SymptomsView";
import SymptomForm from "./SymptomForm";
import DoctorProfilePriview from "./DoctorProfilePriview";
import MedicationTable from "@/components/MedicationTable";
import EventsList from "../EventsList";
import useEventModal from "@/app/hooks/useEventModal";
import NextEventWarning from "../NextEventWarning";
import NoPatients from "../../doctorPatients/NoPatients";

const PatientDashboard = ({ currentUser }: { currentUser: SafeUser }) => {
	const createEventModal = useEventModal();
	const hasUsers = currentUser.connectedUsers.length > 0;

	return (
		<div className="flex">
			<PatientNavbar />

			{hasUsers ? (
				<>
					<div className="w-[93.5vw] flex py-[5vh] px-[4vw]">
						<div className="w-7/10 pr-[3vw]">
							<Heading />

							<h1 className="mt-[2vh]">
								{currentUser.name}, {currentUser.access}
							</h1>
							<NextEventWarning currentUser={currentUser} />

							<SymptomsView user={currentUser} />
							<SymptomForm user={currentUser} />
							<h2 className="text-[3.5vh] font-light mt-[4vh]">Medications</h2>

							<MedicationTable
								medications={currentUser.prescribedMedications || []}
							/>
							<DoctorProfilePriview user={currentUser} />
						</div>
						<div className="w-3/10">
							<MediblobChat currentUser={currentUser} />
							<h2 className="text-[5vh] mt-[3vh] pb-[1vh] border-b-2 border-neutral-300">
								Events
							</h2>
							<button
								className="w-full bg-neutral-100 border-2 border-neutral-200 rounded-[2vh] py-[1vh] mt-[2vh] mb-[2vh] cursor-pointer"
								onClick={() => createEventModal.onOpen(currentUser.id)}
							>
								Create an Event +
							</button>
							<EventsList currentUser={currentUser} />
						</div>
					</div>
				</>
			) : (
				<div className="w-[93.5vw] flex py-[5vh] px-[4vw]">
					<div className="w-17/20 pr-[3vw]">
						<Heading />
						<h1 className="mt-[2vh]">
							{currentUser.name}, {currentUser.access}
						</h1>
						<NoPatients />
					</div>
				</div>
			)}
		</div>
	);
};

export default PatientDashboard;
