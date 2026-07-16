"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, Server, Code2, Cpu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockAIRequests = [
  {
    id: "req-8891",
    provider: "Gemini",
    model: "gemini-1.5-pro",
    status: "SUCCESS",
    promptPreview: "Conduct deep research on: Top 5 Phones in the category: Tech",
    duration: "4.2s",
    tokens: { prompt: 142, completion: 856, total: 998 },
    retries: 0,
    cost: "$0.0015",
    timestamp: "10 mins ago",
    rawJson: `{
  "topic": "Top 5 Phones",
  "summary": "Comprehensive overview of the top 5 phones under 20K in India for 2026...",
  "sections": [
    { "title": "Performance", "content": "..." }
  ]
}`
  },
  {
    id: "req-8890",
    provider: "Gemini",
    model: "gemini-1.5-pro",
    status: "RETRYING",
    promptPreview: "Conduct deep research on: AI Tools in the category: Software",
    duration: "-",
    tokens: { prompt: 0, completion: 0, total: 0 },
    retries: 2,
    cost: "-",
    timestamp: "12 mins ago",
    error: "429 Too Many Requests"
  },
  {
    id: "req-8889",
    provider: "Gemini",
    model: "gemini-1.5-flash",
    status: "FAILED",
    promptPreview: "Extract entities for: Best Gaming Laptops",
    duration: "15.1s",
    tokens: { prompt: 56, completion: 0, total: 56 },
    retries: 3,
    cost: "-",
    timestamp: "1 hour ago",
    error: "Timeout exceeded."
  }
];

export default function ResearchDebugPage() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Provider Debug</h2>
          <p className="text-muted-foreground">Monitor live LLM interactions, token usage, and structured outputs.</p>
        </div>
        <div className="flex items-center space-x-2">
           <Badge variant="outline" className="text-green-500 border-green-500 bg-green-500/10">Gemini 1.5 Pro Connected</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Server className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">1,245</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Latency</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">3.8s</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tokens Generated</CardTitle>
            <Cpu className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">8.4M</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Cost (Today)</CardTitle>
            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-500">$12.40</Badge>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">$12.40</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent LLM Invocations</CardTitle>
          <CardDescription>Track prompt submissions and structured JSON responses.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider & Model</TableHead>
                <TableHead className="w-[300px]">Prompt Preview</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Tokens (P/C/T)</TableHead>
                <TableHead>Retries</TableHead>
                <TableHead className="text-right">Inspector</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAIRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>
                     <div className="font-medium">{req.provider}</div>
                     <div className="text-xs text-muted-foreground">{req.model}</div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground truncate max-w-[300px]">
                    {req.promptPreview}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      req.status === 'SUCCESS' ? 'default' : 
                      req.status === 'FAILED' ? 'destructive' : 'secondary'
                    } className={req.status === 'SUCCESS' ? 'bg-green-500' : req.status === 'RETRYING' ? 'bg-orange-500' : ''}>
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{req.duration}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {req.tokens.prompt} / {req.tokens.completion} / <span className="font-bold text-primary">{req.tokens.total}</span>
                  </TableCell>
                  <TableCell>
                     {req.retries > 0 ? <span className="text-orange-500">{req.retries}</span> : "0"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger>
                        <Button variant="ghost" size="sm"><Code2 className="mr-2 h-4 w-4" /> View Data</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Request {req.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                           {req.error && (
                             <div className="p-3 bg-red-500/10 text-red-500 border border-red-500/30 rounded-md text-sm font-mono">
                               Error: {req.error}
                             </div>
                           )}
                           
                           <div>
                             <h4 className="text-sm font-semibold mb-2">Prompt Sent</h4>
                             <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground font-mono">
                               {req.promptPreview}
                             </div>
                           </div>

                           <div>
                             <h4 className="text-sm font-semibold mb-2">Structured JSON Response</h4>
                             <ScrollArea className="h-64 rounded-md border bg-zinc-950">
                               <pre className="p-4 text-xs font-mono text-emerald-400">
                                 {req.rawJson || "// No response body available."}
                               </pre>
                             </ScrollArea>
                           </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
