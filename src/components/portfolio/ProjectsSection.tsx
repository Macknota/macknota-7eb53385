import { useState } from "react";
import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check, Target, Lightbulb, Trophy, Image as ImagePlaceholder } from "lucide-react";

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
  "Angular 18": { bg: "bg-[#DD0031]/20", border: "border-[#DD0031]", text: "text-[#DD0031]" },
  "Bootstrap": { bg: "bg-[#7952B3]/20", border: "border-[#7952B3]", text: "text-[#7952B3]" },
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
  const [selectedImage, setSelectedImage] = useState<Record<number, number>>({});

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
          <div className="space-y-8 md:space-y-10">
            {data.projects.map((project, index) => {
              const images = project.images || [];
              const hasImages = images.length > 0;
              const activeIdx = selectedImage[index] || 0;
              
              return (
                <Card 
                  key={index}
                  className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-all duration-300 glow-card"
                >
                  {/* Project Header - Always on top */}
                  <div className="border-b border-border/40 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="space-y-2">
                        <h3 className="text-lg md:text-2xl font-bold text-foreground">
                          {project.name}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                          {project.description}
                        </p>
                      </div>
                      {project.link && project.link !== "#" && (
                        <Button variant="outline" size="sm" asChild className="w-fit pop-element glow-effect text-xs md:text-sm shrink-0">
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5" />
                            View Project
                          </a>
                        </Button>
                      )}
                    </div>
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3">
                      {project.technologies.map((tech, techIndex) => (
                        <TechBadge key={techIndex} tech={tech} />
                      ))}
                    </div>
                  </div>

                  {/* Images Gallery */}
                  <div className="border-b border-border/30 bg-muted/10">
                    {hasImages ? (
                      <div className="p-4 md:p-6 space-y-3">
                        {/* Main selected image */}
                        <div className="flex items-center justify-center bg-muted/20 rounded-lg p-3 md:p-4 min-h-[150px] md:min-h-[280px]">
                          <img
                            src={images[activeIdx]}
                            alt={`${project.name} screenshot ${activeIdx + 1}`}
                            className="max-w-full max-h-[250px] md:max-h-[380px] w-auto h-auto object-contain rounded-lg border border-border/40 shadow-lg shadow-primary/5 ring-1 ring-border/20 transition-all duration-500"
                          />
                        </div>
                        {/* Thumbnails row */}
                        {images.length > 1 && (
                          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-1 scrollbar-thin">
                            {images.map((img, imgIdx) => (
                              <button
                                key={imgIdx}
                                onClick={() => setSelectedImage(prev => ({ ...prev, [index]: imgIdx }))}
                                className={`shrink-0 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                                  imgIdx === activeIdx
                                    ? 'border-primary shadow-md shadow-primary/20 scale-105'
                                    : 'border-border/30 opacity-60 hover:opacity-100 hover:border-border'
                                }`}
                              >
                                <img
                                  src={img}
                                  alt={`${project.name} thumb ${imgIdx + 1}`}
                                  className="w-16 h-12 md:w-24 md:h-16 object-contain bg-muted/20 p-1"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[120px]">
                        <ImagePlaceholder className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground/30 mb-2" />
                        <span className="text-xs text-muted-foreground/50">No images yet</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
                    {/* Challenge / Solution / Result */}
                    {(project.challenge || project.solution || project.result) && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
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
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
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
