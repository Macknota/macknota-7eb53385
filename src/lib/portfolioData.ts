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
    title: "Full Stack .NET Developer (Angular)",
    subtitle: "Building scalable, full-stack web applications with clean architecture and modern frontend technologies",
    profileImage: "/images/profile.jpeg",
    cvFile: "",
    statusBadge: "Available for opportunities",
    showStatusBadge: true,
    showCvButton: true,
    logoText: "Adel",
    footerText: "Built with",
  },
  about: {
    title: "About Me",
    description: "Motivated Full Stack .NET Developer with a strong foundation in building scalable web applications. Proficient in developing robust backends using .NET 8 & EF Core, and responsive frontends using Angular (v18) & TypeScript. Experienced in implementing Clean Architecture, Real-time communication (SignalR), and RESTful APIs. Eager to join a dynamic team in Cairo to deliver high-quality, end-to-end software solutions.",
  },
  contact: {
    email: "adelmagdymacknota@gmail.com",
    phone: "(+20)01279792507",
    location: "Cairo, Egypt",
    whatsapp: "201279792507",
    github: "https://github.com/Macknota",
    linkedin: "https://www.linkedin.com/in/adel-magdy-net/",
  },
  skills: {
    languages: ["C#", "TypeScript", "JavaScript", "SQL", "HTML5", "CSS3", "SCSS"],
    frameworks: [".NET 8", "ASP.NET Core Web API", "Entity Framework Core", "LINQ", "ADO.NET", "SignalR", "Angular (v18)", "Angular Material", "Angular CDK", "RxJS", "NgRx", "Bootstrap", "Tailwind CSS"],
    databases: ["Microsoft SQL Server", "Redis"],
    architecture: ["Clean Architecture", "Onion Architecture", "Repository Pattern", "Unit of Work", "CQRS", "SOLID Principles", "MVC", "Component-Based Architecture", "Lazy Loading", "State Management"],
    tools: ["Visual Studio", "VS Code", "Git", "GitHub", "Postman", "Docker", "SSMS", "Angular CLI", "npm", "Chrome DevTools"],
    concepts: ["OOP", "Dependency Injection", "Middleware", "RESTful API Design", "Async/Await", "Responsive Design", "SPA", "Reactive Programming", "Angular Routing & Guards", "Angular Forms (Reactive & Template)", "Interceptors & Pipes", "Angular Lifecycle Hooks", "Module Federation"],
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
      description: "Intensive training covering C#, databases, and building enterprise-level APIs.",
    },
  ],
  experience: [
    {
      role: ".NET Developer Intern",
      company: "Smart up",
      location: "Cairo, Egypt",
      dates: "Oct 2025 – Dec 2025",
      type: "Hybrid",
      highlights: [
        "Actively participated in the full SDLC of enterprise web applications, contributing to both backend logic and database design.",
        "Developed and optimized scalable RESTful APIs using ASP.NET Core, ensuring high performance and clean code standards.",
        "Collaborated with the frontend team to integrate APIs and resolve cross-stack issues effectively.",
        "Demonstrated strong self-management skills in a hybrid work environment, delivering tasks ahead of deadlines.",
      ],
    },
  ],
  projects: [
    {
      name: "Social Connections Platform (Social Network)",
      technologies: [".NET 8", "Angular 18", "SignalR", "SQL Server", "EF Core", "Bootstrap"],
      description: "A full-stack social networking application allowing real-time interaction between users, built with modern architecture.",
      features: [
        "Developed a responsive and reactive SPA using Angular 18 with a modular component architecture.",
        "Implemented real-time messaging and live user presence using SignalR hubs.",
        "Built a secure RESTful API with .NET 8 and ASP.NET Core Identity for JWT-based authentication.",
        "Designed complex database relationships (Many-to-Many) for a 'User Likes' and 'Matches' system.",
        "Integrated cloud-based photo storage and management.",
      ],
      link: "#",
      images: [],
      challenge: "Building a real-time social platform with complex user interactions and live presence tracking.",
      solution: "Used SignalR for real-time communication and Angular 18 for a responsive SPA experience.",
      result: "A fully functional social network with real-time messaging, user matching, and photo management.",
    },
    {
      name: "Store (E-Commerce RESTful API)",
      technologies: [".NET 8", "EF Core", "SQL Server", "Redis", "Identity", "AutoMapper", "Docker"],
      description: "A complete backend solution for an online store platform built with advanced software engineering practices.",
      features: [
        "Designed a robust backend using Clean Architecture (Onion Architecture) to ensure separation of concerns.",
        "Implemented the Specification Pattern with a Generic Repository to handle complex filtering, sorting, and pagination.",
        "Optimized performance using Redis for basket data storage and implemented custom Caching Attributes.",
        "Secured the API using JWT authentication and role-based authorization.",
        "Integrated with Stripe for payment processing.",
      ],
      link: "#",
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
    description: "I believe in staying current with the latest technologies and best practices. From completing my Back-End development diploma to working on diverse projects, I'm committed to delivering cutting-edge backend solutions that scale with business needs.",
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
