import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Bell,
  Archive,
} from "lucide-react";

interface Alert {
  id: string;
  type: "deadline" | "high_value" | "urgent" | "system";
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  documentId?: string;
  documentName?: string;
  assignedTo?: string;
  dueDate?: string;
  amount?: number;
  createdAt: string;
  status: "active" | "resolved" | "dismissed";
  actionTaken?: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "deadline",
    priority: "high",
    title: "Safety Compliance Deadline Approaching",
    description: "Annual safety audit report submission deadline is in 2 days. Required by Metro Rail Safety Board.",
    documentId: "doc_001",
    documentName: "Safety_Audit_Q4_2024.pdf",
    assignedTo: "Safety Officer",
    dueDate: "2024-01-15",
    createdAt: "2024-01-13T10:30:00Z",
    status: "active",
  },
  {
    id: "2",
    type: "high_value",
    priority: "high",
    title: "High-Value Invoice Requires Approval",
    description: "Invoice amount exceeds approval threshold. Vendor: Alstom Metro Services",
    documentId: "doc_002",
    documentName: "Invoice_ALM_Dec_2024.pdf",
    amount: 250000,
    assignedTo: "Finance Manager",
    createdAt: "2024-01-13T09:15:00Z",
    status: "active",
  },
  {
    id: "3",
    type: "urgent",
    priority: "medium",
    title: "Multiple Classification Failures",
    description: "5 documents failed AI classification in the last hour. Manual review required.",
    createdAt: "2024-01-13T08:45:00Z",
    status: "active",
  },
  {
    id: "4",
    type: "deadline",
    priority: "medium",
    title: "Training Certificate Renewal",
    description: "Employee safety training certificates expire next week.",
    documentId: "doc_003",
    documentName: "Training_Records_2024.xlsx",
    assignedTo: "HR Manager",
    dueDate: "2024-01-20",
    createdAt: "2024-01-12T16:20:00Z",
    status: "resolved",
    actionTaken: "Renewal process initiated",
  },
  {
    id: "5",
    type: "system",
    priority: "low",
    title: "Storage Capacity Warning",
    description: "Document storage system at 85% capacity. Consider archiving old documents.",
    createdAt: "2024-01-12T14:10:00Z",
    status: "active",
  },
];

export default function Alerts() {
  const [alerts] = useState<Alert[]>(mockAlerts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("active");

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <Calendar className="w-5 h-5" />;
      case "high_value":
        return <DollarSign className="w-5 h-5" />;
      case "urgent":
        return <AlertTriangle className="w-5 h-5" />;
      case "system":
        return <Users className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "dismissed":
        return <Archive className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Clock className="w-4 h-4 text-primary" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesStatus = selectedTab === "all" || alert.status === selectedTab;
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeAlertsCount = alerts.filter(a => a.status === "active").length;
  const highPriorityCount = alerts.filter(a => a.status === "active" && a.priority === "high").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Smart Alerts</h1>
        <p className="text-muted-foreground mt-1">
          Monitor deadlines, high-value transactions, and system notifications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-kmrl-sm border-0 bg-gradient-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-foreground">{activeAlertsCount}</p>
              </div>
              <Bell className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-kmrl-sm border-0 bg-gradient-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-destructive">{highPriorityCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-kmrl-sm border-0 bg-gradient-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold text-success">8</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-kmrl-sm border-0 bg-gradient-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold text-foreground">1.2h</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Alerts List */}
      <Card className="shadow-kmrl-md border-0 bg-gradient-secondary">
        <CardHeader>
          <CardTitle>Alert Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="active">Active ({activeAlertsCount})</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="dismissed">Dismissed</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-6">
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <Card key={alert.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="text-primary mt-1">
                          {getAlertIcon(alert.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{alert.title}</h3>
                            <Badge variant="secondary" className={getPriorityColor(alert.priority)}>
                              {alert.priority}
                            </Badge>
                            {getStatusIcon(alert.status)}
                          </div>
                          
                          <p className="text-muted-foreground mb-3">{alert.description}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            {alert.documentName && (
                              <span>📄 {alert.documentName}</span>
                            )}
                            {alert.assignedTo && (
                              <span>👤 {alert.assignedTo}</span>
                            )}
                            {alert.dueDate && (
                              <span>📅 Due: {new Date(alert.dueDate).toLocaleDateString()}</span>
                            )}
                            {alert.amount && (
                              <span>💰 ₹{alert.amount.toLocaleString()}</span>
                            )}
                            <span>🕒 {new Date(alert.createdAt).toLocaleDateString()}</span>
                          </div>
                          
                          {alert.actionTaken && (
                            <div className="mt-2 p-2 bg-success/10 rounded text-sm text-success">
                              ✅ Action taken: {alert.actionTaken}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          {alert.status === "active" && (
                            <>
                              <Button size="sm" variant="default">
                                Resolve
                              </Button>
                              <Button size="sm" variant="outline">
                                Dismiss
                              </Button>
                            </>
                          )}
                          {alert.documentId && (
                            <Button size="sm" variant="outline">
                              View Document
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}