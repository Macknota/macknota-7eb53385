import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  User, 
  Code2, 
  FolderKanban, 
  Briefcase, 
  MessageSquare, 
  GraduationCap,
  Home,
  RotateCcw,
  Palette,
  LogOut
} from "lucide-react";

const menuItems = [
  { id: "hero", label: "Hero Section", icon: User },
  { id: "about", label: "About & Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "contact", label: "Contact Info", icon: MessageSquare },
  { id: "theme", label: "Theme & Colors", icon: Palette },
];

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onReset: () => void;
}

const DashboardSidebar = ({ activeSection, onSectionChange, onReset }: DashboardSidebarProps) => {
  const { signOut } = useAuth();

  return (
    <div className="w-64 border-r border-border bg-card h-screen sticky top-0 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Link to="/" className="text-lg font-bold text-foreground">
          <span className="text-primary">&lt;</span>
          Dashboard
          <span className="text-primary">/&gt;</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Link to="/" className="block">
          <Button variant="outline" className="w-full gap-2">
            <Home className="w-4 h-4" />
            View Portfolio
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          className="w-full gap-2 text-destructive hover:text-destructive"
          onClick={onReset}
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Default
        </Button>
        <Button 
          variant="ghost" 
          className="w-full gap-2"
          onClick={signOut}
        >
          <LogOut className="w-4 h-4" />
          تسجيل الخروج
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
