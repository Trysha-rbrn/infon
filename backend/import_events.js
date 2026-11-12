const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'infon_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

const organizations = [
  {
    name: 'Studentski parlament FON-a',
    short_name: 'Parlament',
    description: 'Predstavničko telo koje koordinira rad studentskih organizacija i štiti interese studenata.',
    website: 'https://parlament.fon.bg.ac.rs',
    color: '#004B7C',
    logo_initials: 'PAR',
  },
  {
    name: 'Savez studenata FON-a (SSFON)',
    short_name: 'SSFON',
    description: 'Krovna organizacija koja zastupa studentska prava i organizuje projekte poput Dana prakse i Konferencije studenata.',
    website: 'https://ssfon.org.rs',
    color: '#D90429',
    logo_initials: 'SSF',
  },
  {
    name: 'Debatni klub FON-a',
    short_name: 'DK FON',
    description: 'Fokusiran na razvoj kritičkog mišljenja, javnog nastupa i veština govorništva.',
    website: 'https://www.fon.bg.ac.rs',
    color: '#7209B7',
    logo_initials: 'DEB',
  },
  {
    name: 'EkoFON',
    short_name: 'EkoFON',
    description: 'Studentska ekološka organizacija koja promoviše održivi razvoj i ekološku svest.',
    website: 'https://www.fon.bg.ac.rs',
    color: '#2D6A4F',
    logo_initials: 'EKO',
  },
  {
    name: 'ESTIEM LG Belgrade',
    short_name: 'ESTIEM',
    description: 'Evropsko udruženje studenata industrijskog inženjerstva i menadžmenta, fokusirano na saradnju sa institucijama širom Evrope.',
    website: 'https://estiem.org.rs',
    color: '#2A9D8F',
    logo_initials: 'EST',
  },
  {
    name: 'AIESEC',
    short_name: 'AIESEC',
    description: 'Međunarodna studentska organizacija fokusirana na međunarodnu razmenu i liderstvo.',
    website: 'https://aiesec.org.rs',
    color: '#037EF3',
    logo_initials: 'AIE',
  },
  {
    name: 'Case Study Club BCA',
    short_name: 'CSC BCA',
    description: 'Organizacija posvećena rešavanju poslovnih studija slučaja i učešću na globalnim takmičenjima.',
    website: 'https://casestudyclub.fon.bg.ac.rs',
    color: '#B5179E',
    logo_initials: 'CSC',
  },
  {
    name: 'FON-ov centar za razvoj karijere',
    short_name: 'CzRK FON',
    description: 'Organizacija za profesionalno usmeravanje, stručno usavršavanje i zapošljavanje studenata.',
    website: 'https://czrk.fon.bg.ac.rs',
    color: '#0077B6',
    logo_initials: 'CZR',
  },
  {
    name: 'FONIS',
    short_name: 'FONIS',
    description: 'Udruženje studenata informatike koje organizuje hakatone, radionice i priprema studente za IT karijere.',
    website: 'https://fonis.rs',
    color: '#1D3557',
    logo_initials: 'FNS',
  },
  {
    name: 'SportFON',
    short_name: 'SportFON',
    description: 'Sportsko društvo koje okuplja studente radi bavljenja fizičkim aktivnostima i sportskih turnira.',
    website: 'https://www.fon.bg.ac.rs',
    color: '#023E8A',
    logo_initials: 'SPO',
  },
  {
    name: 'F Digital',
    short_name: 'F Digital',
    description: 'Organizacija nastala 2022. godine koja povezuje mlade sa digitalnom industrijom kroz projekte poput DigiHack i Future Leader.',
    website: 'https://www.fon.bg.ac.rs',
    color: '#4361EE',
    logo_initials: 'FDI',
  },
  {
    name: 'Marketing Workshop',
    short_name: 'MW',
    description: 'Organizacija fokusirana na marketing, komunikacije i brendiranje.',
    website: 'https://www.fon.bg.ac.rs',
    color: '#F77F00',
    logo_initials: 'MWS',
  },
  {
    name: 'Boffonerya',
    short_name: 'Boffonerya',
    description: 'Kulturno-umetnička organizacija koja spaja umetničku praksu i kulturni aktivizam.',
    website: 'https://www.fon.bg.ac.rs',
    color: '#E76F51',
    logo_initials: 'BOF',
  },
  {
    name: 'Unija studenata FON-a (SUFON)',
    short_name: 'SUFON',
    description: 'Organizacija posvećena zaštiti studentskih prava, edukativnim projektima i humanitarnom radu.',
    website: 'https://usfon.rs',
    color: '#3A0CA3',
    logo_initials: 'SUF',
  },
  {
    name: 'FON Fakultet (Vesti FON)',
    short_name: 'FON',
    description: 'Fakultet organizacionih nauka Univerziteta u Beogradu - zvanične akademske vesti, simpozijumi i predavanja.',
    website: 'https://www.fon.bg.ac.rs',
    color: '#003F7F',
    logo_initials: 'FON',
  },
];

const eventsData = [
  {
    title: 'Sajam studentskih organizacija FON-a 2026',
    date: '2026-11-16T10:00:00',
    endDate: '2026-11-16T16:00:00',
    type: 'Sajam organizacija',
    organizerName: 'Studentski parlament FON-a',
    location: 'Hol nove zgrade, FON',
    description: 'Zvanično predstavljanje svih 14 studentskih organizacija FON-a brucošima i svim studentima uz mogućnost učlanjenja i regrutacije.',
  },
  {
    title: 'Otvorena sednica Parlamenta i Tribina sa studentima',
    date: '2026-11-17T14:00:00',
    endDate: '2026-11-17T16:30:00',
    type: 'Tribina / Diskusija',
    organizerName: 'Studentski parlament FON-a',
    location: 'Amfiteatar B, FON',
    description: 'Javna tribina o izmenama studijskih programa, rasporedu ispitnih rokova, uslovima upisa i pitanjima studentskog standarda.',
  },
  {
    title: 'Dani prakse 2026',
    date: '2026-11-18T09:00:00',
    endDate: '2026-11-19T17:00:00',
    type: 'Sajam karijere / Radionice',
    organizerName: 'Savez studenata FON-a (SSFON)',
    location: 'Hol nove zgrade i Amfiteatar A, FON',
    description: 'Krovni karijerni sajam na FON-u. Predstavljanje vodećih kompanija, stručne prakse, radionice pisanja CV-ja i brzi intervjui (Speed Dating).',
  },
  {
    title: 'Debatna radionica: Veštine javnog nastupa i argumentacije',
    date: '2026-11-20T16:00:00',
    endDate: '2026-11-20T18:00:00',
    type: 'Radionica',
    organizerName: 'Debatni klub FON-a',
    location: 'Sala 101, FON',
    description: 'Praktičan trening prevazilaženja treme, pravilnog strukturiranja govora i uverljivog javnog nastupa za studente svih godina.',
  },
  {
    title: 'EkoRadionica: Održivi razvoj i cirkularna ekonomija',
    date: '2026-11-21T12:00:00',
    endDate: '2026-11-21T14:30:00',
    type: 'Radionica / Predavanje',
    organizerName: 'EkoFON',
    location: 'Sala 103, FON',
    description: 'Edukativna radionica o primeni principa održivog razvoja, smanjenju ugljeničnog otiska i zelenim poslovnim modelima.',
  },
  {
    title: 'T.E.A.M. Work (Times ESTIEM Local Qualification)',
    date: '2026-11-22T09:00:00',
    endDate: '2026-11-22T18:00:00',
    type: 'Takmičenje / Case Study',
    organizerName: 'ESTIEM LG Belgrade',
    location: 'Sala 104, FON',
    description: 'Lokalna kvalifikaciona runda evropskog takmičenja u rešavanju inženjerskih i menadžerskih problema za studente FON-a.',
  },
  {
    title: 'Global Talent & Global Volunteer Info Dan',
    date: '2026-11-23T11:00:00',
    endDate: '2026-11-23T14:00:00',
    type: 'Info dan / Sajam',
    organizerName: 'AIESEC',
    location: 'Hol nove zgrade, FON',
    description: 'Predstavljanje mogućnosti odlaska na stručne plaćene prakse i volonterske projekte u inostranstvu tokom proleća i leta.',
  },
  {
    title: 'BBICC Warm-Up: Metodologija rešavanja case study-ja',
    date: '2026-11-24T11:00:00',
    endDate: '2026-11-24T15:00:00',
    type: 'Radionica / Priprema',
    organizerName: 'Case Study Club BCA',
    location: 'Čitaonica FON-a',
    description: 'Intenzivna pripremna radionica o analizi poslovnih problema, finansijskom modeliranju i pitch prezentacijama po svetskim standardima.',
  },
  {
    title: 'Radionica: Kako napisati pobednički CV i motivaciono pismo',
    date: '2026-11-25T13:00:00',
    endDate: '2026-11-25T15:00:00',
    type: 'Radionica',
    organizerName: 'FON-ov centar za razvoj karijere',
    location: 'Sala 102, FON',
    description: 'Praktični saveti i stručni pregled biografija od strane karijernih savetnika radi uspešnog apliciranja za prakse i poslove.',
  },
  {
    title: 'Studenti Studentima (S2S 2026)',
    date: '2026-11-26T12:00:00',
    endDate: '2026-11-30T16:00:00',
    type: 'Edukacija / Radionica',
    organizerName: 'FONIS',
    location: 'Računarske laboratorije B001 i B002',
    description: 'Tradicionalni serijal besplatnih IT radionica gde napredni studenti prenose znanja kolegama iz oblasti Web dev-a, Python-a i AI-ja.',
  },
  {
    title: 'FON Turnir u malom fudbalu i košarci',
    date: '2026-11-27T15:00:00',
    endDate: '2026-11-29T20:00:00',
    type: 'Sportski turnir',
    organizerName: 'SportFON',
    location: 'Sportska sala i tereni FON-a',
    description: 'Međugodišnji sportski turnir studenata FON-a u malom fudbalu i košarci sa peharima i nagradama za pobedničke ekipe.',
  },
  {
    title: 'DigiHack 2026: Digital Product Challenge',
    date: '2026-11-28T10:00:00',
    endDate: '2026-11-29T18:00:00',
    type: 'Hakaton / Takmičenje',
    organizerName: 'F Digital',
    location: 'Amfiteatar 2, Nova zgrada FON-a',
    description: 'Dvodnevni izazov kreiranja inovativnih digitalnih proizvoda, UI/UX rešenja i lansiranja startap ideja uz podršku mentora.',
  },
  {
    title: 'Marketing Challenge 2026: Brendiranje u digitalno doba',
    date: '2026-11-30T10:00:00',
    endDate: '2026-12-01T17:00:00',
    type: 'Takmičenje / Radionica',
    organizerName: 'Marketing Workshop',
    location: 'Amfiteatar 4, FON',
    description: 'Praktično takmičenje u osmišljavanju marketinške strategije i lansiranju novog brenda pred žirijem iz agencija.',
  },
  {
    title: 'Akcija pošumljavanja i reciklaže na FON-u',
    date: '2026-12-01T10:00:00',
    endDate: '2026-12-01T14:00:00',
    type: 'Ekološka akcija / Volontiranje',
    organizerName: 'EkoFON',
    location: 'Dvorište i plato FON-a',
    description: 'Volonterska akcija uređivanja dvorišta fakulteta, sadnje sadnica i prikupljanja starog papira i elektronskog otpada.',
  },
  {
    title: 'Simulacija razgovora za posao sa HR stručnjacima',
    date: '2026-12-03T11:00:00',
    endDate: '2026-12-03T16:00:00',
    type: 'Radionica / Trening',
    organizerName: 'FON-ov centar za razvoj karijere',
    location: 'Sala 105, FON',
    description: 'Simulacija 1-na-1 intervjua za posao sa profesionalnim regruterima iz poznatih kompanija uz detaljan analitički feedback.',
  },
  {
    title: 'Dramsko-umetničko veče na FON-u',
    date: '2026-12-04T18:00:00',
    endDate: '2026-12-04T20:30:00',
    type: 'Kulturni događaj / Predstava',
    organizerName: 'Boffonerya',
    location: 'Amfiteatar A, FON',
    description: 'Izvođenje autorske pozorišne predstave i izložba umetničkih fotografija i slika studenata FON-a.',
  },
  {
    title: 'FONIS Hackathon 2026',
    date: '2026-12-05T09:00:00',
    endDate: '2026-12-06T21:00:00',
    type: 'Hakaton',
    organizerName: 'FONIS',
    location: 'Hol i računarske sale FON-a',
    description: '24-časovno takmičenje programera u izradi praktičnih softverskih aplikacija i Web rešenja uz vredne robne i novčane nagrade.',
  },
  {
    title: 'ESTIEM Lean Six Sigma Green Belt Kurs',
    date: '2026-12-08T10:00:00',
    endDate: '2026-12-10T15:00:00',
    type: 'Kurs / Sertifikacija',
    organizerName: 'ESTIEM LG Belgrade',
    location: 'Sala 201, FON',
    description: 'Sertifikovani međunarodni trening iz Lean Six Sigma metodologije za optimizaciju procesa i eliminaciju škarta u proizvodnji i uslugama.',
  },
  {
    title: 'Youth Leadership Summit 2026',
    date: '2026-12-09T10:00:00',
    endDate: '2026-12-09T16:00:00',
    type: 'Konferencija',
    organizerName: 'AIESEC',
    location: 'Amfiteatar 2, FON',
    description: 'Jednodnevna lideršip konferencija sa panelistima iz uspešnih kompanija o razvoju mekih veština i vođenju timova.',
  },
  {
    title: 'Humanitarni kros i fitnes izazov',
    date: '2026-12-11T11:00:00',
    endDate: '2026-12-11T14:00:00',
    type: 'Sportski / Humanitarni događaj',
    organizerName: 'SportFON',
    location: 'Banjička šuma / Dvorište FON-a',
    description: 'Kondicioni kros i funkcionalni trening na otvorenom sa sakupljanjem dobrovoljnih uplate i pomoći za dečije bolnice.',
  },
  {
    title: 'Konferencija studenata FON-a 2026',
    date: '2026-12-12T10:00:00',
    endDate: '2026-12-14T16:00:00',
    type: 'Konferencija',
    organizerName: 'Savez studenata FON-a (SSFON)',
    location: 'Amfiteatar A, FON',
    description: 'Godišnja krovna konferencija koja okuplja studente, profesore i goste iz privrede na teme tehnologije, menadžmenta i privrede.',
  },
  {
    title: 'Masterclass: Copywriting i Social Media Strategija',
    date: '2026-12-14T15:00:00',
    endDate: '2026-12-14T17:30:00',
    type: 'Predavanje / Radionica',
    organizerName: 'Marketing Workshop',
    location: 'Sala 201, FON',
    description: 'Intenzivno gostujuće predavanje vodećih copywriter-a i social media menadžera o pisanju prodajnih tekstova i vođenju brendova.',
  },
  {
    title: 'Future Leader Panel: Liderstvo u doba AI',
    date: '2026-12-15T16:00:00',
    endDate: '2026-12-15T18:30:00',
    type: 'Panel diskusija',
    organizerName: 'F Digital',
    location: 'Amfiteatar A, FON',
    description: 'Panel sa top menadžerima tehnoloških kompanija o tome kako mladi lideri treba da se pripreme za eru generativne AI.',
  },
  {
    title: 'High School Case Competition 2026',
    date: '2026-12-16T09:00:00',
    endDate: '2026-12-17T17:00:00',
    type: 'Takmičenje',
    organizerName: 'Case Study Club BCA',
    location: 'Amfiteatri B i 1, FON',
    description: 'Prestižno nacionalno takmičenje u rešavanju poslovnih studija slučaja za srednjoškolce pod mentorstvom članova CSC-a.',
  },
  {
    title: 'Humanitarna žurka i prikupljanje novogodišnjih paketića',
    date: '2026-12-18T20:00:00',
    endDate: '2026-12-19T02:00:00',
    type: 'Humanitarni događaj',
    organizerName: 'Unija studenata FON-a (SUFON)',
    location: 'Klub studenata FON-a',
    description: 'Tradicionalna novogodišnja akcija skupljanja igračaka, slatkiša i sredstava za paketiće namenjene deci bez roditeljskog staranja.',
  },
  {
    title: 'Pripremna radionica: Algoritmi i strukture podataka',
    date: '2027-01-12T14:00:00',
    endDate: '2027-01-12T17:00:00',
    type: 'Predavanje / Radionica',
    organizerName: 'FONIS',
    location: 'Amfiteatar B, FON',
    description: 'Pripremno predavanje pred januarski ispitni rok sa rešavanjem tipičnih ispitnih i intervju zadataka iz programiranja.',
  },
  {
    title: 'Edukativni seminar: Zaštita studenata i pravni saveti',
    date: '2027-01-15T13:00:00',
    endDate: '2027-01-15T15:30:00',
    type: 'Seminar',
    organizerName: 'Unija studenata FON-a (SUFON)',
    location: 'Sala 104, FON',
    description: 'Seminar o studijskim pravima, žalbenim postupcima, bodovanju predmeta i pravima studenata na Univerzitetu.',
  },
  {
    title: 'Kreativna radionica scenarija i scenografije',
    date: '2027-01-18T16:00:00',
    endDate: '2027-01-18T18:30:00',
    type: 'Radionica',
    organizerName: 'Boffonerya',
    location: 'Sala 102, FON',
    description: 'Interaktivna umetnička radionica osmišljavanja dramskih scenarija, scenskog nastupa i vizuelnog dizajna za projekte.',
  },
  {
    title: "Debatni turnir 'FON Open 2027'",
    date: '2027-01-20T10:00:00',
    endDate: '2027-01-21T18:00:00',
    type: 'Takmičenje',
    organizerName: 'Debatni klub FON-a',
    location: 'Sale 101 - 105, FON',
    description: 'Veliki debatni turnir u britanskom parlamentarnom formatu sa učešćem govornika sa svih fakulteta u Srbiji.',
  },
  {
    title: 'Radionica: Akademsko pisanje za Master i PhD studente',
    date: '2027-01-25T16:00:00',
    endDate: '2027-01-25T19:00:00',
    type: 'Radionica',
    organizerName: 'FON Fakultet (Vesti FON)',
    location: 'Amfiteatar 3, FON',
    description: 'Stručna obuka o metodologiji naučno-istraživačkog rada, strukturiranju radova i indeksiranju u M20 časopisima.',
  },
  {
    title: 'SymOrg 2027 - Najava i otvaranje prijava',
    date: '2027-02-08T09:00:00',
    endDate: '2027-02-10T17:00:00',
    type: 'Naučni simpozijum',
    organizerName: 'FON Fakultet (Vesti FON)',
    location: 'Amfiteatri FON-a',
    description: 'Međunarodni simpozijum iz organizacionih nauka - prezentacija radova, naučne sesije i učešće predstavnika privrede.',
  },
];

async function run() {
  const client = await pool.connect();
  try {
    console.log('🔄 Cleaning old events and organizers in PostgreSQL...');
    await client.query('TRUNCATE TABLE events, organizers RESTART IDENTITY CASCADE;');

    console.log('🏢 Inserting 15 official FON organizations...');
    const orgIdMap = {};

    for (const org of organizations) {
      const res = await client.query(
        `INSERT INTO organizers (name, short_name, description, website, color, logo_initials)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [org.name, org.short_name, org.description, org.website, org.color, org.logo_initials]
      );
      orgIdMap[org.name] = res.rows[0].id;
      // Mapiramo i kratka imena
      orgIdMap[org.short_name] = res.rows[0].id;
    }

    console.log('📅 Inserting 31 events from Excel table...');
    let inserted = 0;
    for (const ev of eventsData) {
      const orgId = orgIdMap[ev.organizerName];
      await client.query(
        `INSERT INTO events (title, description, date, end_date, location, organizer_id, type, tags, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 1)`,
        [
          ev.title,
          ev.description,
          new Date(ev.date),
          new Date(ev.endDate),
          ev.location,
          orgId,
          ev.type,
          [ev.type.split('/')[0].trim().toLowerCase(), 'fon'],
        ]
      );
      inserted++;
    }

    console.log(`✅ Successfully inserted ${inserted} events into PostgreSQL!`);
  } catch (err) {
    console.error('Error during import:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
