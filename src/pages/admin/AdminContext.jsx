import { createContext, useContext, useState, useCallback } from 'react';
import {
  getSession,
  setSession,
  clearSession,
  getItems,
  setItems,
  SUPER_ADMIN,
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

      if (
        email !== SUPER_ADMIN.email ||
        password !== SUPER_ADMIN.password
      ) {
        showToast('Invalid credentials.');
        return false;
      }

      const sessionObj = {
        email: SUPER_ADMIN.email,
        building: SUPER_ADMIN.building,
        loggedInAt: Date.now(),
      };
      setSession(sessionObj);
      setSessionState(sessionObj);
      showToast('Welcome!');
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
