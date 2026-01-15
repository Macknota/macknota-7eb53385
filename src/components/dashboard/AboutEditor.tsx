import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface AboutEditorProps {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

const AboutEditor = ({ data, onUpdate }: AboutEditorProps) => {
  const updateAbout = (field: keyof PortfolioData["about"], value: string) => {
    onUpdate({
      ...data,
      about: { ...data.about, [field]: value },
    });
  };

  const updateEducation = (field: keyof PortfolioData["education"], value: string) => {
    onUpdate({
      ...data,
      education: { ...data.education, [field]: value },
    });
  };

  const updateCourse = (index: number, field: keyof PortfolioData["courses"][0], value: string) => {
    const newCourses = [...data.courses];
    newCourses[index] = { ...newCourses[index], [field]: value };
    onUpdate({ ...data, courses: newCourses });
  };

  const addCourse = () => {
    onUpdate({
      ...data,
      courses: [...data.courses, { year: "", name: "", description: "" }],
    });
  };

  const removeCourse = (index: number) => {
    onUpdate({
      ...data,
      courses: data.courses.filter((_, i) => i !== index),
    });
  };

  const updateLanguage = (index: number, field: keyof PortfolioData["languages"][0], value: string) => {
    const newLanguages = [...data.languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    onUpdate({ ...data, languages: newLanguages });
  };

  const addLanguage = () => {
    onUpdate({
      ...data,
      languages: [...data.languages, { name: "", level: "" }],
    });
  };

  const removeLanguage = (index: number) => {
    onUpdate({
      ...data,
      languages: data.languages.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">About & Education</h2>
        <p className="text-muted-foreground">Your profile summary and educational background</p>
      </div>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
          <CardDescription>Write a compelling description about yourself</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aboutTitle">Section Title</Label>
            <Input
              id="aboutTitle"
              value={data.about.title}
              onChange={(e) => updateAbout("title", e.target.value)}
              placeholder="About Me"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aboutDescription">Description</Label>
            <Textarea
              id="aboutDescription"
              value={data.about.description}
              onChange={(e) => updateAbout("description", e.target.value)}
              placeholder="Tell visitors about yourself..."
              rows={5}
            />
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>Your academic background</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                value={data.education.degree}
                onChange={(e) => updateEducation("degree", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Input
                id="university"
                value={data.education.university}
                onChange={(e) => updateEducation("university", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input
                id="graduationYear"
                value={data.education.graduationYear}
                onChange={(e) => updateEducation("graduationYear", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                value={data.education.grade}
                onChange={(e) => updateEducation("grade", e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="militaryStatus">Military Status</Label>
              <Input
                id="militaryStatus"
                value={data.education.militaryStatus}
                onChange={(e) => updateEducation("militaryStatus", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Courses & Certifications</CardTitle>
            <CardDescription>Professional training and certifications</CardDescription>
          </div>
          <Button onClick={addCourse} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.courses.map((course, index) => (
            <div key={index} className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Course {index + 1}</span>
                <Button
                  onClick={() => removeCourse(index)}
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    value={course.year}
                    onChange={(e) => updateCourse(index, "year", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={course.name}
                    onChange={(e) => updateCourse(index, "name", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={course.description}
                  onChange={(e) => updateCourse(index, "description", e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Languages</CardTitle>
            <CardDescription>Languages you speak</CardDescription>
          </div>
          <Button onClick={addLanguage} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.languages.map((lang, index) => (
            <div key={index} className="flex items-center gap-3">
              <Input
                placeholder="Language"
                value={lang.name}
                onChange={(e) => updateLanguage(index, "name", e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="Level"
                value={lang.level}
                onChange={(e) => updateLanguage(index, "level", e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={() => removeLanguage(index)}
                size="sm"
                variant="ghost"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutEditor;
