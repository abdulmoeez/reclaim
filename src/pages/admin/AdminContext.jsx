import { createContext, useContext, useState, useCallback } from 'react';
import {
  getSession,
  setSession,
  clearSession,
  getAdmins,
  setAdmins,
  getItems,
  setItems,
} from './adminStorage';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [session, setSessionState] = useState(() => getSession());
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    const timer = setTimeout(() => setToastMessage(null), 2400);
    return () => clearTimeout(timer);
  }, []);

  const login = useCallback(
    (form) => {
      const email = form.email.value.trim().toLowerCase();
      const password = form.password.value;

      if (!email || !password) {
        showToast('Please enter email and password.');
        return false;
      }

      const admins = getAdmins();
      const found = admins.find((a) => a.email === email && a.password === password);
      if (!found) {
        showToast('Invalid credentials.');
        return false;
      }

      const sessionObj = {
        email: found.email,
        building: found.building,
        loggedInAt: Date.now(),
      };
      setSession(sessionObj);
      setSessionState(sessionObj);
      showToast('Welcome!');
      return true;
    },
    [showToast]
  );

  const register = useCallback(
    (form) => {
      const email = form.email.value.trim().toLowerCase();
      const building = form.building.value.trim();
      const password = form.password.value;
      const password2 = form.password2.value;

      if (!email || !building || !password) {
        showToast('Please fill all fields.');
        return false;
      }
      if (password.length < 6) {
        showToast('Password must be at least 6 characters.');
        return false;
      }
      if (password !== password2) {
        showToast('Passwords do not match.');
        return false;
      }

      const admins = getAdmins();
      if (admins.some((a) => a.email === email)) {
        showToast('Admin already exists. Please login.');
        return false;
      }

      admins.push({ email, building, password });
      setAdmins(admins);
      showToast('Admin registered. You can login now.');
      return true;
    },
    [showToast]
  );

  const signOut = useCallback(() => {
    clearSession();
    setSessionState(null);
    showToast('Signed out');
  }, [showToast]);

  const value = {
    session,
    toastMessage,
    showToast,
    login,
    register,
    signOut,
    getItems,
    setItems,
    requireSession: () => {
      const s = getSession();
      if (!s || !s.email) return null;
      return s;
    },
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return ctx;
}
