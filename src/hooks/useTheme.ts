import { useState, useEffect } from "react";

export interface ThemeColors {
  primary: string; // HSL values like "266 100% 50%"
  accent: string;
  background: string;
  foreground: string;
  cardBackground: string;
  mutedForeground: string;
}

const THEME_STORAGE_KEY = "portfolio_theme";
const DARK_MODE_KEY = "portfolio_dark_mode";

const defaultTheme: ThemeColors = {
  primary: "266 100% 50%",
  accent: "280 100% 60%",
  background: "0 0% 100%",
  foreground: "265 4% 12.9%",
  cardBackground: "0 0% 98%",
  mutedForeground: "265 4% 45%",
};

const defaultDarkTheme: ThemeColors = {
  primary: "270 100% 70%",
  accent: "280 100% 60%",
  background: "0 0% 8%",
  foreground: "0 0% 98%",
  cardBackground: "0 0% 12%",
  mutedForeground: "0 0% 65%",
};

export const getStoredTheme = (): ThemeColors => {
  if (typeof window === "undefined") return defaultTheme;
  
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored) {
    try {
      return { ...defaultTheme, ...JSON.parse(stored) };
    } catch {
      return defaultTheme;
    }
  }
  return defaultTheme;
};

export const getStoredDarkMode = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(DARK_MODE_KEY) === "true";
};

export const saveTheme = (theme: ThemeColors): void => {
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
};

export const saveDarkMode = (isDark: boolean): void => {
  localStorage.setItem(DARK_MODE_KEY, isDark.toString());
};

export const applyTheme = (theme: ThemeColors, isDarkMode: boolean): void => {
  const root = document.documentElement;
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--foreground", theme.foreground);
  root.style.setProperty("--card", theme.cardBackground);
  root.style.setProperty("--card-foreground", theme.foreground);
  root.style.setProperty("--muted-foreground", theme.mutedForeground);
  
  // Update related colors based on primary
  const primaryHue = theme.primary.split(" ")[0];
  root.style.setProperty("--primary-foreground", "0 0% 100%");
  root.style.setProperty("--accent-foreground", "0 0% 100%");
  root.style.setProperty("--ring", `${primaryHue} 50% 60%`);
  
  // Update secondary and muted based on dark mode
  if (isDarkMode) {
    // Dark mode adjustments
    root.style.setProperty("--secondary", "0 0% 18%");
    root.style.setProperty("--secondary-foreground", "0 0% 98%");
    root.style.setProperty("--muted", "0 0% 18%");
    root.style.setProperty("--border", "0 0% 22%");
    root.style.setProperty("--input", "0 0% 22%");
    root.style.setProperty("--popover", theme.cardBackground);
    root.style.setProperty("--popover-foreground", theme.foreground);
  } else {
    // Light mode adjustments
    root.style.setProperty("--secondary", "0 0% 92%");
    root.style.setProperty("--secondary-foreground", "0 0% 12%");
    root.style.setProperty("--muted", "0 0% 96%");
    root.style.setProperty("--border", "0 0% 88%");
    root.style.setProperty("--input", "0 0% 88%");
    root.style.setProperty("--popover", theme.cardBackground);
    root.style.setProperty("--popover-foreground", theme.foreground);
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedTheme = getStoredTheme();
    const storedDarkMode = getStoredDarkMode();
    setTheme(storedTheme);
    setIsDarkMode(storedDarkMode);
    applyTheme(storedTheme, storedDarkMode);
    setIsLoaded(true);
  }, []);

  const updateTheme = (newTheme: Partial<ThemeColors>) => {
    const updated = { ...theme, ...newTheme };
    setTheme(updated);
    saveTheme(updated);
    applyTheme(updated, isDarkMode);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    const newTheme = newDarkMode ? defaultDarkTheme : defaultTheme;
    setIsDarkMode(newDarkMode);
    setTheme(newTheme);
    saveDarkMode(newDarkMode);
    saveTheme(newTheme);
    applyTheme(newTheme, newDarkMode);
  };

  const resetTheme = () => {
    const baseTheme = isDarkMode ? defaultDarkTheme : defaultTheme;
    setTheme(baseTheme);
    saveTheme(baseTheme);
    applyTheme(baseTheme, isDarkMode);
  };

  return { theme, updateTheme, resetTheme, isLoaded, defaultTheme, defaultDarkTheme, isDarkMode, toggleDarkMode };
};
