import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, MessageCircle, Github, Linkedin } from "lucide-react";

interface ContactEditorProps {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

const ContactEditor = ({ data, onUpdate }: ContactEditorProps) => {
  const updateContact = (field: keyof PortfolioData["contact"], value: string) => {
    onUpdate({
      ...data,
      contact: { ...data.contact, [field]: value },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
        <p className="text-muted-foreground">How people can reach you</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Contact</CardTitle>
          <CardDescription>Your primary contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                value={data.contact.email}
                onChange={(e) => updateContact("email", e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone
              </Label>
              <Input
                id="phone"
                value={data.contact.phone}
                onChange={(e) => updateContact("phone", e.target.value)}
                placeholder="(+20)1234567890"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Location
              </Label>
              <Input
                id="location"
                value={data.contact.location}
                onChange={(e) => updateContact("location", e.target.value)}
                placeholder="Egypt, Alexandria"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Your professional social media profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> WhatsApp Number
            </Label>
            <Input
              id="whatsapp"
              value={data.contact.whatsapp}
              onChange={(e) => updateContact("whatsapp", e.target.value)}
              placeholder="201234567890 (without + or spaces)"
            />
            <p className="text-xs text-muted-foreground">
              Enter number without + or spaces (e.g., 201279792507)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="github" className="flex items-center gap-2">
              <Github className="w-4 h-4" /> GitHub Profile
            </Label>
            <Input
              id="github"
              value={data.contact.github}
              onChange={(e) => updateContact("github", e.target.value)}
              placeholder="https://github.com/yourusername"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" /> LinkedIn Profile
            </Label>
            <Input
              id="linkedin"
              value={data.contact.linkedin}
              onChange={(e) => updateContact("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/yourusername"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactEditor;
