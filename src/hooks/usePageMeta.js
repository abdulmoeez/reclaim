import { useEffect } from 'react';

// sets page title and meta description
export function usePageMeta(title, description = '') {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (description) {
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
    return () => {
      document.title = 'Reclaim';
      if (metaDesc && description) {
        metaDesc.setAttribute('content', 'Campus lost & found. Browse and manage lost and found items.');
      }
    };
  }, [title, description]);
}
