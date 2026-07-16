"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Server, Clock, AlertTriangle, RefreshCcw, Pause, Play, RotateCcw, Trash2 } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

const kpis = [
  { title: "Workers Online", value: "4", icon: Server, textClass: "text-blue-500" },
  { title: "Queued Jobs", value: "12", icon: Clock, textClass: "text-orange-500" },
  { title: "Running", value: "3", icon: Activity, textClass: "text-green-500" },
  { title: "Failed (DLQ)", value: "2", icon: AlertTriangle, textClass: "text-red-500" },
];

const queues = [
  { name: "researchQueue", waiting: 5, active: 1, completed: 142, failed: 0, status: "Active" },
  { name: "scriptQueue", waiting: 2, active: 1, completed: 89, failed: 1, status: "Active" },
  { name: "assetQueue", waiting: 0, active: 0, completed: 312, failed: 0, status: "Active" },
  { name: "renderQueue", waiting: 5, active: 1, completed: 45, failed: 1, status: "Paused" },
];

const activeJobs = [
  { id: "job-1042", type: "Research", project: "Top 5 Phones", queue: "research", status: "RUNNING", progress: 45, time: "2m 10s" },
  { id: "job-1043", type: "Script", project: "AI Tools", queue: "script", status: "RUNNING", progress: 10, time: "0m 45s" },
  { id: "job-1044", type: "Render", project: "Nothing Phone 4", queue: "render", status: "WAITING", progress: 0, time: "-" },
];

const dlqJobs = [
  { id: "job-0998", type: "Render", project: "Tech News", queue: "render", error: "Timeout exceeding 300s during Lambda execution.", failedAt: "2 hours ago" },
  { id: "job-0872", type: "Script", project: "Gaming Laptops", queue: "script", error: "Gemini API rate limit exceeded (429).", failedAt: "5 hours ago" },
];

export default function JobsDashboardPage() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Workflow Engine</h2>
          <p className="text-muted-foreground">Manage background queues, workers, and active jobs.</p>
        </div>
        <div className="flex items-center space-x-2">
           <Button variant="outline"><RefreshCcw className="mr-2 h-4 w-4" /> Refresh Status</Button>
           <Button variant="destructive"><AlertTriangle className="mr-2 h-4 w-4" /> Purge DLQ</Button>
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

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Queue Overview</TabsTrigger>
          <TabsTrigger value="active">Active Jobs</TabsTrigger>
          <TabsTrigger value="dlq" className="text-red-500 data-[state=active]:text-red-500">Dead Letter Queue (2)</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>BullMQ Queues</CardTitle>
              <CardDescription>Real-time throughput and queue depths.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Queue Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Waiting</TableHead>
                    <TableHead className="text-right">Active</TableHead>
                    <TableHead className="text-right">Completed</TableHead>
                    <TableHead className="text-right">Failed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queues.map((q) => (
                    <TableRow key={q.name}>
                      <TableCell className="font-mono font-medium">{q.name}</TableCell>
                      <TableCell>
                         <Badge variant={q.status === 'Active' ? 'default' : 'secondary'}>{q.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right text-orange-500">{q.waiting}</TableCell>
                      <TableCell className="text-right text-green-500">{q.active}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{q.completed}</TableCell>
                      <TableCell className="text-right text-red-500">{q.failed}</TableCell>
                      <TableCell className="text-right">
                         <Button variant="ghost" size="icon">
                           {q.status === 'Active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                         </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Currently Processing Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Queue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[200px]">Progress</TableHead>
                    <TableHead>Runtime</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-mono text-xs">{job.id}</TableCell>
                      <TableCell className="font-medium">{job.project}</TableCell>
                      <TableCell><Badge variant="outline">{job.queue}</Badge></TableCell>
                      <TableCell>
                        <Badge variant={job.status === 'RUNNING' ? 'default' : 'secondary'} className={job.status === 'RUNNING' ? 'bg-blue-500' : ''}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                         <div className="flex items-center gap-2">
                           <Progress value={job.progress} className="h-2 flex-1" />
                           <span className="text-xs text-muted-foreground">{job.progress}%</span>
                         </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{job.time}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/jobs/${job.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>Inspect</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dlq" className="mt-4 space-y-4">
          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="text-red-500 flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Dead Letter Queue</CardTitle>
              <CardDescription>Jobs that have failed all retry attempts.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Queue</TableHead>
                    <TableHead>Error Message</TableHead>
                    <TableHead>Failed At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dlqJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-mono text-xs">{job.id}</TableCell>
                      <TableCell className="font-medium">{job.project}</TableCell>
                      <TableCell><Badge variant="outline">{job.queue}</Badge></TableCell>
                      <TableCell className="text-red-400 max-w-xs truncate" title={job.error}>{job.error}</TableCell>
                      <TableCell className="text-muted-foreground">{job.failedAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="Retry Job">
                             <RotateCcw className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" title="Delete">
                             <Trash2 className="h-4 w-4" />
                          </Button>
                          <Link href={`/jobs/${job.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>Logs</Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
