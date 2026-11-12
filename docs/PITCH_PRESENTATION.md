# inFON — Prezentacija za Mini-Hakaton (Tim 8)

> **Vodič i struktura za prezentaciju na mini-hakatonu | Tim 8**  
> *Događaj:* 3. krug selekcija za članove **FONIS** studentske organizacije  
> *Fakultet:* Fakultet organizacionih nauka (FON), Univerzitet u Beogradu  
> *Tagline:* *"Svi događaji na fakultetu i za rast tvoje karijere, na jednom mestu."*  

---

## 🎯 STRUKTURA PREZENTACIJE (SLAJD PO SLAJD)

Ispod se nalazi kompletan sadržaj strukturiran po slajdovima koji možete direktno preneti u Canvu ili PowerPoint, prilagođen pitching formatu pred žirijem:

---

### SLAJD 1: Naslovni slajd & Uvod
* **Naziv projekta:** inFON
* **Podnaslov:** Jedinstveni digitalni agregator događaja Fakulteta organizacionih nauka
* **Prezentuje:** Tim 8 (Trifun Đorđević, Luka Živković, Nemanja Sumrak, Mihajlo Đonović)
* **Tagline:** *"Svi događaji, jedno mesto."*
* **Ključna poruka:** Kako rešiti problem informisanosti preko 6.000 studenata FON-a u samo tri klika.

---

### SLAJD 2: 1. Problem
* **Naslov:** Šta je stvarni problem studenata FON-a?
* **Glavna teza:** FON ima najaktivniji vannastavni i studentski život u celoj Srbiji, ali **studenti svakodnevno propuštaju ključne prilike za karijeru i usavršavanje**.
* **Realnost na fakultetu:**
  - 14+ aktivnih studentskih organizacija
  - Desetine katedri, profesora i gostujućih predavača iz privrede
  - Preko 50 događaja mesečno (hakatoni, case study takmičenja, sajmovi zapošljavanja, debate, radionice)
* **Konačan ishod:** Informacioni šum u kome prosečan student FON-a sazna za hakaton, prijavu za praksu ili gostujuće predavanje tek **dan nakon što su prijave zatvorene**.

---

### SLAJD 3: 2. Struktura problema
* **Naslov:** Anatomija problema: Zašto je trenutno stanje neodrživo?
* **Četiri stuba problema:**
  1. **Fragmentacija izvora (Rasejanost informacija):**
     - Događaji se objavljuju na preko 20 različitih kanala: Instagram stranice organizacija, LinkedIn nalozi, oglasne table na fakultetu, zatvorene WhatsApp/Viber grupe, sajt FON-a i Moodle.
     - Ne postoji nijedno centralizovano mesto gde student može videti kompletnu sliku.
  2. **Asimetrija informacija među godinama:**
     - Brucoši i mlađi studenti često uopšte ne znaju koje sve organizacije postoje niti gde da traže prakse.
  3. **Problem profesora i predavača:**
     - Profesori nemaju jednostavan način da vannastavno gostujuće predavanje brzo objave van svog predmeta kako bi privukli i studente sa drugih smerova.
  4. **Nemogućnost ličnog planiranja:**
     - Zbog preklapanja termina (npr. u isto vreme hakaton i case study takmičenje), studenti ne mogu da usklade akademske obaveze sa vannastavnim aktivnostima.

---

### SLAJD 4: 3. Naše rešenje
* **Naslov:** inFON — Jedan centralni kompas za svakog studenta
* **Šta je inFON?**
  - Web platforma otvorenog pristupa koja na jednom mestu objedinjuje **sve događaje na fakultetu, u Beogradu i u Srbiji relevantne za studente FON-a**.
* **Ključne odlike rešenja:**
  - **Dostupnost svima (Nulta barijera ulaska):** Bilo koji student ili posetilac (gost) pristupa sajtu odmah, bez obavezne registracije.
  - **Sveobuhvatnost:** Prikaz svih 15 zvaničnih organizacija sa njihovim prepoznatljivim identitetom i logotipima.
  - **Dva komplementarna prikaza:**
    - *Kartični prikaz (Lista)* — za brzo pretraživanje, detalje i filtriranje.
    - *Interaktivni kalendar* — za mesečni pregled i dugoročno planiranje ispitnih rokova i vannastavnih aktivnosti.
  - **Sinhronizacija sa ličnim kalendarom:** Jednim klikom student dodaje događaj u svoj lični Google Calendar.

---

### SLAJD 5: 4. Struktura rešenja
* **Naslov:** Kako inFON funkcioniše pod haubom?
* **A. Korisnički nivo (Tri tipa korisnika):**
  1. **Gost / Student:**
     - Pregled svih događaja, pretraga, napredno filtriranje po organizacijama, tipu (hakaton, radionica, takmičenje, simpozijum) i periodu.
     - Izvoz filtriranih događaja u PDF ili CSV za štampu i evidenciju.
     - Direktan pregled lokacije (amfiteatri, računarske sale, hol nove zgrade).
  2. **Profesor (Predavač):**
     - Zaseban **Profesor panel** sa namenskim Sidebar-om.
     - Vidi isključivo svoja predavanja i panele.
     - Mogućnost brzog dodavanja novog akademskog događaja ili gostujuće panel diskusije.
  3. **Administrator:**
     - Zaseban **Admin panel** sa globalnom analitikom.
     - Pristup bazi svih događaja, uvid u sve organizacije i mogućnost moderacije.
* **B. Tehnička arhitektura (Modern & Production-Ready Stack):**
  - **Frontend:** React (Vite) + Tailwind CSS (optimizovan, odzivan za telefone i računare).
  - **Backend:** Node.js + Express REST API sa JWT autorizacijom.
  - **Baza podataka:** Relaciona PostgreSQL baza sa definisanim stranim ključevima i indeksima.

---

### SLAJD 6: 5. Naš predlog & Vrednost za FON ekosistem
* **Naslov:** Zašto inFON pobeđuje i kako donosi vrednost FON-u?
* **Vrednost za studente:**
  - Ušteda vremena: umesto pregledanja 15 Instagram profila, sve je na jednom ekranu za 5 sekundi.
  - Nikada više propušten hakaton, radionica ili rok za međunarodne prakse.
* **Vrednost za studentske organizacije:**
  - Ravnopravna vidljivost za sve organizacije (od AIESEC-a i FONIS-a do EkoFON-a i Bufonerije).
  - Veći odziv studenata i kvalitetnije prijave na projektima.
* **Vrednost za Upravu i profesore FON-a:**
  - Modernizacija komunikacije fakulteta.
  - Veća posećenost naučnih simpozijuma (SymOrg) i akademskih radionica.
* **Roadmap za budućnost:**
  - Integracija automatskog scrapovanja zvaničnih vesti fakulteta.
  - Push notifikacije na telefonu (PWA / mobilna aplikacija).
  - Mogućnost proširenja na ceo Univerzitet u Beogradu (inETF, inTMF, inEKOF).

---

### SLAJD 7: 6. Tim (Ko stoji iza projekta?)
* **Naslov:** Tim 8 — Inovacija kreirana od studenata za studente
* **Naša uloga i misija:**
  - Tim studenata FON-a koji je prepoznao svakodnevni problem svojih kolega i pretočio ga u funkcionalan, testiran softverski proizvod za samo 4 sata hakatona.
* **Članovi tima:**
  - **Trifun Đorđević**
  - **Luka Živković**
  - **Nemanja Sumrak**
  - **Mihajlo Đonović**
  *(Svi članovi su ravnopravno učestvovali u svim fazama: idejno rešenje, dizajn korisničkog interfejsa, frontend logika, backend API, modelovanje baze podataka i priprema prezentacije).*

---

### SLAJD 8: 7. Završni slajd
* **Naslov:** Hvala na pažnji!
* **Glavna poruka:** *"inFON — Svi događaji, jedno mesto."*
* **Pitanja & Odgovori:** Otvoreni smo za vaša pitanja i sugestije žirija!
* **Live Demo:** `http://localhost:5173`

---

## 🎨 KAKO DA UBACITE inFON LOGO U CANVU?

Logo aplikacije pripremljen je u dva formata u ovom repozitorijumu:

1. **Vektorski SVG format (Najviši kvalitet, bez gubitka oštrine):**
   - Fajl se nalazi na lokaciji: `inFON-logo.svg` (kao i u `frontend/public/inFON-logo.svg`).
   - U Canvi idite na **Uploads** &rarr; **Upload files** i izaberite `inFON-logo.svg`.
   - Prevucite ga direktno na slajd. Možete ga povećavati koliko god želite, slika nikada neće izgubiti oštrinu!

2. **Preuzimanje kao Transparentni PNG (1200x1200px):**
   - Otvorite fajl: **`inFON-logo-canva-export.html`** duplim klikom u vašem pregledaču.
   - Kliknite na dugme **"Preuzmi Transparentni PNG (1200px)"**.
   - Fajl `inFON-logo-canva.png` će se preuzeti u vaš Downloads folder sa prozirnom pozadinom, spreman za prevlačenje u Canvu!
