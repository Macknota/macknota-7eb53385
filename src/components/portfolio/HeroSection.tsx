import { PortfolioData } from "@/lib/portfolioData";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, MapPin, ChevronDown, Download } from "lucide-react";
import { useEffect, useState } from "react";
import CodeBackground from "./CodeBackground";

interface HeroSectionProps {
  data: PortfolioData;
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const cleanWhatsapp = data.contact.whatsapp?.replace(/[^0-9]/g, '') || '';
  const whatsappLink = `https://wa.me/${cleanWhatsapp}`;
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDownloadCV = () => {
    if (data.hero.cvFile) {
      const link = document.createElement('a');
      link.href = data.hero.cvFile;
      link.download = `${data.hero.name.replace(/\s+/g, '_')}_CV.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Code Background */}
      <CodeBackground />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
      
      {/* Animated decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4 py-20">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Profile Image */}
          {data.hero.profileImage && (
            <div className="mb-8 group">
              <div className="relative inline-block">
                {/* Animated ring */}
                <div className="absolute inset-[-8px] bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-spin" style={{ animationDuration: "8s" }} />
                <div className="absolute inset-[-4px] bg-background rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                <img
                  src={data.hero.profileImage}
                  alt={data.hero.name}
                  className="relative w-40 h-40 rounded-full mx-auto border-4 border-background shadow-2xl object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          )}
          
          {/* Code Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 font-mono text-sm pop-element">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for opportunities
          </div>
          
          {/* Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
              {data.hero.name}
            </span>
          </h1>
          
          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-6 glow-effect inline-block">
            {data.hero.title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {data.hero.subtitle}
          </p>
          
          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8 pop-element">
            <MapPin className="w-4 h-4" />
            <span>{data.contact.location}</span>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button size="lg" className="gap-2 pop-element glow-effect" asChild>
              <a href={`mailto:${data.contact.email}`}>
                <Mail className="w-4 h-4" />
                Contact Me
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 pop-element" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4" />
                WhatsApp
              </a>
            </Button>
            {data.hero.cvFile && (
              <Button 
                size="lg" 
                variant="secondary" 
                className="gap-2 pop-element"
                onClick={handleDownloadCV}
              >
                <Download className="w-4 h-4" />
                Download CV
              </Button>
            )}
          </div>
          
          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href={data.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 pop-icon glow-effect"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={data.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 pop-icon glow-effect"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${data.contact.email}`}
              className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 pop-icon glow-effect"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce pop-element">
        <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-sm">Scroll Down</span>
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
