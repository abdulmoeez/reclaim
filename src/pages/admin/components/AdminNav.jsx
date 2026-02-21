import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../AdminContext';

export default function AdminNav() {
  const { session, signOut } = useAdmin();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function handleSignOut() {
    signOut();
    navigate('/admin/login', { replace: true });
  }

  const whoText = session?.building
    ? `${session.building} Admin • ${session.email}`
    : session?.email
      ? `Admin • ${session.email}`
      : 'Not signed in';

  return (
    <header className="nav">
      <div className="wrap">
        <div className="navRow">
          <Link className="brand" to="/admin/dashboard">
            <img src="/logo.png" alt="" className="logo" />
            <span>(Admin Panel)</span>
          </Link>

          <nav className="navLinks" aria-label="Admin navigation">
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/items">Items</Link>
            <Link to="/admin/add-item">Add Item</Link>
            <Link to="/">Public Site</Link>
          </nav>

          <div className="navActions">
            <span className="small">{whoText}</span>
            <button
              type="button"
              className="btn small ghost"
              onClick={handleSignOut}
              aria-label="Sign out"
            >
              Sign out
            </button>
          </div>

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
          <Link to="/admin/dashboard" onClick={() => setMobileNavOpen(false)}>Dashboard</Link>
          <Link to="/admin/items" onClick={() => setMobileNavOpen(false)}>Items</Link>
          <Link to="/admin/add-item" onClick={() => setMobileNavOpen(false)}>Add Item</Link>
          <Link to="/" onClick={() => setMobileNavOpen(false)}>Public Site</Link>
          <span className="navDrawerAction small" style={{ paddingTop: 8, paddingBottom: 8 }}>{whoText}</span>
          <button
            type="button"
            className="navDrawerAction"
            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', font: 'inherit', color: 'inherit' }}
            onClick={() => { setMobileNavOpen(false); handleSignOut(); }}
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
