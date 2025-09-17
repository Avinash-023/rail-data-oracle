import { CheckCircle, AlertTriangle, Clock, Zap, Database, Mail, Brain, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatusItem {
  name: string;
  status: "online" | "warning" | "offline";
  lastCheck: string;
  icon: React.ReactNode;
}

const statusItems: StatusItem[] = [
  {
    name: "Azure Blob Monitor",
    status: "online",
    lastCheck: "30 seconds ago",
    icon: <Database className="w-4 h-4" />,
  },
  {
    name: "AI Classification Engine",
    status: "online",
    lastCheck: "1 minute ago",
    icon: <Brain className="w-4 h-4" />,
  },
  {
    name: "Email Routing Service",
    status: "online",
    lastCheck: "2 minutes ago",
    icon: <Mail className="w-4 h-4" />,
  },
  {
    name: "OCR Processing",
    status: "warning",
    lastCheck: "5 minutes ago",
    icon: <Target className="w-4 h-4" />,
  },
  {
    name: "Alert Engine",
    status: "online",
    lastCheck: "30 seconds ago",
    icon: <Zap className="w-4 h-4" />,
  },
];

export function AutomationStatus() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-success text-success-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "offline":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-3 h-3" />;
      case "warning":
        return <AlertTriangle className="w-3 h-3" />;
      case "offline":
        return <Clock className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statusItems.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              {item.icon}
            </div>
            <div>
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.lastCheck}</p>
            </div>
          </div>
          <Badge variant="secondary" className={`${getStatusColor(item.status)} flex items-center gap-1`}>
            {getStatusIcon(item.status)}
            {item.status}
          </Badge>
        </div>
      ))}
    </div>
  );
}