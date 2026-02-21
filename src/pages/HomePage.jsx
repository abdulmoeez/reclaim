import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { getItems } from './admin/adminStorage';
import '../App.css';

export default function HomePage() {
  usePageMeta(
    'Reclaim | Campus Lost & Found',
    'Campus lost & found. Search and browse lost and found items across campus. Report lost items and recover what matters.'
  );

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const stats = useMemo(() => {
    const items = getItems();
    const total = items.length;
    const buildings = new Set(items.map((i) => i.building).filter(Boolean));
    const returned = items.filter((i) => i.status === 'returned').length;
    const recoveryRate = total > 0 ? Math.round((returned / total) * 100) : 0;
    return {
      buildingsConnected: buildings.size,
      itemsLogged: total,
      recoveryRate,
    };
  }, []);

  return (
    <>
      <header className="nav">
        <div className="wrap">
          <div className="navRow">
            <Link className="brand" to="/" aria-label="Campus Lost & Found">
              <img src="/logo.png" alt="" className="logo" />
            </Link>

            <nav className="navLinks" aria-label="Primary">
              <Link to="/items">Browse items</Link>
              <a href="#how">How it works</a>
              <a href="#faq">FAQ</a>
            </nav>

            <button
              type="button"
              className="navMenuBtn"
              aria-label="Toggle menu"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((o) => !o)}
            >
              {mobileNavOpen ? '✕' : '☰'}
            </button>
          </div>
          <div className={`navDrawer ${mobileNavOpen ? 'isOpen' : ''}`}>
            <Link to="/items" onClick={() => setMobileNavOpen(false)}>Browse items</Link>
            <a href="#how" onClick={() => setMobileNavOpen(false)}>How it works</a>
            <a href="#faq" onClick={() => setMobileNavOpen(false)}>FAQ</a>
          </div>
        </div>
      </header>

      <main id="top" className="hero">
        <div className="wrap">
          <div className="heroGrid">
            <div className="heroGridContainer">
              <span className="pill">🏫 Centralized campus-wide lost &amp; found</span>
              <h1>Lost Something On Campus?<br/>Let&apos;s Help You Find It</h1>
              <p>
                Search every campus department&apos;s lost &amp; found in minutes.
                Post lost items, browse found ones, and reconnect with what matters —
                all in one place.
              </p>

              <div className="heroCtas">
                <Link className="btn primary" to="/items">🔍 Browse Lost Items</Link>
              </div>

              <div className="featureBar" aria-label="Highlights">
                <div className="mini">
                  <b>Building-admin uploads</b>
                  <span>Each building logs items securely via admin panel.</span>
                </div>
                <div className="mini">
                  <b>Smart filters</b>
                  <span>Filter by building, category, date, and keywords.</span>
                </div>
                <div className="mini">
                  <b>Safe claiming</b>
                  <span>No public contact info—verify ownership first.</span>
                </div>
                <div className="mini">
                  <b>Mobile-first</b>
                  <span>Designed for quick searches on your phone.</span>
                </div>
              </div>
            </div>

            <div className="heroArt" aria-label="Hero illustration">
              <img src="/campus.jpg" alt="Lost and found hero illustration" />
            </div>
          </div>
        </div>
      </main>

      <section id="how" className="section">
        <div className="wrap">
          <span className="pill">⚡ Simple process</span>
          <h2 className="h2">How it works</h2>
          <p className="sub">
            Instead of walking building to building, campus staff upload found items once —
            and students search everything centrally.
          </p>

          <div className="grid3">
            <div className="card">
              <div className="icon">🏢</div>
              <h3>1) Buildings upload items</h3>
              <p>Each department has admin access to log found items with photo, category, and location.</p>
            </div>
            <div className="card">
              <div className="icon">🔎</div>
              <h3>2) Students search centrally</h3>
              <p>Filter by building, category, and date. Search keywords like &quot;wallet&quot; or &quot;AirPods&quot;.</p>
            </div>
            <div className="card">
              <div className="icon">✅</div>
              <h3>3) Claim &amp; recover safely</h3>
              <p>Submit a claim with a unique identifying detail. Staff confirm and mark the item returned.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="admins" className="section">
        <div className="wrap">
          <span className="pill">🛠 For buildings</span>
          <h2 className="h2">Built for campus operations</h2>
          <p className="sub">
            Each building gets its own admin dashboard to upload items and manage claim requests —
            keeping workflows simple for staff.
          </p>

          <div className="grid3">
            <div className="card">
              <div className="icon">⏱</div>
              <h3>Upload in under 30 seconds</h3>
              <p>Quick form: category, photo, where found, date, and notes. Done.</p>
            </div>
            <div className="card">
              <div className="icon">📌</div>
              <h3>Track item status</h3>
              <p>Unclaimed → Claimed → Returned. Clear status badges keep everything organized.</p>
            </div>
            <div className="card">
              <div className="icon">📬</div>
              <h3>Claim requests</h3>
              <p>Students submit identifying details; staff can approve and mark returned safely.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <span className="pill">📈 Impact</span>
          <h2 className="h2">Real campus value</h2>
          <p className="sub">Even a small rollout saves hours of walking around and reduces front-desk traffic.</p>

          <div className="stats">
            <div className="stat"><b>{stats.buildingsConnected}</b><span>Buildings connected</span></div>
            <div className="stat"><b>{stats.itemsLogged}</b><span>Items logged</span></div>
            <div className="stat"><b>{stats.recoveryRate}%</b><span>Recovery rate</span></div>
            <div className="stat"><b>Instant</b><span>Search</span></div>
          </div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="wrap">
          <span className="pill">FAQ</span>
          <h2 className="h2">Questions</h2>
          <p className="sub">Quick answers for students and campus staff.</p>

          <div className="faq">
            <details open>
              <summary>Do I need an account to search? <span className="caret">▾</span></summary>
              <p>No. Searching and browsing is public. Reporting and admin tools can require login.</p>
            </details>

            <details>
              <summary>How do you prevent false claims? <span className="caret">▾</span></summary>
              <p>Claim requests require a unique identifying detail. Staff confirm before marking an item returned.</p>
            </details>

            <details>
              <summary>Can each building manage only its own items? <span className="caret">▾</span></summary>
              <p>Yes. Admin accounts are building-scoped so staff only see items from their department.</p>
            </details>

            <details>
              <summary>What happens when an item is returned? <span className="caret">▾</span></summary>
              <p>Staff mark it as returned and it no longer appears in the default &quot;unclaimed&quot; search results.</p>
            </details>
          </div>

          <div style={{ height: '18px' }} />

          <div className="ctaBand" id="cta">
            <div>
              <h3>Ready to find your item?</h3>
              <p>Search campus-wide listings or report what you lost in seconds.</p>
            </div>
            <div className="buttons">
              <Link className="btn primary" to="/items">🔎 Browse items</Link>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="copy">
            <span>© 2026 Reclaim</span>
          </div>
        </div>
      </footer>
    </>
  );
}
