import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Briefcase, GraduationCap, Award, Rocket, Star, Target, Zap } from "lucide-react";

interface StatsSectionProps {
  data: PortfolioData;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  briefcase: Briefcase,
  graduation: GraduationCap,
  award: Award,
  rocket: Rocket,
  star: Star,
  target: Target,
  zap: Zap,
};

const StatsSection = ({ data }: StatsSectionProps) => {
  if (!data.stats || data.stats.length === 0) return null;

  return (
    <section className="py-12 relative">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {data.stats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || Code;
              return (
                <Card
                  key={index}
                  className="border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 interactive-card group"
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 pop-icon">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
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

export default StatsSection;
