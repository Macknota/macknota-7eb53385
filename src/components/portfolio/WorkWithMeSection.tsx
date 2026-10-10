import { Mail } from "lucide-react";
import { PortfolioData } from "@/lib/portfolioData";
import { whatsappLink } from "@/lib/contact";
import Reveal from "./Reveal";
import { WhatsAppIcon } from "./TechIcon";

interface WorkWithMeSectionProps {
  data: PortfolioData;
}

const WorkWithMeSection = ({ data }: WorkWithMeSectionProps) => {
  const { contact, services = [] } = data;

  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-28">
      <div
        className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_40%,black,transparent)]"
        aria-hidden="true"
      />
      <div className="shell relative">
        <Reveal>
          <div className="mb-5 flex items-center gap-4">
            <span className="label-mono">
              05 <span className="text-foreground/30">/</span> Work with me
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <p className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
            <span className="status-dot" />
            Open to remote freelance &amp; part-time work
          </p>

          <h2 className="max-w-4xl text-[2.5rem] leading-[1.02] text-foreground sm:text-6xl md:text-7xl">
            Have something that <em className="text-primary">can't afford</em> to be wrong?
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I take on remote freelance and part-time work in three areas. Tell me what you're building and I'll reply
            with how I can help.
          </p>
        </Reveal>

        {services.length > 0 && (
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
            {services.map((service, index) => (
              <li key={service.title} className="bg-background">
                <Reveal delay={index * 90} className="h-full p-6 md:p-8">
                  <span className="font-mono text-[11px] text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-serif text-2xl leading-tight text-foreground">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        <Reveal className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={`mailto:${contact.email}`} className="btn btn-primary h-12 px-6">
              <Mail className="h-4 w-4" />
              Email me
            </a>
            <a
              href={whatsappLink(contact.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost h-12 px-6"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Message on WhatsApp
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            <a href={`mailto:${contact.email}`} className="link-underline break-all text-foreground">
              {contact.email}
            </a>
            <span className="mx-2 text-foreground/25">·</span>
            <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="link-underline whitespace-nowrap">
              {contact.phone}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default WorkWithMeSection;
