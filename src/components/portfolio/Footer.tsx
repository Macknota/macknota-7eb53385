import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { PortfolioData } from "@/lib/portfolioData";

interface FooterProps {
  data: PortfolioData;
}

const Footer = ({ data }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>© {currentYear} {data.hero.name}.</span>
            <span className="hidden sm:inline">{data.hero.footerText || "Built with"}</span>
            <Heart className="w-4 h-4 text-destructive fill-current hidden sm:inline" />
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={data.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={data.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${data.contact.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
