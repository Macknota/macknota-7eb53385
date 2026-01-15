import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useState } from "react";

interface SkillsEditorProps {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

const skillCategories: { key: keyof PortfolioData["skills"]; label: string }[] = [
  { key: "languages", label: "Programming Languages" },
  { key: "frameworks", label: "Frameworks & Technologies" },
  { key: "databases", label: "Databases" },
  { key: "architecture", label: "Architecture & Patterns" },
  { key: "tools", label: "Tools" },
  { key: "concepts", label: "Concepts" },
];

const SkillsEditor = ({ data, onUpdate }: SkillsEditorProps) => {
  const [newSkills, setNewSkills] = useState<Record<string, string>>({});

  const removeSkill = (category: keyof PortfolioData["skills"], index: number) => {
    const newSkillsList = [...data.skills[category]];
    newSkillsList.splice(index, 1);
    onUpdate({
      ...data,
      skills: { ...data.skills, [category]: newSkillsList },
    });
  };

  const addSkill = (category: keyof PortfolioData["skills"]) => {
    const skill = newSkills[category]?.trim();
    if (skill) {
      onUpdate({
        ...data,
        skills: { ...data.skills, [category]: [...data.skills[category], skill] },
      });
      setNewSkills({ ...newSkills, [category]: "" });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, category: keyof PortfolioData["skills"]) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(category);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Technical Skills</h2>
        <p className="text-muted-foreground">Manage your technical skills by category</p>
      </div>

      {skillCategories.map((category) => (
        <Card key={category.key}>
          <CardHeader>
            <CardTitle className="text-lg">{category.label}</CardTitle>
            <CardDescription>Add or remove skills in this category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Skills */}
            <div className="flex flex-wrap gap-2">
              {data.skills[category.key].map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="gap-1 pr-1 text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(category.key, index)}
                    className="ml-1 p-0.5 rounded-full hover:bg-destructive/20 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>

            {/* Add New Skill */}
            <div className="flex gap-2">
              <Input
                placeholder={`Add new ${category.label.toLowerCase()}...`}
                value={newSkills[category.key] || ""}
                onChange={(e) => setNewSkills({ ...newSkills, [category.key]: e.target.value })}
                onKeyPress={(e) => handleKeyPress(e, category.key)}
              />
              <Button onClick={() => addSkill(category.key)} variant="outline" size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SkillsEditor;
