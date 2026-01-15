import { useState, useEffect } from "react";

export interface ThemeColors {
  primary: string; // HSL values like "266 100% 50%"
  accent: string;
  background: string;
  foreground: string;
  cardBackground: string;
  mutedForeground: string;
}

export interface ThemeSettings {
  light: ThemeColors;
  dark: ThemeColors;
  isDarkMode: boolean;
}

const THEME_STORAGE_KEY = "portfolio_theme_settings";

const defaultLightTheme: ThemeColors = {
  primary: "30 60% 45%",
  accent: "38 70% 55%",
  background: "40 30% 97%",
  foreground: "25 25% 15%",
  cardBackground: "38 25% 94%",
  mutedForeground: "30 15% 45%",
};

const defaultDarkTheme: ThemeColors = {
  primary: "38 70% 55%",
  accent: "30 60% 50%",
  background: "25 20% 8%",
  foreground: "38 30% 92%",
  cardBackground: "25 18% 12%",
  mutedForeground: "30 15% 55%",
};

const defaultSettings: ThemeSettings = {
  light: defaultLightTheme,
  dark: defaultDarkTheme,
  isDarkMode: false,
};

export const getStoredSettings = (): ThemeSettings => {
  if (typeof window === "undefined") return defaultSettings;
  
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored) {
    try {
      return { ...defaultSettings, ...JSON.parse(stored) };
    } catch {
      return defaultSettings;
    }
  }
  return defaultSettings;
};

export const saveSettings = (settings: ThemeSettings): void => {
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(settings));
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
    root.style.setProperty("--secondary", "0 0% 18%");
    root.style.setProperty("--secondary-foreground", "0 0% 98%");
    root.style.setProperty("--muted", "0 0% 18%");
    root.style.setProperty("--border", "0 0% 22%");
    root.style.setProperty("--input", "0 0% 22%");
    root.style.setProperty("--popover", theme.cardBackground);
    root.style.setProperty("--popover-foreground", theme.foreground);
  } else {
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
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedSettings = getStoredSettings();
    setSettings(storedSettings);
    const activeTheme = storedSettings.isDarkMode ? storedSettings.dark : storedSettings.light;
    applyTheme(activeTheme, storedSettings.isDarkMode);
    setIsLoaded(true);
  }, []);

  const updateLightTheme = (newTheme: Partial<ThemeColors>) => {
    const updated = { ...settings, light: { ...settings.light, ...newTheme } };
    setSettings(updated);
    saveSettings(updated);
    if (!settings.isDarkMode) {
      applyTheme(updated.light, false);
    }
  };

  const updateDarkTheme = (newTheme: Partial<ThemeColors>) => {
    const updated = { ...settings, dark: { ...settings.dark, ...newTheme } };
    setSettings(updated);
    saveSettings(updated);
    if (settings.isDarkMode) {
      applyTheme(updated.dark, true);
    }
  };

  const toggleDarkMode = () => {
    const newIsDark = !settings.isDarkMode;
    const updated = { ...settings, isDarkMode: newIsDark };
    setSettings(updated);
    saveSettings(updated);
    const activeTheme = newIsDark ? settings.dark : settings.light;
    applyTheme(activeTheme, newIsDark);
  };

  const resetTheme = () => {
    setSettings(defaultSettings);
    saveSettings(defaultSettings);
    const activeTheme = defaultSettings.isDarkMode ? defaultSettings.dark : defaultSettings.light;
    applyTheme(activeTheme, defaultSettings.isDarkMode);
  };

  // For backward compatibility
  const theme = settings.isDarkMode ? settings.dark : settings.light;
  const updateTheme = (newTheme: Partial<ThemeColors>) => {
    if (settings.isDarkMode) {
      updateDarkTheme(newTheme);
    } else {
      updateLightTheme(newTheme);
    }
  };

  return { 
    theme, 
    settings,
    updateTheme, 
    updateLightTheme,
    updateDarkTheme,
    resetTheme, 
    isLoaded, 
    defaultLightTheme, 
    defaultDarkTheme, 
    isDarkMode: settings.isDarkMode, 
    toggleDarkMode 
  };
};
