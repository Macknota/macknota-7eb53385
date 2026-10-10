import type { ReactNode } from "react";
import { PortfolioData } from "@/lib/portfolioData";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface AboutSectionProps {
  data: PortfolioData;
}

const Fact = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="border-t border-border py-5 first:border-t-0 first:pt-0 last:pb-0 md:py-6">
    <p className="label-mono mb-3">{label}</p>
    {children}
  </div>
);

const AboutSection = ({ data }: AboutSectionProps) => {
  const paragraphs = data.about.description.split(/\n\s*\n/).filter(Boolean);
  const { education } = data;

  return (
    <section id="about" className="border-b border-border py-16 md:py-28">
      <div className="shell">
        <SectionHeading index="04" label={data.about.title || "About"} title="Architecture as much as working code." />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="space-y-5 lg:col-span-7">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? "text-base leading-relaxed text-foreground/90 md:text-xl md:leading-relaxed"
                    : "text-sm leading-relaxed text-muted-foreground md:text-base md:leading-relaxed"
                }
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={100} className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-card/40 p-5 md:p-8">
              <Fact label="Education">
                <p className="font-serif text-lg leading-snug text-foreground md:text-xl">{education.degree}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {education.university} · {education.graduationYear}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Grade: {education.grade}
                  {education.militaryStatus && ` · Military service: ${education.militaryStatus}`}
                </p>
              </Fact>

              {data.courses.length > 0 && (
                <Fact label="Training">
                  {data.courses.map((course) => (
                    <div key={course.name}>
                      <p className="font-serif text-lg leading-snug text-foreground md:text-xl">
                        {course.name} <span className="text-foreground/50">· {course.year}</span>
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{course.description}</p>
                    </div>
                  ))}
                </Fact>
              )}

              <Fact label="Languages">
                <ul className="space-y-2">
                  {data.languages.map((language) => (
                    <li key={language.name} className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="font-medium text-foreground">{language.name}</span>
                      <span className="text-right text-muted-foreground">{language.level}</span>
                    </li>
                  ))}
                </ul>
              </Fact>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
