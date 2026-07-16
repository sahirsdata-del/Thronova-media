"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, CheckCircle2, CircleDashed, Loader2, XCircle } from "lucide-react";

type NodeStatus = "WAITING" | "RUNNING" | "COMPLETED" | "FAILED";

interface WorkflowNode {
  id: string;
  name: string;
  status: NodeStatus;
}

// Mock workflow state
const initialNodes: WorkflowNode[] = [
  { id: "1", name: "Research Engine", status: "COMPLETED" },
  { id: "2", name: "Script Generation", status: "COMPLETED" },
  { id: "3", name: "Voice Synthesis", status: "COMPLETED" },
  { id: "4", name: "Asset Retrieval", status: "RUNNING" },
  { id: "5", name: "Remotion Render", status: "WAITING" },
  { id: "6", name: "Thumbnail Generation", status: "WAITING" },
  { id: "7", name: "Social Upload", status: "WAITING" },
  { id: "8", name: "Analytics Sync", status: "WAITING" },
];

export default function WorkflowOrchestrator() {
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
  const [workflowStatus, setWorkflowStatus] = useState<"ACTIVE" | "PAUSED">("ACTIVE");

  const togglePause = () => {
    setWorkflowStatus(prev => prev === "ACTIVE" ? "PAUSED" : "ACTIVE");
    // In a real app, this would hit \`workflowService.pauseWorkflow()\` / \`resumeWorkflow()\`
  };

  const simulateFailure = () => {
    setNodes(prev => prev.map(n => n.id === "4" ? { ...n, status: "FAILED" } : n));
  };

  const retryJob = () => {
    setNodes(prev => prev.map(n => n.id === "4" ? { ...n, status: "RUNNING" } : n));
    // In a real app, this hits \`workflowService.retryJob()\`
  };

  const renderIcon = (status: NodeStatus) => {
    switch (status) {
      case "COMPLETED": return <CheckCircle2 className="h-6 w-6 text-emerald-500" />;
      case "RUNNING": return <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />;
      case "FAILED": return <XCircle className="h-6 w-6 text-red-500" />;
      case "WAITING": return <CircleDashed className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Mission Control</h2>
          <p className="text-muted-foreground mt-1">One-Click Universal Autonomous Pipeline</p>
        </div>
        <div className="flex items-center space-x-4">
          {workflowStatus === "ACTIVE" ? (
            <Button variant="outline" onClick={togglePause} className="border-orange-500 text-orange-500 hover:bg-orange-500/10">
              <Pause className="h-4 w-4 mr-2" /> Pause Pipeline
            </Button>
          ) : (
            <Button variant="outline" onClick={togglePause} className="border-emerald-500 text-emerald-500 hover:bg-emerald-500/10">
              <Play className="h-4 w-4 mr-2" /> Resume Pipeline
            </Button>
          )}
          <Button onClick={() => setNodes(nodes.map(n => ({...n, status: "WAITING"})))}>
            <Play className="h-4 w-4 mr-2" /> Create Video
          </Button>
        </div>
      </div>

      <Card className="border-muted bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Project: iPhone 15 Review</CardTitle>
              <CardDescription>Visualizing live flow from BullMQ FlowProducer</CardDescription>
            </div>
            <Badge variant="outline" className={workflowStatus === "ACTIVE" ? "text-emerald-500 border-emerald-500/30 bg-emerald-500/10" : "text-orange-500 border-orange-500/30 bg-orange-500/10"}>
              Status: {workflowStatus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative pt-4">
            {/* The line connecting nodes */}
            <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-muted"></div>
            
            <div className="space-y-8 relative">
              {nodes.map((node, index) => (
                <div key={node.id} className="flex items-start">
                  <div className="relative z-10 bg-background rounded-full p-1 border border-muted mt-0.5 shadow-sm">
                    {renderIcon(node.status)}
                  </div>
                  <div className="ml-6 flex-1 bg-muted/30 rounded-lg border p-4 flex items-center justify-between transition-colors hover:bg-muted/50">
                    <div>
                      <h4 className="font-semibold text-sm">{node.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {node.status === "COMPLETED" && "Finished successfully in 12s."}
                        {node.status === "RUNNING" && "Processing on Worker Node 1..."}
                        {node.status === "WAITING" && "Awaiting upstream dependencies."}
                        {node.status === "FAILED" && "API Rate Limit Exceeded. Retrying..."}
                      </p>
                    </div>
                    <div>
                      {node.status === "FAILED" && (
                        <Button size="sm" variant="destructive" onClick={retryJob}>
                          <RotateCcw className="h-4 w-4 mr-2" /> Retry
                        </Button>
                      )}
                      {node.status === "RUNNING" && (
                        <Button size="sm" variant="outline" onClick={simulateFailure}>
                          Simulate Failure
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
