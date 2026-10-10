import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { PortfolioData } from "@/lib/portfolioData";
import { cn } from "@/lib/utils";

const navLinks = [
  { hash: "#work", label: "Work" },
  { hash: "#experience", label: "Experience" },
  { hash: "#skills", label: "Skills" },
  { hash: "#about", label: "About" },
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
      <div className="shell flex h-14 items-center md:h-16 justify-between gap-6">
        <Link to={{ pathname: "/", hash: "#top" }} className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 font-serif text-base md:h-9 md:w-9 md:text-lg leading-none text-primary">
            A
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {data.hero.logoText || data.hero.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.hash}
              to={{ pathname: "/", hash: link.hash }}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to={{ pathname: "/", hash: "#contact" }} className="btn btn-primary hidden h-10 px-4 sm:inline-flex">
            Work with me
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="shell h-[calc(100dvh-3.5rem)] border-t border-border pb-8 pt-4 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {navLinks.map((link, index) => (
              <li key={link.hash} className="border-b border-border">
                <Link
                  to={{ pathname: "/", hash: link.hash }}
                  onClick={() => setIsOpen(false)}
                  className="flex items-baseline gap-4 py-3.5 font-serif text-2xl text-foreground"
                >
                  <span className="font-mono text-[11px] text-primary">0{index + 1}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to={{ pathname: "/", hash: "#contact" }}
            onClick={() => setIsOpen(false)}
            className="btn btn-primary mt-6 w-full"
          >
            Work with me
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
