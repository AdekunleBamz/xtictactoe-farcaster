// Leaf Green Theme Hook

import { useState, useCallback, useEffect } from 'react';
import { leafColors, forestColors, themeConfig } from '@/utils/theme';

export interface ThemeState {
  isDark: boolean;
  primaryColor: string;
  accentColor: string;
}

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModeQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    darkModeQuery.addEventListener('change', handler);
    return () => darkModeQuery.removeEventListener('change', handler);
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const getBackgroundColor = useCallback(() => {
    return isDark ? leafColors[900] : leafColors[100];
  }, [isDark]);

  const getTextColor = useCallback(() => {
    return isDark ? leafColors[100] : leafColors[800];
  }, [isDark]);

  const getSurfaceColor = useCallback(() => {
    return isDark ? leafColors[800] : leafColors[50];
  }, [isDark]);

  return {
    isDark,
    toggleDark,
    colors: leafColors,
    forest: forestColors,
    config: themeConfig,
    getBackgroundColor,
    getTextColor,
    getSurfaceColor,
  };
};

export default useTheme;
