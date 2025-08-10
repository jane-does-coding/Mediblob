# MediBlob

_A shared medical tracking portal that connects patients and doctors through smart logging, reminders, and secure real-time updates._

---

[![My Skills](https://skillicons.dev/icons?i=html,css,ts,tailwind,mongodb,react,nextjs,prisma)](https://skillicons.dev)

---

## 👥 User Roles

### 👩‍⚕️ Doctor Dashboard

- ✅ Add/remove patients via **Patient Code**
- ✅ View patient logs: pills, symptoms, feelings
- ✅ Set _mandatory tracking items_ per patient:
  - Medications with reminders
  - Required daily symptom check-ins (e.g., nausea, pain level)
- ✅ Start **video call** (Zoom-style) directly in the portal
- ✅ Write treatment plan or appointment notes

### 🧍 Patient Portal

- ✅ Enter with **unique profile code**
- ✅ Track:
  - Medication taken (with daily reminders)
  - Symptoms (doctor-mandated + patient-added)
  - Mood/wellbeing (scale + text)
- ✅ Blob reacts to health condition changes
- ✅ Join scheduled **online appointments**
- ✅ View or export treatment plans

---

## 🧱 Full Functionality List

### 👩‍⚕️ Doctor Features

| Feature                | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| Add/Remove Patients    | Use unique profile code to connect/disconnect users   |
| View Patient Logs      | Access symptoms, mood, meds daily                     |
| Assign Mandatory Tasks | Set required logs: symptoms, pills, etc.              |
| Video Call Scheduling  | Launch secure meetings with selected patients         |
| Write Treatment Plans  | Save advice, notes, or diagnoses per patient          |
| Patient List + Flags   | Overview of all patients with alerts & statuses       |
| Alert System           | Get notified if critical symptoms or missed check-ins |

### 🧍 Patient Features

| Feature               | Description                                    |
| --------------------- | ---------------------------------------------- |
| Login via Code        | Access profile using unique, private code      |
| Symptom Logging       | Record doctor-set + personal symptoms          |
| Medication Tracking   | Daily check-off with reminders                 |
| Mood/Wellbeing Entry  | Scale, text input for overall feeling          |
| Custom Symptom Fields | Add extra symptoms not assigned by doctor      |
| View Treatment Plan   | Read doctor’s advice, notes, or updates        |
| Blob Interaction      | See blob change based on your health trends 🐸 |
| Join Appointments     | Enter scheduled video meeting with doctor      |
| Health Log History    | Review or download past entries                |
| Missed Log Warnings   | See when you forget tasks with alert banners   |

---

## ✨ Judging Criteria Breakdown

| Category          | How MediBlob Scores High                                         |
| ----------------- | ---------------------------------------------------------------- |
| **Functionality** | Real-time health logs, secure roles, video call integration      |
| **Innovation**    | Doctor-controlled tracking, patient-driven symptom logs, blob UX |
| **Scalability**   | Modular architecture, API-ready, HIPAA potential                 |
| **Design + UX**   | Friendly blob UI meets structured medical layout                 |

---

## 📄 Page List Overview

| Route                     | Description                               |
| ------------------------- | ----------------------------------------- |
| `/login`                  | Choose role and enter profile code        |
| `/doctor`                 | Dashboard with patient list and alerts    |
| `/doctor/[patientCode]`   | View/edit individual patient logs & plan  |
| `/doctor/schedule`        | Schedule meetings                         |
| `/patient/[code]`         | Main patient dashboard                    |
| `/patient/[code]/plan`    | View treatment plan + history             |
| `/patient/[code]/meeting` | Join appointment room                     |
| `/meeting/[roomId]`       | Live video room shared between both roles |
| `/admin/setup`            | (Optional) Doctor account setup           |
| `/404`                    | Custom 404 for invalid codes              |

---

## 🧠 AI Prompt (Medical Summary)

```ts
const prompt = `
Based on the following data, summarize the patient's condition and suggest any non-critical recommendations.

Symptoms: fatigue, dizziness, mild nausea  
Vitals: heart rate - 105 bpm, blood pressure - 135/90, temp - 99.8°F  
Medications: ibuprofen  
Notes: "I've felt off all day, lightheaded and tired."

Your summary should be clear, supportive, and medically relevant.
`;
```
