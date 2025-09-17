import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocumentCard } from "@/components/Documents/DocumentCard";
import {
  Upload,
  Filter,
  Search,
  Grid,
  List,
  SortAsc,
  FileText,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const mockDocuments = [
  {
    id: "1",
    title: "Q4 Safety Inspection Report 2024.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedBy: "Safety Team",
    uploadedAt: "2 hours ago",
    status: "processed" as const,
    priority: "high" as const,
    summary: "Comprehensive safety inspection covering all metro stations with 3 critical findings requiring immediate attention.",
    tags: ["safety", "inspection", "Q4", "critical"],
  },
  {
    id: "2",
    title: "Vendor Invoice - Alstom Maintenance Service.xlsx",
    type: "Excel",
    size: "856 KB",
    uploadedBy: "Finance Department",
    uploadedAt: "4 hours ago",
    status: "processed" as const,
    priority: "medium" as const,
    summary: "Monthly maintenance invoice from Alstom covering Blue Line rolling stock services for December 2024.",
    tags: ["finance", "invoice", "maintenance", "alstom"],
  },
  {
    id: "3",
    title: "Employee Training Manual Update v2.1.docx",
    type: "Word",
    size: "1.2 MB",
    uploadedBy: "HR Team",
    uploadedAt: "1 day ago",
    status: "processing" as const,
    priority: "low" as const,
    summary: "Updated training procedures for new employees including safety protocols and operational guidelines.",
    tags: ["hr", "training", "manual", "procedures"],
  },
  {
    id: "4",
    title: "Blue Line Technical Specifications.pdf",
    type: "PDF",
    size: "5.8 MB",
    uploadedBy: "Engineering Team",
    uploadedAt: "2 days ago",
    status: "processed" as const,
    priority: "medium" as const,
    summary: "Complete technical documentation for Blue Line infrastructure including signaling and power systems.",
    tags: ["engineering", "technical", "blue-line", "specifications"],
  },
  {
    id: "5",
    title: "Monthly Ridership Analytics Report.pptx",
    type: "PowerPoint",
    size: "3.2 MB",
    uploadedBy: "Analytics Team",
    uploadedAt: "3 days ago",
    status: "processed" as const,
    priority: "low" as const,
    summary: "Passenger statistics and trends analysis for December 2024 showing 15% increase in ridership.",
    tags: ["analytics", "ridership", "statistics", "report"],
  },
  {
    id: "6",
    title: "Incident Report - Aluva Station.jpg",
    type: "Image",
    size: "4.1 MB",
    uploadedBy: "Security Team",
    uploadedAt: "5 days ago",
    status: "error" as const,
    priority: "high" as const,
    summary: "Security incident documentation requiring OCR processing. Processing failed due to image quality.",
    tags: ["security", "incident", "aluva", "ocr-failed"],
  },
];

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();

  const handleSyncNow = () => {
    toast({
      title: "Sync initiated",
      description: "Checking Azure Blob Storage for new documents...",
    });
  };

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus;
    const matchesPriority = filterPriority === "all" || doc.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusCount = (status: string) => {
    if (status === "all") return mockDocuments.length;
    return mockDocuments.filter(doc => doc.status === status).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground mt-1">
            Auto-synced documents from Azure Blob Storage
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse mr-2"></div>
            Auto-Sync Active
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-kmrl-sm border-0 bg-gradient-secondary">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{getStatusCount("all")}</p>
                <p className="text-sm text-muted-foreground">Total Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-kmrl-sm border-0 bg-gradient-secondary cursor-pointer hover:shadow-kmrl-md transition-all"
              onClick={() => setFilterStatus("processed")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{getStatusCount("processed")}</p>
                <p className="text-sm text-muted-foreground">Processed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-kmrl-sm border-0 bg-gradient-secondary cursor-pointer hover:shadow-kmrl-md transition-all"
              onClick={() => setFilterStatus("processing")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-warning rounded-full animate-pulse"></div>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{getStatusCount("processing")}</p>
                <p className="text-sm text-muted-foreground">Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-kmrl-sm border-0 bg-gradient-secondary cursor-pointer hover:shadow-kmrl-md transition-all"
              onClick={() => setFilterStatus("error")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold text-foreground">{getStatusCount("error")}</p>
                <p className="text-sm text-muted-foreground">Errors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auto-Sync Status */}
      <Card className="shadow-kmrl-md border-0 bg-gradient-secondary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Azure Blob Storage Connected
                </h3>
                <p className="text-muted-foreground">
                  Documents are automatically synced and processed from your blob storage. Last sync: 2 minutes ago
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="border-success/20 hover:bg-success/5"
              onClick={handleSyncNow}
            >
              Sync Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card className="shadow-kmrl-md border-0 bg-gradient-secondary">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search documents by name or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <SortAsc className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Active Filters */}
          {(filterStatus !== "all" || filterPriority !== "all" || searchTerm) && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 hover:bg-muted rounded-full"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filterStatus !== "all" && (
                <Badge variant="secondary">
                  Status: {filterStatus}
                  <button
                    onClick={() => setFilterStatus("all")}
                    className="ml-1 hover:bg-muted rounded-full"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filterPriority !== "all" && (
                <Badge variant="secondary">
                  Priority: {filterPriority}
                  <button
                    onClick={() => setFilterPriority("all")}
                    className="ml-1 hover:bg-muted rounded-full"
                  >
                    ×
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                  setFilterPriority("all");
                }}
                className="text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <Card className="shadow-kmrl-md border-0 bg-gradient-secondary">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Documents ({filteredDocuments.length})</span>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Showing {filteredDocuments.length} of {mockDocuments.length}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length > 0 ? (
            <div className={viewMode === "grid" 
              ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" 
              : "space-y-4"
            }>
              {filteredDocuments.map((document, index) => (
                <motion.div
                  key={document.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <DocumentCard
                    document={document}
                    onView={(id) => console.log("View document:", id)}
                    onDownload={(id) => console.log("Download document:", id)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No documents found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or check if blob storage sync is active.
              </p>
              <Button variant="outline">Clear Filters</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}