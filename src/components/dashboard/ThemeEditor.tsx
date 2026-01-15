import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Palette, RotateCcw, Sparkles } from "lucide-react";
import { useTheme, ThemeColors } from "@/hooks/useTheme";

const presetThemes: { name: string; colors: ThemeColors }[] = [
  {
    name: "Purple (Default)",
    colors: {
      primary: "266 100% 50%",
      accent: "280 100% 60%",
      background: "0 0% 100%",
      foreground: "265 4% 12.9%",
    },
  },
  {
    name: "Blue Ocean",
    colors: {
      primary: "210 100% 50%",
      accent: "200 100% 60%",
      background: "0 0% 100%",
      foreground: "220 10% 10%",
    },
  },
  {
    name: "Green Forest",
    colors: {
      primary: "142 70% 45%",
      accent: "160 60% 50%",
      background: "0 0% 100%",
      foreground: "150 10% 10%",
    },
  },
  {
    name: "Orange Sunset",
    colors: {
      primary: "25 95% 55%",
      accent: "35 100% 60%",
      background: "0 0% 100%",
      foreground: "30 10% 10%",
    },
  },
  {
    name: "Pink Rose",
    colors: {
      primary: "330 80% 55%",
      accent: "340 90% 65%",
      background: "0 0% 100%",
      foreground: "330 10% 10%",
    },
  },
  {
    name: "Teal Modern",
    colors: {
      primary: "175 80% 40%",
      accent: "185 70% 50%",
      background: "0 0% 100%",
      foreground: "180 10% 10%",
    },
  },
];

const ThemeEditor = () => {
  const { theme, updateTheme, resetTheme } = useTheme();

  const handleColorChange = (property: keyof ThemeColors, value: string) => {
    updateTheme({ [property]: value });
  };

  const applyPreset = (preset: ThemeColors) => {
    updateTheme(preset);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Theme & Colors</h2>
          <p className="text-muted-foreground">
            Customize the look and feel of your portfolio
          </p>
        </div>
        <Button variant="outline" onClick={resetTheme} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {presetThemes.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset.colors)}
                className="group relative p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-background transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `hsl(${preset.colors.primary})`,
                    }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {preset.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Colors */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Custom Colors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Color */}
          <div className="space-y-2">
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex items-center gap-4">
              <input
                id="primary-color"
                type="color"
                value={hslToHex(theme.primary)}
                onChange={(e) =>
                  handleColorChange("primary", hexToHsl(e.target.value))
                }
                className="w-16 h-10 rounded-lg border border-border cursor-pointer transition-transform hover:scale-105"
              />
              <div
                className="flex-1 h-10 rounded-lg transition-all duration-300"
                style={{ background: `hsl(${theme.primary})` }}
              />
            </div>
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <Label htmlFor="accent-color">Accent Color</Label>
            <div className="flex items-center gap-4">
              <input
                id="accent-color"
                type="color"
                value={hslToHex(theme.accent)}
                onChange={(e) =>
                  handleColorChange("accent", hexToHsl(e.target.value))
                }
                className="w-16 h-10 rounded-lg border border-border cursor-pointer transition-transform hover:scale-105"
              />
              <div
                className="flex-1 h-10 rounded-lg transition-all duration-300"
                style={{ background: `hsl(${theme.accent})` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
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
                This is how your cards will look
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeEditor;
