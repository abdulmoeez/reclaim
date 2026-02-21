import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './pages/admin';
import HomePage from './pages/HomePage';
import {
  AdminLogin,
  AdminRegister,
  AdminDashboard,
  AdminItems,
  AdminAddItem,
} from './pages/admin';

function App() {
  return (
    <AdminProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/items" element={<AdminItems />} />
        <Route path="/admin/add-item" element={<AdminAddItem />} />
      </Routes>
    </AdminProvider>
  );
}

export default App;
