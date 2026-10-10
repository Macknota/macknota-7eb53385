// Portfolio Data Store - single source of truth for all portfolio content
export type SkillKey =
  | "languages"
  | "backend"
  | "frontend"
  | "databases"
  | "architecture"
  | "integrations"
  | "performance"
  | "tools"
  | "testing";

// Bump when the content model changes: saved dashboard data from an older
// version is ignored so the site never renders stale copy.
export const CONTENT_VERSION = 3;

export interface PortfolioData {
  version?: number;
  hero: {
    name: string;
    title: string;
    tagline?: string;
    focus?: string;
    subtitle: string;
    profileImage: string;
    cvFile: string;
    statusBadge: string;
    showStatusBadge: boolean;
    showCvButton: boolean;
    logoText: string;
    footerText: string;
  };
  about: {
    title: string;
    description: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    whatsapp: string;
    github: string;
    linkedin: string;
  };
  skills: Record<SkillKey, string[]>;
  education: {
    degree: string;
    university: string;
    graduationYear: string;
    grade: string;
    militaryStatus: string;
  };
  courses: {
    year: string;
    name: string;
    description: string;
  }[];
  experience: {
    role: string;
    company: string;
    location: string;
    dates: string;
    type: string;
    highlights: string[];
  }[];
  projects: {
    name: string;
    technologies: string[];
    description: string;
    features: string[];
    link: string;
    images: string[];
    challenge?: string;
    solution?: string;
    result?: string;
    inProgress?: boolean;
    group?: "professional" | "personal";
    note?: string;
    status?: string;
    liveLinks?: { label: string; url: string }[];
    visual?: string;
    screens?: { label: string; url: string; desktop: string; mobile: string }[];
  }[];
  languages: {
    name: string;
    level: string;
  }[];
  stats: {
    label: string;
    value: string;
    icon: string;
    detail?: string;
  }[];
  services?: {
    title: string;
    description: string;
  }[];
  learning: {
    title: string;
    description: string;
  };
}

export const skillCategoryList: { key: SkillKey; title: string }[] = [
  { key: "backend", title: "Backend" },
  { key: "frontend", title: "Frontend" },
  { key: "databases", title: "Databases & Caching" },
  { key: "architecture", title: "Architecture & Patterns" },
  { key: "integrations", title: "Integrations" },
  { key: "performance", title: "Web Performance & SEO" },
  { key: "tools", title: "DevOps & Tools" },
  { key: "testing", title: "Testing & Methods" },
  { key: "languages", title: "Languages" },
];

const PRIVATE_NOTE = "Built at Asus Card · code is private";

export const defaultPortfolioData: PortfolioData = {
  version: CONTENT_VERSION,
  hero: {
    name: "Adel Magdy Macknota",
    title: "Full Stack Software Engineer",
    tagline: "Building software where getting it wrong costs money.",
    focus: "Fintech, Payments & Compliance Systems",
    subtitle: ".NET · NestJS · React · Next.js",
    profileImage: "/images/profile.webp",
    cvFile: "/files/Adel_Magdy_Macknota_CV.pdf",
    statusBadge: "Available for remote freelance & part-time work",
    showStatusBadge: true,
    showCvButton: true,
    logoText: "Adel Macknota",
    footerText: "",
  },
  about: {
    title: "About",
    description:
      "Full Stack Software Engineer working across the .NET and Node.js ecosystems, focused on fintech, payments and compliance systems: software that has to be correct, auditable and safe to retry. I build ASP.NET Core and NestJS backends on SQL Server and PostgreSQL, and React, Next.js and Angular frontends. Current work spans an e-invoicing integration hub for ZATCA Phase 2, an automated payment reconciliation platform, an AI-driven SEO automation engine, and live, Arabic-first e-commerce storefronts where I delivered measurable performance and SEO gains.\n\nI care about architecture as much as working code: Clean Architecture, SOLID, idempotency, auditability, secure secret handling and automated testing, so systems stay correct under real-world load and maintainable as they grow. I use AI development tools to move faster on research and refactoring, with every design decision and merged change under my own review.",
  },
  contact: {
    email: "adelmagdymacknota@gmail.com",
    phone: "+20 127 979 2507",
    location: "Cairo, Egypt",
    whatsapp: "201279792507",
    github: "https://github.com/Macknota",
    linkedin: "https://www.linkedin.com/in/adel-magdy-net",
  },
  skills: {
    languages: ["C#", "TypeScript", "JavaScript", "Python", "SQL (T-SQL)", "HTML5", "CSS3"],
    backend: [".NET 8", "ASP.NET Core Web API", "NestJS", "Node.js", "Entity Framework Core", "Prisma", "LINQ", "REST APIs", "SignalR", "Hangfire", "Redis/BullMQ", "JWT & ASP.NET Core Identity"],
    frontend: ["React 18", "Next.js", "Angular 18", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query", "React Hook Form + Zod", "RxJS", "i18next (Arabic/RTL)", "Responsive Design"],
    databases: ["Microsoft SQL Server", "PostgreSQL", "Redis"],
    architecture: ["Clean / Onion Architecture", "Repository & Unit of Work", "Specification Pattern", "CQRS", "SOLID", "RBAC", "Idempotency & Retry Design", "Multi-tenant Architecture"],
    integrations: ["ZATCA E-Invoicing (Phase 2)", "Stripe", "Microsoft Graph", "Google Search Console API", "LLM APIs (Gemini, Groq, Mistral, OpenRouter)", "Webhooks"],
    performance: ["Code splitting", "Core Web Vitals (CLS)", "Bundle budgets", "Canonical URLs", "JSON-LD", "Slug-based routing"],
    tools: ["Docker", "Git & GitHub", "GitHub Actions", "Nginx", "Postman", "Visual Studio", "VS Code"],
    testing: ["Unit Testing (Vitest)", "E2E Testing (Playwright)", "API Testing", "Agile / Scrum", "Code Review", "AI-assisted development"],
  },
  education: {
    degree: "B.Sc. in Computer Science",
    university: "Benha University, Faculty of Science",
    graduationYear: "June 2023",
    grade: "Very Good",
    militaryStatus: "Completed (Dec 2024)",
  },
  courses: [
    {
      year: "2025",
      name: "Back-End Diploma — Route Academy",
      description: "Intensive training in C#, SQL Server, Entity Framework Core, and enterprise-level REST API development.",
    },
  ],
  experience: [
    {
      role: "Full Stack Software Engineer",
      company: "Asus Card — Asas Al-Betaqat for Trading Est.",
      location: "Cairo, Egypt (On-site)",
      dates: "May 2026 – Present",
      type: "Full-time",
      highlights: [
        "Building backend platforms end to end across two stacks (.NET/React and NestJS/Next.js), owning architecture, database design, background processing, integrations and automated testing.",
        "The three backend platforms below are in active development and not yet publicly live.",
      ],
    },
    {
      role: ".NET Developer Intern",
      company: "Smart Up",
      location: "Cairo, Egypt (Hybrid)",
      dates: "Oct 2025 – Dec 2025",
      type: "Internship",
      highlights: [
        "Contributed to the full SDLC of enterprise web applications using ASP.NET Core, handling backend logic and SQL Server database design across 3+ modules.",
        "Developed and optimized RESTful APIs serving multiple frontend clients, following clean code and Agile standards.",
        "Collaborated with the frontend team to integrate REST APIs and resolve cross-stack issues through daily sync-ups and clear documentation.",
      ],
    },
  ],
  projects: [
    {
      name: "E-Invoicing Integration Hub (ZATCA Phase 2)",
      group: "professional",
      note: PRIVATE_NOTE,
      status: "Validated against ZATCA Sandbox & Simulation",
      visual: "einvoicing",
      technologies: ["NestJS", "Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis/BullMQ", "Docker"],
      description: "An integration hub that abstracts the full ZATCA e-invoicing compliance workflow behind one API, so client systems integrate once.",
      features: [
        "Complete onboarding lifecycle: taxpayer/EGS registration, CSR and certificate handling, Compliance CSID, 6/6 compliance checks and Production CSID.",
        "B2B Clearance and B2C Reporting flows with ICV/PIH sequencing, evidence tracking and outbound webhooks.",
        "Strict environment isolation across Sandbox, Simulation and Production.",
        "RBAC, encrypted credential storage, idempotency keys, queue-based retries, audit logging and automated end-to-end tests.",
      ],
      link: "",
      images: [],
    },
    {
      name: "Payment Reconciliation Platform",
      group: "professional",
      note: PRIVATE_NOTE,
      status: "In active development",
      inProgress: true,
      visual: "reconciliation",
      technologies: [".NET", "EF Core", "React", "SQL Server", "Hangfire", "SignalR"],
      description: "An automated reconciliation platform replacing the manual comparison of bank settlements, payment-gateway data and merchant transactions.",
      features: [
        "Automated ingestion of bank and payment-gateway settlement files, with background jobs backfilling missing partner data.",
        "Matching and exception-detection engine: mismatches, missing transactions, refunds, duplicates, fees, commissions and net settlements.",
        "Real-time dashboard (SignalR) and a monthly results view backed by atomic snapshot publishing.",
      ],
      link: "",
      images: [],
    },
    {
      name: "Multi-Brand E-Commerce Storefronts",
      group: "professional",
      note: PRIVATE_NOTE,
      status: "Live",
      visual: "storefronts",
      liveLinks: [
        { label: "purple-card.com", url: "https://www.purple-card.com" },
        { label: "ish7an.com", url: "https://www.ish7an.com" },
      ],
      screens: [
        {
          label: "Purple Card",
          url: "https://www.purple-card.com",
          desktop: "/images/work/purple-card-desktop.webp",
          mobile: "/images/work/purple-card-mobile.webp",
        },
        {
          label: "Ish7an",
          url: "https://www.ish7an.com",
          desktop: "/images/work/ish7an-desktop.webp",
          mobile: "/images/work/ish7an-mobile.webp",
        },
      ],
      technologies: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query", "React Hook Form + Zod", "i18next", "Playwright", "Nginx"],
      description: "A multi-tenant platform where one React codebase serves many branded, Arabic-first stores for digital gift cards and game top-ups.",
      features: [
        "Rebuilt the Purple Card storefront and built its loyalty system from scratch: points, tiers, Shop with Points and a merchant control center.",
        "Built Ish7an's brand theming layer, category navigation and mobile layout; reworked its buy-now and payment layout.",
        "Cut store home pages from 1.9 MB to 220 KB of JavaScript and eliminated mobile layout shift (CLS 0.81 → ~0).",
        "Fixed cross-store SEO: slug URLs, canonical URLs, JSON-LD, bilingual FAQs and CI checks guarding SEO routing.",
      ],
      link: "",
      images: [],
    },
    {
      name: "AI-Powered SEO Automation Platform",
      group: "professional",
      note: PRIVATE_NOTE,
      status: "In active development",
      inProgress: true,
      visual: "seo",
      technologies: ["NestJS", "Next.js", "TypeScript", "Prisma/PostgreSQL", "Python", "Google Search Console API", "LLMs"],
      description: "An SEO intelligence and automation system for a large e-commerce catalog, replacing manual optimization and unsafe bulk updates.",
      features: [
        "Groups related products, detects SEO gaps and generates field-level AI recommendations grounded in Search Console and live product data.",
        "Multi-provider LLM routing with fallback, plus a fact-validation layer that guards against hallucinated output.",
        "Controlled review → approval → apply pipelines with live verification and rollback.",
      ],
      link: "",
      images: [],
    },
    {
      name: "Store — E-Commerce REST API",
      group: "personal",
      visual: "storeapi",
      technologies: [".NET 8", "ASP.NET Core Web API", "EF Core", "SQL Server", "Redis", "AutoMapper", "Docker", "Stripe"],
      description: "A clean, layered e-commerce backend with payments, caching and role-based security.",
      features: [
        "Clean (Onion) Architecture across 4 layers enforcing separation of concerns and SOLID.",
        "Specification Pattern with a Generic Repository to remove repeated query logic.",
        "Basket data cached in Redis to cut read latency.",
        "20+ endpoints secured with JWT and role-based authorization; Stripe payments and Docker deployment.",
      ],
      link: "https://github.com/Macknota/E-Commerce",
      images: [],
    },
    {
      name: "Social Connections Platform",
      group: "personal",
      visual: "social",
      technologies: [".NET 8", "Angular 18", "SignalR", "SQL Server", "EF Core", "ASP.NET Core Identity"],
      description: "A full-stack social app with real-time messaging and live presence.",
      features: [
        "Responsive Angular 18 SPA with a modular component architecture and RxJS (10+ reusable components).",
        "Real-time messaging and live presence with SignalR.",
        "Secure REST API (15+ endpoints) with JWT, likes/matches modelling and cloud photo storage.",
      ],
      link: "",
      images: [],
    },
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional working proficiency (B2)" },
    { name: "Spanish", level: "Beginner" },
  ],
  stats: [
    { label: "Store home pages", value: "1.9 MB → 220 KB", detail: "of JavaScript, by isolating brand and template code", icon: "zap" },
    { label: "Mobile layout shift (CLS)", value: "0.81 → ~0", detail: "eliminated across the storefronts", icon: "target" },
    { label: "ZATCA integration", value: "Sandbox & Simulation", detail: "validated against both ZATCA environments", icon: "award" },
  ],
  services: [
    {
      title: "Backend APIs",
      description: "ASP.NET Core and NestJS services on SQL Server and PostgreSQL, built to be correct, auditable and safe to retry.",
    },
    {
      title: "Payment & third-party integrations",
      description: "Payment, e-invoicing and external API integrations with idempotency, retries, webhooks and audit logging.",
    },
    {
      title: "Full-stack web apps",
      description: "React, Next.js and Angular frontends on top of a clean backend: responsive, fast and Arabic/RTL-ready.",
    },
  ],
  learning: {
    title: "",
    description: "",
  },
};
