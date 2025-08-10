import React from "react";

const formatDate = (dateStr: Date) => {
	const date = new Date(dateStr);
	return date.toLocaleString("default", { month: "short", day: "numeric" });
};

const MedicationTable = ({
	medications,
}: {
	medications: {
		id: string;
		createdAt: Date;
		title: string;
		dosage: string;
		instructions: string | null;
		startDate: Date;
		endDate: Date;
		patientId: string;
		doctorId: string;
	}[];
}) => {
	if (!medications || medications.length === 0) {
		return <p className="mt-4">No medications assigned yet.</p>;
	}

	return (
		<div className="mt-4">
			{/* Header */}
			<div className="flex font-semibold text-left border-black border-1 rounded-t-[1.5vh] overflow-hidden bg-gray-100">
				<div className="w-5/10 p-[1.5vh] pl-[2vw] border-r border-black text-[2.25vh] ">
					Name
				</div>
				<div className="w-3/10 p-[1.5vh] border-r border-black text-[2.25vh] items-center justify-center flex">
					Dates
				</div>
				<div className="w-2/10 p-[1.5vh] items-center justify-center flex text-[2.25vh]">
					Doze
				</div>
			</div>

			{/* Body */}
			<div className="border-x border-b border-black rounded-b-[1.5vh] overflow-hidden">
				{medications.map((med, index) => (
					<div key={index} className="flex text-left border-t border-black">
						<div className=" p-[1.5vh] border-r border-black text-[2.25vh] w-5/10 pl-[2vw]">
							{med.title}
						</div>
						<div className="w-3/10 p-[1.5vh] border-r border-black text-[2.25vh] items-center justify-center flex">
							{formatDate(med.startDate)} - {formatDate(med.endDate)}
						</div>
						<div className="w-2/10 p-[1.5vh] items-center justify-center flex text-[2.25vh]">
							{med.dosage}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MedicationTable;
