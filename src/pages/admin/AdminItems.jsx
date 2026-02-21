import { useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import AdminNav from './components/AdminNav';
import AdminToast from './components/AdminToast';
import { getItems, setItems, escapeHtml, fmtDate } from './adminStorage';
import './Admin.css';

function deleteItem(id, getItemsFn, setItemsFn) {
  const all = getItemsFn();
  const next = all.filter((x) => x.id !== id);
  setItemsFn(next);
}

function updateItemStatus(id, status, getItemsFn, setItemsFn) {
  const all = getItemsFn();
  const idx = all.findIndex((x) => x.id === id);
  if (idx === -1) return;
  all[idx].status = status;
  setItemsFn(all);
}

export default function AdminItems() {
  const { session, requireSession, getItems: getItemsFn, setItems: setItemsFn, showToast } =
    useAdmin();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const s = requireSession();
    if (!s) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate, requireSession]);

  const scopedItems = useMemo(() => {
    const s = requireSession();
    if (!s) return [];
    return getItemsFn().filter((it) => it.building === s.building);
  }, [session, requireSession, getItemsFn, refreshKey]);

  const filteredItems = useMemo(() => {
    let list = [...scopedItems];
    if (typeFilter !== 'all') list = list.filter((i) => i.type === typeFilter);
    if (statusFilter !== 'all') list = list.filter((i) => i.status === statusFilter);
    if (q.trim()) {
      const ql = q.trim().toLowerCase();
      list = list.filter(
        (i) =>
          (i.title || '').toLowerCase().includes(ql) ||
          (i.category || '').toLowerCase().includes(ql) ||
          (i.location || '').toLowerCase().includes(ql)
      );
    }
    return list.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }, [scopedItems, q, typeFilter, statusFilter]);

  const handleDelete = useCallback(
    (id) => {
      if (!window.confirm('Delete this item?')) return;
      deleteItem(id, getItemsFn, setItemsFn);
      setRefreshKey((k) => k + 1);
      showToast('Item deleted');
    },
    [getItemsFn, setItemsFn, showToast]
  );

  const handleStatusChange = useCallback(
    (id, nextStatus) => {
      updateItemStatus(id, nextStatus, getItemsFn, setItemsFn);
      setRefreshKey((k) => k + 1);
      showToast(`Status updated to ${nextStatus}`);
    },
    [getItemsFn, setItemsFn, showToast]
  );

  if (!session) return null;

  return (
    <div className="admin-page">
      <AdminNav />
      <main className="wrap section">
        <span className="pill">🧾 CRUD</span>
        <h1 className="h1">Manage items</h1>
        <p className="sub">
          Search, filter, update status, and delete items (building-scoped).
        </p>

        <div className="card" style={{ marginTop: 18 }}>
          <div className="formRow">
            <div className="formGroup">
              <label htmlFor="items-search">Search (title, category, location)</label>
              <input
                id="items-search"
                className="input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Try: wallet, keys, airpods..."
              />
            </div>
            <div className="formGroup">
              <label htmlFor="items-type">Type</label>
              <select
                id="items-type"
                className="input"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="found">Found</option>
                <option value="lost">Lost</option>
              </select>
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label htmlFor="items-status">Status</label>
              <select
                id="items-status"
                className="input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="claimed">Claimed</option>
                <option value="returned">Returned</option>
              </select>
            </div>

            <div
              className="formGroup"
              style={{ display: 'flex', alignItems: 'flex-end', gap: 10, flexWrap: 'wrap' }}
            >
              <Link className="btn primary" to="/admin/add-item">
                ➕ Add item
              </Link>
              <Link className="btn ghost" to="/admin/dashboard">
                ← Dashboard
              </Link>
            </div>
          </div>

          <div className="hr" />

          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Tags</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!filteredItems.length ? (
                  <tr>
                    <td colSpan={7} className="small">
                      No items match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((it) => (
                    <tr key={it.id}>
                      <td>
                        <div
                          style={{
                            display: 'flex',
                            gap: 10,
                            alignItems: 'center',
                          }}
                        >
                          <div
                            style={{
                              width: 42,
                              height: 42,
                              borderRadius: 12,
                              border: '1px solid rgba(255,255,255,.16)',
                              background: 'rgba(0,0,0,.15)',
                              display: 'grid',
                              placeItems: 'center',
                              overflow: 'hidden',
                            }}
                          >
                            {it.photoDataUrl ? (
                              <img
                                src={it.photoDataUrl}
                                alt=""
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                              />
                            ) : (
                              <span className="small">IMG</span>
                            )}
                          </div>
                          <div>
                            <b style={{ display: 'block' }}>{escapeHtml(it.title)}</b>
                            <span className="small">{escapeHtml(it.category)}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${it.type}`}>
                          {it.type.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${it.status}`}>
                          {it.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="small">{escapeHtml(it.location || '—')}</td>
                      <td className="small">📅 {fmtDate(it.date)}</td>
                      <td className="small">
                        {escapeHtml(it.tags?.slice(0, 3).join(', ') || '—')}
                      </td>
                      <td>
                        <div
                          style={{
                            display: 'flex',
                            gap: 8,
                            flexWrap: 'wrap',
                          }}
                        >
                          <button
                            type="button"
                            className="btn small success"
                            onClick={() => handleStatusChange(it.id, 'returned')}
                          >
                            Mark Returned
                          </button>
                          <button
                            type="button"
                            className="btn small ghost"
                            onClick={() => handleStatusChange(it.id, 'claimed')}
                          >
                            Mark Claimed
                          </button>
                          <button
                            type="button"
                            className="btn small danger"
                            onClick={() => handleDelete(it.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="small" style={{ marginTop: 12 }}>
            Tip: &quot;Mark Claimed&quot; when someone submits a claim; &quot;Mark
            Returned&quot; once handed back.
          </p>
        </div>
      </main>

      <AdminToast />
    </div>
  );
}
