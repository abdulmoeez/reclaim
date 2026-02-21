/* Admin localStorage utilities - shared with admin pages */

export const LS = {
  SESSION: 'lf_admin_session',
  ITEMS: 'lf_items',
  CLAIMS: 'lf_claims',
};

// super admin (only account that can log in)
export const SUPER_ADMIN = {
  email: 'admin@campus.ca',
  password: 'admin123',
  building: 'Administration Building (Duckworth Quadrangle)',
};

// campus buildings for dropdowns
export const BUILDINGS = [
  'Administration Building (Duckworth Quadrangle)',
  'Agriculture Building',
  'Agricultural Engineering Building',
  'Allen Building',
  'Alumni House',
  'Armes Building',
  'ARTlab (Art Research Technology Laboratory)',
  'Arthur V. Mauro Student Residence',
  'Brodie Centre',
  'Buller Building (Biological Sciences)',
  'C.A.S.T. Building',
  'Campus Day Care Centre',
  'Carolyn Sifton Wing',
  'Ceramic/Sculpture Studio Building',
  "Chancellor's Hall",
  'Chown Building',
  'Drake Centre (Asper School of Business)',
  'Duff Roblin Building',
  'Elizabeth Dafoe Library',
  'Ellis Building',
  'Engineering Complex (including EITC)',
  'Fletcher Argue Building',
  'FitzGerald Building',
  'Frank Kennedy Physical Education Centre',
  'Helen Glass Centre for Nursing',
  'Human Ecology Building',
  'Music Annex / Tache Arts Complex',
  'Wallace Building',
  'Various student residences (e.g., Pembina Hall)',
];

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

// placeholder for seed item thumbnails
function seedImage() {
  return '/seed/placeholder.svg';
}

export function seedItemsIfEmpty() {
  const raw = localStorage.getItem(LS.ITEMS);
  if (raw) return;

  const seed = [
    {
      id: 'seed-1',
      type: 'found',
      title: 'Metal Water Bottle',
      category: 'Other',
      building: '',
      location: 'Main entrance desk',
      date: '2026-02-18',
      status: 'open',
      description: 'Light blue insulated bottle',
      photoDataUrl: '/seed/2.jpeg',
      contactEmail: '',
      tags: ['wallet', 'black'],
    },
    {
      id: 'seed-2',
      type: 'found',
      title: 'Black Jansport Backpack',
      category: 'Electronics',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: '2nd floor study area',
      date: '2026-02-17',
      status: 'open',
      description: 'Black Jansport backpack with front zipper pocket.',
      photoDataUrl: '/seed/1.jpeg',
      contactEmail: '',
      tags: ['airpods', 'case'],
    },
    {
      id: 'seed-3',
      type: 'lost',
      title: 'Airpods',
      category: 'ID / Cards',
      building: 'Computer Science Lab',
      location: 'Near elevators',
      date: '2026-02-13',
      status: 'open',
      description: 'airpods',
      photoDataUrl: '/seed/3.jpeg',
      contactEmail: 'student@example.com',
      tags: ['id'],
    },
    {
      id: 'seed-4',
      type: 'found',
      title: 'Black Leather Wallet',
      category: 'Keys',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Outside room 102',
      date: '2026-02-20',
      status: 'open',
      description: "Black leather wallet with visible card slots",
      photoDataUrl: '/seed/5.jpeg',
      contactEmail: '',
      tags: ['keys', 'keychain'],
    },
    {
      id: 'seed-5',
      type: 'lost',
      title: 'Clear Frame Glasses',
      category: 'Electronics',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Lab hallway',
      date: '2026-02-19',
      status: 'open',
      description: 'Large clear-frame prescription glasses with thin metal arms. Lenses show light reflection, no case included.',
      photoDataUrl: '/seed/6.jpeg',
      contactEmail: '',
      tags: ['iphone', 'phone'],
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

// claims (unique detail + claimant info)
export function getClaims() {
  try {
    return JSON.parse(localStorage.getItem(LS.CLAIMS) || '[]');
  } catch {
    return [];
  }
}

export function setClaims(list) {
  localStorage.setItem(LS.CLAIMS, JSON.stringify(list));
}

export function addClaim(claim) {
  const id = cryptoRandomId();
  const now = Date.now();
  const record = {
    id,
    itemId: claim.itemId,
    claimantName: claim.claimantName.trim(),
    claimantEmail: claim.claimantEmail.trim().toLowerCase(),
    uniqueDetail: claim.uniqueDetail.trim(),
    status: 'pending',
    submittedAt: now,
  };
  const list = getClaims();
  list.push(record);
  setClaims(list);
  return record;
}

export function updateClaimStatus(claimId, status) {
  const list = getClaims();
  const idx = list.findIndex((c) => c.id === claimId);
  if (idx === -1) return;
  list[idx].status = status;
  list[idx].resolvedAt = Date.now();
  setClaims(list);
}

export function fileToDataUrl(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}
