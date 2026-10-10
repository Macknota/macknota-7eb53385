import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { PortfolioData } from "@/lib/portfolioData";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
];

interface NavbarProps {
  data: PortfolioData;
}

const Navbar = ({ data }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        isScrolled || isOpen
          ? "border-border bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 font-serif text-lg leading-none text-primary">
            A
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {data.hero.logoText || data.hero.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn btn-primary hidden h-10 px-4 sm:inline-flex">
            Work with me
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="shell h-[calc(100dvh-4rem)] border-t border-border pb-8 pt-4 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {navLinks.map((link, index) => (
              <li key={link.href} className="border-b border-border">
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-baseline gap-4 py-4 font-serif text-3xl text-foreground"
                >
                  <span className="font-mono text-[11px] text-primary">0{index + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setIsOpen(false)} className="btn btn-primary mt-6 w-full">
            Work with me
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
