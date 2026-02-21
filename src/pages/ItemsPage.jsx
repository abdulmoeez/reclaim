import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getItems, setItems, cryptoRandomId } from './admin/adminStorage';
import ItemCard from './ItemCard';
import './ItemsPage.css';

function normalize(s) {
  return (s || '').toString().trim().toLowerCase();
}

function uniqueSorted(list) {
  return Array.from(new Set(list.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

function applyQuick(state) {
  const next = { ...state };
  const today = new Date();
  const iso = (d) => d.toISOString().slice(0, 10);

  if (next.quick === 'last7') {
    const d = new Date(today);
    d.setDate(d.getDate() - 7);
    next.dateFrom = iso(d);
  } else if (next.quick === 'last30') {
    const d = new Date(today);
    d.setDate(d.getDate() - 30);
    next.dateFrom = iso(d);
  } else if (next.quick === 'open') {
    next.status = 'open';
  }
  return next;
}

function filterAndSortItems(items, state) {
  const applied = applyQuick(state);
  let list = [...items];

  if (applied.type !== 'all') list = list.filter((i) => i.type === applied.type);
  if (applied.status !== 'all')
    list = list.filter((i) => i.status === applied.status);
  if (applied.building !== 'all')
    list = list.filter((i) => i.building === applied.building);
  if (applied.category !== 'all')
    list = list.filter((i) => i.category === applied.category);

  if (applied.showReturned === 'hide') {
    list = list.filter((i) => i.status !== 'returned');
  }

  if (applied.dateFrom) {
    list = list.filter((i) => (i.date || '') >= applied.dateFrom);
  }
  if (applied.dateTo) {
    list = list.filter((i) => (i.date || '') <= applied.dateTo);
  }

  if (applied.q) {
    list = list.filter((i) => {
      const hay = [
        i.title,
        i.category,
        i.building,
        i.location,
        i.description,
        (i.tags || []).join(' '),
        i.type,
        i.status,
      ]
        .map(normalize)
        .join(' | ');
      return hay.includes(applied.q);
    });
  }

  if (applied.sort === 'newest') {
    list.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  } else if (applied.sort === 'oldest') {
    list.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  } else if (applied.sort === 'title') {
    list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
  }

  return { list, state: applied };
}

function activeChips(state) {
  const chips = [];
  if (state.q) chips.push(`Search: ${state.q}`);
  if (state.type !== 'all') chips.push(`Type: ${state.type}`);
  if (state.status !== 'all') chips.push(`Status: ${state.status}`);
  if (state.building !== 'all') chips.push(`Building: ${state.building}`);
  if (state.category !== 'all') chips.push(`Category: ${state.category}`);
  if (state.dateFrom) chips.push(`From: ${state.dateFrom}`);
  if (state.dateTo) chips.push(`To: ${state.dateTo}`);
  if (state.showReturned === 'hide') chips.push('Returned: hidden');
  if (state.quick !== 'none') chips.push(`Quick: ${state.quick}`);
  return chips;
}

const defaultFilterState = {
  q: '',
  sort: 'newest',
  type: 'all',
  status: 'all',
  building: 'all',
  category: 'all',
  dateFrom: '',
  dateTo: '',
  showReturned: 'hide',
  quick: 'none',
};

export default function ItemsPage() {
  const [filterState, setFilterState] = useState(defaultFilterState);
  const [toastMessage, setToastMessage] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const items = useMemo(() => getItems(), [refreshKey]);

  const buildings = useMemo(
    () => uniqueSorted(items.map((i) => i.building)),
    [items]
  );
  const categories = useMemo(
    () => uniqueSorted(items.map((i) => i.category)),
    [items]
  );

  const { list: filteredList, state: appliedState } = useMemo(
    () => filterAndSortItems(items, filterState),
    [items, filterState]
  );

  const chips = useMemo(() => activeChips(appliedState), [appliedState]);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    const t = setTimeout(() => setToastMessage(null), 2400);
    return () => clearTimeout(t);
  }, []);

  const handleClear = useCallback(() => {
    setFilterState(defaultFilterState);
  }, []);

  const handleSeed = useCallback(() => {
    const now = new Date();
    const iso = (d) => d.toISOString().slice(0, 10);
    const daysAgo = (n) => {
      const d = new Date(now);
      d.setDate(d.getDate() - n);
      return iso(d);
    };

    const seed = [
      {
        id: cryptoRandomId(),
        type: 'found',
        title: 'Black Wallet',
        category: 'Wallet',
        building: 'Engineering',
        location: 'Main entrance desk',
        date: daysAgo(3),
        status: 'open',
        description:
          'Found near main entrance. Has a small sticker inside.',
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
        date: daysAgo(4),
        status: 'claimed',
        description:
          'White case. Ask claimant to describe engraving/mark.',
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
        date: daysAgo(7),
        status: 'open',
        description: 'Name starts with M. Please verify student number.',
        photoDataUrl: '',
        contactEmail: 'student@example.com',
        tags: ['id'],
      },
      {
        id: cryptoRandomId(),
        type: 'found',
        title: 'Silver Keys (3 keys)',
        category: 'Keys',
        building: 'UC',
        location: 'Outside room 102',
        date: daysAgo(1),
        status: 'open',
        description: "Keychain says 'Toyota'.",
        photoDataUrl: '',
        contactEmail: '',
        tags: ['keys'],
      },
      {
        id: cryptoRandomId(),
        type: 'lost',
        title: 'iPhone (Blue case)',
        category: 'Electronics',
        building: 'Science',
        location: 'Lab hallway',
        date: daysAgo(10),
        status: 'open',
        description: 'Blue case with minor scratches.',
        photoDataUrl: '',
        contactEmail: '',
        tags: ['iphone', 'phone'],
      },
      {
        id: cryptoRandomId(),
        type: 'found',
        title: 'Water Bottle (Hydro Flask)',
        category: 'Other',
        building: 'Gym',
        location: 'Locker room',
        date: daysAgo(2),
        status: 'returned',
        description: 'Green bottle.',
        photoDataUrl: '',
        contactEmail: '',
        tags: ['bottle'],
      },
    ];
    setItems(seed);
    setRefreshKey((k) => k + 1);
    showToast('Demo items loaded.');
  }, [showToast]);

  const updateFilter = useCallback((key, value) => {
    setFilterState((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className="items-page">
      <header className="nav">
        <div className="wrap">
          <div className="navRow">
            <Link className="brand" to="/">
              <img src="/logo.png" alt="" className="logo" />
            </Link>

            <nav className="navLinks" aria-label="Primary">
              <Link to="/#how">How it works</Link>
              <Link to="/items">Browse items</Link>
              <Link to="/admin/login">Admin</Link>
            </nav>

            <div className="navActions">
              <Link className="btn small ghost" to="/">
                ← Home
              </Link>
              <Link className="btn small ghost" to="/admin/login">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="wrap section">
        <span className="pill">🔎 Browse campus-wide listings</span>
        <h1>Lost &amp; Found Items</h1>
        <p className="sub">
          This page reads from <b>browser localStorage</b> (the same data the
          admin panel writes). For the demo, open the admin panel and add some
          items, then refresh this page.
        </p>

        <section className="filters" aria-label="Filters">
          <div className="filterRow">
            <div>
              <label htmlFor="items-search">Search</label>
              <input
                id="items-search"
                className="input"
                value={filterState.q}
                onChange={(e) => updateFilter('q', e.target.value)}
                placeholder="Try: wallet, keys, airpods, phone..."
                aria-label="Search items"
              />
            </div>
            <div>
              <label htmlFor="items-sort">Sort</label>
              <select
                id="items-sort"
                className="input"
                value={filterState.sort}
                onChange={(e) => updateFilter('sort', e.target.value)}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title">Title (A–Z)</option>
              </select>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'flex-end',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                className="btn primary"
                onClick={handleClear}
                aria-label="Clear all filters"
              >
                Clear
              </button>
              <button
                type="button"
                className="btn ghost"
                onClick={handleSeed}
                aria-label="Load demo items"
              >
                Load demo items
              </button>
            </div>
          </div>

          <div className="filterRow2">
            <div>
              <label htmlFor="items-type">Type</label>
              <select
                id="items-type"
                className="input"
                value={filterState.type}
                onChange={(e) => updateFilter('type', e.target.value)}
              >
                <option value="all">All</option>
                <option value="found">Found</option>
                <option value="lost">Lost</option>
              </select>
            </div>
            <div>
              <label htmlFor="items-status">Status</label>
              <select
                id="items-status"
                className="input"
                value={filterState.status}
                onChange={(e) => updateFilter('status', e.target.value)}
              >
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="claimed">Claimed</option>
                <option value="returned">Returned</option>
              </select>
            </div>
            <div>
              <label htmlFor="items-building">Building</label>
              <select
                id="items-building"
                className="input"
                value={filterState.building}
                onChange={(e) => updateFilter('building', e.target.value)}
              >
                <option value="all">All buildings</option>
                {buildings.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="items-category">Category</label>
              <select
                id="items-category"
                className="input"
                value={filterState.category}
                onChange={(e) => updateFilter('category', e.target.value)}
              >
                <option value="all">All categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filterRow3">
            <div>
              <label htmlFor="items-dateFrom">Date from</label>
              <input
                id="items-dateFrom"
                type="date"
                className="input"
                value={filterState.dateFrom}
                onChange={(e) => updateFilter('dateFrom', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="items-dateTo">Date to</label>
              <input
                id="items-dateTo"
                type="date"
                className="input"
                value={filterState.dateTo}
                onChange={(e) => updateFilter('dateTo', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="items-showReturned">Show returned</label>
              <select
                id="items-showReturned"
                className="input"
                value={filterState.showReturned}
                onChange={(e) =>
                  updateFilter('showReturned', e.target.value)
                }
              >
                <option value="hide">Hide returned by default</option>
                <option value="show">Show returned</option>
              </select>
            </div>
            <div>
              <label htmlFor="items-quick">Quick filters</label>
              <select
                id="items-quick"
                className="input"
                value={filterState.quick}
                onChange={(e) => updateFilter('quick', e.target.value)}
              >
                <option value="none">None</option>
                <option value="last7">Last 7 days</option>
                <option value="last30">Last 30 days</option>
                <option value="open">Open only</option>
              </select>
            </div>
          </div>

          <div className="metaBar">
            <div className="chips">
              {chips.length > 0 ? (
                chips.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))
              ) : (
                <span className="chip">No filters</span>
              )}
            </div>
            <div>
              <span>{filteredList.length}</span> items
            </div>
          </div>
        </section>

        <section>
          <div className="grid" role="list">
            {filteredList.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onCopyToast={showToast}
              />
            ))}
          </div>
          {filteredList.length === 0 && (
            <div className="empty">
              No items match your filters. Try clearing filters or loading
              demo items.
            </div>
          )}
        </section>
      </main>

      {toastMessage && (
        <div
          className="toast"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
