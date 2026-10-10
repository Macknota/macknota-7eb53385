import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PortfolioData } from "@/lib/portfolioData";
import { cn } from "@/lib/utils";

type Screens = NonNullable<PortfolioData["projects"][number]["screens"]>;

// Real captures of the public storefronts, framed as a browser and a phone.
const StorefrontShowcase = ({ screens }: { screens: Screens }) => {
  const [active, setActive] = useState(0);
  const screen = screens[active];
  const host = screen.url.replace(/^https?:\/\/(www\.)?/, "");

  return (
    <div>
      <div className="relative pb-8 pr-6 sm:pb-10 sm:pr-10">
        <div className="overflow-hidden rounded-xl border border-foreground/15 bg-card shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border px-3 py-2.5 sm:px-4">
            <span className="flex gap-1.5" aria-hidden="true">
              <i className="h-2 w-2 rounded-full bg-foreground/20" />
              <i className="h-2 w-2 rounded-full bg-foreground/20" />
              <i className="h-2 w-2 rounded-full bg-foreground/20" />
            </span>
            <span className="flex-1 truncate rounded-md bg-foreground/[0.05] px-3 py-1 text-center font-mono text-[10px] text-foreground/60">
              {host}
            </span>
          </div>
          <div className="relative aspect-[16/10] bg-background">
            {screens.map((item, index) => (
              <img
                key={item.label}
                src={item.desktop}
                alt={`${item.label} storefront home page on desktop`}
                width={1600}
                height={1000}
                loading="lazy"
                decoding="async"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500",
                  index === active ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-[26%] min-w-[84px] overflow-hidden rounded-[14px] border border-foreground/20 bg-background p-1 shadow-2xl sm:rounded-[22px] sm:p-1.5">
          <div className="relative aspect-[390/679] overflow-hidden rounded-[10px] sm:rounded-[16px]">
            {screens.map((item, index) => (
              <img
                key={item.label}
                src={item.mobile}
                alt={`${item.label} storefront on mobile`}
                width={560}
                height={975}
                loading="lazy"
                decoding="async"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500",
                  index === active ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-border p-1" role="tablist" aria-label="Storefront">
          {screens.map((item, index) => (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={index === active}
              onClick={() => setActive(index)}
              className={cn(
                "rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                index === active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <a
          href={screen.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-primary hover:underline"
        >
          Visit {host}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
};

export default StorefrontShowcase;
