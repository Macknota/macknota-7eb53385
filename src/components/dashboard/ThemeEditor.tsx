import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Palette, RotateCcw, Sparkles, Sun, Moon } from "lucide-react";
import { useTheme, ThemeColors } from "@/hooks/useTheme";

const presetThemes: { name: string; colors: ThemeColors; isDark: boolean }[] = [
  {
    name: "Purple Light",
    isDark: false,
    colors: {
      primary: "266 100% 50%",
      accent: "280 100% 60%",
      background: "0 0% 100%",
      foreground: "265 4% 12.9%",
      cardBackground: "0 0% 98%",
      mutedForeground: "265 4% 45%",
    },
  },
  {
    name: "Purple Dark",
    isDark: true,
    colors: {
      primary: "270 100% 70%",
      accent: "280 100% 60%",
      background: "0 0% 8%",
      foreground: "0 0% 98%",
      cardBackground: "0 0% 12%",
      mutedForeground: "0 0% 65%",
    },
  },
  {
    name: "Blue Ocean",
    isDark: false,
    colors: {
      primary: "210 100% 50%",
      accent: "200 100% 60%",
      background: "0 0% 100%",
      foreground: "220 10% 10%",
      cardBackground: "210 20% 98%",
      mutedForeground: "220 10% 45%",
    },
  },
  {
    name: "Blue Night",
    isDark: true,
    colors: {
      primary: "210 100% 60%",
      accent: "200 100% 70%",
      background: "220 20% 8%",
      foreground: "210 20% 98%",
      cardBackground: "220 20% 12%",
      mutedForeground: "210 10% 60%",
    },
  },
  {
    name: "Green Forest",
    isDark: false,
    colors: {
      primary: "142 70% 45%",
      accent: "160 60% 50%",
      background: "0 0% 100%",
      foreground: "150 10% 10%",
      cardBackground: "140 20% 97%",
      mutedForeground: "150 10% 45%",
    },
  },
  {
    name: "Green Dark",
    isDark: true,
    colors: {
      primary: "142 70% 55%",
      accent: "160 60% 60%",
      background: "150 20% 6%",
      foreground: "140 20% 98%",
      cardBackground: "150 20% 10%",
      mutedForeground: "150 10% 60%",
    },
  },
  {
    name: "Orange Sunset",
    isDark: false,
    colors: {
      primary: "25 95% 55%",
      accent: "35 100% 60%",
      background: "0 0% 100%",
      foreground: "30 10% 10%",
      cardBackground: "30 30% 97%",
      mutedForeground: "30 10% 45%",
    },
  },
  {
    name: "Orange Night",
    isDark: true,
    colors: {
      primary: "25 95% 60%",
      accent: "35 100% 65%",
      background: "20 20% 6%",
      foreground: "30 20% 98%",
      cardBackground: "20 20% 10%",
      mutedForeground: "30 10% 60%",
    },
  },
];

const ThemeEditor = () => {
  const { settings, updateLightTheme, updateDarkTheme, resetTheme, isDarkMode, toggleDarkMode } = useTheme();

  const handleLightColorChange = (property: keyof ThemeColors, value: string) => {
    updateLightTheme({ [property]: value });
  };

  const handleDarkColorChange = (property: keyof ThemeColors, value: string) => {
    updateDarkTheme({ [property]: value });
  };

  const applyPreset = (preset: { colors: ThemeColors; isDark: boolean }) => {
    if (preset.isDark) {
      updateDarkTheme(preset.colors);
    } else {
      updateLightTheme(preset.colors);
    }
  };

  // Convert HSL string to hex for color picker
  const hslToHex = (hsl: string): string => {
    const [h, s, l] = hsl.split(" ").map((v) => parseFloat(v));
    const sNorm = s / 100;
    const lNorm = l / 100;

    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = lNorm - c / 2;
    let r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Convert hex to HSL string
  const hexToHsl = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "266 100% 50%";

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const ColorPicker = ({ 
    label, 
    id, 
    value, 
    onChange 
  }: { 
    label: string; 
    id: string; 
    value: string; 
    onChange: (value: string) => void;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-4">
        <input
          id={id}
          type="color"
          value={hslToHex(value)}
          onInput={(e) => onChange(hexToHsl((e.target as HTMLInputElement).value))}
          onChange={(e) => onChange(hexToHsl(e.target.value))}
          className="w-20 h-12 rounded-lg border border-border cursor-pointer transition-transform hover:scale-105"
        />
        <div
          className="flex-1 h-12 rounded-lg border border-border/50"
          style={{ background: `hsl(${value})` }}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Theme & Colors</h2>
          <p className="text-muted-foreground">
            Customize Light and Dark mode colors separately
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={toggleDarkMode} 
            className="gap-2"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {isDarkMode ? "View Light" : "View Dark"}
          </Button>
          <Button variant="outline" onClick={resetTheme} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset All
          </Button>
        </div>
      </div>

      {/* Current Mode Indicator */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
        {isDarkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
        <span className="text-foreground font-medium">
          Currently viewing: <span className="text-primary">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
        </span>
      </div>

      {/* Preset Themes */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Quick Presets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Sun className="w-4 h-4" /> Light Mode Presets
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {presetThemes.filter(p => !p.isDark).map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="group relative p-3 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full ring-2 ring-offset-2 ring-offset-background transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `hsl(${preset.colors.primary})` }}
                      />
                      <span className="text-xs font-medium text-foreground">{preset.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Moon className="w-4 h-4" /> Dark Mode Presets
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {presetThemes.filter(p => p.isDark).map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="group relative p-3 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full ring-2 ring-offset-2 ring-offset-background transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `hsl(${preset.colors.primary})` }}
                      />
                      <span className="text-xs font-medium text-foreground">{preset.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Light Mode Colors */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-primary" />
            Light Mode Colors
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <ColorPicker 
            label="Primary Color" 
            id="light-primary" 
            value={settings.light.primary} 
            onChange={(v) => handleLightColorChange("primary", v)} 
          />
          <ColorPicker 
            label="Accent Color" 
            id="light-accent" 
            value={settings.light.accent} 
            onChange={(v) => handleLightColorChange("accent", v)} 
          />
          <ColorPicker 
            label="Background Color" 
            id="light-background" 
            value={settings.light.background} 
            onChange={(v) => handleLightColorChange("background", v)} 
          />
          <ColorPicker 
            label="Card Background" 
            id="light-card" 
            value={settings.light.cardBackground} 
            onChange={(v) => handleLightColorChange("cardBackground", v)} 
          />
          <ColorPicker 
            label="Text Color" 
            id="light-foreground" 
            value={settings.light.foreground} 
            onChange={(v) => handleLightColorChange("foreground", v)} 
          />
          <ColorPicker 
            label="Muted Text Color" 
            id="light-muted" 
            value={settings.light.mutedForeground} 
            onChange={(v) => handleLightColorChange("mutedForeground", v)} 
          />
        </CardContent>
      </Card>

      {/* Dark Mode Colors */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-primary" />
            Dark Mode Colors
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <ColorPicker 
            label="Primary Color" 
            id="dark-primary" 
            value={settings.dark.primary} 
            onChange={(v) => handleDarkColorChange("primary", v)} 
          />
          <ColorPicker 
            label="Accent Color" 
            id="dark-accent" 
            value={settings.dark.accent} 
            onChange={(v) => handleDarkColorChange("accent", v)} 
          />
          <ColorPicker 
            label="Background Color" 
            id="dark-background" 
            value={settings.dark.background} 
            onChange={(v) => handleDarkColorChange("background", v)} 
          />
          <ColorPicker 
            label="Card Background" 
            id="dark-card" 
            value={settings.dark.cardBackground} 
            onChange={(v) => handleDarkColorChange("cardBackground", v)} 
          />
          <ColorPicker 
            label="Text Color" 
            id="dark-foreground" 
            value={settings.dark.foreground} 
            onChange={(v) => handleDarkColorChange("foreground", v)} 
          />
          <ColorPicker 
            label="Muted Text Color" 
            id="dark-muted" 
            value={settings.dark.mutedForeground} 
            onChange={(v) => handleDarkColorChange("mutedForeground", v)} 
          />
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Live Preview ({isDarkMode ? "Dark Mode" : "Light Mode"})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button>Primary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm transition-transform hover:scale-105">
                Badge
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm transition-transform hover:scale-105">
                Secondary Badge
              </span>
              <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm transition-transform hover:scale-105">
                Accent Badge
              </span>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
              <p className="text-foreground font-medium">Sample Card</p>
              <p className="text-muted-foreground text-sm">
                This is how your cards will look in {isDarkMode ? "dark" : "light"} mode
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeEditor;
