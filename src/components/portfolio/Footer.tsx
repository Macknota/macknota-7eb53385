import { Download, Github, Linkedin, Mail } from "lucide-react";
import { PortfolioData } from "@/lib/portfolioData";
import { whatsappLink } from "@/lib/contact";
import { WhatsAppIcon } from "./TechIcon";

interface FooterProps {
  data: PortfolioData;
}

const Footer = ({ data }: FooterProps) => {
  const { hero, contact } = data;
  const links = [
    { label: "GitHub", href: contact.github, icon: <Github className="h-4 w-4" />, external: true },
    { label: "LinkedIn", href: contact.linkedin, icon: <Linkedin className="h-4 w-4" />, external: true },
    { label: "WhatsApp", href: whatsappLink(contact.whatsapp), icon: <WhatsAppIcon className="h-4 w-4" />, external: true },
    { label: "Email", href: `mailto:${contact.email}`, icon: <Mail className="h-4 w-4" />, external: false },
  ];

  return (
    <footer className="border-t border-border">
      <div className="shell flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-2xl text-foreground">{hero.name}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/50">
            {hero.title} · {contact.location}
          </p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.icon}
                {link.label}
              </a>
            </li>
          ))}
          {hero.cvFile && (
            <li>
              <a
                href={hero.cvFile}
                download="Adel_Magdy_Macknota_CV.pdf"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </li>
          )}
        </ul>
      </div>
      <div className="border-t border-border">
        <p className="shell py-5 font-mono text-[11px] text-foreground/40">
          © {new Date().getFullYear()} {hero.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
