import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, User, X } from "lucide-react";

interface HeroEditorProps {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

const HeroEditor = ({ data, onUpdate }: HeroEditorProps) => {
  const updateHero = (field: keyof PortfolioData["hero"], value: string) => {
    onUpdate({
      ...data,
      hero: { ...data.hero, [field]: value },
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      updateHero("profileImage", base64);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    updateHero("profileImage", "");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Hero Section</h2>
        <p className="text-muted-foreground">Edit your main introduction section</p>
      </div>

      {/* Profile Image Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Profile Image
          </CardTitle>
          <CardDescription>Upload your profile photo from your device</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Image Preview */}
            <div className="relative">
              {data.hero.profileImage ? (
                <div className="relative group">
                  <img
                    src={data.hero.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 p-1.5 bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X className="w-4 h-4 text-destructive-foreground" />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-4 border-dashed border-border">
                  <User className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="flex-1 space-y-3">
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/20 transition-all duration-300">
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-sm font-medium text-foreground">Click to upload image</span>
                <span className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              
              <div className="space-y-2">
                <Label htmlFor="profileImageUrl">Or paste image URL</Label>
                <Input
                  id="profileImageUrl"
                  value={data.hero.profileImage}
                  onChange={(e) => updateHero("profileImage", e.target.value)}
                  placeholder="https://example.com/your-photo.jpg"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your name and title displayed on the hero section</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={data.hero.name}
              onChange={(e) => updateHero("name", e.target.value)}
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={data.hero.title}
              onChange={(e) => updateHero("title", e.target.value)}
              placeholder="e.g., .NET Backend Developer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle / Tagline</Label>
            <Textarea
              id="subtitle"
              value={data.hero.subtitle}
              onChange={(e) => updateHero("subtitle", e.target.value)}
              placeholder="A brief description of what you do"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroEditor;
