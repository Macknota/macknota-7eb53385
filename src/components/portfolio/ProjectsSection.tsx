import { useState } from "react";
import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check, ChevronLeft, ChevronRight, Target, Lightbulb, Trophy } from "lucide-react";

interface ProjectsSectionProps {
  data: PortfolioData;
}

const ProjectsSection = ({ data }: ProjectsSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});

  const nextImage = (projectIndex: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (projectIndex: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) - 1 + totalImages) % totalImages
    }));
  };

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
            {data.projects.map((project, index) => {
              const images = project.images || [];
              const currentIdx = currentImageIndex[index] || 0;
              
              return (
                <Card 
                  key={index}
                  className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-all duration-300 interactive-card"
                >
                  {/* Image Gallery */}
                  {images.length > 0 && (
                    <div className="relative group">
                      <div className="aspect-video overflow-hidden bg-muted">
                        <img
                          src={images[currentIdx]}
                          alt={`${project.name} screenshot ${currentIdx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      
                      {/* Navigation arrows */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={() => prevImage(index, images.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background pop-element"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => nextImage(index, images.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background pop-element"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                          
                          {/* Dots indicator */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, imgIdx) => (
                              <button
                                key={imgIdx}
                                onClick={() => setCurrentImageIndex(prev => ({ ...prev, [index]: imgIdx }))}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  imgIdx === currentIdx ? 'bg-primary w-6' : 'bg-background/60 hover:bg-background'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

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

                    {/* Challenge / Solution / Result */}
                    {(project.challenge || project.solution || project.result) && (
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        {project.challenge && (
                          <div className="p-4 rounded-lg bg-muted/50 border border-border/50 interactive-card">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="w-5 h-5 text-primary" />
                              <h5 className="font-semibold text-foreground">Challenge</h5>
                            </div>
                            <p className="text-sm text-muted-foreground">{project.challenge}</p>
                          </div>
                        )}
                        {project.solution && (
                          <div className="p-4 rounded-lg bg-muted/50 border border-border/50 interactive-card">
                            <div className="flex items-center gap-2 mb-2">
                              <Lightbulb className="w-5 h-5 text-primary" />
                              <h5 className="font-semibold text-foreground">Solution</h5>
                            </div>
                            <p className="text-sm text-muted-foreground">{project.solution}</p>
                          </div>
                        )}
                        {project.result && (
                          <div className="p-4 rounded-lg bg-muted/50 border border-border/50 interactive-card">
                            <div className="flex items-center gap-2 mb-2">
                              <Trophy className="w-5 h-5 text-primary" />
                              <h5 className="font-semibold text-foreground">Result</h5>
                            </div>
                            <p className="text-sm text-muted-foreground">{project.result}</p>
                          </div>
                        )}
                      </div>
                    )}
                    
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
