<div align="center">

# 🎓 inFON — Centralna digitalna platforma događaja FON-a
### *Centralized Digital Platform for Student & Academic Events*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.0-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Hackathon](https://img.shields.io/badge/FONIS-Mini--Hakaton_2026-004B7C?style=for-the-badge)](https://fonis.rs/)

<br />

**"Svi događaji, jedno mesto."**  
*All faculty events, competitions, workshops, and career opportunities in one unified compass.*

---

[🇷🇸 Srpski jezik](#-srpski) • [🇬🇧 English language](#-english)

---

</div>

<a name="-srpski"></a>
## 🇷🇸 Srpski

### 📌 O Projektu

**inFON** je moderna web platforma otvorenog pristupa koja na jednom mestu objedinjuje sve studentske, akademske i karijerne događaje na **Fakultetu organizacionih nauka (FON)** Univerziteta u Beogradu.

Aplikacija je nastala kao odgovor na problem informacionog šuma i prevelike fragmentacije obaveštenja. Na FON-u deluje preko 14 studentskih organizacija i desetine katedri koje mesečno organizuju više od 50 konferencija, radionica, hakatona i gostujućih predavanja. Zbog rasutosti informacija po različitim društvenim mrežama (Instagram, LinkedIn, zatvorene grupe, sajt fakulteta, Moodle), studenti često saznaju za prilike tek kada prođu rokovi za prijavu.

**inFON** rešava ovaj problem pružajući studentima uvid u celokupni ekosistem fakulteta za svega nekoliko sekundi, bez potrebe za obaveznom registracijom.

---

### 🏆 Kontekst nastanka projekta (FONIS Selekcije)

Ova aplikacija i kompletno rešenje razvijeni su tokom **mini-hakatona** u okviru **III kruga selekcija za prijem novih članova u studentsku organizaciju [FONIS](https://fonis.rs/)** (Udruženje studenata informatike Fakulteta organizacionih nauka) na Fakultetu organizacionih nauka, Univerzitet u Beogradu.

Kompletan softverski prototip — od definisanja korisničkog iskustva, modelovanja relacione baze podataka, implementacije REST API-ja, do interaktivnog React interfejsa — osmišljen je i realizovan za svega **4 sata timskog rada**.

---

### 👥 Tim 8 (Autori projekta)

Svi članovi tima ravnopravno su učestvovali u svim fazama projekta — od ideacije, dizajna, frontend logike, backend servisa, modelovanja baze, do pitch prezentacije:

* 👨‍💻 **Trifun Đorđević** — [@Trysha-rbrn](https://github.com/Trysha-rbrn)
* 👨‍💻 **Luka Živković** — *[GitHub profil uskoro]*
* 👨‍💻 **Nemanja Sumrak** — *[GitHub profil uskoro]*
* 👨‍💻 **Mihajlo Đonović** — *[GitHub profil uskoro]*

> 💡 *Kompletan vodič kroz slajdove i pitch prezentaciju pripremljenu za žiri hakatona sačuvan je u [docs/PITCH_PRESENTATION.md](file:///home/trifun/Desktop/github/infon/docs/PITCH_PRESENTATION.md).*

---

### ✨ Ključne funkcionalnosti

1. **Dva komplementarna prikaza:**
   - **Mrežni prikaz (Grid / Kartice):** Brz pregled sa bedževima organizacija, lokacijom (amfiteatri, čitaonice, sale nove zgrade) i odbrojavanjem.
   - **Interaktivni kalendar (FullCalendar):** Mesečni pregled koji studentima omogućava jednostavno usklađivanje predispitnih i vannastavnih obaveza.
2. **Višekriterijumsko filtriranje:**
   - Filtriranje po studentskim organizacijama (FONIS, ESTIEM, AIESEC, Case Study Club, SSFON, Parlament...).
   - Filtriranje po tipu događaja (hakaton, radionica, takmičenje, predavanje, panel).
   - Filtriranje po vremenskom periodu (danas, ova nedelja, ovaj mesec).
3. **Pametna Dual-Mode arhitektura (Zero-Setup Demo):**
   - **Live API režim:** Komunikacija sa Express serverom i PostgreSQL bazom.
   - **Automatski Fallback režim:** Ako backend ili baza nisu aktivni, frontend automatski servira lokalne mock podatke sa 16 autentičnih događaja i svim zvaničnim organizacijama.
4. **Sinhronizacija i eksport:**
   - **Google Calendar:** Dodavanje odabranog događaja u lični kalendar jednim klikom.
   - **PDF & CSV Export:** Preuzimanje filtriranih događaja za štampu ili evidenciju (`jspdf-autotable`).
5. **Autentifikacija i diferencirani paneli:**
   - **Gost / Student:** Nulta barijera — pristup bez prijave.
   - **Profesor:** Namenski panel za dodavanje akademskih predavanja i radionica.
   - **Administrator:** Centralna kontrolna tabla sa analitikom i moderacijom svih događaja.

---

### 🛠️ Tehnički stack

| Sloj | Tehnologije |
|---|---|
| **Frontend** | React 18, Vite 5, Tailwind CSS, FullCalendar, Lucide Icons, Date-fns, jsPDF |
| **Backend** | Node.js, Express 5, JSON Web Tokens (JWT), Bcrypt.js, CORS, Dotenv |
| **Baza podataka** | PostgreSQL 14+ (`pg` connection pool, relacioni model, indeksi) |
| **Dizajn & Vizuelni identitet** | Vektorski inFON logo (`inFON-logo.svg`), Canva export alat |

---

### 🚀 Uputstvo za pokretanje

#### 1. Kloniranje repozitorijuma
```bash
git clone https://github.com/Trysha-rbrn/infon.git
cd infon
```

#### 2. Pokretanje Frontenda (Odmah radi u Demo režimu!)
```bash
cd frontend
npm install
npm run dev
```
Aplikacija je dostupna na: **`http://localhost:5173`**

#### 3. Pokretanje Backenda (Opciono, za Live API)
```bash
cd backend
npm install
cp .env.example .env
npm run seed     # Inicijalizuje tabele i ubacuje testne podatke u PostgreSQL
npm run dev      # Pokreće Express server na portu 5000
```

#### 🔑 Test nalozi za prijavu:
* **Administrator:** `admin@fon.bg.ac.rs` / `admin123` (pristup na `/admin`)
* **Profesor:** `profesor@fon.bg.ac.rs` / `profesor123`
* **Student:** Otvoren pristup početnoj stranici bez prijave.

---

### ⚖️ Pravna napomena i odricanje odgovornosti (Disclaimer)

> [!NOTE]
> **inFON** je nezavisni, neprofitni studentski open-source projekat razvijen u akademske svrhe u okviru internog mini-hakatona za selekciju članova studentske organizacije FONIS.  
> 
> Projekat **nije** zvanično glasilo, zvanični softver niti pravno zastupništvo Fakulteta organizacionih nauka (FON) Univerziteta u Beogradu.  
> Svi zvanični nazivi fakulteta, studentskih organizacija, kao i njihovi logotipi, intelektualna su svojina njihovih nosilaca prava i u ovom projektu se koriste isključivo deskriptivno i u obrazovno-demonstracione svrhe (fair use).

---
---

<a name="-english"></a>
## 🇬🇧 English

### 📌 Overview

**inFON** is a modern, open-access web application created to centralize all student, academic, and career opportunities at the **Faculty of Organizational Sciences (FON)**, University of Belgrade.

The project directly addresses the challenge of information fragmentation. With more than 14 active student organizations and numerous academic departments organizing over 50 monthly events (hackathons, case study competitions, job fairs, workshops, lectures), students frequently miss opportunities simply because announcements are scattered across Instagram stories, LinkedIn, WhatsApp groups, and varied faculty boards.

**inFON** provides a centralized, single-glance compass accessible to any student in seconds without friction or mandatory account creation.

---

### 🏆 Hackathon Context & Background

This project was ideated, designed, and engineered during a **mini-hackathon** conducted as part of the **3rd selection round for prospective members of the [FONIS](https://fonis.rs/) student organization** (Faculty of Organizational Sciences Information Systems Association) in Belgrade.

The entire end-to-end prototype — including UX design, relational PostgreSQL schema modeling, Express RESTful API implementation, and a reactive Tailwind/React client — was completed in **just 4 hours of collaborative teamwork**.

---

### 👥 Team 8 (Authors)

All team members contributed across the entire stack (Full-Stack architecture, UI/UX design, database engineering, and presentation pitch):

* 👨‍💻 **Trifun Đorđević** — [@Trysha-rbrn](https://github.com/Trysha-rbrn)
* 👨‍💻 **Luka Živković** — *[GitHub profile pending]*
* 👨‍💻 **Nemanja Sumrak** — *[GitHub profile pending]*
* 👨‍💻 **Mihajlo Đonović** — *[GitHub profile pending]*

> 💡 *The complete presentation pitch deck structured slide-by-slide for the hackathon jury is preserved in [docs/PITCH_PRESENTATION.md](file:///home/trifun/Desktop/github/infon/docs/PITCH_PRESENTATION.md).*

---

### ✨ Core Features

* 📅 **Dual Viewports:** Card-based overview with countdown badges and interactive monthly calendar powered by **FullCalendar**.
* 🔍 **Multi-criteria Filtering:** Filter by student organization (FONIS, ESTIEM, AIESEC, Case Study Club, SSFON, etc.), category (hackathons, lectures, workshops, panels), or date ranges.
* ⚡ **Zero-Config Dual-Mode:** Runs out-of-the-box using built-in mock data if backend/PostgreSQL is offline, and smoothly switches to real-time REST API when the backend is active.
* 📆 **Google Calendar Sync:** One-click generation of personalized Google Calendar entries.
* 📥 **Export to PDF & CSV:** Export filtered event agendas for printing and archiving using client-side `jspdf-autotable`.
* 🔐 **Role-Based Authorization:** Separate dashboards with JWT authentication for Students/Guests, Faculty Professors, and System Admins.

---

### 🚀 Getting Started

#### 1. Clone repository
```bash
git clone https://github.com/Trysha-rbrn/infon.git
cd infon
```

#### 2. Run Frontend (Runs immediately with mock data)
```bash
cd frontend
npm install
npm run dev
```
Client starts at: **`http://localhost:5173`**

#### 3. Run Backend (Optional, for full REST API)
```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```
Backend API starts at: **`http://localhost:5000`**

---

### ⚖️ Legal Disclaimer & Trademark Notice

> [!NOTE]
> **inFON** is an independent, non-commercial open-source student project developed for educational and portfolio purposes during a student hackathon (FONIS selection round).  
> 
> This platform is **not** an official product or service of the Faculty of Organizational Sciences (FON), University of Belgrade. All university emblems, student organization names, and trademarks belong to their respective proprietors and are displayed strictly for educational, informational, and demonstration purposes.

---

### 📂 Repository Structure

```text
infon/
├── docs/
│   └── PITCH_PRESENTATION.md # Original hackathon pitch slides
├── backend/
│   ├── db/                   # PostgreSQL schema (schema.sql, pool.js)
│   ├── middleware/           # JWT authentication and RBAC guards
│   ├── routes/               # REST API endpoints (auth, events, organizers, users)
│   ├── seed.js               # Database seeding script with authentic FON data
│   ├── server.js             # Express entry point
│   └── README.md             # Detailed backend guide & API docs
├── frontend/
│   ├── public/logos/         # Official organizer logos
│   ├── src/                  # React components, pages, context, and services
│   └── README.md             # Detailed frontend architecture & usage guide
├── inFON-logo.svg            # Official vector project logo
├── inFON-logo-canva-export.html # Utility for 1200px transparent PNG export
├── .gitignore                # Comprehensive Git ignore rules
└── README.md                 # Root documentation (this file)
```
