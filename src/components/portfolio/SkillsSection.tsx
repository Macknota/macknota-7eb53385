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
    <section id="skills" className="py-20">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Technical Skills
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              A comprehensive toolkit for building robust, scalable backend solutions
            </p>
          </div>
          
          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              const skills = data.skills[category.key];
              
              return (
                <Card 
                  key={category.key}
                  className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
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
