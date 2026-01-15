import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Shield, BookOpen, Languages } from "lucide-react";

interface AboutSectionProps {
  data: PortfolioData;
}

const AboutSection = ({ data }: AboutSectionProps) => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {data.about.title}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>
          
          {/* About Text */}
          <p className="text-lg text-muted-foreground leading-relaxed text-center mb-12">
            {data.about.description}
          </p>
          
          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Education */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Education</h3>
                    <p className="text-sm text-muted-foreground">{data.education.degree}</p>
                    <p className="text-sm text-muted-foreground">{data.education.university}</p>
                    <p className="text-sm text-primary mt-2">
                      {data.education.graduationYear} • Grade: {data.education.grade}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Military Status */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Military Status</h3>
                    <p className="text-sm text-muted-foreground">{data.education.militaryStatus}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Courses */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Courses</h3>
                    {data.courses.map((course, index) => (
                      <div key={index} className="mb-2">
                        <p className="text-sm text-muted-foreground">{course.year}: {course.name}</p>
                        <p className="text-xs text-muted-foreground/70">{course.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Languages */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Languages className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Languages</h3>
                    <div className="space-y-1">
                      {data.languages.map((lang, index) => (
                        <p key={index} className="text-sm text-muted-foreground">
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
