"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, Server, CheckCircle2, RotateCcw, XCircle, Terminal } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";

export default function JobDetailsPage() {
  const params = useParams();
  
  const mockJob = {
    id: params.id as string,
    queue: "research",
    status: "FAILED",
    priority: "HIGH",
    project: "Top 5 Phones Under ₹20K",
    createdAt: "2026-07-15T10:00:00Z",
    startedAt: "2026-07-15T10:00:05Z",
    failedAt: "2026-07-15T10:02:12Z",
    duration: "2m 7s",
    worker: "worker-node-alpha",
    error: "Gemini API rate limit exceeded (429 Too Many Requests).",
    payload: {
      ideaId: "idea-882",
      promptTemplateId: "prompt-12",
      searchQuery: "Best phones under 20000 rupees India 2026"
    },
    logs: [
      { time: "10:00:05.120", level: "INFO", message: "Job picked up by worker-node-alpha." },
      { time: "10:00:06.002", level: "INFO", message: "Initiating Google Search for keywords." },
      { time: "10:00:08.450", level: "INFO", message: "Found 12 relevant sources. Extracting content." },
      { time: "10:01:15.800", level: "INFO", message: "Content extraction complete. Sending to Gemini for synthesis." },
      { time: "10:02:12.300", level: "ERROR", message: "Gemini API returned 429. Request failed." },
    ],
    dependencies: [
      { id: "job-100", name: "Create Idea", status: "COMPLETED" }
    ],
    dependents: [
      { id: "job-1044", name: "Generate Script", status: "WAITING" }
    ]
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/jobs" className={buttonVariants({ variant: "ghost", size: "icon" })}><ArrowLeft className="h-4 w-4" /></Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight font-mono">Job: {mockJob.id}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{mockJob.queue}</Badge>
              <Badge variant="destructive">{mockJob.status}</Badge>
              <span className="text-sm text-muted-foreground ml-2">Project: {mockJob.project}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline"><RotateCcw className="mr-2 h-4 w-4" /> Retry Job</Button>
           <Button variant="destructive"><XCircle className="mr-2 h-4 w-4" /> Cancel</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Left Column: Metadata & Timeline */}
        <div className="space-y-6">
           <Card>
             <CardHeader><CardTitle className="text-sm text-muted-foreground uppercase">Execution Metadata</CardTitle></CardHeader>
             <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Priority</span>
                  <Badge variant="secondary">{mockJob.priority}</Badge>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Worker Node</span>
                  <span className="font-mono">{mockJob.worker}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-mono">{mockJob.duration}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-mono text-xs">{new Date(mockJob.createdAt).toLocaleString()}</span>
                </div>
             </CardContent>
           </Card>

           <Card>
             <CardHeader><CardTitle className="text-sm text-muted-foreground uppercase">Workflow Dependencies</CardTitle></CardHeader>
             <CardContent className="space-y-4">
                <div>
                   <span className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">Depends On</span>
                   {mockJob.dependencies.map(d => (
                     <div key={d.id} className="flex justify-between items-center p-2 rounded bg-muted/50 text-sm border">
                        <span className="font-mono text-xs">{d.id} ({d.name})</span>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                     </div>
                   ))}
                </div>
                <div>
                   <span className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">Dependents (Waiting)</span>
                   {mockJob.dependents.map(d => (
                     <div key={d.id} className="flex justify-between items-center p-2 rounded bg-muted/50 text-sm border border-dashed">
                        <span className="font-mono text-xs">{d.id} ({d.name})</span>
                        <Clock className="h-4 w-4 text-orange-500" />
                     </div>
                   ))}
                </div>
             </CardContent>
           </Card>
        </div>

        {/* Right Column: Logs & Payload */}
        <div className="md:col-span-2 space-y-6">
           {mockJob.status === 'FAILED' && (
             <div className="p-4 rounded-md border border-red-500/50 bg-red-500/10 text-red-500 flex items-start gap-3">
               <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
               <div>
                 <h4 className="font-bold">Job Failed</h4>
                 <p className="text-sm mt-1 font-mono">{mockJob.error}</p>
               </div>
             </div>
           )}

           <Tabs defaultValue="logs" className="w-full">
             <TabsList>
               <TabsTrigger value="logs"><Terminal className="mr-2 h-4 w-4" /> Execution Logs</TabsTrigger>
               <TabsTrigger value="payload">Payload Data</TabsTrigger>
               <TabsTrigger value="result">Result Data</TabsTrigger>
             </TabsList>
             
             <TabsContent value="logs" className="mt-4">
               <Card className="bg-zinc-950 border-zinc-800 rounded-lg overflow-hidden">
                 <ScrollArea className="h-[400px]">
                   <div className="p-4 font-mono text-xs space-y-2">
                     {mockJob.logs.map((log, i) => (
                       <div key={i} className="flex gap-4">
                         <span className="text-zinc-500 shrink-0">{log.time}</span>
                         <span className={`shrink-0 w-12 ${log.level === 'ERROR' ? 'text-red-400' : 'text-blue-400'}`}>
                           [{log.level}]
                         </span>
                         <span className={log.level === 'ERROR' ? 'text-red-300' : 'text-zinc-300'}>
                           {log.message}
                         </span>
                       </div>
                     ))}
                     {mockJob.status === 'RUNNING' && (
                       <div className="flex gap-4 animate-pulse">
                         <span className="text-zinc-500 shrink-0">--:--:--</span>
                         <span className="shrink-0 w-12 text-zinc-500">[WAIT]</span>
                         <span className="text-zinc-500">Processing...</span>
                       </div>
                     )}
                   </div>
                 </ScrollArea>
               </Card>
             </TabsContent>

             <TabsContent value="payload" className="mt-4">
                <Card>
                  <CardContent className="p-0">
                    <pre className="p-4 bg-zinc-950 text-emerald-400 font-mono text-sm overflow-auto rounded-lg">
                      {JSON.stringify(mockJob.payload, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
             </TabsContent>
             
             <TabsContent value="result" className="mt-4">
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    {mockJob.status === 'FAILED' ? 'No result generated due to failure.' : 'Result data will appear here upon completion.'}
                  </CardContent>
                </Card>
             </TabsContent>
           </Tabs>
        </div>

      </div>
    </div>
  );
}

// Temporary icon component for the inline alert since I missed importing it above
function AlertTriangle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}
