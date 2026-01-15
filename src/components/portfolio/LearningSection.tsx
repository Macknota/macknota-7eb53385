import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, TrendingUp, BookOpen, Sparkles } from "lucide-react";

interface LearningSectionProps {
  data: PortfolioData;
}

const LearningSection = ({ data }: LearningSectionProps) => {
  if (!data.learning || !data.learning.title) return null;

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50 bg-gradient-to-br from-primary/5 via-card to-accent/5 backdrop-blur-sm overflow-hidden interactive-card group">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 pop-icon">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
                    {data.learning.title}
                    <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {data.learning.description}
                  </p>

                  {/* Decorative icons */}
                  <div className="flex gap-4 mt-6">
                    <div className="p-2 rounded-lg bg-primary/10 pop-element">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div className="p-2 rounded-lg bg-primary/10 pop-element">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LearningSection;
