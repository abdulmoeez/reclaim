/* Admin localStorage utilities - shared with admin pages */

export const LS = {
  SESSION: 'lf_admin_session',
  ITEMS: 'lf_items',
  CLAIMS: 'lf_claims',
};

/** Hardcoded super user — only this account can log in to the admin panel. */
export const SUPER_ADMIN = {
  email: 'admin@campus.ca',
  password: 'admin123',
  building: 'Administration Building (Duckworth Quadrangle)',
};

/** Hardcoded list of campus buildings for dropdowns. */
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

/** Placeholder image URL for seed items (picsum.photos with seed for consistent image). */
function seedImage(seed) {
  return `https://picsum.photos/seed/${seed}/400/300`;
}

export function seedItemsIfEmpty() {
  const raw = localStorage.getItem(LS.ITEMS);
  if (raw) return;

  const seed = [
    {
      id: 'seed-1',
      type: 'found',
      title: 'Black Leather Wallet',
      category: 'Wallet',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Main entrance desk',
      date: '2026-02-18',
      status: 'open',
      description: 'Found near main entrance. Has a small sticker inside.',
      photoDataUrl: seedImage('wallet1'),
      contactEmail: '',
      tags: ['wallet', 'black'],
    },
    {
      id: 'seed-2',
      type: 'found',
      title: 'AirPods Case (White)',
      category: 'Electronics',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: '2nd floor study area',
      date: '2026-02-17',
      status: 'claimed',
      description: 'White case. Ask claimant to describe engraving/mark.',
      photoDataUrl: seedImage('airpods2'),
      contactEmail: '',
      tags: ['airpods', 'case'],
    },
    {
      id: 'seed-3',
      type: 'lost',
      title: 'Student ID Card',
      category: 'ID / Cards',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Near elevators',
      date: '2026-02-13',
      status: 'open',
      description: 'Name starts with M. Please verify student number.',
      photoDataUrl: seedImage('idcard3'),
      contactEmail: 'student@example.com',
      tags: ['id'],
    },
    {
      id: 'seed-4',
      type: 'found',
      title: 'Silver Keychain (3 keys)',
      category: 'Keys',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Outside room 102',
      date: '2026-02-20',
      status: 'open',
      description: "Keychain says 'Toyota'. Found near parking.",
      photoDataUrl: seedImage('keys4'),
      contactEmail: '',
      tags: ['keys', 'keychain'],
    },
    {
      id: 'seed-5',
      type: 'lost',
      title: 'iPhone 13 (Blue case)',
      category: 'Electronics',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Lab hallway',
      date: '2026-02-19',
      status: 'open',
      description: 'Blue silicone case with minor scratches.',
      photoDataUrl: seedImage('iphone5'),
      contactEmail: '',
      tags: ['iphone', 'phone'],
    },
    {
      id: 'seed-6',
      type: 'found',
      title: 'Hydro Flask Water Bottle',
      category: 'Other',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Locker room',
      date: '2026-02-16',
      status: 'returned',
      description: 'Green 32oz bottle. Owner claimed.',
      photoDataUrl: seedImage('bottle6'),
      contactEmail: '',
      tags: ['bottle', 'water'],
    },
    {
      id: 'seed-7',
      type: 'found',
      title: 'Wireless Earbuds (Black)',
      category: 'Electronics',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Cafeteria table',
      date: '2026-02-21',
      status: 'open',
      description: 'Generic black wireless earbuds in case.',
      photoDataUrl: seedImage('earbuds7'),
      contactEmail: '',
      tags: ['earbuds', 'electronics'],
    },
    {
      id: 'seed-8',
      type: 'lost',
      title: 'Glasses (Black Frames)',
      category: 'Other',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Lecture hall B',
      date: '2026-02-15',
      status: 'open',
      description: 'Black rectangular frames, no case.',
      photoDataUrl: seedImage('glasses8'),
      contactEmail: 'lost@example.com',
      tags: ['glasses', 'eyewear'],
    },
    {
      id: 'seed-9',
      type: 'found',
      title: 'Umbrella (Compact)',
      category: 'Other',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Bus stop shelter',
      date: '2026-02-14',
      status: 'open',
      description: 'Black compact folding umbrella.',
      photoDataUrl: seedImage('umbrella9'),
      contactEmail: '',
      tags: ['umbrella', 'rain'],
    },
    {
      id: 'seed-10',
      type: 'found',
      title: 'Notebook (Spiral, Ruled)',
      category: 'Books / Notes',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Library study desk',
      date: '2026-02-12',
      status: 'open',
      description: 'Blue cover, handwritten notes inside.',
      photoDataUrl: seedImage('notebook10'),
      contactEmail: '',
      tags: ['notebook', 'notes'],
    },
    {
      id: 'seed-11',
      type: 'lost',
      title: 'USB Drive (32GB)',
      category: 'Electronics',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Computer lab',
      date: '2026-02-11',
      status: 'open',
      description: 'Silver metal USB 3.0 drive.',
      photoDataUrl: seedImage('usb11'),
      contactEmail: '',
      tags: ['usb', 'drive'],
    },
    {
      id: 'seed-12',
      type: 'found',
      title: 'Scarf (Plaid)',
      category: 'Clothing',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Campus bench',
      date: '2026-02-10',
      status: 'open',
      description: 'Red and black plaid wool scarf.',
      photoDataUrl: seedImage('scarf12'),
      contactEmail: '',
      tags: ['scarf', 'clothing'],
    },
    {
      id: 'seed-13',
      type: 'found',
      title: 'Watch (Sport)',
      category: 'Jewelry',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Gym changing room',
      date: '2026-02-09',
      status: 'claimed',
      description: 'Black digital sport watch.',
      photoDataUrl: seedImage('watch13'),
      contactEmail: '',
      tags: ['watch', 'sport'],
    },
    {
      id: 'seed-14',
      type: 'lost',
      title: 'Calculator (TI-84)',
      category: 'Electronics',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Math building',
      date: '2026-02-08',
      status: 'open',
      description: 'Texas Instruments graphing calculator.',
      photoDataUrl: seedImage('calc14'),
      contactEmail: '',
      tags: ['calculator', 'math'],
    },
    {
      id: 'seed-15',
      type: 'found',
      title: 'Backpack (Navy)',
      category: 'Other',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Student center',
      date: '2026-02-07',
      status: 'open',
      description: 'Navy blue backpack, no identifying marks.',
      photoDataUrl: seedImage('backpack15'),
      contactEmail: '',
      tags: ['backpack', 'bag'],
    },
    {
      id: 'seed-16',
      type: 'found',
      title: 'Ring (Silver)',
      category: 'Jewelry',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Restroom sink',
      date: '2026-02-06',
      status: 'open',
      description: 'Simple silver band, size ~7.',
      photoDataUrl: seedImage('ring16'),
      contactEmail: '',
      tags: ['ring', 'jewelry'],
    },
    {
      id: 'seed-17',
      type: 'lost',
      title: 'Laptop Charger',
      category: 'Electronics',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Library outlet',
      date: '2026-02-05',
      status: 'open',
      description: 'USB-C 65W charger, white.',
      photoDataUrl: seedImage('charger17'),
      contactEmail: '',
      tags: ['charger', 'laptop'],
    },
    {
      id: 'seed-18',
      type: 'found',
      title: 'Sunglasses (Aviator)',
      category: 'Other',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Pool area',
      date: '2026-02-04',
      status: 'open',
      description: 'Gold aviator-style sunglasses.',
      photoDataUrl: seedImage('sunglasses18'),
      contactEmail: '',
      tags: ['sunglasses', 'glasses'],
    },
    {
      id: 'seed-19',
      type: 'found',
      title: 'Bicycle Lock Key',
      category: 'Keys',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Bike rack',
      date: '2026-02-03',
      status: 'open',
      description: 'Single key on orange key fob.',
      photoDataUrl: seedImage('bikekey19'),
      contactEmail: '',
      tags: ['key', 'bicycle'],
    },
    {
      id: 'seed-20',
      type: 'lost',
      title: 'Textbook (Chemistry)',
      category: 'Books / Notes',
      building: 'Administration Building (Duckworth Quadrangle)',
      location: 'Science building',
      date: '2026-02-02',
      status: 'open',
      description: 'Organic chemistry 2nd edition, has name inside.',
      photoDataUrl: seedImage('textbook20'),
      contactEmail: '',
      tags: ['textbook', 'chemistry'],
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

/** Claims – public claim submissions for items (unique detail, claimant info). */
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
