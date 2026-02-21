# Reclaim

**Reclaim** is a campus lost & found web app. Students can browse lost and found items across campus; staff sign in to a dedicated admin panel to add items, update statuses, and manage listings. All data is stored in the browser (localStorage) for a simple, demo-friendly setup—no backend required.

---

## 🎯 Features

- **Public browse** — Search and filter lost & found items by type (found/lost), status (open/claimed/returned), building, category, date range, and keywords. Sort by newest, oldest, or title.
- **Admin panel** — Secure login for staff with a single hardcoded super-admin account. Dashboard with a status donut chart; full CRUD for items (add, edit status, delete) and claim review (approve/reject/returned) scoped by building.
- **Add items** — Admin form to log new items with type, category, location, date, description, optional photo (base64), and tags. Building is auto-filled from the logged-in admin.
- **Item cards** — Each listing shows a thumbnail (placeholder or uploaded image), type/status badges, title, description, category, location, date, and a “Claim” button for ownership verification.
- **Responsive UI** — Layouts adapt for mobile and desktop. Admin and browse pages use a consistent teal/gold theme with clear navigation and toasts for feedback.
- **Seed data** — Up to 20 hardcoded dummy items with placeholder images are loaded when the app is first run (when localStorage is empty), so the app is usable immediately.

---

## 🏗️ Architecture

The app is a single-page React application. Routing is handled by React Router; state is split between React context (admin session, toasts) and localStorage (items, session persistence). There is no server or database—everything runs in the browser.

### Project structure (high level)

- **`src/App.jsx`** — Root component; wraps the app in `AdminProvider` and defines all routes.
- **`src/pages/`** — Page components: `HomePage.jsx` (landing), `ItemsPage.jsx` (browse items), and `pages/admin/` for admin screens (login, dashboard, items list, add item).
- **`src/pages/admin/`** — Admin logic: `AdminContext.jsx` (auth + toasts), `adminStorage.js` (localStorage helpers + seed data), and shared components (e.g. `AdminNav`, `AdminToast`).
- **`public/`** — Static assets (e.g. `logo.png`, `favicon/`).

### How to install and run locally

1. **Prerequisites**  
   Ensure you have **Node.js** (v18 or later recommended) and **npm** installed. Check with:
   ```bash
   node -v
   npm -v
   ```

2. **Clone the repository**  
   ```bash
   git clone https://github.com/abdulmoeez/reclaim
   cd reclaim
   ```

3. **Install dependencies**  
   ```bash
   npm install
   ```

4. **Start the development server**  
   ```bash
   npm run dev
   ```  
   The app will usually be available at **http://localhost:5173** (Vite’s default). Open this URL in your browser.

5. **Admin login**  
   - Go to **Admin** (or `/admin/login`) and sign in with the hardcoded super-admin credentials (see `src/pages/admin/adminStorage.js`), for example:
     - **Email:** `admin@campus.ca`
     - **Password:** `admin123`  
   - After login you can use the dashboard, manage items, and add new ones.

6. **Production build (optional)**  
   ```bash
   npm run build
   npm run preview
   ```  
   `build` outputs to `dist/`; `preview` serves that build locally so you can test the production bundle.

---

## 📚 Documentation

- **Routes**
  - `/` — Home (landing).
  - `/items` — Browse lost & found items (filters, sort, grid of cards).
  - `/admin` — Redirects to `/admin/dashboard`.
  - `/admin/login` — Admin login.
  - `/admin/dashboard` — Admin overview (KPIs, chart, recent items).
  - `/admin/items` — Admin items list (search, filter, status actions, delete).
  - `/admin/claims` — Admin claim review (pending claims with unique identifying detail; approve, reject, or mark returned).
  - `/admin/add-item` — Form to add a new lost/found item.

- **Data**
  - Items, claims, and admin session are stored in **localStorage** under keys `lf_items`, `lf_claims`, and `lf_admin_session`. Clearing site data or using a private window gives a fresh state; the seed runs again when `lf_items` is empty.

- **Customization**
  - Super-admin credentials and building: edit `SUPER_ADMIN` in `src/pages/admin/adminStorage.js`.
  - Seed items (e.g. count, images, buildings): edit the `seed` array in `seedItemsIfEmpty()` in the same file.
  - Logo and favicons: replace files in `public/` (e.g. `logo.png`, `favicon/`).

---

## 🛠️ Tech Stack

| Area           | Technology |
|----------------|------------|
| UI / framework | React 19 |
| Build / dev    | Vite 7 |
| Routing        | React Router DOM 7 |
| Styling        | Plain CSS (App.css, ItemsPage.css, Admin.css) |
| Validation     | PropTypes (runtime prop checks) |
| Data / state   | localStorage (no backend); React Context for admin session and toasts |
| Images (seed)  | Local placeholder (public/seed/) for dummy items |

---

## 🚀 Future Improvements

Things we'd add for a real deployment:

### 1. Real Backend & Secure Database

Replace localStorage with a production-ready backend such as Firebase, Supabase, or MongoDB + Express.

- Support multi-user access with persistent data across devices.
- Implement role-based access control so each building or department can only manage its own items.
- Add audit logs to track item updates and claim actions.

### 2. Notifications (Email, SMS, Push)

Send email or SMS notifications to students when:

- a matching item is found
- their claim is approved or rejected
- an item is marked as returned

Notify admins when new claims are submitted or require review.

- Later expansion to push notifications via a mobile app or PWA.

### 3. Proper Authentication & Institution Verification

Replace the hardcoded admin login with secure authentication.

- Verify users via institution email domains or university SSO (Google/Microsoft/SAML).
- Prevent unauthenticated or non-institution users from browsing or submitting claims, depending on campus policy.

### 4. Multi-University Support (No Hardcoding)

Remove hardcoded buildings and contacts.

- Integrate university APIs (where available) or provide an onboarding flow for new campuses.
- Dynamically load buildings, departments, pickup locations, and contact information per institution.
- Make Reclaim deployable across multiple universities from a single codebase.

### 5. Smart Matching & Recommendations

Automatically suggest potential matches when a user reports a lost item using:

- category, keywords, date range, and building proximity
- Future enhancement: basic image similarity for common items like wallets or phones.


### 6. Analytics for Campus Operations

Dashboard insights for campuses:

- most commonly lost items
- peak locations and times
- recovery rates by building

Helps institutions measure impact and improve operations.

### 7. Accessibility & Mobile Experience

- Improve accessibility (keyboard navigation, ARIA labels, contrast).
- Add multilingual support.
- Convert the site into a Progressive Web App (PWA) for installable, mobile-first use.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Team

Built with ❤️ for .devHacks 2026 by:
- [Abdul Moeez](https://github.com/abdulmoeez)
- [Syed Affan Akhtar](https://github.com/AffanAkhtar1)
- [Anas Motasin Khan](https://github.com/1AnasKhan)
- [Mohammed Kausar](https://github.com/MohdKausar45)