import { AlertTriangle, Clock, DollarSign, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Alert {
  id: string;
  type: "deadline" | "high_value" | "urgent" | "system";
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  time: string;
  actionRequired: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "deadline",
    priority: "high",
    title: "Safety Compliance Deadline",
    description: "Annual safety audit report due in 2 days",
    time: "15 minutes ago",
    actionRequired: true,
  },
  {
    id: "2",
    type: "high_value",
    priority: "high",
    title: "High-Value Invoice Detected",
    description: "Invoice for ₹2.5 Lakhs requires approval",
    time: "1 hour ago",
    actionRequired: true,
  },
  {
    id: "3",
    type: "urgent",
    priority: "medium",
    title: "Multiple Failed Classifications",
    description: "5 documents failed AI classification in the last hour",
    time: "2 hours ago",
    actionRequired: false,
  },
  {
    id: "4",
    type: "system",
    priority: "low",
    title: "Storage Capacity Warning",
    description: "Document storage at 85% capacity",
    time: "4 hours ago",
    actionRequired: false,
  },
];

export function AlertPanel() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <Calendar className="w-4 h-4" />;
      case "high_value":
        return <DollarSign className="w-4 h-4" />;
      case "urgent":
        return <AlertTriangle className="w-4 h-4" />;
      case "system":
        return <Users className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "deadline":
        return "text-orange-600";
      case "high_value":
        return "text-green-600";
      case "urgent":
        return "text-red-600";
      case "system":
        return "text-blue-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-3 max-h-80 overflow-y-auto">
      {mockAlerts.map((alert) => (
        <div
          key={alert.id}
          className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
        >
          <div className={`mt-0.5 ${getTypeColor(alert.type)}`}>
            {getAlertIcon(alert.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-sm truncate">{alert.title}</h4>
              <Badge variant="secondary" className={getPriorityColor(alert.priority)}>
                {alert.priority}
              </Badge>
            </div>
            
            <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{alert.time}</span>
              {alert.actionRequired && (
                <Button size="sm" variant="outline" className="h-6 text-xs">
                  Take Action
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}