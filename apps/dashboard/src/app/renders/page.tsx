"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button, buttonVariants } from "@/components/ui/button";
import { Video, Clock, CheckCircle, RefreshCcw, Download, XCircle } from "lucide-react";
import Link from "next/link";

const kpis = [
  { title: "Renders Today", value: "14", icon: Video, textClass: "text-blue-500" },
  { title: "Success Rate", value: "95%", icon: CheckCircle, textClass: "text-green-500" },
  { title: "Avg Render Time", value: "3m 45s", icon: Clock, textClass: "text-purple-500" },
  { title: "Failed", value: "1", icon: XCircle, textClass: "text-red-500" },
];

const renderJobs = [
  { id: "v1", title: "Top 5 Phones Under ₹20K", format: "1080x1920", status: "RENDERING", progress: 65, timeRemaining: "1m 12s", updated: "Just now" },
  { id: "v2", title: "Best AI Apps for Students", format: "1920x1080", status: "PENDING", progress: 0, timeRemaining: "-", updated: "5 mins ago" },
  { id: "v3", title: "Nothing Phone 4 Review", format: "1080x1920", status: "COMPLETED", progress: 100, timeRemaining: "-", updated: "1 hour ago" },
  { id: "v4", title: "Tech News Roundup", format: "1080x1080", status: "FAILED", progress: 42, timeRemaining: "-", updated: "3 hours ago" },
];

export default function RendersDashboardPage() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Render Queue</h2>
        <div className="flex items-center space-x-2">
           <Button variant="outline"><RefreshCcw className="mr-2 h-4 w-4" /> Refresh</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.textClass}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active & Recent Renders</CardTitle>
          <CardDescription>Track Lambda rendering jobs converting compositions to MP4s.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Video Title</TableHead>
                <TableHead>Format</TableHead>
                <TableHead className="w-[200px]">Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell className="text-muted-foreground">{job.format}</TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <Progress value={job.progress} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground w-8 text-right">{job.progress}%</span>
                     </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      job.status === 'COMPLETED' ? 'default' : 
                      job.status === 'FAILED' ? 'destructive' : 
                      job.status === 'RENDERING' ? 'secondary' : 'outline'
                    }>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{job.timeRemaining}</TableCell>
                  <TableCell className="text-right">
                    {job.status === 'COMPLETED' ? (
                      <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-400">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    ) : job.status === 'FAILED' ? (
                       <Button variant="ghost" size="sm">
                         Retry
                       </Button>
                    ) : (
                      <Link href={`/videos/${job.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>View Editor</Link>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
