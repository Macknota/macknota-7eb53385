import { ArrowUpRight, Github, Lock } from "lucide-react";
import { PortfolioData } from "@/lib/portfolioData";
import { toSlug } from "@/lib/contact";
import { cn } from "@/lib/utils";
import ProjectVisual from "./ProjectVisual";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import StorefrontShowcase from "./StorefrontShowcase";
import TechIcon from "./TechIcon";

type Project = PortfolioData["projects"][number];

interface ProjectsSectionProps {
  data: PortfolioData;
}

const StatusChip = ({ project }: { project: Project }) => {
  if (!project.status) return null;
  const live = /live|validated/i.test(project.status);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em]",
        live ? "border-primary/40 text-primary" : "border-foreground/15 text-foreground/60",
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", live ? "bg-primary" : "bg-foreground/40")} />
      {project.status}
    </span>
  );
};

const KeyPoints = ({ points }: { points: string[] }) => (
  <ul className="space-y-3">
    {points.map((point) => (
      <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
        <span className="mt-[0.6em] h-px w-4 shrink-0 bg-primary/70" aria-hidden="true" />
        <span>{point}</span>
      </li>
    ))}
  </ul>
);

const TechTags = ({ technologies }: { technologies: string[] }) => (
  <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
    {technologies.map((tech) => (
      <li key={tech} className="tag">
        <TechIcon name={tech} className="h-3 w-3 text-foreground/50" />
        {tech}
      </li>
    ))}
  </ul>
);

const ProjectMedia = ({ project }: { project: Project }) =>
  project.screens?.length ? (
    <StorefrontShowcase screens={project.screens} />
  ) : (
    <ProjectVisual kind={project.visual} title={project.name} />
  );

const FeaturedProject = ({ project, index }: { project: Project; index: number }) => (
  <Reveal>
    <article
      id={toSlug(project.name)}
      className="grid gap-8 border-t border-border py-12 md:py-16 lg:grid-cols-12 lg:gap-14"
    >
      <div className={cn("lg:sticky lg:top-24 lg:col-span-7 lg:self-start", index % 2 === 1 && "lg:order-2")}>
        <ProjectMedia project={project} />
      </div>

      <div className="lg:col-span-5">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-foreground/40">{String(index + 1).padStart(2, "0")}</span>
          <StatusChip project={project} />
        </div>
        <h3 className="font-serif text-[1.9rem] leading-[1.1] text-foreground md:text-4xl">{project.name}</h3>
        <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">{project.description}</p>

        <div className="mt-6">
          <KeyPoints points={project.features} />
        </div>
        <div className="mt-7">
          <TechTags technologies={project.technologies} />
        </div>
      </div>
    </article>
  </Reveal>
);

const PersonalProject = ({ project, index }: { project: Project; index: number }) => (
  <Reveal delay={index * 90} className="h-full">
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card/40 p-4 sm:p-5">
      <ProjectVisual kind={project.visual} title={project.name} />
      <div className="flex flex-1 flex-col px-1 pb-2 pt-6 sm:px-2">
        <h3 className="font-serif text-[1.7rem] leading-[1.1] text-foreground">{project.name}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">{project.description}</p>
        <div className="mt-5">
          <KeyPoints points={project.features} />
        </div>
        <div className="mt-6">
          <TechTags technologies={project.technologies} />
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-primary hover:underline"
          >
            <Github className="h-4 w-4" />
            View source on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </article>
  </Reveal>
);

const GroupLabel = ({ title, note }: { title: string; note?: string }) => (
  <Reveal className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-6">
    <h3 className="font-serif text-2xl text-foreground md:text-3xl">{title}</h3>
    {note && (
      <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/50">
        <Lock className="h-3 w-3" />
        {note}
      </p>
    )}
  </Reveal>
);

const ProjectsSection = ({ data }: ProjectsSectionProps) => {
  const professional = data.projects.filter((project) => project.group === "professional");
  const personal = data.projects.filter((project) => project.group !== "professional");
  const privateNote = professional.find((project) => project.note)?.note;

  return (
    <section id="work" className="border-b border-border py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          index="01"
          label="Selected work"
          title={
            <>
              Systems that have to be <em className="text-primary">correct</em>, auditable and safe to retry.
            </>
          }
          intro="Compliance, payments and commerce platforms built end to end, plus the personal projects where I sharpen the craft."
        />

        {professional.length > 0 && (
          <div>
            <GroupLabel title="Professional work" note={privateNote} />
            {professional.map((project, index) => (
              <FeaturedProject key={project.name} project={project} index={index} />
            ))}
          </div>
        )}

        {personal.length > 0 && (
          <div className="border-t border-border pt-12 md:pt-16">
            <GroupLabel title="Personal projects" />
            <div className="grid gap-6 md:grid-cols-2">
              {personal.map((project, index) => (
                <PersonalProject key={project.name} project={project} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
