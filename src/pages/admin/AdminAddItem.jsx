import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import AdminNav from './components/AdminNav';
import AdminToast from './components/AdminToast';
import { getItems, setItems, cryptoRandomId, fileToDataUrl } from './adminStorage';
import './Admin.css';

const CATEGORIES = [
  'Keys',
  'Wallet',
  'Electronics',
  'ID / Cards',
  'Clothing',
  'Jewelry',
  'Books / Notes',
  'Other',
];

export default function AdminAddItem() {
  const { session, requireSession, showToast } = useAdmin();
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoDataUrl, setPhotoDataUrl] = useState('');

  useEffect(() => {
    const s = requireSession();
    if (!s) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate, requireSession]);

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setPhotoDataUrl(dataUrl);
      setPhotoPreview(dataUrl);
    } catch {
      showToast('Failed to load image');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const s = requireSession();
    if (!s) return;

    const form = e.target;
    const data = {
      id: cryptoRandomId(),
      type: form.type.value,
      title: form.title.value.trim(),
      category: form.category.value,
      building: form.building.value.trim() || s.building,
      location: form.location.value.trim(),
      date: form.date.value,
      status: form.status.value,
      description: form.description.value.trim(),
      contactEmail: form.contactEmail.value.trim(),
      tags: (form.tags.value || '')
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
      photoDataUrl,
    };

    if (!data.title || !data.category || !data.location || !data.date) {
      showToast('Please fill required fields (title, category, location, date).');
      return;
    }

    const items = getItems();
    items.push(data);
    setItems(items);

    showToast('Item added!');
    navigate('/admin/items', { replace: true });
  }

  if (!session) return null;

  return (
    <div className="admin-page">
      <AdminNav />
      <main className="wrap section">
        <span className="pill">➕ Upload</span>
        <h1 className="h1">Add a lost/found item</h1>
        <p className="sub">
          Use this form at the building desk to log items quickly and
          consistently.
        </p>

        <div className="grid2">
          <div className="card">
            <h3>Item details</h3>
            <form onSubmit={handleSubmit}>
              <div className="formRow">
                <div className="formGroup">
                  <label htmlFor="add-type">Type *</label>
                  <select id="add-type" name="type" className="input" required>
                    <option value="found">Found (uploaded by staff)</option>
                    <option value="lost">Lost (student report)</option>
                  </select>
                </div>
                <div className="formGroup">
                  <label htmlFor="add-status">Status *</label>
                  <select id="add-status" name="status" className="input" required>
                    <option value="open">Open / Unclaimed</option>
                    <option value="claimed">Claimed</option>
                    <option value="returned">Returned</option>
                  </select>
                </div>
              </div>

              <div className="formGroup">
                <label htmlFor="add-title">Item title *</label>
                <input
                  id="add-title"
                  name="title"
                  className="input"
                  placeholder="e.g., Black wallet, Silver keys, iPhone 13..."
                  required
                />
              </div>

              <div className="formRow">
                <div className="formGroup">
                  <label htmlFor="add-category">Category *</label>
                  <select id="add-category" name="category" className="input" required>
                    <option value="">Select category…</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="formGroup">
                  <label htmlFor="add-date">Date found/lost *</label>
                  <input
                    id="add-date"
                    name="date"
                    type="date"
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="formRow">
                <div className="formGroup">
                  <label htmlFor="add-building">Building *</label>
                  <input
                    id="add-building"
                    name="building"
                    className="input"
                    placeholder="Engineering"
                    defaultValue={session.building}
                    readOnly
                    required
                  />
                  <div className="small" style={{ marginTop: 6 }}>
                    Auto-filled from your admin building.
                  </div>
                </div>
                <div className="formGroup">
                  <label htmlFor="add-location">Location in building *</label>
                  <input
                    id="add-location"
                    name="location"
                    className="input"
                    placeholder="Front desk, Room 201, 2nd floor hallway..."
                    required
                  />
                </div>
              </div>

              <div className="formGroup">
                <label htmlFor="add-description">Description / identifying notes</label>
                <textarea
                  id="add-description"
                  name="description"
                  className="input"
                  placeholder='Include helpful details. Avoid personal info. Example: "Blue case with scratch near camera."'
                />
              </div>

              <div className="formRow">
                <div className="formGroup">
                  <label htmlFor="add-contact">Contact email (optional)</label>
                  <input
                    id="add-contact"
                    name="contactEmail"
                    type="email"
                    className="input"
                    placeholder="If lost report: student email"
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="add-tags">Tags (comma-separated)</label>
                  <input
                    id="add-tags"
                    name="tags"
                    className="input"
                    placeholder="wallet, black, leather"
                  />
                </div>
              </div>

              <div className="formGroup">
                <label htmlFor="add-photo">Photo (optional but recommended)</label>
                <input
                  id="add-photo"
                  type="file"
                  accept="image/*"
                  className="input"
                  onChange={handlePhotoChange}
                />
           
              </div>

              <div
                className="formGroup"
                style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}
              >
                <button className="btn primary" type="submit">
                  Save item
                </button>
                <Link className="btn ghost" to="/admin/items">
                  Cancel
                </Link>
              </div>
            </form>
          </div>

          <div className="card">
            <h3>Preview</h3>
            <p className="small">Photo preview appears here (optional).</p>
            <div style={{ marginTop: 12 }}>
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  style={{
                    width: '100%',
                    maxHeight: 220,
                    objectFit: 'cover',
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,.14)',
                  }}
                />
              ) : (
                <div
                  style={{
                    border: '1px dashed rgba(255,255,255,.22)',
                    borderRadius: 16,
                    padding: 18,
                    color: 'rgba(255,255,255,.75)',
                  }}
                >
                  Upload a photo to see preview.
                </div>
              )}
            </div>

            <div/>

          </div>
        </div>
      </main>

      <AdminToast />
    </div>
  );
}
