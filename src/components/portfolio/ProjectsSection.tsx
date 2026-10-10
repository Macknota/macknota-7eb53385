import { ArrowUpRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { PortfolioData } from "@/lib/portfolioData";
import { toSlug } from "@/lib/contact";
import { ProjectThumb, StatusChip, type Project } from "./ProjectParts";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface ProjectsSectionProps {
  data: PortfolioData;
}

const ProjectCard = ({ project, index, number }: { project: Project; index: number; number: number }) => (
  <Reveal delay={(index % 2) * 90} className="h-full">
    <Link
      to={`/work/${toSlug(project.name)}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card/40 p-3 transition-colors duration-300 hover:border-primary/40 hover:bg-card sm:p-4"
    >
      <div className="overflow-hidden rounded-2xl">
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
          <ProjectThumb project={project} />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-2 pt-5 sm:px-2 sm:pt-6">
        <div className="mb-3 flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-[11px] text-foreground/40">{String(number).padStart(2, "0")}</span>
          <StatusChip project={project} />
        </div>
        <h3 className="font-serif text-[1.45rem] leading-[1.12] text-foreground sm:text-[1.75rem]">{project.name}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">{project.description}</p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <p className="font-mono text-[10.5px] leading-relaxed text-foreground/45">
            {project.technologies.slice(0, 4).join(" · ")}
          </p>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-primary">
            View project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  </Reveal>
);

const GroupLabel = ({ title, note }: { title: string; note?: string }) => (
  <Reveal className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-border pb-6 pt-8 md:pt-10">
    <h3 className="font-serif text-[1.4rem] text-foreground md:text-3xl">{title}</h3>
    {note && (
      <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/50 sm:text-[11px]">
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
    <section id="work" className="border-b border-border py-16 md:py-28">
      <div className="shell">
        <SectionHeading
          index="01"
          label="Selected work"
          title={
            <>
              Systems that have to be <em className="text-primary">correct</em>, auditable and safe to retry.
            </>
          }
          intro="Compliance, payments and commerce platforms built end to end, plus the personal projects where I sharpen the craft. Open any project for the full story."
        />

        {professional.length > 0 && (
          <div>
            <GroupLabel title="Professional work" note={privateNote} />
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              {professional.map((project, index) => (
                <ProjectCard key={project.name} project={project} index={index} number={index + 1} />
              ))}
            </div>
          </div>
        )}

        {personal.length > 0 && (
          <div className="mt-12 md:mt-16">
            <GroupLabel title="Personal projects" />
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              {personal.map((project, index) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  index={index}
                  number={professional.length + index + 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
