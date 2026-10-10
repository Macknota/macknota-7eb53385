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

const THEME_STORAGE_KEY = "portfolio_theme_settings_v2";

// Light variant of the navy/teal theme
const defaultLightTheme: ThemeColors = {
  primary: "174 72% 32%",
  accent: "171 60% 40%",
  background: "223 50% 97%",
  foreground: "226 50% 10%",
  cardBackground: "0 0% 100%",
  mutedForeground: "224 15% 40%",
};

// Navy / teal theme (default)
const defaultDarkTheme: ThemeColors = {
  primary: "171 77% 64%",
  accent: "171 60% 50%",
  background: "226 50% 8%",
  foreground: "223 50% 97%",
  cardBackground: "226 40% 11%",
  mutedForeground: "222 15% 65%",
};

const defaultSettings: ThemeSettings = {
  light: defaultLightTheme,
  dark: defaultDarkTheme,
  isDarkMode: true,
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
  root.style.setProperty("--primary-foreground", isDarkMode ? theme.background : "0 0% 100%");
  root.style.setProperty("--accent-foreground", isDarkMode ? theme.background : "0 0% 100%");
  root.style.setProperty("--ring", `${primaryHue} 60% 55%`);
  
  // Update secondary and muted based on dark mode
  if (isDarkMode) {
    root.style.setProperty("--secondary", "225 30% 16%");
    root.style.setProperty("--secondary-foreground", "223 50% 97%");
    root.style.setProperty("--muted", "225 30% 14%");
    root.style.setProperty("--border", "224 25% 20%");
    root.style.setProperty("--input", "224 25% 20%");
    root.style.setProperty("--popover", theme.cardBackground);
    root.style.setProperty("--popover-foreground", theme.foreground);
  } else {
    root.style.setProperty("--secondary", "223 30% 92%");
    root.style.setProperty("--secondary-foreground", "226 50% 10%");
    root.style.setProperty("--muted", "223 30% 94%");
    root.style.setProperty("--border", "223 20% 86%");
    root.style.setProperty("--input", "223 20% 86%");
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
