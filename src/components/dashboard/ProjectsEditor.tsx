import { useState } from "react";
import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, X, ChevronDown, ChevronUp, Image, Upload, Crop } from "lucide-react";
import ImageCropper from "./ImageCropper";

interface ProjectsEditorProps {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

const ProjectsEditor = ({ data, onUpdate }: ProjectsEditorProps) => {
  const [expandedProject, setExpandedProject] = useState<number | null>(0);
  const [newTech, setNewTech] = useState<Record<number, string>>({});
  const [newFeature, setNewFeature] = useState<Record<number, string>>({});
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperImage, setCropperImage] = useState("");
  const [cropTarget, setCropTarget] = useState<{ projectIndex: number; imageIndex: number | null }>({ projectIndex: 0, imageIndex: null });

  const updateProject = (index: number, field: keyof PortfolioData["projects"][0], value: string | string[] | boolean) => {
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onUpdate({ ...data, projects: newProjects });
  };

  const addProject = () => {
    onUpdate({
      ...data,
      projects: [
        ...data.projects,
        { name: "New Project", technologies: [], description: "", features: [], link: "", images: [], challenge: "", solution: "", result: "" },
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

  const handleImageUpload = (projectIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setCropperImage(base64);
        setCropTarget({ projectIndex, imageIndex: null });
        setCropperOpen(true);
      };
      reader.readAsDataURL(file);
    });
  };

  const openCropperForExisting = (projectIndex: number, imageIndex: number) => {
    const img = data.projects[projectIndex].images?.[imageIndex];
    if (img) {
      setCropperImage(img);
      setCropTarget({ projectIndex, imageIndex });
      setCropperOpen(true);
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    const { projectIndex, imageIndex } = cropTarget;
    const currentImages = [...(data.projects[projectIndex].images || [])];
    if (imageIndex !== null) {
      currentImages[imageIndex] = croppedImage;
    } else {
      currentImages.push(croppedImage);
    }
    updateProject(projectIndex, "images", currentImages);
  };

  const removeImage = (projectIndex: number, imageIndex: number) => {
    const images = [...(data.projects[projectIndex].images || [])];
    images.splice(imageIndex, 1);
    updateProject(projectIndex, "images", images);
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

              {/* In Progress Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Work in Progress</Label>
                  <p className="text-xs text-muted-foreground">Mark this project as currently in development</p>
                </div>
                <Switch
                  checked={project.inProgress || false}
                  onCheckedChange={(checked) => updateProject(index, "inProgress", checked)}
                />
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

              {/* Project Images */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Project Images
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(project.images || []).map((img, imgIndex) => (
                    <div key={imgIndex} className="relative group rounded-lg overflow-hidden border border-border bg-muted/20 flex items-center justify-center min-h-[80px]">
                      <img src={img} alt={`Project ${imgIndex + 1}`} className="max-w-full max-h-[120px] w-auto h-auto object-contain" />
                      <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => openCropperForExisting(index, imgIndex)}
                          className="p-1.5 bg-primary rounded-full shadow-lg"
                          title="قص وتعديل"
                        >
                          <Crop className="w-3 h-3 text-primary-foreground" />
                        </button>
                        <button
                          onClick={() => removeImage(index, imgIndex)}
                          className="p-1.5 bg-destructive/80 rounded-full shadow-lg"
                          title="حذف"
                        >
                          <X className="w-3 h-3 text-destructive-foreground" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <label className="aspect-video rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center cursor-pointer transition-colors bg-muted/20 hover:bg-muted/40">
                    <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">Add Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleImageUpload(index, e)}
                    />
                  </label>
                </div>
              </div>

              {/* Challenge/Solution/Result */}
              <div className="space-y-4 pt-4 border-t border-border/50">
                <h4 className="font-semibold text-foreground">Project Story (Optional)</h4>
                <div className="space-y-2">
                  <Label>Challenge</Label>
                  <Textarea
                    value={project.challenge || ""}
                    onChange={(e) => updateProject(index, "challenge", e.target.value)}
                    placeholder="What problem did this project solve?"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Solution</Label>
                  <Textarea
                    value={project.solution || ""}
                    onChange={(e) => updateProject(index, "solution", e.target.value)}
                    placeholder="How did you solve it?"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Result</Label>
                  <Textarea
                    value={project.result || ""}
                    onChange={(e) => updateProject(index, "result", e.target.value)}
                    placeholder="What was the outcome?"
                    rows={2}
                  />
                </div>
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

      <ImageCropper
        open={cropperOpen}
        imageSrc={cropperImage}
        aspect={16 / 9}
        onClose={() => setCropperOpen(false)}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
};

export default ProjectsEditor;
