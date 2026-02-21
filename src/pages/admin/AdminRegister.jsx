import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import AdminAuthNav from './components/AdminAuthNav';
import AdminToast from './components/AdminToast';
import './Admin.css';

export default function AdminRegister() {
  const { register } = useAdmin();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const ok = register(e.target);
    if (ok) {
      navigate('/admin/login', { replace: true });
    }
  }

  return (
    <div className="admin-page">
      <AdminAuthNav backTo="/admin/login" backLabel="← Back to login" />
      <main className="wrap">
        <div className="card authBox">
          <span className="pill">🏢 Building Admin Setup</span>
          <h1 className="h1">Create Admin Account</h1>
          <p className="sub">
            Assign an admin to a building (Engineering, Library, UC, etc.).
          </p>

          <div className="hr" />

          <form onSubmit={handleSubmit}>
            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="reg-email">Email</label>
                <input
                  id="reg-email"
                  className="input"
                  name="email"
                  type="email"
                  placeholder="engineering.admin@campus.ca"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="reg-building">Building</label>
                <input
                  id="reg-building"
                  className="input"
                  name="building"
                  type="text"
                  placeholder="Engineering"
                  required
                  autoComplete="organization"
                />
              </div>
            </div>

            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="reg-password">Password</label>
                <input
                  id="reg-password"
                  className="input"
                  name="password"
                  type="password"
                  placeholder="min 6 characters"
                  required
                  autoComplete="new-password"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="reg-password2">Confirm Password</label>
                <input
                  id="reg-password2"
                  className="input"
                  name="password2"
                  type="password"
                  placeholder="repeat password"
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div
              className="formGroup"
              style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}
            >
              <button className="btn primary" type="submit">
                Create admin
              </button>
              <Link className="btn ghost" to="/admin/login">
                I already have an account
              </Link>
            </div>
          </form>
        </div>
      </main>

      <AdminToast />
    </div>
  );
}
