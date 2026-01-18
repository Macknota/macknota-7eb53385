import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Shield, BookOpen, Languages } from "lucide-react";

interface AboutSectionProps {
  data: PortfolioData;
}

const AboutSection = ({ data }: AboutSectionProps) => {
  return (
    <section id="about" className="py-12 md:py-20 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
              {data.about.title}
            </h2>
            <div className="w-16 md:w-20 h-1 bg-primary/60 mx-auto rounded-full" />
          </div>
          
          {/* About Text */}
          <p className="text-sm md:text-lg text-muted-foreground leading-relaxed text-center mb-8 md:mb-12 px-2">
            {data.about.description}
          </p>
          
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Education */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 interactive-card slide-up">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-lg bg-primary/10 pop-icon flex-shrink-0">
                    <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">Education</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{data.education.degree}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{data.education.university}</p>
                    <p className="text-xs md:text-sm text-primary mt-1.5 md:mt-2">
                      {data.education.graduationYear} • Grade: {data.education.grade}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Military Status */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 interactive-card slide-up">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-lg bg-primary/10 pop-icon flex-shrink-0">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">Military Status</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{data.education.militaryStatus}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Courses */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 interactive-card slide-up">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-lg bg-primary/10 pop-icon flex-shrink-0">
                    <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">Courses</h3>
                    {data.courses.map((course, index) => (
                      <div key={index} className="mb-1.5 md:mb-2">
                        <p className="text-xs md:text-sm text-muted-foreground">{course.year}: {course.name}</p>
                        <p className="text-[10px] md:text-xs text-muted-foreground/70">{course.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Languages */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 interactive-card slide-up">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-lg bg-primary/10 pop-icon flex-shrink-0">
                    <Languages className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">Languages</h3>
                    <div className="space-y-0.5 md:space-y-1">
                      {data.languages.map((lang, index) => (
                        <p key={index} className="text-xs md:text-sm text-muted-foreground">
                          <span className="font-medium">{lang.name}:</span> {lang.level}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
