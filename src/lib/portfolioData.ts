// Portfolio Data Store - This will be the single source of truth for all portfolio content
export interface PortfolioData {
  hero: {
    name: string;
    title: string;
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
  skills: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    architecture: string[];
    tools: string[];
    concepts: string[];
  };
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
  }[];
  languages: {
    name: string;
    level: string;
  }[];
  stats: {
    label: string;
    value: string;
    icon: string;
  }[];
  learning: {
    title: string;
    description: string;
  };
}

export const defaultPortfolioData: PortfolioData = {
  hero: {
    name: "Adel Magdy Macknota",
    title: "Full Stack Software Engineer | .NET & NestJS | Angular · React · Next.js",
    subtitle: "Full Stack Software Engineer working across both the .NET and Node.js ecosystems. I build compliance-critical and financial systems end to end — ASP.NET Core and NestJS backends on SQL Server and PostgreSQL, with Angular, React and Next.js frontends.",
    profileImage: "/images/profile.jpeg",
    cvFile: "/files/Adel_Magdy_Macknota_CV.pdf",
    statusBadge: "Available for opportunities",
    showStatusBadge: true,
    showCvButton: true,
    logoText: "Adel",
    footerText: "Built with",
  },
  about: {
    title: "About Me",
    description: "Full Stack Software Engineer working across both the .NET and Node.js ecosystems. I build compliance-critical and financial systems end to end — ASP.NET Core and NestJS backends on SQL Server and PostgreSQL, with Angular, React and Next.js frontends. Current work includes a ZATCA e-invoicing integration hub, an automated payment reconciliation platform, and an AI-driven SEO automation engine for a ~750-product catalog — all three built to production standards and currently in active development ahead of release. I care about architecture as much as working code: Clean Architecture, SOLID, idempotency, auditability, secure secret handling, and automated testing — so systems stay correct under real-world load and stay maintainable as they grow. I work fluently with AI development tools (Claude Code, ChatGPT, Gemini, Perplexity) to move faster on research, refactoring and testing, while keeping design decisions and code review under my own judgement.",
  },
  contact: {
    email: "adelmagdymacknota@gmail.com",
    phone: "(+20) 012 7979 2507",
    location: "Cairo, Egypt",
    whatsapp: "2001279792507",
    github: "https://github.com/Macknota",
    linkedin: "https://www.linkedin.com/in/adel-magdy-net/",
  },
  skills: {
    languages: ["C#", "TypeScript", "JavaScript", "Python", "SQL (T-SQL)", "HTML5", "CSS3"],
    frameworks: [".NET 8", "ASP.NET Core Web API", "NestJS", "Node.js", "Entity Framework Core", "Prisma", "LINQ", "ADO.NET", "REST APIs", "SignalR", "Hangfire", "BullMQ", "Angular 18", "React", "Next.js", "RxJS", "Bootstrap", "Responsive Design", "SPA"],
    databases: ["Microsoft SQL Server", "PostgreSQL", "Redis"],
    architecture: ["Clean Architecture", "Onion Architecture", "Repository Pattern", "Unit of Work", "Specification Pattern", "CQRS", "MVC", "SOLID Principles", "RBAC", "Idempotency & Retry Design", "Microservices (basic)"],
    tools: ["Docker", "Git", "GitHub", "CI/CD (basic)", "Postman", "Visual Studio", "VS Code", "SSMS", "Claude Code", "ChatGPT", "Gemini", "Perplexity"],
    concepts: ["ZATCA E-Invoicing (Phase 2)", "Stripe", "Microsoft Graph", "Google Search Console API", "LLM APIs (Gemini, Groq, Mistral, OpenRouter)", "Webhooks", "JWT & ASP.NET Core Identity", "Dependency Injection", "Unit Testing", "API & E2E Testing", "Agile / Scrum", "Code Review", "Prompt Engineering"],
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
      name: "Back-End Diploma at Route Academy",
      description: "Intensive training in C#, SQL Server, Entity Framework Core, and enterprise-level REST API development.",
    },
  ],
  experience: [
    {
      role: "Full Stack Software Engineer",
      company: "Asus Card — Asas Al-Betaqat for Trading Est.",
      location: "Remote",
      dates: "May 2026 – Present",
      type: "Full-time",
      highlights: [
        "Building three enterprise platforms end to end across two stacks (.NET/React and NestJS/Next.js) — owning architecture, database design, background processing, third-party integrations and automated testing.",
        "Delivered a ZATCA e-invoicing integration hub, an automated payment reconciliation platform, and an AI-powered SEO automation platform — all in active development ahead of release.",
        "Accelerated delivery by integrating AI tooling (Claude Code, ChatGPT, Gemini, Perplexity) for specification research, scaffolding, refactoring, test generation and documentation — with every AI-assisted change reviewed before merge.",
      ],
    },
    {
      role: ".NET Developer Intern",
      company: "Smart Up",
      location: "Cairo, Egypt",
      dates: "Oct 2025 – Dec 2025",
      type: "Hybrid",
      highlights: [
        "Contributed to the full SDLC of enterprise web applications using ASP.NET Core, handling backend logic and SQL Server database design across 3+ modules.",
        "Developed and optimized scalable RESTful APIs serving multiple frontend clients, reducing integration issues by ~40% through clean code and Agile standards.",
        "Collaborated with the frontend team to integrate REST APIs and resolve cross-stack issues through daily sync-ups and clear documentation.",
      ],
    },
  ],
  projects: [
    {
      name: "ZATCA E-Invoicing Integration Hub",
      technologies: ["NestJS", "Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Docker"],
      description: "An integration hub that abstracts the full ZATCA e-invoicing compliance workflow behind one API, so client systems integrate once instead of implementing the specification themselves.",
      features: [
        "Complete onboarding lifecycle: taxpayer/EGS registration, CSR generation and certificate handling, Compliance CSID, 6/6 compliance checks, and Production CSID issuance.",
        "B2B Clearance and B2C Reporting flows with ICV/PIH sequencing, evidence tracking, and outbound webhooks for asynchronous status updates.",
        "Strict environment isolation across Sandbox, Simulation and Production, with safeguards blocking cross-environment and unauthorized ZATCA calls.",
        "Hardened with RBAC, encrypted credential storage, idempotency keys, queue-based retries (Redis/BullMQ) and full audit logging.",
        "Covered by automated SDK, API and browser end-to-end tests, packaged for Docker-based deployment.",
      ],
      link: "#",
      images: [],
      challenge: "ZATCA Phase 2 compliance is a long, error-prone specification that every client system would otherwise have to implement from scratch.",
      solution: "Built a single integration hub covering the whole compliance lifecycle, with strict environment isolation, idempotency, queue-based retries and full audit logging.",
      result: "Validated against ZATCA Sandbox and Simulation with 6/6 compliance checks passing, and covered end to end by automated tests.",
      inProgress: true,
    },
    {
      name: "AI-Powered SEO Automation Platform",
      technologies: ["NestJS", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "Python", "Google Search Console API"],
      description: "An SEO intelligence and automation system for an e-commerce catalog of ~750 products, replacing fragmented manual optimization, stale SEO data and unsafe bulk updates.",
      features: [
        "Family-first workflow that groups related products, detects SEO gaps with canonical gap tracking, and generates field-level AI recommendations.",
        "Multi-provider LLM routing (Gemini with Groq, Mistral and OpenRouter fallback) plus a fact-validation and content-quality layer to guard against hallucinated output.",
        "Recommendations grounded in real performance data via Google Search Console APIs, live product data and Python-based scraping.",
        "Controlled review → approval → apply pipelines with live verification and rollback.",
        "Protected by idempotency, stale-data detection and permission checks.",
      ],
      link: "#",
      images: [],
      challenge: "Manual SEO work across ~750 products was fragmented, based on stale data, and risky to apply in bulk.",
      solution: "Automated gap detection and AI recommendations with multi-provider LLM routing, fact validation, and a controlled approve-and-apply pipeline.",
      result: "Catalog-wide SEO optimization that is data-grounded, reviewable and safely reversible.",
      inProgress: true,
    },
    {
      name: "Payment Reconciliation System",
      technologies: [".NET 8", "EF Core", "React", "SQL Server", "Hangfire", "SignalR", "Microsoft Graph"],
      description: "An automated reconciliation platform replacing the manual comparison of bank settlements, payment-gateway data and merchant transactions.",
      features: [
        "Automated ingestion of bank/HyperPay files via Microsoft Graph (email) and manual upload, with Hangfire background jobs backfilling missing Purple API data.",
        "Matching and exception-detection engine covering mismatches, missing transactions, refunds, duplicates, fees, commissions and net settlements.",
        "Real-time Live dashboard (SignalR) and a monthly Results view backed by atomic snapshot publishing.",
        "Financial accuracy, idempotency, auditability and secure secret handling as first-class requirements.",
        "Validated by automated end-to-end tests.",
      ],
      link: "#",
      images: [],
      challenge: "Reconciling bank settlements, gateway data and merchant transactions by hand was slow and error-prone.",
      solution: "Automated ingestion and a matching engine with exception detection, backed by background jobs and real-time reporting.",
      result: "Consistent, reproducible monthly reporting with live visibility into mismatches and exceptions.",
      inProgress: true,
    },
    {
      name: "Store — E-Commerce RESTful API",
      technologies: [".NET 8", "ASP.NET Core Web API", "EF Core", "SQL Server", "Redis", "AutoMapper", "Docker", "Stripe"],
      description: "Production-ready backend for an online store platform, built with advanced software engineering patterns and practices.",
      features: [
        "Architected the backend with Clean (Onion) Architecture across 4 layers to enforce separation of concerns and SOLID principles.",
        "Implemented the Specification Pattern with a Generic Repository, reducing repeated query logic by ~60%.",
        "Optimized performance with Redis caching for basket data, improving read response time by ~50% versus direct database queries.",
        "Secured 20+ endpoints with JWT authentication and role-based authorization.",
        "Integrated Stripe payments and Docker-based deployment.",
      ],
      link: "https://github.com/Macknota/E-Commerce",
      images: [],
      challenge: "Building a scalable e-commerce backend that handles complex product filtering and heavy traffic while processing payments securely.",
      solution: "Clean Architecture with the Specification Pattern and Redis caching, secured with JWT and role-based authorization.",
      result: "A production-ready API that is fast under load, highly testable and easy to extend.",
    },
    {
      name: "Social Connections Platform",
      technologies: [".NET 8", "Angular 18", "SignalR", "SQL Server", "EF Core", "ASP.NET Core Identity"],
      description: "Full-stack social networking application with real-time communication, built on a modular component architecture.",
      features: [
        "Built a responsive Angular 18 SPA with modular component architecture and RxJS, supporting 10+ reusable components.",
        "Implemented real-time messaging and live user-presence tracking with SignalR hubs, achieving sub-second message delivery.",
        "Designed a secure REST API with 15+ endpoints and JWT authentication.",
        "Modeled many-to-many likes/matches relationships in SQL Server.",
        "Integrated cloud photo storage and management.",
      ],
      link: "#",
      images: [],
      challenge: "Building a real-time social platform with complex user interactions and live presence tracking.",
      solution: "Used SignalR for real-time communication and Angular 18 for a responsive SPA experience.",
      result: "A fully functional social network with real-time messaging, user matching and photo management.",
    },
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional Working Proficiency (B2)" },
    { name: "Spanish", level: "Beginner" },
  ],
  stats: [
    { label: "Projects Built", value: "15+", icon: "code" },
    { label: "Enterprise Platforms", value: "3", icon: "rocket" },
    { label: "Graduation Year", value: "2023", icon: "graduation" },
    { label: "Main Stacks", value: ".NET & Node", icon: "briefcase" },
  ],
  learning: {
    title: "Continuous Learning & Growth",
    description: "I stay current across two ecosystems — .NET and Node.js — and pick the right tool for the problem. Recent work pushed me deep into ZATCA e-invoicing compliance, financial reconciliation, queue-based background processing and multi-provider LLM integration. I also use AI development tools daily to shorten delivery cycles, while keeping architecture decisions and code review under my own judgement.",
  },
};

// Local Storage Key
const STORAGE_KEY = "portfolio_data";

// Get portfolio data from localStorage or return default
export const getPortfolioData = (): PortfolioData => {
  if (typeof window === "undefined") return defaultPortfolioData;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultPortfolioData;
    }
  }
  return defaultPortfolioData;
};

// Save portfolio data to localStorage
export const savePortfolioData = (data: PortfolioData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Reset to default data
export const resetPortfolioData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
