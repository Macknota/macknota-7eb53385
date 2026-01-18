import { PortfolioData } from "@/lib/portfolioData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Layers, Database, Wrench, Lightbulb, Box } from "lucide-react";

interface SkillsSectionProps {
  data: PortfolioData;
}

const skillCategories = [
  { key: "languages" as const, title: "Languages", icon: Code2 },
  { key: "frameworks" as const, title: "Frameworks & Technologies", icon: Layers },
  { key: "databases" as const, title: "Databases", icon: Database },
  { key: "architecture" as const, title: "Architecture & Patterns", icon: Box },
  { key: "tools" as const, title: "Tools", icon: Wrench },
  { key: "concepts" as const, title: "Concepts", icon: Lightbulb },
];

const SkillsSection = ({ data }: SkillsSectionProps) => {
  return (
    <section id="skills" className="py-12 md:py-20">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Technical Skills
              </span>
            </h2>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full" />
            <p className="text-muted-foreground mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base px-2">
              A comprehensive toolkit for building robust, scalable backend solutions
            </p>
          </div>
          
          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              const skills = data.skills[category.key];
              
              return (
                <Card 
                  key={category.key}
                  className="border-border/50 bg-card backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group interactive-card slide-up"
                >
                  <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2 md:gap-3 text-sm md:text-lg text-card-foreground">
                      <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 pop-icon">
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </div>
                      <span className="text-foreground">{category.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-default pop-badge text-xs md:text-sm px-2 py-0.5 md:px-2.5 md:py-0.5"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
