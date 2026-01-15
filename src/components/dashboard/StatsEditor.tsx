import { PortfolioData } from "@/lib/portfolioData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Code, Briefcase, GraduationCap, Award, Rocket, Star, Target, Zap } from "lucide-react";

interface StatsEditorProps {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

const iconOptions = [
  { value: "code", label: "Code", icon: Code },
  { value: "briefcase", label: "Briefcase", icon: Briefcase },
  { value: "graduation", label: "Graduation", icon: GraduationCap },
  { value: "award", label: "Award", icon: Award },
  { value: "rocket", label: "Rocket", icon: Rocket },
  { value: "star", label: "Star", icon: Star },
  { value: "target", label: "Target", icon: Target },
  { value: "zap", label: "Zap", icon: Zap },
];

const StatsEditor = ({ data, onUpdate }: StatsEditorProps) => {
  const stats = data.stats || [];

  const updateStat = (index: number, field: keyof typeof stats[0], value: string) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    onUpdate({ ...data, stats: newStats });
  };

  const addStat = () => {
    onUpdate({
      ...data,
      stats: [...stats, { label: "New Stat", value: "0", icon: "code" }],
    });
  };

  const removeStat = (index: number) => {
    onUpdate({
      ...data,
      stats: stats.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Statistics</h2>
          <p className="text-muted-foreground">Add impressive stats to showcase your achievements</p>
        </div>
        <Button onClick={addStat} className="gap-2">
          <Plus className="w-4 h-4" /> Add Stat
        </Button>
      </div>

      {stats.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground mb-4">No statistics added yet</p>
            <Button onClick={addStat} variant="outline" className="gap-2">
              <Plus className="w-4 h-4" /> Add Your First Stat
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {stats.map((stat, index) => {
          const IconComponent = iconOptions.find(i => i.value === stat.icon)?.icon || Code;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Value</Label>
                      <Input
                        value={stat.value}
                        onChange={(e) => updateStat(index, "value", e.target.value)}
                        placeholder="15+"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Label</Label>
                      <Input
                        value={stat.label}
                        onChange={(e) => updateStat(index, "label", e.target.value)}
                        placeholder="Projects Built"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <Select value={stat.icon} onValueChange={(value) => updateStat(index, "icon", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {iconOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <option.icon className="w-4 h-4" />
                                {option.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => removeStat(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StatsEditor;
