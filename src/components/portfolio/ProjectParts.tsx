import { PortfolioData } from "@/lib/portfolioData";
import { cn } from "@/lib/utils";
import ProjectVisual from "./ProjectVisual";
import TechIcon from "./TechIcon";

export type Project = PortfolioData["projects"][number];

export const StatusChip = ({ project }: { project: Project }) => {
  if (!project.status) return null;
  const live = /live|validated/i.test(project.status);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase leading-tight tracking-[0.1em] sm:px-3 sm:text-[10px] sm:tracking-[0.12em]",
        live ? "border-primary/40 text-primary" : "border-foreground/15 text-foreground/60",
      )}
    >
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", live ? "bg-primary" : "bg-foreground/40")} />
      {project.status}
    </span>
  );
};

export const TechTags = ({ technologies, className }: { technologies: string[]; className?: string }) => (
  <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Tech stack">
    {technologies.map((tech) => (
      <li key={tech} className="tag">
        <TechIcon name={tech} className="h-3 w-3 text-foreground/50" />
        {tech}
      </li>
    ))}
  </ul>
);

// Card-sized preview: a real capture when the project has one, otherwise its
// abstract illustration.
export const ProjectThumb = ({ project }: { project: Project }) => {
  const screen = project.screens?.[0];
  if (!screen) return <ProjectVisual kind={project.visual} title={project.name} />;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <img
        src={screen.desktop}
        alt={`${screen.label} storefront home page`}
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-full object-cover object-top"
      />
      <img
        src={screen.mobile}
        alt=""
        width={560}
        height={975}
        loading="lazy"
        decoding="async"
        className="absolute bottom-0 right-[6%] w-[19%] translate-y-[18%] rounded-t-[10px] border border-foreground/25 shadow-2xl"
      />
    </div>
  );
};
