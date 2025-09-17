import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Mail,
  Search,
  Plus,
  Edit,
  Shield,
  CheckCircle,
  AlertTriangle,
  Building,
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: "HR" | "Finance" | "Safety" | "Technical" | "Admin";
  role: string;
  status: "active" | "inactive";
  emailsReceived: number;
  emailsOpened: number;
  lastActive: string;
  permissions: string[];
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@kmrl.gov.in",
    department: "Safety",
    role: "Safety Officer",
    status: "active",
    emailsReceived: 45,
    emailsOpened: 42,
    lastActive: "2 hours ago",
    permissions: ["view_documents", "receive_alerts", "generate_reports"],
  },
  {
    id: "2",
    name: "Priya Nair",
    email: "priya.nair@kmrl.gov.in",
    department: "HR",
    role: "HR Manager",
    status: "active",
    emailsReceived: 38,
    emailsOpened: 35,
    lastActive: "30 minutes ago",
    permissions: ["view_documents", "receive_alerts", "manage_employees"],
  },
  {
    id: "3",
    name: "Mohammed Ali",
    email: "mohammed.ali@kmrl.gov.in",
    department: "Finance",
    role: "Finance Manager",
    status: "active",
    emailsReceived: 52,
    emailsOpened: 49,
    lastActive: "1 hour ago",
    permissions: ["view_documents", "receive_alerts", "approve_invoices"],
  },
  {
    id: "4",
    name: "Deepika Menon",
    email: "deepika.menon@kmrl.gov.in",
    department: "Technical",
    role: "Chief Engineer",
    status: "active",
    emailsReceived: 31,
    emailsOpened: 28,
    lastActive: "4 hours ago",
    permissions: ["view_documents", "receive_alerts", "technical_approval"],
  },
  {
    id: "5",
    name: "Suresh Pillai",
    email: "suresh.pillai@kmrl.gov.in",
    department: "Admin",
    role: "Administrative Officer",
    status: "inactive",
    emailsReceived: 23,
    emailsOpened: 20,
    lastActive: "2 days ago",
    permissions: ["view_documents"],
  },
];

export default function Employees() {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const getDepartmentColor = (department: string) => {
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

  const getStatusColor = (status: string) => {
    return status === "active" 
      ? "bg-success text-success-foreground" 
      : "bg-muted text-muted-foreground";
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment;
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const departments = ["HR", "Finance", "Safety", "Technical", "Admin"];
  const activeEmployees = employees.filter(e => e.status === "active").length;
  const totalEmailsSent = employees.reduce((sum, e) => sum + e.emailsReceived, 0);
  const avgOpenRate = employees.reduce((sum, e) => sum + (e.emailsOpened / e.emailsReceived), 0) / employees.length * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Directory</h1>
          <p className="text-muted-foreground mt-1">
            Manage KMRL employee routing and email preferences
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-kmrl-sm border-0 bg-gradient-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold text-foreground">{employees.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-kmrl-sm border-0 bg-gradient-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-success">{activeEmployees}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-kmrl-sm border-0 bg-gradient-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Emails Sent</p>
                <p className="text-2xl font-bold text-foreground">{totalEmailsSent}</p>
              </div>
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-kmrl-sm border-0 bg-gradient-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Open Rate</p>
                <p className="text-2xl font-bold text-foreground">{avgOpenRate.toFixed(1)}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Distribution */}
      <Card className="shadow-kmrl-md border-0 bg-gradient-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Department Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {departments.map((dept) => {
              const count = employees.filter(e => e.department === dept).length;
              const activeCount = employees.filter(e => e.department === dept && e.status === "active").length;
              return (
                <div key={dept} className="text-center p-4 rounded-lg bg-muted/30">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getDepartmentColor(dept)}`}>
                    {dept}
                  </div>
                  <p className="text-2xl font-bold mt-2">{count}</p>
                  <p className="text-sm text-muted-foreground">{activeCount} active</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Employee List */}
      <Card className="shadow-kmrl-md border-0 bg-gradient-secondary">
        <CardHeader>
          <CardTitle>Employee Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              {departments.map((dept) => (
                <TabsTrigger key={dept} value={dept}>{dept}</TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedDepartment} className="mt-6">
              <div className="space-y-4">
                {filteredEmployees.map((employee) => (
                  <Card key={employee.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{employee.name}</h3>
                              <Badge variant="secondary" className={getDepartmentColor(employee.department)}>
                                {employee.department}
                              </Badge>
                              <Badge variant="secondary" className={getStatusColor(employee.status)}>
                                {employee.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{employee.role}</p>
                            <p className="text-sm text-muted-foreground">{employee.email}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="grid grid-cols-3 gap-4 mb-2">
                            <div className="text-center">
                              <p className="text-lg font-semibold">{employee.emailsReceived}</p>
                              <p className="text-xs text-muted-foreground">Emails</p>
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-semibold">{employee.emailsOpened}</p>
                              <p className="text-xs text-muted-foreground">Opened</p>
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-semibold">
                                {((employee.emailsOpened / employee.emailsReceived) * 100).toFixed(0)}%
                              </p>
                              <p className="text-xs text-muted-foreground">Rate</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">Last active: {employee.lastActive}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Shield className="w-4 h-4 mr-1" />
                            Permissions
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex flex-wrap gap-1">
                          {employee.permissions.map((permission) => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission.replace("_", " ")}
                            </Badge>
                          ))}
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