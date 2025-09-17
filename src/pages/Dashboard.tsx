import { StatsCard } from "@/components/Dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocumentCard } from "@/components/Documents/DocumentCard";
import { AutomationStatus } from "@/components/Dashboard/AutomationStatus";
import { ProcessingQueue } from "@/components/Dashboard/ProcessingQueue";
import { ClassificationStats } from "@/components/Dashboard/ClassificationStats";
import { AlertPanel } from "@/components/Dashboard/AlertPanel";
import {
  FileText,
  Brain,
  Clock,
  CheckCircle,
  MessageSquare,
  Search,
  TrendingUp,
  AlertTriangle,
  Users,
  Target,
  Mail,
  Activity,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const recentDocuments = [
  {
    id: "1",
    title: "Q4 Safety Inspection Report.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedBy: "Safety Team",
    uploadedAt: "2 hours ago",
    status: "processed" as const,
    priority: "high" as const,
    summary: "Comprehensive safety inspection covering all metro stations with 3 critical findings requiring immediate attention.",
    tags: ["safety", "inspection", "Q4"],
  },
  {
    id: "2",
    title: "Vendor Invoice - Alstom Maintenance.xlsx",
    type: "Excel",
    size: "856 KB",
    uploadedBy: "Finance Dept",
    uploadedAt: "4 hours ago",
    status: "processed" as const,
    priority: "medium" as const,
    summary: "Monthly maintenance invoice from Alstom covering Blue Line rolling stock services.",
    tags: ["finance", "invoice", "maintenance"],
  },
  {
    id: "3",
    title: "Employee Training Manual Update.docx",
    type: "Word",
    size: "1.2 MB",
    uploadedBy: "HR Team",
    uploadedAt: "1 day ago",
    status: "processing" as const,
    priority: "low" as const,
    tags: ["hr", "training", "manual"],
  },
];

const quickActions = [
  {
    title: "View Alerts",
    description: "Monitor smart alerts and deadlines",
    icon: AlertTriangle,
    action: "/alerts",
    color: "bg-gradient-primary",
  },
  {
    title: "Employee Directory",
    description: "Manage KMRL employee routing",
    icon: Users,
    action: "/employees",
    color: "bg-gradient-accent",
  },
  {
    title: "AI Assistant",
    description: "Ask questions about processed documents",
    icon: MessageSquare,
    action: "/chat",
    color: "bg-gradient-secondary",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">KMRL Automation Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Real-time monitoring of automated document processing and AI-powered routing system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Auto-Processed Today"
          value="247"
          change="+15% from yesterday"
          changeType="positive"
          icon={<Zap className="w-4 h-4" />}
        />
        <StatsCard
          title="Classification Accuracy"
          value="98.5%"
          change="+2.1% this week"
          changeType="positive"
          icon={<Target className="w-4 h-4" />}
        />
        <StatsCard
          title="Emails Sent Today"
          value="156"
          change="85% delivery rate"
          changeType="positive"
          icon={<Mail className="w-4 h-4" />}
        />
        <StatsCard
          title="Active Alerts"
          value="12"
          change="3 high priority"
          changeType="neutral"
          icon={<AlertTriangle className="w-4 h-4" />}
        />
      </div>

      {/* Automation Status & Live Feed */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card className="shadow-kmrl-md border-0 bg-gradient-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 justify-start hover:shadow-kmrl-sm transition-all"
                    onClick={() => window.location.href = action.action}
                  >
                    <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mr-3`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Live Processing Feed */}
        <div className="lg:col-span-2">
          <Card className="shadow-kmrl-md border-0 bg-gradient-secondary">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Live Processing Feed
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
            </CardHeader>
            <CardContent>
              <ProcessingQueue />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Department Classification & Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-kmrl-md border-0 bg-gradient-secondary">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              AI Classification Results
            </CardTitle>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </CardHeader>
          <CardContent>
            <ClassificationStats />
          </CardContent>
        </Card>

        <Card className="shadow-kmrl-md border-0 bg-gradient-secondary">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              Smart Alerts
            </CardTitle>
            <Button variant="outline" size="sm">
              View All Alerts
            </Button>
          </CardHeader>
          <CardContent>
            <AlertPanel />
          </CardContent>
        </Card>
      </div>

      {/* Automation Status */}
      <Card className="shadow-kmrl-md border-0 bg-gradient-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Automation System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AutomationStatus />
        </CardContent>
      </Card>
    </div>
  );
}