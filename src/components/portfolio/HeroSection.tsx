import { PortfolioData } from "@/lib/portfolioData";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, MapPin, Download } from "lucide-react";

interface HeroSectionProps {
  data: PortfolioData;
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const whatsappLink = `https://wa.me/${data.contact.whatsapp}`;
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          {data.hero.profileImage && (
            <div className="mb-8">
              <img
                src={data.hero.profileImage}
                alt={data.hero.name}
                className="w-32 h-32 rounded-full mx-auto border-4 border-primary/20 shadow-lg object-cover"
              />
            </div>
          )}
          
          {/* Code Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 font-mono text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for opportunities
          </div>
          
          {/* Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-tight">
            {data.hero.name}
          </h1>
          
          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-6">
            {data.hero.title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {data.hero.subtitle}
          </p>
          
          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <MapPin className="w-4 h-4" />
            <span>{data.contact.location}</span>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button size="lg" className="gap-2" asChild>
              <a href={`mailto:${data.contact.email}`}>
                <Mail className="w-4 h-4" />
                Contact Me
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4" />
                WhatsApp
              </a>
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href={data.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={data.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${data.contact.email}`}
              className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
