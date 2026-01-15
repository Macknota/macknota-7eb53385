import { useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import HeroEditor from "@/components/dashboard/HeroEditor";
import AboutEditor from "@/components/dashboard/AboutEditor";
import SkillsEditor from "@/components/dashboard/SkillsEditor";
import ProjectsEditor from "@/components/dashboard/ProjectsEditor";
import ExperienceEditor from "@/components/dashboard/ExperienceEditor";
import ContactEditor from "@/components/dashboard/ContactEditor";
import ThemeEditor from "@/components/dashboard/ThemeEditor";
import StatsEditor from "@/components/dashboard/StatsEditor";
import LearningEditor from "@/components/dashboard/LearningEditor";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Dashboard = () => {
  const { data, updateData, resetData, isLoaded } = usePortfolio();
  const [activeSection, setActiveSection] = useState("hero");
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();

  const handleReset = () => {
    setShowResetDialog(true);
  };

  const confirmReset = () => {
    resetData();
    setShowResetDialog(false);
    toast({
      title: "Reset Complete",
      description: "Portfolio data has been reset to defaults.",
    });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const renderEditor = () => {
    switch (activeSection) {
      case "hero":
        return <HeroEditor data={data} onUpdate={updateData} />;
      case "about":
        return <AboutEditor data={data} onUpdate={updateData} />;
      case "stats":
        return <StatsEditor data={data} onUpdate={updateData} />;
      case "skills":
        return <SkillsEditor data={data} onUpdate={updateData} />;
      case "projects":
        return <ProjectsEditor data={data} onUpdate={updateData} />;
      case "experience":
        return <ExperienceEditor data={data} onUpdate={updateData} />;
      case "learning":
        return <LearningEditor data={data} onUpdate={updateData} />;
      case "contact":
        return <ContactEditor data={data} onUpdate={updateData} />;
      case "theme":
        return <ThemeEditor />;
      default:
        return <HeroEditor data={data} onUpdate={updateData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </Button>

      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onReset={handleReset}
        />
      </div>

      {/* Sidebar - Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full">
            <DashboardSidebar
              activeSection={activeSection}
              onSectionChange={(section) => {
                setActiveSection(section);
                setIsSidebarOpen(false);
              }}
              onReset={handleReset}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
        <div className="max-w-4xl mx-auto">{renderEditor()}</div>
      </main>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Portfolio Data?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all your portfolio information to the default values. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReset} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
