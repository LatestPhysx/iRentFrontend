import { useEffect, useState } from 'react';

// Apply or remove the `.dark` class on <html> and persist in localStorage
const applyTheme = (isDark: boolean) => {
  const html = document.documentElement;

  if (isDark) {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;

    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      applyTheme(true);
      return true;
    }
    if (stored === 'light') {
      applyTheme(false);
      return false;
    }

    // Default to light mode
    applyTheme(false);
    return false;
  });

  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      applyTheme(next);
      return next;
    });
  };

  return { isDark, toggleTheme };
};
