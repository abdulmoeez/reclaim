import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import AdminAuthNav from './components/AdminAuthNav';
import AdminToast from './components/AdminToast';
import './Admin.css';

export default function AdminLogin() {
  const { session, login } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (session?.email) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [session, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    const ok = login(e.target);
    if (ok) {
      navigate('/admin/dashboard', { replace: true });
    }
  }

  return (
    <div className="admin-page">
      <AdminAuthNav backTo="/" backLabel="← Back to site" />
      <main className="wrap">
        <div className="card authBox">
          <span className="pill">🔐 Admin Access</span>
          <h1 className="h1">Login</h1>
          <p className="sub">
            For building lost &amp; found staff. Sign in with the super admin
            credentials.
          </p>

          <div className="hr" />

          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                className="input"
                name="email"
                type="email"
                placeholder="admin@campus.ca"
                required
                autoComplete="email"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                className="input"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <div
              className="formGroup"
              style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}
            >
              <button className="btn primary" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </main>

      <AdminToast />
    </div>
  );
}
