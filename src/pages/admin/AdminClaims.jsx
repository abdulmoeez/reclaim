import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import AdminNav from './components/AdminNav';
import AdminToast from './components/AdminToast';
import { usePageMeta } from '../../hooks/usePageMeta';
import {
  getItems,
  setItems,
  getClaims,
  updateClaimStatus,
  escapeHtml,
} from './adminStorage';
import './Admin.css';

function updateItemStatus(itemId, status, getItemsFn, setItemsFn) {
  const list = getItemsFn();
  const idx = list.findIndex((x) => x.id === itemId);
  if (idx === -1) return;
  list[idx].status = status;
  setItemsFn(list);
}

export default function AdminClaims() {
  usePageMeta(
    'Claims | Reclaim Admin',
    'Review and approve or reject item claims. Compare unique identifying details with item description and photo.'
  );
  const { session, requireSession, getItems: getItemsFn, setItems: setItemsFn, showToast } =
    useAdmin();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const s = requireSession();
    if (!s) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate, requireSession]);

  const items = useMemo(() => getItemsFn(), [getItemsFn, refreshKey]);
  const allClaims = useMemo(() => getClaims(), [refreshKey]);

  const scopedClaims = useMemo(() => {
    const s = requireSession();
    if (!s || !s.building) return [];
    return allClaims
      .filter((c) => {
        const it = items.find((i) => i.id === c.itemId);
        return it && it.building === s.building;
      })
      .map((c) => ({
        ...c,
        item: items.find((i) => i.id === c.itemId),
      }))
      .filter((c) => c.item)
      .sort((a, b) => (b.submittedAt || 0) - (a.submittedAt || 0));
  }, [session, requireSession, items, allClaims]);

  const pendingClaims = useMemo(
    () => scopedClaims.filter((c) => c.status === 'pending'),
    [scopedClaims]
  );

  const handleApprove = useCallback(
    (claimId, itemId) => {
      updateClaimStatus(claimId, 'approved');
      updateItemStatus(itemId, 'claimed', getItemsFn, setItemsFn);
      setRefreshKey((k) => k + 1);
      showToast('Claim approved. Item marked as claimed.');
    },
    [getItemsFn, setItemsFn, showToast]
  );

  const handleReject = useCallback(
    (claimId) => {
      updateClaimStatus(claimId, 'rejected');
      setRefreshKey((k) => k + 1);
      showToast('Claim rejected.');
    },
    [showToast]
  );

  const handleMarkReturned = useCallback(
    (claimId, itemId) => {
      updateClaimStatus(claimId, 'returned');
      updateItemStatus(itemId, 'returned', getItemsFn, setItemsFn);
      setRefreshKey((k) => k + 1);
      showToast('Marked as returned.');
    },
    [getItemsFn, setItemsFn, showToast]
  );

  if (!session) return null;

  return (
    <div className="admin-page">
      <AdminNav />
      <main className="wrap section">
        <span className="pill">📋 Claim review</span>
        <h1 className="h1">Claims</h1>
        <p className="sub">
          Compare the unique identifying detail with the item description and photo. Approve if it
          matches; reject if it does not. Mark returned when the item is handed back.
        </p>

        {pendingClaims.length === 0 ? (
          <div className="claimsEmpty">
            No pending claims. New claims will appear here when users submit them from the browse
            page.
          </div>
        ) : (
          <div className="claimsList">
            {pendingClaims.map((c) => (
              <article key={c.id} className="claimCard">
                <div className="claimCardHeader">
                  <h3 className="claimItemName">{escapeHtml(c.item?.title || 'Unknown item')}</h3>
                  <span className="claimStatusBadge pending">Pending</span>
                </div>

                <div className="claimCardBody">
                  <div className="claimRow">
                    <span className="claimLabel">Claimant</span>
                    <span className="claimValue">
                      {escapeHtml(c.claimantName)} ·{' '}
                      <a href={`mailto:${escapeHtml(c.claimantEmail)}`} className="claimLink">
                        {escapeHtml(c.claimantEmail)}
                      </a>
                    </span>
                  </div>

                  <div className="claimRow claimRowHighlight">
                    <span className="claimLabel">Unique identifying detail</span>
                    <blockquote className="claimUniqueDetail">
                      {escapeHtml(c.uniqueDetail)}
                    </blockquote>
                  </div>

                  <div className="claimRow">
                    <span className="claimLabel">Item description</span>
                    <p className="claimItemDesc">{escapeHtml(c.item?.description || '—')}</p>
                  </div>

                  {c.item?.photoDataUrl && (
                    <div className="claimRow">
                      <span className="claimLabel">Photo</span>
                      <div className="claimPhoto">
                        <img src={c.item.photoDataUrl} alt="" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="claimCardActions">
                  <button
                    type="button"
                    className="btn success"
                    onClick={() => handleApprove(c.id, c.itemId)}
                    title="Approve claim"
                  >
                    ✓ Approve claim
                  </button>
                  <button
                    type="button"
                    className="btn danger"
                    onClick={() => handleReject(c.id)}
                    title="Reject claim"
                  >
                    ✗ Reject
                  </button>
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => handleMarkReturned(c.id, c.itemId)}
                    title="Mark item as returned"
                  >
                    📦 Mark returned
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {scopedClaims.filter((c) => c.status !== 'pending').length > 0 && (
          <section className="claimsResolved" style={{ marginTop: 36 }}>
            <h2 className="h2">Resolved claims</h2>
            <div className="claimsList">
              {scopedClaims
                .filter((c) => c.status !== 'pending')
                .map((c) => (
                  <article key={c.id} className="claimCard resolved">
                    <div className="claimCardHeader">
                      <h3 className="claimItemName">{escapeHtml(c.item?.title || 'Unknown item')}</h3>
                      <span className={`claimStatusBadge ${c.status}`}>{c.status}</span>
                    </div>
                    <div className="claimCardBody compact">
                      <div className="claimRow">
                        <span className="claimLabel">Claimant</span>
                        <span className="claimValue">
                          {escapeHtml(c.claimantName)} · {escapeHtml(c.claimantEmail)}
                        </span>
                      </div>
                      <div className="claimRow claimRowHighlight">
                        <span className="claimLabel">Unique detail</span>
                        <span className="claimUniqueDetailInline">{escapeHtml(c.uniqueDetail)}</span>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        )}
      </main>

      <AdminToast />
    </div>
  );
}
