import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb } from "lucide-react";

interface LearningEditorProps {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

const LearningEditor = ({ data, onUpdate }: LearningEditorProps) => {
  const learning = data.learning || { title: "", description: "" };

  const updateLearning = (field: keyof typeof learning, value: string) => {
    onUpdate({
      ...data,
      learning: { ...learning, [field]: value },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Continuous Learning & Growth</h2>
        <p className="text-muted-foreground">Share your commitment to learning and growth</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Learning Section
          </CardTitle>
          <CardDescription>
            This section highlights your dedication to continuous improvement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="learning-title">Section Title</Label>
            <Input
              id="learning-title"
              value={learning.title}
              onChange={(e) => updateLearning("title", e.target.value)}
              placeholder="Continuous Learning & Growth"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="learning-description">Description</Label>
            <Textarea
              id="learning-description"
              value={learning.description}
              onChange={(e) => updateLearning("description", e.target.value)}
              placeholder="I believe in staying current with the latest technologies and best practices..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningEditor;
