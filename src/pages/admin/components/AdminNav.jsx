import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../AdminContext';

export default function AdminNav() {
  const { session, signOut } = useAdmin();
  const navigate = useNavigate();

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
            <span className="logo">LF</span>
            <span>Admin Panel</span>
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
        </div>
      </div>
    </header>
  );
}
