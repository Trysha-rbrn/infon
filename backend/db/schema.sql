-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'gost', -- 'gost', 'profesor', 'admin'
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Organizers table
CREATE TABLE IF NOT EXISTS organizers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  short_name VARCHAR(50),
  description TEXT,
  website VARCHAR(500),
  color VARCHAR(7), -- hex color
  icon VARCHAR(10), -- emoji
  logo_initials VARCHAR(5),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  location VARCHAR(500),
  organizer_id INTEGER REFERENCES organizers(id),
  type VARCHAR(100), -- predavanje, hakaton, panel, radionica, takmicenje
  tags TEXT[], -- array of tags
  created_by INTEGER REFERENCES users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
