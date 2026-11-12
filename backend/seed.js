require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'infon_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

async function seed() {
  const client = await pool.connect();

  try {
    console.log('🌱 Starting database reset & seed with authentic FON organizations...\n');

    // ── 1. Run schema.sql ───────────────────────────────────────────────────
    console.log('📐 Ensuring schema exists...');
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'db', 'schema.sql'), 'utf8');
    await client.query(schemaSQL);

    // ── 2. Clear old data ───────────────────────────────────────────────────
    console.log('🧹 Truncating old events and organizers...');
    await client.query('TRUNCATE TABLE events, organizers RESTART IDENTITY CASCADE;');
    console.log('✅ Cleaned old records.\n');

    // ── 3. Insert Organizers ────────────────────────────────────────────────
    console.log('🏢 Inserting new organizations...');

    const organizers = [
      {
        name: 'FON Fakultet',
        short_name: 'FON',
        description: 'Fakultet organizacionih nauka Univerziteta u Beogradu',
        website: 'https://www.fon.bg.ac.rs',
        color: '#003F7F',
        logo_initials: 'FON',
      },
      {
        name: 'AIESEC',
        short_name: 'AIESEC',
        description: 'Globalna platforma za mlade ljude koja razvija liderski potencijal kroz međunarodne prakse i volonterska iskustva.',
        website: 'https://aiesec.org.rs',
        color: '#037EF3',
        logo_initials: 'AIE',
      },
      {
        name: 'Savez studenata FON-a',
        short_name: 'SSFON',
        description: 'Jedna od najstarijih i najvećih studentskih organizacija na FON-u, organizator FONkviza, humanitarnih akcija i stručnih seminara.',
        website: 'https://ssfon.org.rs',
        color: '#D90429',
        logo_initials: 'SSF',
      },
      {
        name: 'ESTIEM LG Belgrade',
        short_name: 'ESTIEM',
        description: 'Evropska organizacija studenata industrijskog inženjerstva i menadžmenta, povezuje studente sa kompanijama širom Evrope.',
        website: 'https://estiem.org.rs',
        color: '#2A9D8F',
        logo_initials: 'EST',
      },
      {
        name: 'FONIS',
        short_name: 'FONIS',
        description: 'Udruženje studenata informatike FON-a, organizator hakatona Hakaton za srednjoškolce, Blogdan i IT radionica.',
        website: 'https://fonis.rs',
        color: '#1D3557',
        logo_initials: 'FNS',
      },
      {
        name: 'Case Study Club BCA',
        short_name: 'Case Study Club',
        description: 'Vodeća studentska menadžment konsalting organizacija u Jugoistočnoj Evropi, svetski šampioni u rešavanju studija slučaja.',
        website: 'https://casestudyclub.fon.bg.ac.rs',
        color: '#7209B7',
        logo_initials: 'CSC',
      },
      {
        name: 'Bufonerija',
        short_name: 'Bufonerija',
        description: 'Pozorišna trupa Fakulteta organizacionih nauka – umetnost, kreativnost, gluma i pozorišne predstave studenata FON-a.',
        website: 'https://www.fon.bg.ac.rs',
        color: '#E76F51',
        logo_initials: 'BUF',
      },
      {
        name: 'Debatni klub',
        short_name: 'Debatni klub',
        description: 'Klub za razvoj argumentacije, javnog nastupa, kritičkog mišljenja i retorike kod studenata FON-a.',
        website: 'https://www.fon.bg.ac.rs',
        color: '#B5179E',
        logo_initials: 'DEB',
      },
      {
        name: 'EkoFON',
        short_name: 'EkoFON',
        description: 'Ekološka organizacija studenata FON-a posvećena održivom razvoju, reciklaži i zelenim inicijativama na fakultetu.',
        website: 'https://www.fon.bg.ac.rs',
        color: '#2D6A4F',
        logo_initials: 'EKO',
      },
      {
        name: 'Quality Media Station',
        short_name: 'QMS',
        description: 'Studentska medijska organizacija FON-a – fotografija, video produkcija, dizajn i medijsko praćenje svih događaja na fakultetu.',
        website: 'https://www.fon.bg.ac.rs',
        color: '#F77F00',
        logo_initials: 'QMS',
      },
      {
        name: 'SportFON',
        short_name: 'SportFON',
        description: 'Sportska asocijacija FON-a – organizator FON lige, međufakultetskih turnira i promocije zdravog života među studentima.',
        website: 'https://www.fon.bg.ac.rs',
        color: '#023E8A',
        logo_initials: 'SPO',
      },
      {
        name: 'Studentska Asocijacija',
        short_name: 'SAFON',
        description: 'Studentska asocijacija FON-a – organizacija koja okuplja studente oko društveno korisnih i edukativnih projekata.',
        website: 'https://www.fon.bg.ac.rs',
        color: '#6D597A',
        logo_initials: 'SAF',
      },
      {
        name: 'Unija studenata FON-a',
        short_name: 'Unija',
        description: 'Organizator velikih studentskih konferencija, humanitarnih turnira i projekata studentske prakse i edukacije.',
        website: 'https://usfon.rs',
        color: '#3A0CA3',
        logo_initials: 'USF',
      },
      {
        name: 'FONov centar za razvoj karijere',
        short_name: 'FON CZRK',
        description: 'Zvanični karijerni centar FON-a – organizator sajma poslova i praksi, radionica za pisanje CV-ja i simulacija intervjua.',
        website: 'https://czrk.fon.bg.ac.rs',
        color: '#0077B6',
        logo_initials: 'CZR',
      },
      {
        name: 'F Digital',
        short_name: 'F Digital',
        description: 'Zajednica posvećena digitalnom marketingu, kreiranju sadržaja, društvenim mrežama i savremenim digitalnim komunikacijama.',
        website: 'https://www.fon.bg.ac.rs',
        color: '#4361EE',
        logo_initials: 'FDI',
      },
      {
        name: 'Investicioni klub',
        short_name: 'Investicioni klub',
        description: 'Edukativna organizacija usmerena na finansijska tržišta, analizu hartija od vrednosti, investiciono bankarstvo i lične finansije.',
        website: 'https://www.fon.bg.ac.rs',
        color: '#38B000',
        logo_initials: 'INV',
      },
    ];

    const orgIds = {};
    for (const org of organizers) {
      const result = await client.query(
        `INSERT INTO organizers (name, short_name, description, website, color, logo_initials)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [org.name, org.short_name, org.description, org.website, org.color, org.logo_initials]
      );
      orgIds[org.short_name] = result.rows[0].id;
      console.log(`  ✅ ${org.name} (id: ${result.rows[0].id})`);
    }

    // ── 4. Insert Demo Users ────────────────────────────────────────────────
    console.log('\n👤 Ensuring demo users exist...');
    const saltRounds = 10;
    const users = [
      {
        email: 'admin@fon.bg.ac.rs',
        password: 'admin123',
        name: 'Admin InFON',
        role: 'admin',
      },
      {
        email: 'profesor@fon.bg.ac.rs',
        password: 'profesor123',
        name: 'Prof. Marko Marković',
        role: 'profesor',
      },
    ];

    const userIds = {};
    for (const user of users) {
      const existing = await client.query('SELECT id FROM users WHERE email = $1', [user.email]);
      if (existing.rows.length > 0) {
        userIds[user.role] = existing.rows[0].id;
      } else {
        const hash = await bcrypt.hash(user.password, saltRounds);
        const result = await client.query(
          'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING id',
          [user.email, hash, user.name, user.role]
        );
        userIds[user.role] = result.rows[0].id;
      }
    }

    // ── 5. Insert Events ────────────────────────────────────────────────────
    console.log('\n📅 Inserting authentic events for all organizations...');

    const events = [
      {
        title: 'FONIS: Hakaton 2026 – Rešenja za pametno poslovanje',
        description: '24-časovni programerski hakaton u organizaciji FONIS-a. Timovi od 3 do 4 člana razvijaju digitalna rešenja na bazi veštačke inteligencije.',
        date: '2026-11-14T10:00:00',
        end_date: '2026-11-15T12:00:00',
        location: 'FON, Računarske sale 1 i 2',
        organizer: 'FONIS',
        type: 'hakaton',
        tags: ['hakaton', 'programiranje', 'ai', 'fonis'],
      },
      {
        title: 'Case Study Club: Nacionalno takmičenje u studiji slučaja',
        description: 'Prezentacija strateških poslovnih rešenja pred vodećim konsultantima i partnerima iz industrije. Pobednik osvaja plasman na globalni šampionat.',
        date: '2026-11-16T11:00:00',
        end_date: '2026-11-16T17:00:00',
        location: 'FON, Čitaonica i Amfiteatar B',
        organizer: 'Case Study Club',
        type: 'takmicenje',
        tags: ['case-study', 'konsalting', 'strategija', 'biznis'],
      },
      {
        title: 'AIESEC: Global Talent – Sajam međunarodnih plaćenih praksi',
        description: 'Upoznaj prilike za stručne prakse u inostranstvu u oblastima marketinga, finansija, IT-ja i inženjeringa u preko 100 zemalja sveta.',
        date: '2026-11-18T13:00:00',
        end_date: '2026-11-18T16:00:00',
        location: 'Hol FON-a, prizemlje',
        organizer: 'AIESEC',
        type: 'predavanje',
        tags: ['aiesec', 'prakse', 'inostranstvo', 'karijera'],
      },
      {
        title: 'Savez studenata FON-a: FONkviz – Humanitarno veče znanja',
        description: 'Tradicionalni pab kviz opšteg znanja, pop kulture i biznisa. Sav prihod od kotizacija namenjen je u humanitarne svrhe.',
        date: '2026-11-19T19:00:00',
        end_date: '2026-11-19T22:00:00',
        location: 'Klub studenata FON-a (KST)',
        organizer: 'SSFON',
        type: 'radionica',
        tags: ['kviz', 'ssfon', 'humanitarno', 'druzenje'],
      },
      {
        title: 'ESTIEM: T.I.M.E.S. – Rešavanje inženjersko-menadžerskih studija',
        description: 'Lokalna runda najvećeg evropskog takmičenja u rešavanju inženjersko-menadžerskih studija slučaja za studente FON-a.',
        date: '2026-11-21T09:30:00',
        end_date: '2026-11-21T18:00:00',
        location: 'FON, Sala 201',
        organizer: 'ESTIEM',
        type: 'takmicenje',
        tags: ['estiem', 'engineering', 'management', 'takmicenje'],
      },
      {
        title: 'Investicioni klub: Uvod u analizu akcija i Portfolio menadžment',
        description: 'Interaktivna radionica sa portfolio menadžerima: kako čitati finansijske izveštaje, vrednovati kompanije i formirati portfolio.',
        date: '2026-11-23T17:00:00',
        end_date: '2026-11-23T19:00:00',
        location: 'FON, Sala 42',
        organizer: 'Investicioni klub',
        type: 'predavanje',
        tags: ['finansije', 'investicije', 'berza', 'analiza'],
      },
      {
        title: 'FON CZRK: Dani karijere i simulacije intervjua za posao',
        description: 'Jednodnevni karijerni događaj sa HR stručnjacima vodećih kompanija. Simulacije tehničkih intervjua i provera CV-ja u realnom vremenu.',
        date: '2026-11-25T10:00:00',
        end_date: '2026-11-25T15:30:00',
        location: 'Amfiteatar A, FON',
        organizer: 'FON CZRK',
        type: 'panel',
        tags: ['karijera', 'cv', 'intervju', 'czrk', 'posao'],
      },
      {
        title: 'Debatni klub: Javna debata – Uticaj AI na akademski integritet',
        description: 'Tradicionalna otvorena debata u britanskom parlamentarnom formatu na temu regulacije i upotrebe veštačke inteligencije na univerzitetima.',
        date: '2026-11-27T18:00:00',
        end_date: '2026-11-27T20:00:00',
        location: 'Sala Senata, FON',
        organizer: 'Debatni klub',
        type: 'panel',
        tags: ['debata', 'retorika', 'javni-nastup', 'ai'],
      },
      {
        title: 'SportFON: Finale jesenje FON lige u fudbalu i basketu',
        description: 'Završnica semestralne lige studenata FON-a. Finalne utakmice u malom fudbalu i 3x3 basketu uz proglašenje šampiona fakulteta.',
        date: '2026-11-29T16:00:00',
        end_date: '2026-11-29T21:00:00',
        location: 'Sportska sala Fakulteta sporta i fizičkog vaspitanja',
        organizer: 'SportFON',
        type: 'takmicenje',
        tags: ['sport', 'fudbal', 'basket', 'liga', 'sportfon'],
      },
      {
        title: 'EkoFON: Zeleni kampus – Radionica cirkularne ekonomije',
        description: 'Predavanje i akcija prikupljanja elektronskog otpada i papira. Prezentacija studentskih zelenih biznis modela za održivi FON.',
        date: '2026-12-01T12:00:00',
        end_date: '2026-12-01T14:30:00',
        location: 'FON, Sala 103',
        organizer: 'EkoFON',
        type: 'radionica',
        tags: ['ekologija', 'odrzivost', 'ekofon', 'reciklaza'],
      },
      {
        title: 'F Digital: Digital Marketing Bootcamp – TikTok, Meta & SEO strategije',
        description: 'Praktična radionica o kreiranju viralnog digitalnog sadržaja, targetiranju oglasa i metrikama performansi za digitalne kampanje.',
        date: '2026-12-03T16:30:00',
        end_date: '2026-12-03T19:00:00',
        location: 'FON, Sala 301',
        organizer: 'F Digital',
        type: 'radionica',
        tags: ['marketing', 'digital', 'drustvene-mreze', 'ads'],
      },
      {
        title: 'Bufonerija: Premijera studentske predstave – Pozorište na FON-u',
        description: 'Godišnja premijera pozorišne trupe Bufonerija. Glume studenti FON-a, ulaz slobodan za sve studente i zaposlene.',
        date: '2026-12-06T19:30:00',
        end_date: '2026-12-06T21:30:00',
        location: 'Amfiteatar B, FON',
        organizer: 'Bufonerija',
        type: 'predavanje',
        tags: ['pozoriste', 'umetnost', 'gluma', 'bufonerija', 'kultura'],
      },
      {
        title: 'Quality Media Station: Media Lab – Osnove profesionalne fotografije i videa',
        description: 'Masterclass o podešavanjima kamere, svetla i kompozicije, uz rad u Premiere Pro i Lightroom alatima.',
        date: '2026-12-08T15:00:00',
        end_date: '2026-12-08T17:30:00',
        location: 'FON, Medijski kutak i Sala 15',
        organizer: 'QMS',
        type: 'radionica',
        tags: ['mediji', 'video', 'fotografija', 'qms', 'dizajn'],
      },
      {
        title: 'Unija studenata FON-a: Konferencija – Liderstvo u digitalnom dobu',
        description: 'Godišnja konferencija sa generalnim direktorima vodećih regionalnih kompanija o vođenju timova i inovacijama u poslovanju.',
        date: '2026-12-10T11:00:00',
        end_date: '2026-12-10T16:00:00',
        location: 'Amfiteatar A, FON',
        organizer: 'Unija',
        type: 'panel',
        tags: ['liderstvo', 'unija', 'konferencija', 'menadzment'],
      },
      {
        title: 'Studentska Asocijacija: Humanitarni turnir u društvenim igrama',
        description: 'Catan, Carcassonne i šahovski turnir studenata FON-a. Sav prihod odlazi u fond za pomoć lečenju dece.',
        date: '2026-12-12T14:00:00',
        end_date: '2026-12-12T19:00:00',
        location: 'Hol novog krila FON-a',
        organizer: 'SAFON',
        type: 'takmicenje',
        tags: ['drustvene-igre', 'humanitarno', 'asocijacija', 'turnir'],
      },
      {
        title: 'FON Katedra za IS: Gostujuće predavanje – Arhitektura mikroservisa',
        description: 'Stručno predavanje u okviru predmeta Projektovanje informacionih sistema: migracija sa monolita na mikroservise u cloud okruženju.',
        date: '2026-12-15T12:00:00',
        end_date: '2026-12-15T14:00:00',
        location: 'Sala 205, FON',
        organizer: 'FON',
        type: 'predavanje',
        tags: ['profesor', 'predavanje', 'mikroservisi', 'cloud', 'softver'],
      },
    ];

    for (const event of events) {
      const organizerId = orgIds[event.organizer];
      const result = await client.query(
        `INSERT INTO events (title, description, date, end_date, location, organizer_id, type, tags, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
        [
          event.title,
          event.description,
          event.date,
          event.end_date || null,
          event.location,
          organizerId || null,
          event.type,
          event.tags,
          userIds['admin'] || null,
        ]
      );
      console.log(`  ✅ [${event.type}] ${event.title} (id: ${result.rows[0].id})`);
    }

    console.log('\n🎉 New seed completed successfully!');
  } catch (err) {
    console.error('❌ Seed failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
