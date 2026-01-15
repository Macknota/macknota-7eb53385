import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Hero Section</h2>
        <p className="text-muted-foreground">Edit your main introduction section</p>
      </div>

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

          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Image URL</Label>
            <Input
              id="profileImage"
              value={data.hero.profileImage}
              onChange={(e) => updateHero("profileImage", e.target.value)}
              placeholder="https://example.com/your-photo.jpg"
            />
            {data.hero.profileImage && (
              <div className="mt-2">
                <img
                  src={data.hero.profileImage}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border border-border"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroEditor;
