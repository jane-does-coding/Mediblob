const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// Helper for random pick
function randomChoice(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
function randomDateBetween(start, end) {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
}

const medicationOptions = [
	"Ibuprofen",
	"Vitamin D",
	"Metformin",
	"Lisinopril",
	"Levothyroxine",
	"Atorvastatin",
	"Omeprazole",
	"Sertraline",
	"Amoxicillin",
];

const symptomOptions = [
	"Headache",
	"Fatigue",
	"Cough",
	"Nausea",
	"Joint pain",
	"Anxiety",
	"Depression",
	"Back pain",
	"Dizziness",
	"Insomnia",
];

const eventNotes = [
	"Routine check-up",
	"Follow-up after surgery",
	"Monthly consultation",
	"Discuss test results",
	"New symptoms evaluation",
	"Treatment adjustment",
];

async function main() {
	await prisma.event.deleteMany();
	await prisma.medication.deleteMany();
	await prisma.symptom.deleteMany();
	await prisma.connection.deleteMany();
	await prisma.user.deleteMany();

	const doctorPassword = await bcrypt.hash("password123", 10);
	const patientPasswords = {
		liam: await bcrypt.hash("liampass", 10),
		ava: await bcrypt.hash("avapass", 10),
		noah: await bcrypt.hash("noahpass", 10),
		sophia: await bcrypt.hash("sophiapass", 10),
	};

	const doctor = await prisma.user.create({
		data: {
			name: "Dr. Emily Carter",
			username: "emilyMD",
			access: "doctor",
			bio: "Experienced neurologist with 12+ years in patient care. Passionate about modern medicine and personalized treatment.",
			tagline: "Healing one neuron at a time.",
			yearsInField: 12,
			Degree: "MD",
			code: "DR123456",
			email: "emily@example.com",
			hashedPassword: doctorPassword,
		},
	});

	const patients = await Promise.all([
		prisma.user.create({
			data: {
				name: "Liam Chen",
				username: "liamc",
				access: "patient",
				code: "PT10001",
				email: "liam@example.com",
				hashedPassword: patientPasswords.liam,
			},
		}),
		prisma.user.create({
			data: {
				name: "Ava Patel",
				username: "ava_p",
				access: "patient",
				code: "PT10002",
				email: "ava@example.com",
				hashedPassword: patientPasswords.ava,
			},
		}),
		prisma.user.create({
			data: {
				name: "Noah Smith",
				username: "noah_s",
				access: "patient",
				code: "PT10003",
				email: "noah@example.com",
				hashedPassword: patientPasswords.noah,
			},
		}),
		prisma.user.create({
			data: {
				name: "Sophia Kim",
				username: "soph_kim",
				access: "patient",
				code: "PT10004",
				email: "sophia@example.com",
				hashedPassword: patientPasswords.sophia,
			},
		}),
	]);

	await Promise.all(
		patients.map((patient) =>
			prisma.connection.create({
				data: {
					fromId: doctor.id,
					toId: patient.id,
				},
			})
		)
	);

	const now = new Date();
	const startRange = new Date("2025-07-01");
	const endRange = new Date("2025-12-31");

	for (const patient of patients) {
		// 2 to 7 medications
		const medCount = 2 + Math.floor(Math.random() * 6);
		const medsData = Array.from({ length: medCount }, () => {
			const title = randomChoice(medicationOptions);
			const startDate = randomDateBetween(startRange, new Date("2025-08-15"));
			const endDate = randomDateBetween(new Date("2025-08-16"), endRange);

			return {
				title,
				dosage: `${100 + Math.floor(Math.random() * 900)}mg`,
				instructions: "Take as directed",
				startDate,
				endDate,
				doctorId: doctor.id,
				patientId: patient.id,
			};
		});

		await prisma.medication.createMany({ data: medsData });

		// 3 to 8 symptoms
		const symptomCount = 3 + Math.floor(Math.random() * 6);
		const symptomsData = Array.from({ length: symptomCount }, () => ({
			symptom: randomChoice(symptomOptions),
			level: Math.random() > 0.5 ? "mild" : "severe",
			userId: patient.id,
		}));

		await prisma.symptom.createMany({ data: symptomsData });

		// 2 to 6 events, random dates
		const eventCount = 2 + Math.floor(Math.random() * 5);
		const eventsData = Array.from({ length: eventCount }, () => {
			const dateTime = randomDateBetween(startRange, endRange);
			return {
				type: Math.random() > 0.5 ? "online" : "inperson",
				zoomLink: `https://zoom.us/fake-room-${patient.id}`,
				dateTime,
				notes: randomChoice(eventNotes),
				doctorId: doctor.id,
				patientId: patient.id,
			};
		});

		await prisma.event.createMany({ data: eventsData });
	}
}

main()
	.then(() => {
		console.log(
			"✅ Seed complete with random medications, symptoms, and events!"
		);
		return prisma.$disconnect();
	})
	.catch((err) => {
		console.error("❌ Seed failed: ", err);
		return prisma.$disconnect();
	});
