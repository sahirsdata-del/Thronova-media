"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle2, 
  MoreHorizontal,
  Server,
  FileText,
  Video,
  UploadCloud
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock Data
const initialErrors = [
  {
    id: "err_1",
    level: "CRITICAL",
    service: "YouTube API",
    message: "Failed to authenticate. Token expired.",
    timestamp: "2026-07-19T10:15:00Z",
    status: "OPEN",
    stackTrace: "Error: OAuth2 token expired\n  at YouTubeService.upload (/workers/upload/src/youtube.ts:45)\n  at processTicksAndRejections (node:internal/process/task_queues:95:5)"
  },
  {
    id: "err_2",
    level: "WARNING",
    service: "Render Worker",
    message: "Frame drop detected during final encode.",
    timestamp: "2026-07-19T09:42:11Z",
    status: "OPEN",
    stackTrace: "Warning: FFMPEG frame buffer underrun\n  at RenderEngine.encode (/workers/render/src/engine.ts:112)"
  },
  {
    id: "err_3",
    level: "ERROR",
    service: "Script Worker",
    message: "OpenAI API rate limit exceeded.",
    timestamp: "2026-07-19T08:30:22Z",
    status: "RESOLVED",
    stackTrace: "HttpError: 429 Too Many Requests\n  at ScriptGenerator.generate (/workers/script/src/llm.ts:88)"
  }
];

const levelColors: Record<string, string> = {
  CRITICAL: "bg-red-500/10 text-red-500 border-red-500/20",
  ERROR: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  WARNING: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  INFO: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

export default function DiagnosticsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const [selectedError, setSelectedError] = useState<typeof initialErrors[0] | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMarkResolved = (id: string) => {
    setErrors(errors.map(err => err.id === id ? { ...err, status: "RESOLVED" } : err));
    toast.success("Error marked as resolved");
  };

  const handleDismiss = (id: string) => {
    setErrors(errors.filter(err => err.id !== id));
    toast.success("Error log dismissed");
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Diagnostics</h2>
          <p className="text-muted-foreground">
            Monitor system health and track background worker errors.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Core System</CardTitle>
            <Server className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">Healthy</div>
            <p className="text-xs text-muted-foreground">Uptime: 99.9%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Script Worker</CardTitle>
            <FileText className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">Online</div>
            <p className="text-xs text-muted-foreground">Processing 2 jobs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Render Worker</CardTitle>
            <Video className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">Degraded</div>
            <p className="text-xs text-muted-foreground">High memory usage detected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upload Service</CardTitle>
            <UploadCloud className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">Offline</div>
            <p className="text-xs text-muted-foreground">YouTube API token expired</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border bg-card">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-lg">Error Logs</h3>
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            {errors.filter(e => e.status === "OPEN").length} Open Issues
          </Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {errors.map((error) => (
              <TableRow key={error.id} className={error.status === "RESOLVED" ? "opacity-60" : ""}>
                <TableCell>
                  {error.level === "CRITICAL" ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : error.level === "WARNING" ? (
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Activity className="h-4 w-4 text-orange-500" />
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={levelColors[error.level]}>
                    {error.level}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{error.service}</TableCell>
                <TableCell className="max-w-[300px] truncate" title={error.message}>
                  {error.message}
                </TableCell>
                <TableCell>
                  {error.status === "OPEN" ? (
                    <span className="text-red-500 text-sm font-medium">Open</span>
                  ) : (
                    <span className="flex items-center text-emerald-500 text-sm font-medium">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> Resolved
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {isMounted ? new Date(error.timestamp).toLocaleString() : error.timestamp}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      </DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => setSelectedError(error)}>
                        View Details
                      </DropdownMenuItem>
                      {error.status === "OPEN" && (
                        <DropdownMenuItem onClick={() => handleMarkResolved(error.id)}>
                          Mark as Resolved
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDismiss(error.id)}>
                        Dismiss Log
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {errors.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No errors tracked. System is running smoothly.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedError} onOpenChange={(open) => !open && setSelectedError(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Error Details: {selectedError?.service}
              {selectedError && (
                <Badge variant="outline" className={levelColors[selectedError.level]}>
                  {selectedError.level}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedError && (
            <div className="space-y-4 py-4">
              <div>
                <h4 className="font-medium mb-1 text-sm text-muted-foreground">Message</h4>
                <p className="text-sm font-medium">{selectedError.message}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1 text-sm text-muted-foreground">Timestamp</h4>
                <p className="text-sm">{isMounted ? new Date(selectedError.timestamp).toLocaleString() : selectedError.timestamp}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1 text-sm text-muted-foreground">Stack Trace</h4>
                <pre className="p-4 rounded-md bg-muted text-muted-foreground text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                  {selectedError.stackTrace}
                </pre>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedError?.status === "OPEN" && (
              <Button onClick={() => { handleMarkResolved(selectedError.id); setSelectedError(null); }}>
                Mark as Resolved
              </Button>
            )}
            <DialogClose render={<Button variant="outline">Close</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
