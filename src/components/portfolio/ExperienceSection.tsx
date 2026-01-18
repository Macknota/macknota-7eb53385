import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Calendar, Check } from "lucide-react";

interface ExperienceSectionProps {
  data: PortfolioData;
}

const ExperienceSection = ({ data }: ExperienceSectionProps) => {
  return (
    <section id="experience" className="py-12 md:py-20">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
              Work Experience
            </h2>
            <div className="w-16 md:w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
            
            {data.experience.map((exp, index) => (
              <div key={index} className="relative mb-6 md:mb-8 last:mb-0">
                {/* Timeline dot */}
                <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block transition-transform duration-300 hover:scale-150" />
                
                <Card className="md:ml-16 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 interactive-card">
                  <CardContent className="p-4 md:p-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4 mb-3 md:mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-primary pop-icon" />
                          <h3 className="text-base md:text-xl font-semibold text-foreground">{exp.role}</h3>
                        </div>
                        <p className="text-sm md:text-lg text-primary font-medium">{exp.company}</p>
                      </div>
                      <Badge variant="secondary" className="w-fit pop-badge text-xs md:text-sm">
                        {exp.type}
                      </Badge>
                    </div>
                    
                    {/* Meta info */}
                    <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                      <div className="flex items-center gap-1 pop-element">
                        <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        {exp.location}
                      </div>
                      <div className="flex items-center gap-1 pop-element">
                        <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        {exp.dates}
                      </div>
                    </div>
                    
                    {/* Highlights */}
                    <ul className="space-y-1.5 md:space-y-2">
                      {exp.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground group/highlight">
                          <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover/highlight:scale-125" />
                          <span className="group-hover/highlight:text-foreground transition-colors duration-200">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
