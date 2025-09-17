import { useState, useEffect } from "react";
import { FileText, Clock, CheckCircle, AlertTriangle, Brain, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface ProcessingItem {
  id: string;
  filename: string;
  type: string;
  status: "processing" | "completed" | "failed";
  stage: string;
  progress: number;
  department?: string;
  priority: "high" | "medium" | "low";
  timeAgo: string;
}

const mockProcessingItems: ProcessingItem[] = [
  {
    id: "1",
    filename: "HR_Policy_Update_2024.pdf",
    type: "PDF",
    status: "completed",
    stage: "Email Sent",
    progress: 100,
    department: "HR",
    priority: "medium",
    timeAgo: "2 min ago",
  },
  {
    id: "2",
    filename: "Safety_Incident_Report_Dec.docx",
    type: "DOCX",
    status: "processing",
    stage: "AI Classification",
    progress: 65,
    department: "Safety",
    priority: "high",
    timeAgo: "30 sec ago",
  },
  {
    id: "3",
    filename: "Invoice_Vendor_XYZ.xlsx",
    type: "XLSX",
    status: "processing",
    stage: "OCR Processing",
    progress: 25,
    priority: "medium",
    timeAgo: "1 min ago",
  },
  {
    id: "4",
    filename: "Maintenance_Schedule_Q1.pdf",
    type: "PDF",
    status: "completed",
    stage: "Classified as Technical",
    progress: 100,
    department: "Technical",
    priority: "low",
    timeAgo: "5 min ago",
  },
];

export function ProcessingQueue() {
  const [items, setItems] = useState<ProcessingItem[]>(mockProcessingItems);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => prev.map(item => {
        if (item.status === "processing") {
          const newProgress = Math.min(item.progress + Math.random() * 10, 100);
          return {
            ...item,
            progress: newProgress,
            status: newProgress >= 100 ? "completed" : "processing",
            stage: newProgress >= 100 ? "Email Sent" : item.stage,
            department: newProgress >= 100 ? getRandomDepartment() : item.department,
          };
        }
        return item;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getRandomDepartment = () => {
    const departments = ["HR", "Finance", "Safety", "Technical", "Admin"];
    return departments[Math.floor(Math.random() * departments.length)];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-success";
      case "processing":
        return "text-primary";
      case "failed":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4 animate-spin" />;
      case "failed":
        return <AlertTriangle className="w-4 h-4" />;
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

  const getDepartmentColor = (department?: string) => {
    switch (department) {
      case "HR":
        return "bg-blue-100 text-blue-800";
      case "Finance":
        return "bg-green-100 text-green-800";
      case "Safety":
        return "bg-red-100 text-red-800";
      case "Technical":
        return "bg-purple-100 text-purple-800";
      case "Admin":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-sm truncate max-w-48">{item.filename}</span>
                <Badge variant="secondary" className={getPriorityColor(item.priority)}>
                  {item.priority}
                </Badge>
                {item.department && (
                  <Badge variant="secondary" className={getDepartmentColor(item.department)}>
                    {item.department}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs ${getStatusColor(item.status)}`}>
                  {item.stage}
                </span>
                <span className="text-xs text-muted-foreground">• {item.timeAgo}</span>
              </div>

              {item.status === "processing" && (
                <div className="w-full bg-muted rounded-full h-1.5">
                  <motion.div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${item.progress}%` }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>

            <div className={`ml-3 ${getStatusColor(item.status)}`}>
              {getStatusIcon(item.status)}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}