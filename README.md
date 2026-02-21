# Reclaim

**Reclaim** is a campus lost & found web app. Students can browse lost and found items across campus; staff sign in to a dedicated admin panel to add items, update statuses, and manage listings. All data is stored in the browser (localStorage) for a simple, demo-friendly setup—no backend required.

---

## 🎯 Features

- **Public browse** — Search and filter lost & found items by type (found/lost), status (open/claimed/returned), building, category, date range, and keywords. Sort by newest, oldest, or title.
- **Admin panel** — Secure login for staff with a single hardcoded super-admin account. Dashboard with KPIs and a status donut chart; full CRUD for items (add, edit status, delete) scoped by building.
- **Add items** — Admin form to log new items with type, category, location, date, description, optional photo (base64), and tags. Building is auto-filled from the logged-in admin.
- **Item cards** — Each listing shows a thumbnail (placeholder or uploaded image), type/status badges, title, description, category, location, date, and a “Copy share text” action for easy sharing.
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
   git clone <repository-url>
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
  - `/admin/add-item` — Form to add a new lost/found item.

- **Data**
  - Items and admin session are stored in **localStorage** under keys `lf_items` and `lf_admin_session`. Clearing site data or using a private window gives a fresh state; the seed runs again when `lf_items` is empty.

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
| Images (seed)  | Picsum Photos (placeholder URLs) for dummy items |

---

## 📄 License

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
