import { Link } from 'react-router-dom';
import '../App.css';

export default function HomePage() {
  return (
    <>
      <header className="nav">
        <div className="wrap">
          <div className="navRow">
            <a className="brand" href="#top" aria-label="Campus Lost & Found">
              <span className="logo">LF</span>
              <span>Campus Lost &amp; Found</span>
            </a>

            <nav className="navLinks" aria-label="Primary">
              <a href="#how">How it works</a>
              <a href="#search">Search</a>
              <a href="#admins">For Buildings</a>
              <a href="#faq">FAQ</a>
            </nav>

            <div className="navActions">
              <div className="search" role="search">
                <span aria-hidden="true">🔎</span>
                <input id="topSearch" type="search" placeholder="Search for items (demo)..." />
              </div>
              <Link className="btn small ghost" to="/admin/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main id="top" className="hero">
        <div className="wrap">
          <div className="heroGrid">
            <div>
              <span className="pill">🏫 Centralized campus-wide lost &amp; found</span>
              <h1>Lost Something On Campus?<br/>Let&apos;s Help You Find It</h1>
              <p>
                Search every campus department&apos;s lost &amp; found in minutes.
                Post lost items, browse found ones, and reconnect with what matters —
                all in one place.
              </p>

              <div className="heroCtas">
                <a className="btn primary" href="#cta">📌 Report an Item</a>
                <a className="btn ghost" href="#search">🔍 Browse Lost Items</a>
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
              <img src="original-0791b30b5572fc7719571ef361625ebd.webp" alt="Lost and found hero illustration" />
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

      <section className="section tight">
        <div className="wrap">
          <span className="pill">🔐 Trust &amp; safety</span>
          <h2 className="h2">Safe, secure, and responsible</h2>
          <p className="sub">
            We avoid public contact sharing and encourage ownership verification before any handoff.
          </p>

          <div className="grid3">
            <div className="card">
              <div className="icon">🛡</div>
              <h3>No public personal info</h3>
              <p>Students and staff don&apos;t expose phone numbers publicly on listings.</p>
            </div>
            <div className="card">
              <div className="icon">🧾</div>
              <h3>Verify ownership</h3>
              <p>Claim forms require a unique identifying detail (e.g., sticker, scratch, contents).</p>
            </div>
            <div className="card">
              <div className="icon">🧑‍💼</div>
              <h3>Admin-controlled listings</h3>
              <p>Found items are uploaded by building lost &amp; found desks for accuracy and trust.</p>
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
            <div className="stat"><b>12</b><span>Buildings connected</span></div>
            <div className="stat"><b>300+</b><span>Items logged</span></div>
            <div className="stat"><b>82%</b><span>Recovery rate</span></div>
            <div className="stat"><b>&lt; 2 min</b><span>Average search time</span></div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <span className="pill">💬 Student feedback</span>
          <h2 className="h2">Built for real people</h2>
          <p className="sub">Simple UX, fast search, and a safe claim flow.</p>

          <div className="grid3">
            <div className="card quote">
              <p>Found my keys in minutes. I used filters by building and it was right there.</p>
              <div className="who">
                <div className="avatar">A</div>
                <div>
                  <b>Abdul</b><br/>
                  <small>Student</small>
                </div>
              </div>
            </div>

            <div className="card quote">
              <p>The admin upload is super fast. This would reduce so much front desk traffic.</p>
              <div className="who">
                <div className="avatar">S</div>
                <div>
                  <b>Sam</b><br/>
                  <small>Building staff</small>
                </div>
              </div>
            </div>

            <div className="card quote">
              <p>Love that it doesn&apos;t show personal info publicly. Claiming feels safe.</p>
              <div className="who">
                <div className="avatar">M</div>
                <div>
                  <b>Maya</b><br/>
                  <small>Student</small>
                </div>
              </div>
            </div>
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
              <a className="btn primary" href="#search">🔎 Search items</a>
              <a className="btn ghost" href="#top">📌 Report lost item</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footerGrid">
            <div className="foot">
              <div className="brand" style={{ marginBottom: '10px' }}>
                <span className="logo">LF</span>
                <span>Campus Lost &amp; Found</span>
              </div>
              <p className="sub" style={{ margin: 0, maxWidth: '44ch' }}>
                One platform connecting every building&apos;s lost &amp; found so students can recover items faster.
              </p>
            </div>

            <div className="foot">
              <h4>Platform</h4>
              <a href="#top">Home</a>
              <a href="#search">Search</a>
              <a href="#how">How it works</a>
              <a href="#faq">FAQ</a>
            </div>

            <div className="foot">
              <h4>For Staff</h4>
              <Link to="/admin/login">Admin tools</Link>
              <Link to="/admin/login">Upload found items</Link>
              <Link to="/admin/login">Manage claims</Link>
            </div>

            <div className="foot">
              <h4>Support</h4>
              <a href="#faq">Help center</a>
              <a href="#faq">Privacy policy</a>
              <a href="#faq">Terms</a>
            </div>
          </div>

          <div className="copy">
            <span>© {new Date().getFullYear()} Campus Lost &amp; Found — Demo landing page</span>
            <span>Made for a 24-hour hackathon</span>
          </div>
        </div>
      </footer>
    </>
  );
}
