import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check } from "lucide-react";

interface ProjectsSectionProps {
  data: PortfolioData;
}

const ProjectsSection = ({ data }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Real-world projects showcasing clean architecture and best practices
            </p>
          </div>
          
          {/* Projects */}
          <div className="space-y-8">
            {data.projects.map((project, index) => (
              <Card 
                key={index}
                className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-all duration-300 interactive-card"
              >
                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <CardTitle className="text-xl md:text-2xl text-foreground">
                      {project.name}
                    </CardTitle>
                    {project.link && project.link !== "#" && (
                      <Button variant="outline" size="sm" asChild className="w-fit pop-element">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </a>
                      </Button>
                    )}
                  </div>
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20 pop-badge"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Key Features:</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3 text-sm text-muted-foreground group/feature">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover/feature:scale-125" />
                          <span className="group-hover/feature:text-foreground transition-colors duration-200">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
