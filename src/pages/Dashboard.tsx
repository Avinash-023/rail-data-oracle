import { StatsCard } from "@/components/Dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocumentCard } from "@/components/Documents/DocumentCard";
import {
  FileText,
  Brain,
  Clock,
  CheckCircle,
  Upload,
  MessageSquare,
  Search,
  TrendingUp,
  AlertTriangle,
  Users,
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
    title: "Browse Documents",
    description: "View and manage auto-synced documents",
    icon: FileText,
    action: "/documents",
    color: "bg-gradient-primary",
  },
  {
    title: "Ask AI Assistant",
    description: "Get instant answers from your documents",
    icon: MessageSquare,
    action: "/chat",
    color: "bg-gradient-accent",
  },
  {
    title: "Advanced Search",
    description: "Find specific information across all documents",
    icon: Search,
    action: "/search",
    color: "bg-gradient-secondary",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your document processing system and AI-powered insights
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Documents"
          value="12,847"
          change="+12% from last month"
          changeType="positive"
          icon={<FileText className="w-4 h-4" />}
        />
        <StatsCard
          title="Processed Today"
          value="234"
          change="+8 in last hour"
          changeType="positive"
          icon={<CheckCircle className="w-4 h-4" />}
        />
        <StatsCard
          title="Processing Queue"
          value="42"
          change="Average wait: 3 mins"
          changeType="neutral"
          icon={<Clock className="w-4 h-4" />}
        />
        <StatsCard
          title="AI Queries"
          value="1,428"
          change="+23% this week"
          changeType="positive"
          icon={<Brain className="w-4 h-4" />}
        />
      </div>

      {/* Quick Actions & Activity Feed */}
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

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="shadow-kmrl-md border-0 bg-gradient-secondary">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Document processed",
                    item: "Safety Report Q4 2024.pdf",
                    user: "Safety Team",
                    time: "2 minutes ago",
                    type: "success",
                  },
                  {
                    action: "AI Query answered",
                    item: "Show me all pending invoices",
                    user: "Finance Manager",
                    time: "5 minutes ago",
                    type: "info",
                  },
                  {
                    action: "Document auto-synced",
                    item: "Training Manual V2.docx",
                    user: "Blob Storage",
                    time: "15 minutes ago",
                    type: "neutral",
                  },
                  {
                    action: "Processing error",
                    item: "Scanned Invoice #2024-123.jpg",
                    user: "System",
                    time: "1 hour ago",
                    type: "error",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === "success" ? "bg-success" :
                      activity.type === "error" ? "bg-destructive" :
                      activity.type === "info" ? "bg-primary" : "bg-muted-foreground"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}</span>{" "}
                        <span className="text-muted-foreground">{activity.item}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        by {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Documents */}
      <Card className="shadow-kmrl-md border-0 bg-gradient-secondary">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Recent Documents
          </CardTitle>
          <Button variant="outline" size="sm">
            View All Documents
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onView={(id) => console.log("View document:", id)}
                onDownload={(id) => console.log("Download document:", id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="shadow-kmrl-sm border-0 bg-gradient-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Status</p>
                <p className="text-2xl font-bold text-success">Healthy</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-kmrl-sm border-0 bg-gradient-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-foreground">47</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-kmrl-sm border-0 bg-gradient-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold text-foreground">2.4 TB</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">of 5 TB</p>
                <div className="w-16 h-1 bg-muted rounded-full mt-1">
                  <div className="w-2/5 h-full bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}