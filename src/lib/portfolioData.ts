// Portfolio Data Store - This will be the single source of truth for all portfolio content
export interface PortfolioData {
  hero: {
    name: string;
    title: string;
    subtitle: string;
    profileImage: string;
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
  }[];
  languages: {
    name: string;
    level: string;
  }[];
}

export const defaultPortfolioData: PortfolioData = {
  hero: {
    name: "Adel Magdy Macknota",
    title: ".NET Backend Developer",
    subtitle: "Building scalable, high-performance backend solutions with clean architecture",
    profileImage: "",
  },
  about: {
    title: "About Me",
    description: "Motivated and detail-oriented .NET Backend Developer with a B.Sc. in Computer Science. Solid foundation in building scalable RESTful APIs using .NET 8, Entity Framework Core, and SQL Server. Experienced in implementing Clean Architecture and SOLID principles through hands-on projects. Committed to writing clean, maintainable code and solving complex business problems. Eager to join a dynamic team to contribute to high-quality software solutions.",
  },
  contact: {
    email: "adelmagdymacknota@gmail.com",
    phone: "(+20)01279792507",
    location: "Egypt, Alexandria",
    whatsapp: "201279792507",
    github: "https://github.com/adelmagdy",
    linkedin: "https://linkedin.com/in/adelmagdy",
  },
  skills: {
    languages: ["C#", "SQL", "HTML5", "CSS3"],
    frameworks: [".NET 6/7/8", "ASP.NET Core Web API", "Entity Framework Core", "LINQ", "ADO.NET", "SignalR"],
    databases: ["Microsoft SQL Server", "Redis"],
    architecture: ["Clean Architecture", "Onion Architecture", "Repository Pattern", "Unit of Work", "Specification Pattern", "SOLID Principles", "CQRS", "MVC"],
    tools: ["Visual Studio", "Git", "GitHub", "Postman", "SSMS", "Docker"],
    concepts: ["OOP", "Dependency Injection", "Middleware", "RESTful API Design", "Async/Await"],
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
        "Completed a 2-month internship (1 month on-site, 1 month remote), actively participating in the full SDLC of web applications using .NET.",
        "Demonstrated strong self-management and collaboration skills while working remotely, ensuring timely delivery of backend tasks.",
        "Collaborated with the team to design efficient database schemas and implement scalable backend logic using ASP.NET Core.",
        "Gained hands-on experience in debugging complex issues and optimizing existing codebases.",
      ],
    },
  ],
  projects: [
    {
      name: "Store (E-Commerce RESTful API)",
      technologies: [".NET 8", "EF Core", "SQL Server", "Redis", "Identity", "AutoMapper", "Docker"],
      description: "A complete backend solution for an online store platform built with advanced software engineering practices.",
      features: [
        "Designed a robust backend using Clean Architecture (Onion Architecture) to ensure separation of concerns, maintainability, and testability.",
        "Implemented the Specification Pattern with a Generic Repository to handle complex filtering, sorting, and pagination dynamically.",
        "Optimized performance using Redis for basket data storage and implemented custom Caching Attributes for high-traffic endpoints.",
        "Secured the API using ASP.NET Core Identity with JWT authentication and role-based authorization.",
        "Built a comprehensive Error Handling system using Global Middleware to standardize API responses.",
        "Integration with Stripe for payments and containerization support using Docker.",
      ],
      link: "#",
    },
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Intermediate (Professional working proficiency)" },
    { name: "Spanish", level: "Beginner" },
  ],
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
