import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
}

const SectionHeading = ({ index, label, title, intro }: SectionHeadingProps) => (
  <Reveal className="mb-8 md:mb-14">
    <div className="mb-5 flex items-center gap-4">
      <span className="label-mono">
        {index} <span className="text-foreground/30">/</span> {label}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
    <h2 className="max-w-3xl text-[1.8rem] leading-[1.1] text-foreground sm:text-5xl md:text-[3.4rem]">
      {title}
    </h2>
    {intro && (
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:mt-4 md:text-base">
        {intro}
      </p>
    )}
  </Reveal>
);

export default SectionHeading;
