import { useState } from "react";
import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check, ChevronLeft, ChevronRight, Target, Lightbulb, Trophy, Image as ImagePlaceholder } from "lucide-react";

// Tech brand colors mapping
const techColors: Record<string, { bg: string; border: string; text: string }> = {
  ".NET 8": { bg: "bg-[#512BD4]/20", border: "border-[#512BD4]", text: "text-[#512BD4]" },
  ".NET 6/7/8": { bg: "bg-[#512BD4]/20", border: "border-[#512BD4]", text: "text-[#512BD4]" },
  "EF Core": { bg: "bg-[#68217A]/20", border: "border-[#68217A]", text: "text-[#B565D9]" },
  "SQL Server": { bg: "bg-[#CC2927]/20", border: "border-[#CC2927]", text: "text-[#CC2927]" },
  "Redis": { bg: "bg-[#DC382D]/20", border: "border-[#DC382D]", text: "text-[#DC382D]" },
  "Identity": { bg: "bg-[#0078D7]/20", border: "border-[#0078D7]", text: "text-[#0078D7]" },
  "AutoMapper": { bg: "bg-[#BE2026]/20", border: "border-[#BE2026]", text: "text-[#E65A5F]" },
  "Docker": { bg: "bg-[#2496ED]/20", border: "border-[#2496ED]", text: "text-[#2496ED]" },
  "C#": { bg: "bg-[#239120]/20", border: "border-[#239120]", text: "text-[#68BC71]" },
  "React": { bg: "bg-[#61DAFB]/20", border: "border-[#61DAFB]", text: "text-[#61DAFB]" },
  "TypeScript": { bg: "bg-[#3178C6]/20", border: "border-[#3178C6]", text: "text-[#3178C6]" },
  "PostgreSQL": { bg: "bg-[#336791]/20", border: "border-[#336791]", text: "text-[#6B9AC4]" },
  "MongoDB": { bg: "bg-[#47A248]/20", border: "border-[#47A248]", text: "text-[#47A248]" },
  "Azure": { bg: "bg-[#0078D4]/20", border: "border-[#0078D4]", text: "text-[#0078D4]" },
  "AWS": { bg: "bg-[#FF9900]/20", border: "border-[#FF9900]", text: "text-[#FF9900]" },
  "SignalR": { bg: "bg-[#512BD4]/20", border: "border-[#512BD4]", text: "text-[#9B7EDE]" },
  "GraphQL": { bg: "bg-[#E10098]/20", border: "border-[#E10098]", text: "text-[#E10098]" },
  "RabbitMQ": { bg: "bg-[#FF6600]/20", border: "border-[#FF6600]", text: "text-[#FF6600]" },
  "Kubernetes": { bg: "bg-[#326CE5]/20", border: "border-[#326CE5]", text: "text-[#326CE5]" },
};

const TechBadge = ({ tech }: { tech: string }) => {
  const colors = techColors[tech] || { bg: "bg-muted", border: "border-primary/40", text: "text-primary" };
  
  return (
    <Badge 
      variant="outline"
      className={`${colors.bg} ${colors.border} ${colors.text} border font-medium pop-badge backdrop-blur-sm text-[10px] md:text-xs px-1.5 md:px-2 py-0.5`}
    >
      {tech}
    </Badge>
  );
};

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
    <section id="projects" className="py-12 md:py-20 bg-muted/30">
      <div className="container px-4 md:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
              Featured Projects
            </h2>
            <div className="w-16 md:w-20 h-1 bg-primary/60 mx-auto rounded-full" />
            <p className="text-muted-foreground mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base px-2">
              Real-world projects showcasing clean architecture and best practices
            </p>
          </div>
          
          {/* Projects */}
          <div className="space-y-6 md:space-y-8">
            {data.projects.map((project, index) => {
              const images = project.images || [];
              const currentIdx = currentImageIndex[index] || 0;
              const hasImages = images.length > 0;
              
              return (
                <Card 
                  key={index}
                  className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-all duration-300 glow-card"
                >
                  <div className="grid md:grid-cols-5 gap-0">
                    {/* Content Side */}
                    <div className="md:col-span-3 order-2 md:order-1">
                      <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                          <CardTitle className="text-lg md:text-2xl text-foreground">
                            {project.name}
                          </CardTitle>
                          {project.link && project.link !== "#" && (
                            <Button variant="outline" size="sm" asChild className="w-fit pop-element glow-effect text-xs md:text-sm">
                              <a href={project.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                                View Project
                              </a>
                            </Button>
                          )}
                        </div>
                        {/* Technologies with brand-colored badges */}
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3 md:mt-4">
                          {project.technologies.map((tech, techIndex) => (
                            <TechBadge key={techIndex} tech={tech} />
                          ))}
                        </div>
                      </CardHeader>
                    </div>
                    
                    {/* Image Side - Always visible with placeholder */}
                    <div className="md:col-span-2 order-1 md:order-2 relative group">
                      <div className="flex items-center justify-center bg-muted/20 p-2 md:p-4 min-h-[120px]">
                        {hasImages ? (
                          <img
                            src={images[currentIdx]}
                            alt={`${project.name} screenshot ${currentIdx + 1}`}
                            className="max-w-full max-h-[350px] w-auto h-auto rounded-md transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full min-h-[180px] flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-md py-4">
                            <ImagePlaceholder className="w-10 h-10 md:w-16 md:h-16 text-muted-foreground/40 mb-2 md:mb-3" />
                            <span className="text-xs md:text-sm text-muted-foreground/60 font-medium">Architecture Diagram</span>
                            <span className="text-[10px] md:text-xs text-muted-foreground/40 mt-1">Upload via Dashboard</span>
                          </div>
                        )}
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
                  </div>
                  <CardContent className="p-4 md:p-6">
                    <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                      {project.description}
                    </p>

                    {/* Challenge / Solution / Result */}
                    {(project.challenge || project.solution || project.result) && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                        {project.challenge && (
                          <div className="p-3 md:p-4 rounded-lg bg-muted/50 border border-border/50 interactive-card">
                            <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                              <Target className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                              <h5 className="font-semibold text-foreground text-sm md:text-base">Challenge</h5>
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground">{project.challenge}</p>
                          </div>
                        )}
                        {project.solution && (
                          <div className="p-3 md:p-4 rounded-lg bg-muted/50 border border-border/50 interactive-card">
                            <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                              <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                              <h5 className="font-semibold text-foreground text-sm md:text-base">Solution</h5>
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground">{project.solution}</p>
                          </div>
                        )}
                        {project.result && (
                          <div className="p-3 md:p-4 rounded-lg bg-muted/50 border border-border/50 interactive-card">
                            <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                              <Trophy className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                              <h5 className="font-semibold text-foreground text-sm md:text-base">Result</h5>
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground">{project.result}</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Features */}
                    <div className="space-y-2 md:space-y-3">
                      <h4 className="font-semibold text-foreground text-sm md:text-base">Key Features:</h4>
                      <ul className="space-y-1.5 md:space-y-2">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground group/feature">
                            <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover/feature:scale-125" />
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
