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

      <div className="shell relative grid gap-12 pb-12 pt-24 md:pb-20 md:pt-36 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end lg:gap-16">
        <div className="hero-enter">
          {hero.profileImage && (
            <img
              src={hero.profileImage}
              alt={`Portrait of ${hero.name}`}
              width={72}
              height={72}
              className="mb-6 h-[72px] w-[72px] rounded-full border border-primary/40 object-cover object-[50%_12%] p-1 lg:hidden"
            />
          )}
          {hero.showStatusBadge && (
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/[0.06] py-1.5 pl-3 pr-4 font-mono text-[9.5px] uppercase leading-snug tracking-[0.08em] text-primary sm:mb-8 sm:gap-3 sm:py-2 sm:pl-4 sm:pr-5 sm:text-xs sm:tracking-[0.12em]">
              <span className="status-dot" />
              {hero.statusBadge}
            </p>
          )}

          <p className="label-mono mb-3 text-[10px] leading-relaxed text-foreground/60 sm:mb-4 sm:text-[11px]">
            {hero.title}
            {hero.focus && (
              <>
                <span className="text-foreground/30"> — </span>
                <span className="text-primary">{hero.focus}</span>
              </>
            )}
          </p>

          <h1 className="text-[2.1rem] leading-[1.05] text-foreground sm:text-[3rem] lg:text-[3.4rem]">
            {hero.name}
          </h1>

          {hero.tagline && (
            <p className="mt-4 max-w-xl text-[1.05rem] font-medium leading-[1.35] text-foreground/70 sm:mt-6 sm:text-2xl">
              {hero.tagline}
            </p>
          )}

          <ul className="mt-6 flex flex-wrap gap-1.5 sm:mt-8 sm:gap-2" aria-label="Core stack">
            {stack.map((item) => (
              <li key={item} className="tag sm:px-3 sm:py-1.5 sm:text-xs">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-9 sm:flex sm:flex-wrap sm:gap-3">
            <a href="#contact" className="btn btn-primary col-span-2">
              <Mail className="h-4 w-4" />
              Work with me
            </a>
            {hero.showCvButton && hero.cvFile && (
              <a href={hero.cvFile} download="Adel_Magdy_Macknota_CV.pdf" className="btn btn-ghost">
                <Download className="h-4 w-4" />
                <span className="sm:hidden">Resume</span>
                <span className="hidden sm:inline">Download Resume</span>
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

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[13px] text-muted-foreground sm:mt-10 sm:gap-x-6 sm:text-sm">
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
                <span className="block font-display text-lg leading-tight text-foreground">{hero.name}</span>
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
