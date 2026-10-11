import { PortfolioData, skillCategoryList } from "@/lib/portfolioData";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TechIcon from "./TechIcon";

interface SkillsSectionProps {
  data: PortfolioData;
}

const SkillsSection = ({ data }: SkillsSectionProps) => {
  const groups = skillCategoryList
    .map((category) => ({ ...category, skills: data.skills[category.key] ?? [] }))
    .filter((group) => group.skills.length > 0);

  return (
    <section id="skills" className="border-b border-border py-16 md:py-28">
      <div className="shell">
        <SectionHeading
          index="03"
          label="Skills"
          title="The toolkit."
          intro="Two backend ecosystems, modern frontends, and the patterns that keep financial systems correct."
        />

        <dl>
          {groups.map((group, index) => (
            <Reveal
              key={group.key}
              className="grid gap-3 border-t border-border py-5 md:grid-cols-12 md:gap-10 md:py-8"
            >
              <dt className="flex items-baseline gap-4 md:col-span-4">
                <span className="font-mono text-[11px] text-foreground/35">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-display text-[1.05rem] leading-tight text-foreground md:text-xl">{group.title}</span>
              </dt>
              <dd className="md:col-span-8">
                <ul className="flex flex-wrap gap-1.5 md:gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="tag py-1.5 transition-colors hover:border-primary/50 hover:text-foreground md:px-3 md:py-2 md:text-xs"
                    >
                      <TechIcon name={skill} className="h-3.5 w-3.5 text-primary/80" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default SkillsSection;
