import { useAdmin } from '../AdminContext';

export default function AdminToast() {
  const { toastMessage } = useAdmin();

  if (!toastMessage) return null;

  return (
    <div
      className="toast visible"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {toastMessage}
    </div>
  );
}
