/* Admin localStorage utilities - shared with admin pages */

export const LS = {
  SESSION: 'lf_admin_session',
  ITEMS: 'lf_items',
};

/** Hardcoded super user — only this account can log in to the admin panel. */
export const SUPER_ADMIN = {
  email: 'admin@campus.ca',
  password: 'admin123',
  building: 'Campus',
};

export function setSession(sessionObj) {
  localStorage.setItem(LS.SESSION, JSON.stringify(sessionObj));
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(LS.SESSION) || 'null');
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(LS.SESSION);
}

export function cryptoRandomId() {
  const arr = new Uint8Array(8);
  (window.crypto || window.msCrypto).getRandomValues(arr);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function seedItemsIfEmpty() {
  const raw = localStorage.getItem(LS.ITEMS);
  if (raw) return;

  const seed = [
    {
      id: cryptoRandomId(),
      type: 'found',
      title: 'Black Wallet',
      category: 'Wallet',
      building: 'Engineering',
      location: 'Main entrance desk',
      date: '2026-02-18',
      status: 'open',
      description: 'Found near main entrance. Has a small sticker inside.',
      photoDataUrl: '',
      contactEmail: '',
      tags: ['wallet', 'black'],
    },
    {
      id: cryptoRandomId(),
      type: 'found',
      title: 'AirPods Case',
      category: 'Electronics',
      building: 'Library',
      location: '2nd floor study area',
      date: '2026-02-17',
      status: 'claimed',
      description: 'White case. Ask claimant to describe engraving/mark.',
      photoDataUrl: '',
      contactEmail: '',
      tags: ['airpods', 'case'],
    },
    {
      id: cryptoRandomId(),
      type: 'lost',
      title: 'Student ID Card',
      category: 'ID / Cards',
      building: 'Business',
      location: 'Near elevators',
      date: '2026-02-13',
      status: 'open',
      description: 'Name starts with M. Please verify student number.',
      photoDataUrl: '',
      contactEmail: 'student@example.com',
      tags: ['id'],
    },
  ];
  localStorage.setItem(LS.ITEMS, JSON.stringify(seed));
}

export function getItems() {
  seedItemsIfEmpty();
  try {
    return JSON.parse(localStorage.getItem(LS.ITEMS) || '[]');
  } catch {
    return [];
  }
}

export function setItems(list) {
  localStorage.setItem(LS.ITEMS, JSON.stringify(list));
}

export function escapeHtml(str) {
  return String(str || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function fmtDate(d) {
  return d || '';
}

export function fileToDataUrl(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}
