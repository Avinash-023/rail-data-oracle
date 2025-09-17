import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Eye,
  MoreVertical,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocumentCardProps {
  document: {
    id: string;
    title: string;
    type: string;
    size: string;
    uploadedBy: string;
    uploadedAt: string;
    status: "processed" | "processing" | "error";
    priority: "low" | "medium" | "high";
    summary?: string;
    tags: string[];
  };
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
}

export function DocumentCard({ document, onView, onDownload }: DocumentCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "processing":
        return <Clock className="w-4 h-4 text-warning animate-spin" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group hover:shadow-kmrl-md transition-all duration-200 border-0 shadow-kmrl-sm bg-gradient-secondary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate" title={document.title}>
                {document.title}
              </h3>
              <p className="text-xs text-muted-foreground">{document.type} • {document.size}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView?.(document.id)}>
                <Eye className="mr-2 w-4 h-4" />
                View Document
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDownload?.(document.id)}>
                <Download className="mr-2 w-4 h-4" />
                Download
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 mt-2">
          {getStatusIcon(document.status)}
          <span className="text-xs capitalize">{document.status}</span>
          <Badge className={`ml-auto text-xs ${getPriorityColor(document.priority)}`}>
            {document.priority}
          </Badge>
        </div>
      </CardHeader>

      {document.summary && (
        <CardContent className="py-0">
          <p className="text-xs text-muted-foreground line-clamp-2">
            {document.summary}
          </p>
        </CardContent>
      )}

      <CardFooter className="pt-3">
        <div className="w-full space-y-2">
          <div className="flex flex-wrap gap-1">
            {document.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {document.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{document.tags.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground gap-4">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {document.uploadedBy}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {document.uploadedAt}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}