import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { PortfolioData } from "@/lib/portfolioData";
import { toSlug } from "@/lib/contact";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface ExperienceSectionProps {
  data: PortfolioData;
}

const ExperienceSection = ({ data }: ExperienceSectionProps) => {
  const platforms = data.projects.filter((project) => project.group === "professional");

  return (
    <section id="experience" className="border-b border-border py-16 md:py-28">
      <div className="shell">
        <SectionHeading index="02" label="Experience" title="Where I've been building." />

        <ol>
          {data.experience.map((role, index) => (
            <li key={`${role.company}-${role.dates}`}>
              <Reveal className="grid gap-4 border-t border-border py-8 md:grid-cols-12 md:gap-10 md:py-12">
                <div className="md:col-span-4">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">{role.dates}</p>
                  <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {role.location}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/40">
                    {role.type}
                  </p>
                </div>

                <div className="md:col-span-8">
                  <h3 className="font-display text-[1.25rem] leading-[1.2] text-foreground md:text-[1.7rem]">
                    {role.role}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-foreground/80 md:text-[15px]">{role.company}</p>

                  <ul className="mt-6 space-y-3">
                    {role.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                        <span className="mt-[0.7em] h-px w-4 shrink-0 bg-primary/70" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {index === 0 && platforms.length > 0 && (
                    <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
                      {platforms.map((project) => (
                        <li key={project.name} className="bg-background">
                          <Link
                            to={`/work/${toSlug(project.name)}`}
                            className="group flex h-full items-start justify-between gap-4 p-4 transition-colors hover:bg-card"
                          >
                            <span>
                              <span className="block text-sm font-semibold leading-snug text-foreground">
                                {project.name}
                              </span>
                              {project.status && (
                                <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/50">
                                  {project.status}
                                </span>
                              )}
                            </span>
                            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-foreground/30 transition-colors group-hover:text-primary" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ExperienceSection;
