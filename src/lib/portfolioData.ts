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
    title: "Full Stack .NET Developer | Angular | ASP.NET Core | C#",
    subtitle: "Full Stack Software Engineer with a focus on .NET Backend Development. I turn complex requirements into clean, maintainable systems — building secure, high-performance backends with ASP.NET Core Web API, .NET 8, Entity Framework Core, and SQL Server, and intuitive frontends with Angular 18, TypeScript, and JavaScript.",
    profileImage: "/images/profile.jpeg",
    cvFile: "/files/Adel_Magdy_FullStack_DotNet_Developer_CV.pdf",
    statusBadge: "Available for opportunities",
    showStatusBadge: true,
    showCvButton: true,
    logoText: "Adel",
    footerText: "Built with",
  },
  about: {
    title: "About Me",
    description: "Full Stack Software Engineer with a focus on .NET Backend Development. I turn complex requirements into clean, maintainable systems — building secure, high-performance backends with ASP.NET Core Web API, .NET 8, Entity Framework Core, and SQL Server, and intuitive frontends with Angular 18, TypeScript, and JavaScript. I care about architecture decisions as much as working code — applying Clean Architecture, Design Patterns, SOLID Principles, and Agile methodologies to write software that scales and stays maintainable. Currently building a real-time social platform using SignalR and actively seeking a full-time software engineering role in Cairo.",
  },
  contact: {
    email: "adelmagdymacknota@gmail.com",
    phone: "(+20) 01279792507",
    location: "Cairo, Egypt",
    whatsapp: "2001279792507",
    github: "https://github.com/Macknota",
    linkedin: "https://www.linkedin.com/in/adel-magdy-net/",
  },
  skills: {
    languages: ["C#", "TypeScript", "JavaScript", "SQL", "T-SQL", "HTML5", "CSS3"],
    frameworks: [".NET 8", "ASP.NET Core Web API", "Entity Framework Core", "LINQ", "ADO.NET", "SignalR", "Angular (v18)", "RxJS", "Bootstrap", "Responsive Design", "SPA"],
    databases: ["Microsoft SQL Server", "Redis (Caching)"],
    architecture: ["Clean Architecture", "Onion Architecture", "Design Patterns", "Repository Pattern", "Unit of Work", "CQRS", "SOLID Principles", "MVC", "Microservices (basic)"],
    tools: ["Git", "GitHub", "Docker", "Postman", "Visual Studio", "VS Code", "SSMS", "CI/CD (basic)"],
    concepts: ["OOP", "Dependency Injection", "Middleware", "RESTful API Design", "Async/Await", "Agile", "Scrum", "Code Review", "Unit Testing", "JSON", "JWT Authentication"],
  },
  education: {
    degree: "Bachelor of Science in Computer Science",
    university: "Faculty of Science, Benha University",
    graduationYear: "2023",
    grade: "Very Good",
    militaryStatus: "Completed (Dec 2024)",
  },
  courses: [
    {
      year: "2025",
      name: "Back-End Diploma at Route Academy",
      description: "Intensive training in C#, SQL Server, Entity Framework Core, and building enterprise-level REST APIs.",
    },
  ],
  experience: [
    {
      role: ".NET Developer Intern",
      company: "Smart Up",
      location: "Cairo, Egypt",
      dates: "Oct 2025 – Dec 2025",
      type: "Hybrid",
      highlights: [
        "Contributed to the full SDLC of enterprise web applications using ASP.NET Core, handling both backend logic and SQL Server database design across 3+ modules.",
        "Developed and optimized scalable RESTful APIs serving multiple frontend clients, reducing integration issues by ~40% through clean code and Agile standards.",
        "Collaborated with the frontend team to integrate REST APIs and resolve cross-stack issues effectively through daily sync-ups and clear documentation.",
        "Managed tasks independently in a hybrid work environment, consistently delivering all assigned features ahead of deadlines.",
      ],
    },
  ],
  projects: [
    {
      name: "Social Connections Platform",
      technologies: [".NET 8", "Angular 18", "SignalR", "SQL Server", "EF Core", "ASP.NET Core Identity", "Bootstrap"],
      description: "Full-stack social networking application with real-time communication, built on a modular component architecture.",
      features: [
        "Built a responsive SPA using Angular 18 with modular component architecture and RxJS, supporting 10+ reusable components.",
        "Implemented real-time messaging and live user-presence tracking using SignalR hubs, achieving sub-second message delivery.",
        "Designed a secure RESTful API with .NET 8, ASP.NET Core Identity, and JWT authentication covering 15+ endpoints.",
        "Modeled Many-to-Many database relationships in SQL Server to support a 'User Likes' and 'Matches' feature across thousands of records.",
        "Integrated cloud-based photo storage and management, supporting multiple file formats.",
      ],
      link: "#",
      images: [],
      challenge: "Building a real-time social platform with complex user interactions and live presence tracking.",
      solution: "Used SignalR for real-time communication and Angular 18 for a responsive SPA experience.",
      result: "A fully functional social network with real-time messaging, user matching, and photo management.",
      inProgress: true,
    },
    {
      name: "Store — E-Commerce RESTful API",
      technologies: [".NET 8", "ASP.NET Core Web API", "EF Core", "SQL Server", "Redis", "AutoMapper", "Docker", "Stripe"],
      description: "Production-ready backend for an online store platform, built with advanced software engineering patterns and practices.",
      features: [
        "Architected the backend with Clean Architecture (Onion Architecture) across 4 structured layers to enforce strict separation of concerns and SOLID principles.",
        "Implemented the Specification Pattern with a Generic Repository, reducing repeated query logic by ~60% across the codebase.",
        "Optimized performance with Redis caching for basket data storage, improving read response time by ~50% compared to direct database queries.",
        "Secured all 20+ endpoints using JWT authentication and role-based authorization with zero reported breaches.",
        "Integrated Stripe for payment processing and Docker for containerized deployment, reducing environment setup time by ~70%.",
      ],
      link: "https://github.com/Macknota/E-Commerce",
      images: [],
      challenge: "Building a scalable e-commerce backend that handles high traffic and complex business logic.",
      solution: "Implemented Clean Architecture with CQRS pattern and Redis caching for optimal performance.",
      result: "Successfully delivered a production-ready API with high performance and clean architecture.",
    },
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional Working Proficiency (B2)" },
    { name: "Spanish", level: "Beginner" },
  ],
  stats: [
    { label: "Projects Built", value: "15+", icon: "code" },
    { label: "Years Experience", value: "2+", icon: "briefcase" },
    { label: "Graduation Year", value: "2023", icon: "graduation" },
    { label: "Backend Expert", value: ".NET", icon: "rocket" },
  ],
  learning: {
    title: "Continuous Learning & Growth",
    description: "I believe in staying current with the latest technologies and best practices. From completing my Back-End development diploma to working on diverse projects, I'm committed to delivering cutting-edge backend solutions that scale with business needs. Proactively adopting new technologies like Redis, SignalR, and Docker and applying them in real projects.",
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
