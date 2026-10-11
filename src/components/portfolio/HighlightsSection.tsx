import { PortfolioData } from "@/lib/portfolioData";
import Reveal from "./Reveal";

interface HighlightsSectionProps {
  data: PortfolioData;
}

// Renders "a → b" values with the arrow in the accent colour.
const StatValue = ({ value }: { value: string }) => {
  const [from, to] = value.split("→").map((part) => part.trim());
  if (!to) return <>{value}</>;
  return (
    <>
      <span className="text-foreground/45">{from}</span>
      <span className="mx-2 font-sans text-[0.6em] text-primary" aria-label="to">
        →
      </span>
      {to}
    </>
  );
};

const HighlightsSection = ({ data }: HighlightsSectionProps) => {
  if (!data.stats?.length) return null;

  return (
    <section id="highlights" className="border-b border-border" aria-label="Highlights">
      <div className="shell">
        <dl className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {data.stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 90}
              className="py-6 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0"
            >
              <dt className="label-mono mb-2.5 md:mb-4">{stat.label}</dt>
              <dd>
                <span className="block whitespace-nowrap font-display text-[1.5rem] leading-none text-foreground sm:text-[2.1rem] md:text-[1.6rem] lg:text-[2.15rem]">
                  <StatValue value={stat.value} />
                </span>
                {stat.detail && (
                  <span className="mt-2 block text-[13px] leading-relaxed text-muted-foreground md:mt-3 md:text-sm">{stat.detail}</span>
                )}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default HighlightsSection;
