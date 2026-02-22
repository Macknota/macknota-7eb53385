import { useState } from "react";
import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Upload, User, X, FileText, Download, Sparkles, Code, Type, Crop } from "lucide-react";
import ImageCropper from "./ImageCropper";

interface HeroEditorProps {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

const HeroEditor = ({ data, onUpdate }: HeroEditorProps) => {
  const [cropperOpen, setCropperOpen] = useState(false);
  const [tempImage, setTempImage] = useState("");

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
      setTempImage(base64);
      setCropperOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImage: string) => {
    updateHero("profileImage", croppedImage);
    setTempImage("");
  };

  const openCropperForExisting = () => {
    if (data.hero.profileImage) {
      setTempImage(data.hero.profileImage);
      setCropperOpen(true);
    }
  };

  const handleCVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      updateHero("cvFile", base64);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    updateHero("profileImage", "");
  };

  const removeCV = () => {
    updateHero("cvFile", "");
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
                  <div className="absolute inset-0 rounded-full bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={openCropperForExisting}
                      className="p-1.5 bg-primary rounded-full shadow-lg"
                      title="قص وتعديل"
                    >
                      <Crop className="w-4 h-4 text-primary-foreground" />
                    </button>
                    <button
                      onClick={removeImage}
                      className="p-1.5 bg-destructive rounded-full shadow-lg"
                      title="حذف"
                    >
                      <X className="w-4 h-4 text-destructive-foreground" />
                    </button>
                  </div>
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

      {/* CV Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            CV / Resume
          </CardTitle>
          <CardDescription>Upload your CV for visitors to download</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              {data.hero.cvFile ? (
                <div className="relative group">
                  <div className="w-32 h-32 rounded-xl bg-primary/10 flex flex-col items-center justify-center border-2 border-primary/30">
                    <FileText className="w-12 h-12 text-primary mb-2" />
                    <span className="text-xs text-primary font-medium">CV Ready</span>
                  </div>
                  <button
                    onClick={removeCV}
                    className="absolute -top-2 -right-2 p-1.5 bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X className="w-4 h-4 text-destructive-foreground" />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-xl bg-muted flex flex-col items-center justify-center border-2 border-dashed border-border">
                  <FileText className="w-12 h-12 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1">No CV</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/20 transition-all duration-300">
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-sm font-medium text-foreground">Click to upload CV</span>
                <span className="text-xs text-muted-foreground mt-1">PDF up to 10MB</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleCVUpload}
                />
              </label>
              
              <div className="space-y-2">
                <Label htmlFor="cvUrl">Or paste CV URL</Label>
                <Input
                  id="cvUrl"
                  value={data.hero.cvFile}
                  onChange={(e) => updateHero("cvFile", e.target.value)}
                  placeholder="https://example.com/your-cv.pdf"
                />
              </div>

              {data.hero.cvFile && (
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href={data.hero.cvFile} download="CV.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4" />
                    Preview CV
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Badge */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Status Badge
          </CardTitle>
          <CardDescription>The badge shown at the top of your hero section</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showBadge">Show Status Badge</Label>
              <p className="text-xs text-muted-foreground">Display the availability badge on hero</p>
            </div>
            <Switch
              id="showBadge"
              checked={data.hero.showStatusBadge}
              onCheckedChange={(checked) => 
                onUpdate({
                  ...data,
                  hero: { ...data.hero, showStatusBadge: checked },
                })
              }
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="statusBadge">Badge Text</Label>
            <Input
              id="statusBadge"
              value={data.hero.statusBadge}
              onChange={(e) => updateHero("statusBadge", e.target.value)}
              placeholder="Available for opportunities"
            />
          </div>
          
          <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Preview:</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-mono text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {data.hero.statusBadge || "Available for opportunities"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logo & Footer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Logo & Footer
          </CardTitle>
          <CardDescription>Customize your site branding</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="logoText">Logo Text</Label>
            <Input
              id="logoText"
              value={data.hero.logoText}
              onChange={(e) => updateHero("logoText", e.target.value)}
              placeholder="Adel"
            />
            <p className="text-xs text-muted-foreground">
              Preview: &lt;{data.hero.logoText || "Adel"}/&gt;
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="footerText">Footer Text</Label>
            <Input
              id="footerText"
              value={data.hero.footerText}
              onChange={(e) => updateHero("footerText", e.target.value)}
              placeholder="Built with"
            />
            <p className="text-xs text-muted-foreground">
              Preview: © 2026 {data.hero.name}. {data.hero.footerText || "Built with"} ❤️
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <Label htmlFor="showCvButton">Show CV Download Button</Label>
              <p className="text-xs text-muted-foreground">Display download CV button on hero</p>
            </div>
            <Switch
              id="showCvButton"
              checked={data.hero.showCvButton}
              onCheckedChange={(checked) => 
                onUpdate({
                  ...data,
                  hero: { ...data.hero, showCvButton: checked },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5 text-primary" />
            Personal Information
          </CardTitle>
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

      <ImageCropper
        open={cropperOpen}
        imageSrc={tempImage}
        aspect={1}
        cropShape="round"
        onClose={() => setCropperOpen(false)}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
};

export default HeroEditor;
