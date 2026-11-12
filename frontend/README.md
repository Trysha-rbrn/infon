# inFON — Frontend Web Aplikacija 🎨

[🇷🇸 Srpski](#srpski) | [🇬🇧 English](#english)

---

<a name="srpski"></a>
## 🇷🇸 Srpski

### Pregled
Frontend korisnički interfejs platforme **inFON** razvijen je kao moderna SPA (Single Page Application) aplikacija korišćenjem **React 18**, **Vite** i **Tailwind CSS**. 

Aplikacija poseduje **hibridnu arhitekturu (Dual-Mode)**:
- **Live API Režim:** Kada je pokrenut backend server na portu `5000`, aplikacija komunicira sa REST API-jem i čita podatke iz PostgreSQL baze.
- **Automatski Demo / Fallback Režim:** Ukoliko backend nije aktivan, frontend automatski koristi bogat lokalni set podataka (`mockData.js`) sa 16 događaja i 7 zvaničnih organizacija, omogućavajući testiranje svih funkcionalnosti bez potrebe za bazom.

---

### Ključne funkcionalnosti
- 📅 **Dva komplementarna prikaza:** Mrežni prikaz kartica događaja (Event Cards) i interaktivni mesečni kalendar (**FullCalendar**).
- 🔍 **Napredno filtriranje:** Filtriranje po studentskim organizacijama, tipu aktivnosti (hakaton, predavanje, radionica, takmičenje, panel) i datumskom opsegu.
- 📥 **Izvoz podataka:** Direktno generisanje **PDF** i **CSV** izveštaja filtriranih događaja pomoću `jspdf` i `jspdf-autotable`.
- 📆 **Dodavanje u kalendar:** Jednim klikom generisanje linka za uvoz u lični **Google Calendar**.
- 🔐 **Autentifikacija & Dashboard:** Zasebni paneli za administratore i profesore sa zaštićenim rutama.
- 📱 **Potpuna responzivnost:** Optimizovan prikaz za mobilne telefone, tablete i desktop monitore.

---

### Tehnologije
- **Biblioteka:** React 18
- **Build alat:** Vite 5
- **Stilizovanje:** Tailwind CSS 3 & PostCSS
- **Kalendar:** `@fullcalendar/react`, `@fullcalendar/daygrid`, `@fullcalendar/list`
- **Ikone:** `lucide-react`
- **Eksport:** `jspdf`, `jspdf-autotable`
- **Rad sa datumima:** `date-fns`
- **Rutiranje:** `react-router-dom` v6

---

### Instalacija i pokretanje

1. **Ulazak u frontend direktorijum i instalacija zavisnosti:**
   ```bash
   cd frontend
   npm install
   ```

2. **Pokretanje razvojnog servera:**
   ```bash
   npm run dev
   ```
   Aplikacija će se pokrenuti na: **`http://localhost:5173`**

3. **Kreiranje produkcijskog build-a:**
   ```bash
   npm run build
   ```

---

### Struktura koda

```text
frontend/src/
├── App.jsx                 # Centralno rutiranje i zaštita ruta
├── main.jsx                # Vite entry point
├── index.css               # Globalni stilovi i Tailwind direktive
├── services/
│   └── api.js              # REST API pozivi (fetchEvents, login, CRUD)
├── context/
│   └── AuthContext.jsx     # Upravljanje sesijom i korisničkim stanjem
├── data/
│   └── mockData.js         # Lokalni podaci (16 događaja, FON organizacije)
├── pages/
│   ├── Home.jsx            # Glavna stranica sa karticama i kalendarom
│   ├── Login.jsx           # Forma za prijavu (Admin / Profesor)
│   └── AdminDashboard.jsx  # Kontrolna tabla za upravljanje događajima
└── components/
    ├── Navbar.jsx          # Odzivna navigacija
    ├── EventCard.jsx       # Kartica pojedinačnog događaja sa modalom
    ├── EventList.jsx       # Grid raspored kartica
    ├── EventCalendar.jsx   # Interaktivni kalendar
    ├── FilterBar.jsx       # Višekriterijumski filteri
    ├── OrganizerBadge.jsx  # Prikaz značke organizatora
    ├── OrgLogo.jsx         # Prikaz logotipa organizacije
    ├── InfonLogo.jsx       # Zvanični inFON vektorski logo
    ├── ExportButton.jsx    # Izvoz u PDF i CSV
    ├── Footer.jsx          # Futer aplikacije sa akademskim disclaimer-om
    └── LoadingScreen.jsx   # Animacija učitavanja
```

---

### Demo Pristup

| Uloga | Email | Lozinka | Pristup |
|---|---|---|---|
| **Student / Gost** | Nije potrebna prijava | Nije potrebna prijava | Glavna stranica (`/`) |
| **Profesor** | `profesor@fon.bg.ac.rs` | `profesor123` | Profesor panel |
| **Admin** | `admin@fon.bg.ac.rs` | `admin123` | Admin panel (`/admin`) |

---
---

<a name="english"></a>
## 🇬🇧 English

### Overview
The **inFON** frontend is a high-performance Single Page Application (SPA) built with **React 18**, **Vite**, and **Tailwind CSS**. 

It features an intelligent **Dual-Mode** architecture:
- **Live Mode:** When connected to the Express backend (`http://localhost:5000/api`), it pulls and mutates live database records.
- **Standalone Fallback Mode:** When the backend is offline, the client seamlessly falls back to rich embedded seed data (`mockData.js`), allowing anyone to explore all features instantly without database setup.

---

### Key Features
- 📅 **Dual Viewports:** Responsive grid card view & monthly interactive calendar (**FullCalendar**).
- 🔍 **Multi-criteria Filtering:** Filter by student organization, event category, or date range.
- 📥 **Report Exporting:** Client-side generation of structured **PDF** and **CSV** reports.
- 📆 **Calendar Sync:** One-click integration with personal **Google Calendar**.
- 🔐 **Role-Based Views:** Dedicated dashboards for students, professors, and platform administrators.

---

### Quick Start

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Application will run at: `http://localhost:5173`
