# inFON — Backend REST API 🚀

[🇷🇸 Srpski](#srpski) | [🇬🇧 English](#english)

---

<a name="srpski"></a>
## 🇷🇸 Srpski

### Pregled
Backend servis za **inFON** platformu razvijen je pomoću **Node.js** i **Express** okruženja, uz relacionu **PostgreSQL** bazu podataka. Pruža kompletan RESTful API za autentifikaciju sa JWT tokenima, upravljanje događajima, organizacijama i korisnicima sa definisanim nivoima pristupa (Role-Based Access Control).

### Tehnologije
- **Runtime:** Node.js (v18+)
- **Web Framework:** Express 5
- **Baza podataka:** PostgreSQL
- **Klijent za bazu:** `pg` (node-postgres connection pool)
- **Autentifikacija:** JSON Web Tokens (`jsonwebtoken`) i `bcryptjs` za heširanje lozinki
- **Sigurnost i CORS:** `cors`, `dotenv`

---

### Preduslovi
- **Node.js** (v18 ili noviji)
- **PostgreSQL** (v14 ili noviji) pokrenut lokalno ili na cloud-u

---

### Instalacija i pokretanje

1. **Ulazak u direktorijum i instalacija zavisnosti:**
   ```bash
   cd backend
   npm install
   ```

2. **Konfiguracija promenljivih okruženja:**
   Kopirajte primer konfiguracije u `.env`:
   ```bash
   cp .env.example .env
   ```
   *Prilagodite parametre u `.env` fajlu ukoliko se vaša lokalna PostgreSQL baza razlikuje.*

3. **Inicijalizacija i popunjavanje baze (Seed):**
   ```bash
   npm run seed
   ```
   *Ova skripta kreira tabele iz `db/schema.sql`, ubacuje sve zvanične organizacije FON-a, test naloge i autentične događaje.*

4. **Pokretanje servera:**
   ```bash
   # Razvojni režim (sa nodemon automatskim osvežavanjem):
   npm run dev

   # Produkcijski režim:
   npm start
   ```
   Server podrazumevano radi na: `http://localhost:5000`

---

### API Rute

| Metoda | Endpoint | Opis | Nivo pristupa |
|---|---|---|---|
| `GET` | `/api/health` | Status servera i provera rada | Javno |
| `POST` | `/api/auth/login` | Prijava korisnika i dobijanje JWT tokena | Javno |
| `GET` | `/api/events` | Lista svih događaja (filteri: `organizerId`, `type`, `dateFrom`, `dateTo`) | Javno |
| `GET` | `/api/events/:id` | Detalji pojedinačnog događaja | Javno |
| `POST` | `/api/events` | Kreiranje novog događaja | Profesor, Admin |
| `PUT` | `/api/events/:id` | Izmena postojećeg događaja | Profesor (svoj), Admin |
| `DELETE` | `/api/events/:id` | Brisanje događaja | Profesor (svoj), Admin |
| `GET` | `/api/organizers` | Lista svih registrovanih organizacija | Javno |
| `GET` | `/api/organizers/:id` | Detalji organizacije sa njenim događajima | Javno |
| `POST` | `/api/organizers` | Dodavanje nove organizacije | Admin |
| `GET` | `/api/users` | Pregled svih korisnika sistema | Admin |
| `POST` | `/api/users` | Kreiranje novog korisnika | Admin |

---

### Demo Nalozi (Seeded)

| Uloga | Email | Lozinka | Dozvole |
|---|---|---|---|
| **Administrator** | `admin@fon.bg.ac.rs` | `admin123` | Upravljanje svim događajima, organizacijama i korisnicima |
| **Profesor** | `profesor@fon.bg.ac.rs` | `profesor123` | Dodavanje i uređivanje predavanja, radionica i akademskih panela |

---
---

<a name="english"></a>
## 🇬🇧 English

### Overview
The backend service for the **inFON** platform is built using **Node.js** and **Express**, backed by a relational **PostgreSQL** database. It exposes a complete RESTful API supporting JWT-based authentication, event aggregation, organization management, and Role-Based Access Control (RBAC).

### Tech Stack
- **Runtime:** Node.js (v18+)
- **Framework:** Express 5
- **Database:** PostgreSQL
- **Database Client:** `pg` (node-postgres connection pool)
- **Security & Auth:** `jsonwebtoken` (JWT), `bcryptjs`, `cors`, `dotenv`

---

### Prerequisites
- **Node.js** (v18+)
- **PostgreSQL** instance running locally or hosted

---

### Installation & Quick Start

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```

3. **Seed Database:**
   ```bash
   npm run seed
   ```
   *Applies `db/schema.sql`, populates FON student organizations, demo accounts, and sample events.*

4. **Start the API server:**
   ```bash
   # Development mode (with live reload):
   npm run dev

   # Production mode:
   npm start
   ```
   Server listens at `http://localhost:5000`

---

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Port on which the Express server listens |
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_NAME` | `infon_db` | PostgreSQL database name |
| `DB_USER` | `postgres` | Database user |
| `DB_PASSWORD` | `postgres` | Database password |
| `JWT_SECRET` | `infon_super_secret_jwt_key_2026` | Secret key for signing JWT tokens |
