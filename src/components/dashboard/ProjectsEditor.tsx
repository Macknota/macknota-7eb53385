import { useState } from "react";
import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, X, ChevronDown, ChevronUp } from "lucide-react";

interface ProjectsEditorProps {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

const ProjectsEditor = ({ data, onUpdate }: ProjectsEditorProps) => {
  const [expandedProject, setExpandedProject] = useState<number | null>(0);
  const [newTech, setNewTech] = useState<Record<number, string>>({});
  const [newFeature, setNewFeature] = useState<Record<number, string>>({});

  const updateProject = (index: number, field: keyof PortfolioData["projects"][0], value: string | string[]) => {
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onUpdate({ ...data, projects: newProjects });
  };

  const addProject = () => {
    onUpdate({
      ...data,
      projects: [
        ...data.projects,
        { name: "New Project", technologies: [], description: "", features: [], link: "" },
      ],
    });
    setExpandedProject(data.projects.length);
  };

  const removeProject = (index: number) => {
    onUpdate({
      ...data,
      projects: data.projects.filter((_, i) => i !== index),
    });
  };

  const addTechnology = (index: number) => {
    const tech = newTech[index]?.trim();
    if (tech) {
      updateProject(index, "technologies", [...data.projects[index].technologies, tech]);
      setNewTech({ ...newTech, [index]: "" });
    }
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const techs = [...data.projects[projectIndex].technologies];
    techs.splice(techIndex, 1);
    updateProject(projectIndex, "technologies", techs);
  };

  const addFeature = (index: number) => {
    const feature = newFeature[index]?.trim();
    if (feature) {
      updateProject(index, "features", [...data.projects[index].features, feature]);
      setNewFeature({ ...newFeature, [index]: "" });
    }
  };

  const removeFeature = (projectIndex: number, featureIndex: number) => {
    const features = [...data.projects[projectIndex].features];
    features.splice(featureIndex, 1);
    updateProject(projectIndex, "features", features);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Projects</h2>
          <p className="text-muted-foreground">Showcase your best work</p>
        </div>
        <Button onClick={addProject} className="gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      {data.projects.map((project, index) => (
        <Card key={index}>
          <CardHeader
            className="cursor-pointer"
            onClick={() => setExpandedProject(expandedProject === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{project.name || "Untitled Project"}</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeProject(index);
                  }}
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                {expandedProject === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </div>
          </CardHeader>

          {expandedProject === index && (
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(index, "name", e.target.value)}
                    placeholder="Project name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Project Link</Label>
                  <Input
                    value={project.link}
                    onChange={(e) => updateProject(index, "link", e.target.value)}
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                  placeholder="Describe the project..."
                  rows={3}
                />
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <Label>Technologies</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="gap-1 pr-1">
                      {tech}
                      <button
                        onClick={() => removeTechnology(index, techIndex)}
                        className="ml-1 p-0.5 rounded-full hover:bg-destructive/20"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add technology..."
                    value={newTech[index] || ""}
                    onChange={(e) => setNewTech({ ...newTech, [index]: e.target.value })}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology(index))}
                  />
                  <Button onClick={() => addTechnology(index)} variant="outline" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <Label>Key Features</Label>
                <div className="space-y-2 mb-2">
                  {project.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2 p-2 bg-muted/50 rounded-lg">
                      <span className="flex-1 text-sm">{feature}</span>
                      <button
                        onClick={() => removeFeature(index, featureIndex)}
                        className="p-1 text-destructive hover:bg-destructive/20 rounded"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add feature..."
                    value={newFeature[index] || ""}
                    onChange={(e) => setNewFeature({ ...newFeature, [index]: e.target.value })}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature(index))}
                  />
                  <Button onClick={() => addFeature(index)} variant="outline" size="icon">
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

export default ProjectsEditor;
