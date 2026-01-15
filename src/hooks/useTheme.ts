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
  foreground: "248 0.3% 98.4%",
  cardBackground: "0 0% 12%",
  mutedForeground: "265 4% 65%",
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

export const saveTheme = (theme: ThemeColors): void => {
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
};

export const applyTheme = (theme: ThemeColors): void => {
  const root = document.documentElement;
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--foreground", theme.foreground);
  root.style.setProperty("--card", theme.cardBackground);
  root.style.setProperty("--muted-foreground", theme.mutedForeground);
  
  // Update related colors based on primary
  const primaryHue = theme.primary.split(" ")[0];
  root.style.setProperty("--primary-foreground", "0 0% 100%");
  root.style.setProperty("--accent-foreground", "0 0% 100%");
  root.style.setProperty("--ring", `${primaryHue} 50% 60%`);
  
  // Update secondary and muted based on background
  const bgLightness = parseFloat(theme.background.split(" ")[2]);
  if (bgLightness < 50) {
    // Dark mode adjustments
    root.style.setProperty("--secondary", "0 0% 15%");
    root.style.setProperty("--muted", "0 0% 15%");
    root.style.setProperty("--border", "0 0% 20%");
    root.style.setProperty("--input", "0 0% 20%");
    root.style.setProperty("--popover", theme.cardBackground);
  } else {
    // Light mode adjustments
    root.style.setProperty("--secondary", "0 0% 96%");
    root.style.setProperty("--muted", "0 0% 96%");
    root.style.setProperty("--border", "0 0% 90%");
    root.style.setProperty("--input", "0 0% 90%");
    root.style.setProperty("--popover", theme.cardBackground);
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedTheme = getStoredTheme();
    setTheme(storedTheme);
    applyTheme(storedTheme);
    setIsLoaded(true);
  }, []);

  const updateTheme = (newTheme: Partial<ThemeColors>) => {
    const updated = { ...theme, ...newTheme };
    setTheme(updated);
    saveTheme(updated);
    applyTheme(updated);
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
    saveTheme(defaultTheme);
    applyTheme(defaultTheme);
  };

  return { theme, updateTheme, resetTheme, isLoaded, defaultTheme, defaultDarkTheme };
};
