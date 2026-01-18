import { PortfolioData } from "@/lib/portfolioData";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, MapPin, ChevronDown, Download } from "lucide-react";
import { useEffect, useState } from "react";
import GeometricBackground from "./GeometricBackground";

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
      {/* Geometric Network Particle Background */}
      <GeometricBackground />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
      
      {/* Animated decorative elements - smaller on mobile */}
      <div className="absolute top-20 left-5 md:left-10 w-40 md:w-72 h-40 md:h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-5 md:right-10 w-48 md:w-96 h-48 md:h-96 bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-5 md:px-4 py-16 md:py-20">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Profile Image - smaller on mobile */}
          {data.hero.profileImage && (
            <div className="mb-6 md:mb-8 group">
              <div className="relative inline-block">
                {/* Animated ring */}
                <div className="absolute inset-[-6px] md:inset-[-8px] bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-spin" style={{ animationDuration: "8s" }} />
                <div className="absolute inset-[-3px] md:inset-[-4px] bg-background rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                <img
                  src={data.hero.profileImage}
                  alt={data.hero.name}
                  className="relative w-28 h-28 md:w-40 md:h-40 rounded-full mx-auto border-4 border-background shadow-2xl object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          )}
          
          {/* Status Badge - smaller text on mobile */}
          {data.hero.showStatusBadge && (
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 text-primary mb-4 md:mb-6 font-mono text-xs md:text-sm pop-element border border-primary/20">
              <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-green-500 animate-pulse" />
              {data.hero.statusBadge || "Available for opportunities"}
            </div>
          )}
          
          {/* Name - responsive sizing with gradient */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              {data.hero.name}
            </span>
          </h1>
          
          {/* Title - responsive sizing with typewriter effect */}
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6 inline-block">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-effect">
              {data.hero.title}
            </span>
          </h2>
          
          {/* Subtitle - smaller on mobile */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-5 md:mb-8 px-2 leading-relaxed">
            {data.hero.subtitle}
          </p>
          
          {/* Location - smaller on mobile */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6 md:mb-8 pop-element text-sm md:text-base">
            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>{data.contact.location}</span>
          </div>
          
          {/* CTA Buttons - stack vertically on small mobile, wrap on larger */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-2">
            <Button size="default" className="gap-2 pop-element glow-button w-full sm:w-auto text-sm md:text-base" asChild>
              <a href={`mailto:${data.contact.email}`}>
                <Mail className="w-4 h-4" />
                Contact Me
              </a>
            </Button>
            <Button size="default" variant="outline" className="gap-2 pop-element glow-effect border-primary/50 hover:border-primary hover:bg-primary/10 w-full sm:w-auto text-sm md:text-base" asChild>
              <a href="#" onClick={(e) => { e.preventDefault(); handleDownloadCV(); }}>
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </Button>
            <Button size="default" variant="outline" className="gap-2 pop-element border-accent/50 hover:border-accent hover:bg-accent/10 w-full sm:w-auto text-sm md:text-base" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4" />
                WhatsApp
              </a>
            </Button>
          </div>
          
          {/* Social Links - smaller on mobile */}
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <a
              href={data.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 md:p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 pop-icon glow-effect"
            >
              <Github className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a
              href={data.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 md:p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 pop-icon glow-effect"
            >
              <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a
              href={`mailto:${data.contact.email}`}
              className="p-2.5 md:p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 pop-icon glow-effect"
            >
              <Mail className="w-5 h-5 md:w-6 md:h-6" />
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
