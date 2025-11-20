import { useEffect } from 'react';

interface ShortcutHandlers {
  approve?: () => void;
  reject?: () => void;
  next?: () => void;
  prev?: () => void;
  focusSearch?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ensure shortcuts don't trigger in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'a' || e.key === 'A') handlers.approve?.();
      if (e.key === 'd' || e.key === 'D') handlers.reject?.(); // 'd' for decline/reject
      if (e.key === 'ArrowRight') handlers.next?.();
      if (e.key === 'ArrowLeft') handlers.prev?.();
      if (e.key === '/') {
        e.preventDefault();
        handlers.focusSearch?.();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handlers]);
}
