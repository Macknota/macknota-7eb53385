import { ArrowDown, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { PortfolioData } from "@/lib/portfolioData";
import { whatsappLink } from "@/lib/contact";
import { WhatsAppIcon } from "./TechIcon";

interface HeroSectionProps {
  data: PortfolioData;
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const { hero, contact } = data;
  const stack = hero.subtitle
    .split("·")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div
        className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,black,transparent)]"
        aria-hidden="true"
      />

      <div className="shell relative grid gap-12 pb-16 pt-28 md:pb-20 md:pt-36 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end lg:gap-16">
        <div className="hero-enter">
          {hero.profileImage && (
            <img
              src={hero.profileImage}
              alt={`Portrait of ${hero.name}`}
              width={88}
              height={88}
              className="mb-7 h-[88px] w-[88px] rounded-full border border-primary/40 object-cover object-[50%_12%] p-1 lg:hidden"
            />
          )}
          {hero.showStatusBadge && (
            <p className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/[0.06] py-2 pl-4 pr-5 font-mono text-[10.5px] uppercase leading-snug tracking-[0.12em] text-primary sm:text-xs">
              <span className="status-dot" />
              {hero.statusBadge}
            </p>
          )}

          <p className="label-mono mb-4 leading-relaxed text-foreground/60">
            {hero.title}
            {hero.focus && (
              <>
                <span className="text-foreground/30"> — </span>
                <span className="text-primary">{hero.focus}</span>
              </>
            )}
          </p>

          <h1 className="text-[3.1rem] leading-[0.98] text-foreground sm:text-7xl lg:text-[5.4rem]">
            {hero.name}
          </h1>

          {hero.tagline && (
            <p className="mt-6 max-w-xl font-serif text-[1.7rem] italic leading-[1.15] text-foreground/80 sm:text-4xl">
              {hero.tagline}
            </p>
          )}

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Core stack">
            {stack.map((item) => (
              <li key={item} className="tag px-3 py-1.5 text-xs">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#contact" className="btn btn-primary">
              <Mail className="h-4 w-4" />
              Work with me
            </a>
            {hero.showCvButton && hero.cvFile && (
              <a href={hero.cvFile} download="Adel_Magdy_Macknota_CV.pdf" className="btn btn-ghost">
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            )}
            <a
              href={whatsappLink(contact.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {contact.location} · Remote
            </span>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>

        {hero.profileImage && (
          <figure
            className="hero-enter relative hidden lg:block"
            style={{ animationDelay: "120ms" }}
          >
            <span className="absolute -left-3 -top-3 h-10 w-10 border-l border-t border-primary/60" aria-hidden="true" />
            <span className="absolute -bottom-3 -right-3 h-10 w-10 border-b border-r border-primary/60" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-card">
              <img
                src={hero.profileImage}
                alt={`Portrait of ${hero.name}`}
                width={880}
                height={1100}
                className="aspect-[4/5] w-full object-cover"
                loading="eager"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/60 to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <span className="block font-serif text-xl leading-tight text-foreground">{hero.name}</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
                  {hero.title}
                </span>
              </figcaption>
            </div>
          </figure>
        )}
      </div>

      <a
        href="#highlights"
        className="shell relative hidden items-center gap-3 pb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary md:flex"
      >
        <ArrowDown className="h-3.5 w-3.5" />
        Scroll
      </a>
    </section>
  );
};

export default HeroSection;
