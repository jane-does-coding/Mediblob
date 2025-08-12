# Mediblob

Demo Video: https://www.youtube.com/watch?v=6ipWNKoLJ-U

**Mediblob** is a modern medical portal that connects **patients and doctors**. It lets patients track their health in real time (symptoms, medications, appointments) while doctors monitor everything on a dashboard and can manage care plans

I made the project with Nextjs, Typescript, Javascript, Tailwind, MongoDB.

Something I struggled with while creating this project was to create different access levels, since I haven't done that before, and I've been able to complete it, though. 

---

## Features

### For Patients:

- Track symptoms with severity levels
- View prescribed medications (with dosage & instructions)
- Check upcoming appointments/events
- Secure chat and video calls with your doctor

### For Doctors:

- Dashboard to manage all connected patients
- Assign medications
- Schedule events (in-person or online)
- See patient progress & history at a glance

### Shared Features:

- **Calendar & scheduling** (real-time)
- **Mediblob AI assistant** (suggestions / insights)
- **Connections system** (doctor–patient relationships)
- Authentication system (patient/doctor login)

---

## Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **Prisma ORM** with **MongoDB** (Atlas)
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **react-big-calendar** for calendar UI
- **NextAuth** (or custom auth) for authentication

---

## Data Models (Prisma)

The main entities:

- **User**: Doctors and Patients (differentiated by `access`)
- **Connection**: Links doctor to patient
- **Symptom**: Symptom logs with severity
- **Medication**: Prescriptions and assignments
- **Event**: Appointments (in-person/online)

### Key Enums

- `SymptomLevel`: `mild`, `severe`
- `EventType`: `inperson`, `online`

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/jane-does-coding/Mediblob
cd mediblob
```

### 2. Install the dependencies

```bash
npm i
```

### 3. Configure .env

```bash
DATABASE_URL="your mongodb"
NEXTAUTH_SECRET="random-secret"
```

### 4. Setup Prisma

```bash
npx prisma generate
```

### 4. Run the project

```bash
npm run dev
```


[![Athena Award Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Faward.athena.hackclub.com%2Fapi%2Fbadge)](https://award.athena.hackclub.com?utm_source=readme)
