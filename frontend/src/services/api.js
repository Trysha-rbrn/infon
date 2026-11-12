const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function fetchEvents(params = {}) {
  const query = new URLSearchParams();
  if (params.organizerId) query.append('organizerId', params.organizerId);
  if (params.type) query.append('type', params.type);
  if (params.dateFrom) query.append('dateFrom', params.dateFrom);
  if (params.dateTo) query.append('dateTo', params.dateTo);

  const url = `${API_BASE}/events${query.toString() ? `?${query.toString()}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Greška pri dohvatanju događaja: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchOrganizers() {
  const res = await fetch(`${API_BASE}/organizers`);
  if (!res.ok) {
    throw new Error(`Greška pri dohvatanju organizatora: ${res.statusText}`);
  }
  return res.json();
}

export async function loginApi(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Neuspešna prijava');
  }
  return data; // { token, user }
}

export async function createEventApi(eventData, token) {
  const res = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Neuspešno kreiranje događaja');
  }
  return data;
}

export async function deleteEventApi(id, token) {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Neuspešno brisanje događaja');
  }
  return data;
}
