import { useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Lock, Mail } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { usePortfolio } from "@/hooks/usePortfolio";
import { toSlug } from "@/lib/contact";
import Footer from "@/components/portfolio/Footer";
import Navbar from "@/components/portfolio/Navbar";
import { StatusChip, TechTags } from "@/components/portfolio/ProjectParts";
import ProjectVisual from "@/components/portfolio/ProjectVisual";
import Reveal from "@/components/portfolio/Reveal";
import StorefrontShowcase from "@/components/portfolio/StorefrontShowcase";
import NotFound from "./NotFound";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { data } = usePortfolio();
  const index = data.projects.findIndex((item) => toSlug(item.name) === slug);
  const project = data.projects[index];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (project) document.title = `${project.name} | ${data.hero.name}`;
    return () => {
      document.title = `${data.hero.name} | ${data.hero.title}`;
    };
  }, [project, data.hero.name, data.hero.title]);

  if (!project) return <NotFound />;

  const isProfessional = project.group === "professional";
  const next = data.projects[(index + 1) % data.projects.length];
  const points = project.details?.length ? project.details : project.features;
  const employer = data.experience[0];

  const facts = [
    { label: "Type", value: isProfessional ? "Professional work" : "Personal project" },
    ...(isProfessional && employer ? [{ label: "Built at", value: `${employer.company.split("—")[0].trim()} · ${employer.dates}` }] : []),
    ...(project.status ? [{ label: "Status", value: project.status }] : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar data={data} />

      <main>
        <header className="relative overflow-hidden border-b border-border">
          <div
            className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_70%_20%,black,transparent)]"
            aria-hidden="true"
          />
          <div className="shell hero-enter relative pb-10 pt-24 md:pb-16 md:pt-32">
            <Link
              to={{ pathname: "/", hash: "#work" }}
              className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary md:mb-10"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All work
            </Link>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="label-mono">
                {String(index + 1).padStart(2, "0")} <span className="text-foreground/30">/</span>{" "}
                {isProfessional ? "Professional work" : "Personal project"}
              </span>
              <StatusChip project={project} />
            </div>

            <h1 className="max-w-4xl text-[1.8rem] leading-[1.1] text-foreground sm:text-5xl lg:text-[3.5rem]">
              {project.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-xl md:leading-relaxed">
              {project.description}
            </p>

            {(project.liveLinks?.length || project.link) && (
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {project.liveLinks?.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    {link.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <Github className="h-4 w-4" />
                    View source on GitHub
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        <section className="border-b border-border py-10 md:py-16">
          <div className="shell">
            <Reveal>
              {project.screens?.length ? (
                <div className="mx-auto max-w-4xl">
                  <StorefrontShowcase screens={project.screens} />
                </div>
              ) : (
                <div className="mx-auto max-w-4xl">
                  <ProjectVisual kind={project.visual} title={project.name} />
                  {isProfessional && (
                    <p className="mt-3 text-center font-mono text-[10.5px] text-foreground/40">
                      Illustration only. The interface and data of this system are confidential.
                    </p>
                  )}
                </div>
              )}
            </Reveal>
          </div>
        </section>

        <section className="border-b border-border py-14 md:py-24">
          <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <Reveal>
                <p className="label-mono mb-4">What I built</p>
                <h2 className="mb-8 text-[1.5rem] leading-[1.15] text-foreground md:mb-10 md:text-4xl">
                  The work, point by point.
                </h2>
              </Reveal>
              <ol>
                {points.map((point, pointIndex) => (
                  <li key={point}>
                    <Reveal className="grid grid-cols-[2.25rem_1fr] gap-x-3 border-t border-border py-5 md:grid-cols-[3.5rem_1fr] md:py-7">
                      <span className="pt-1 font-mono text-[11px] text-primary">
                        {String(pointIndex + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[15px] leading-relaxed text-foreground/85 md:text-lg md:leading-relaxed">
                        {point}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="lg:col-span-4">
              <Reveal className="rounded-2xl border border-border bg-card/40 p-5 md:p-7 lg:sticky lg:top-24">
                <dl className="space-y-5">
                  {facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="label-mono mb-1.5">{fact.label}</dt>
                      <dd className="text-sm leading-relaxed text-foreground/85">{fact.value}</dd>
                    </div>
                  ))}
                  <div>
                    <dt className="label-mono mb-2.5">Tech stack</dt>
                    <dd>
                      <TechTags technologies={project.technologies} />
                    </dd>
                  </div>
                </dl>
                {project.note && (
                  <p className="mt-6 flex items-center gap-2 border-t border-border pt-5 font-mono text-[11px] text-foreground/50">
                    <Lock className="h-3 w-3 shrink-0" />
                    {project.note}
                  </p>
                )}
              </Reveal>
            </aside>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="shell grid gap-5 md:grid-cols-2 md:gap-6">
            <Link
              to={`/work/${toSlug(next.name)}`}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40 hover:bg-card md:p-8"
            >
              <span className="label-mono">Next project</span>
              <span className="mt-8 flex items-end justify-between gap-4">
                <span className="font-display text-[1.3rem] leading-[1.2] text-foreground md:text-[1.9rem]">{next.name}</span>
                <ArrowRight className="mb-1 h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            <div className="flex flex-col justify-between rounded-2xl border border-primary/30 bg-primary/[0.05] p-6 md:p-8">
              <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
                <span className="status-dot" />
                {data.hero.statusBadge}
              </span>
              <span className="mt-8 flex flex-wrap items-end justify-between gap-4">
                <span className="font-display text-[1.3rem] leading-[1.2] text-foreground md:text-[1.9rem]">
                  Need something like this?
                </span>
                <Link to={{ pathname: "/", hash: "#contact" }} className="btn btn-primary">
                  <Mail className="h-4 w-4" />
                  Work with me
                </Link>
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer data={data} />
    </div>
  );
};

export default ProjectDetail;
