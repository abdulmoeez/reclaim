import { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import AdminNav from './components/AdminNav';
import AdminToast from './components/AdminToast';
import DonutChart from './components/DonutChart';
import { usePageMeta } from '../../hooks/usePageMeta';
import { getItems, escapeHtml, fmtDate } from './adminStorage';
import './Admin.css';

export default function AdminDashboard() {
  usePageMeta('Dashboard | Reclaim Admin', 'Admin dashboard: view stats, recent items, and status breakdown for lost and found.');
  const { session, requireSession } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    const s = requireSession();
    if (!s) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate, requireSession]);

  const { items: scopedItems, stats, recent, chartData } = useMemo(() => {
    const s = requireSession();
    if (!s) return { items: [], stats: null, recent: [], chartData: [] };

    const items = getItems().filter((it) => it.building === s.building);
    const total = items.length;
    const foundCount = items.filter((i) => i.type === 'found').length;
    const lostCount = items.filter((i) => i.type === 'lost').length;
    const openCount = items.filter((i) => i.status === 'open').length;
    const returnedCount = items.filter((i) => i.status === 'returned').length;
    const claimedCount = items.filter((i) => i.status === 'claimed').length;

    const recentItems = [...items]
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      .slice(0, 6);

    return {
      items: items,
      stats: {
        total,
        found: foundCount,
        lost: lostCount,
        open: openCount,
        claimed: claimedCount,
        returned: returnedCount,
      },
      recent: recentItems,
      chartData: [
        { label: 'Open', value: openCount },
        { label: 'Claimed', value: claimedCount },
        { label: 'Returned', value: returnedCount },
      ],
    };
  }, [session, requireSession]);

  if (!session) return null;

  return (
    <div className="admin-page">
      <AdminNav />
      <main className="wrap section">
        <span className="pill">📊 Overview</span>
        <h1 className="h1">Dashboard</h1>
        <p className="sub">
          Quick stats for your building. Manage items and mark returns.
        </p>

        <div className="grid3">
          <div className="kpi">
            <b>{stats?.total ?? 0}</b>
            <span>Total items</span>
          </div>
          <div className="kpi">
            <b>{stats?.found ?? 0}</b>
            <span>Found items</span>
          </div>
          <div className="kpi">
            <b>{stats?.lost ?? 0}</b>
            <span>Lost reports</span>
          </div>
        </div>

        <div className="grid3">
          <div className="kpi">
            <b>{stats?.open ?? 0}</b>
            <span>Open / unclaimed</span>
          </div>
          <div className="kpi">
            <b>{stats?.claimed ?? 0}</b>
            <span>Claimed</span>
          </div>
          <div className="kpi">
            <b>{stats?.returned ?? 0}</b>
            <span>Returned</span>
          </div>
        </div>

        <div className="grid2">
          <div className="card">
            <h3>Status breakdown</h3>
            <p className="small">
              Widget: a donut chart showing Open vs Claimed vs Returned.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 0.9fr',
                gap: 14,
                alignItems: 'center',
                marginTop: 12,
              }}
            >
              <DonutChart data={chartData} />
              <div id="statusLegend">
                {chartData.map((d, i) => (
                  <div
                    key={d.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 10,
                      marginTop: 8,
                    }}
                  >
                    <span className="small">
                      <span
                        style={{
                          display: 'inline-block',
                          width: 10,
                          height: 10,
                          borderRadius: 99,
                          background:
                            ['rgba(245,184,59,.9)', 'rgba(120,180,255,.85)', 'rgba(62,220,142,.85)'][
                              i % 3
                            ],
                          marginRight: 8,
                        }}
                      />
                      {d.label}
                    </span>
                    <span className="small">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hr" />

            <div
              style={{
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              <Link className="btn primary" to="/admin/add-item">
                ➕ Add new item
              </Link>
              <Link className="btn ghost" to="/admin/items">
                🧾 Manage items
              </Link>
            </div>
          </div>

          <div className="card">
            <h3>Recent activity</h3>
            <p className="small">Latest uploads for your building.</p>
            <div style={{ marginTop: 12 }}>
              {!recent.length ? (
                <div className="small">
                  No items yet for {session.building}.
                </div>
              ) : (
                recent.map((it) => (
                  <div
                    key={it.id}
                    style={{
                      padding: '10px 0',
                      borderBottom: '1px solid rgba(255,255,255,.10)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 10,
                        alignItems: 'flex-start',
                      }}
                    >
                      <div>
                        <b style={{ display: 'block' }}>{escapeHtml(it.title)}</b>
                        <span className="small">
                          {escapeHtml(it.category)} • {escapeHtml(it.location || '—')}
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span className={`badge ${it.type}`}>
                          {it.type.toUpperCase()}
                        </span>
                        <div className="small">📅 {fmtDate(it.date)}</div>
                        <div className="small">Status: {escapeHtml(it.status)}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <AdminToast />
    </div>
  );
}
