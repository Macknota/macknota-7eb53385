import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle } from "lucide-react";

interface ContactSectionProps {
  data: PortfolioData;
}

const ContactSection = ({ data }: ContactSectionProps) => {
  // Clean phone number - remove any non-digit characters except leading +
  const cleanWhatsapp = data.contact.whatsapp?.replace(/[^0-9]/g, '') || '';
  const whatsappLink = `https://wa.me/${cleanWhatsapp}`;
  
  return (
    <section id="contact" className="py-12 md:py-20 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
              Get In Touch
            </h2>
            <div className="w-16 md:w-20 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base px-2">
              Have a project in mind? Let's build something amazing together.
            </p>
          </div>
          
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-8">
            {/* Email */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group interactive-card">
              <CardContent className="p-3 md:p-6">
                <a href={`mailto:${data.contact.email}`} className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 pop-icon flex-shrink-0">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground mb-0.5 md:mb-1 text-sm md:text-base">Email</h3>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">{data.contact.email}</p>
                  </div>
                </a>
              </CardContent>
            </Card>
            
            {/* Phone */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group interactive-card">
              <CardContent className="p-3 md:p-6">
                <a href={`tel:${data.contact.phone}`} className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 pop-icon flex-shrink-0">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground mb-0.5 md:mb-1 text-sm md:text-base">Phone</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{data.contact.phone}</p>
                  </div>
                </a>
              </CardContent>
            </Card>
            
            {/* Location */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group interactive-card">
              <CardContent className="p-3 md:p-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 pop-icon flex-shrink-0">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground mb-0.5 md:mb-1 text-sm md:text-base">Location</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{data.contact.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* WhatsApp */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group interactive-card">
              <CardContent className="p-3 md:p-6">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 pop-icon flex-shrink-0">
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground mb-0.5 md:mb-1 text-sm md:text-base">WhatsApp</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Send a message</p>
                  </div>
                </a>
              </CardContent>
            </Card>
          </div>
          
          {/* Social Links */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4 px-2">
            <Button variant="outline" size="default" asChild className="gap-2 pop-element w-full sm:w-auto text-sm md:text-base">
              <a href={data.contact.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 md:w-5 md:h-5" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="default" asChild className="gap-2 pop-element w-full sm:w-auto text-sm md:text-base">
              <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                LinkedIn
              </a>
            </Button>
            <Button size="default" asChild className="gap-2 pop-element glow-effect w-full sm:w-auto text-sm md:text-base">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
