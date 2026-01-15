import { useState } from "react";
import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, X, ChevronDown, ChevronUp } from "lucide-react";

interface ExperienceEditorProps {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

const ExperienceEditor = ({ data, onUpdate }: ExperienceEditorProps) => {
  const [expandedExp, setExpandedExp] = useState<number | null>(0);
  const [newHighlight, setNewHighlight] = useState<Record<number, string>>({});

  const updateExperience = (index: number, field: keyof PortfolioData["experience"][0], value: string | string[]) => {
    const newExperiences = [...data.experience];
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    onUpdate({ ...data, experience: newExperiences });
  };

  const addExperience = () => {
    onUpdate({
      ...data,
      experience: [
        ...data.experience,
        { role: "New Role", company: "", location: "", dates: "", type: "Full-time", highlights: [] },
      ],
    });
    setExpandedExp(data.experience.length);
  };

  const removeExperience = (index: number) => {
    onUpdate({
      ...data,
      experience: data.experience.filter((_, i) => i !== index),
    });
  };

  const addHighlight = (index: number) => {
    const highlight = newHighlight[index]?.trim();
    if (highlight) {
      updateExperience(index, "highlights", [...data.experience[index].highlights, highlight]);
      setNewHighlight({ ...newHighlight, [index]: "" });
    }
  };

  const removeHighlight = (expIndex: number, highlightIndex: number) => {
    const highlights = [...data.experience[expIndex].highlights];
    highlights.splice(highlightIndex, 1);
    updateExperience(expIndex, "highlights", highlights);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Work Experience</h2>
          <p className="text-muted-foreground">Your professional journey</p>
        </div>
        <Button onClick={addExperience} className="gap-2">
          <Plus className="w-4 h-4" /> Add Experience
        </Button>
      </div>

      {data.experience.map((exp, index) => (
        <Card key={index}>
          <CardHeader
            className="cursor-pointer"
            onClick={() => setExpandedExp(expandedExp === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {exp.role || "Untitled Role"} {exp.company && `@ ${exp.company}`}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeExperience(index);
                  }}
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                {expandedExp === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </div>
          </CardHeader>

          {expandedExp === index && (
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role / Position</Label>
                  <Input
                    value={exp.role}
                    onChange={(e) => updateExperience(index, "role", e.target.value)}
                    placeholder="e.g., .NET Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    placeholder="Company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(index, "location", e.target.value)}
                    placeholder="e.g., Cairo, Egypt"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    value={exp.dates}
                    onChange={(e) => updateExperience(index, "dates", e.target.value)}
                    placeholder="e.g., Oct 2025 – Dec 2025"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Input
                    value={exp.type}
                    onChange={(e) => updateExperience(index, "type", e.target.value)}
                    placeholder="e.g., Hybrid, Remote, Full-time"
                  />
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <Label>Key Achievements / Responsibilities</Label>
                <div className="space-y-2 mb-2">
                  {exp.highlights.map((highlight, highlightIndex) => (
                    <div key={highlightIndex} className="flex items-start gap-2 p-2 bg-muted/50 rounded-lg">
                      <span className="flex-1 text-sm">{highlight}</span>
                      <button
                        onClick={() => removeHighlight(index, highlightIndex)}
                        className="p-1 text-destructive hover:bg-destructive/20 rounded"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add achievement..."
                    value={newHighlight[index] || ""}
                    onChange={(e) => setNewHighlight({ ...newHighlight, [index]: e.target.value })}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight(index))}
                  />
                  <Button onClick={() => addHighlight(index)} variant="outline" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default ExperienceEditor;
