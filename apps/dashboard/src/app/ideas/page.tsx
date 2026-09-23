"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, FileText, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const priorityColors: Record<string, string> = {
  HIGH: "text-red-500 border-red-500/20 bg-red-500/10",
  MEDIUM: "text-amber-500 border-amber-500/20 bg-amber-500/10",
  LOW: "text-blue-500 border-blue-500/20 bg-blue-500/10",
};

const statusColors: Record<string, string> = {
  DRAFT: "bg-zinc-500",
  RESEARCHING: "bg-blue-500",
  READY: "bg-green-500",
  RENDERING: "bg-purple-500",
  PUBLISHED: "bg-emerald-500",
  ARCHIVED: "bg-zinc-700",
};

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newIdea, setNewIdea] = useState({ title: "", category: "AI Technology", priority: "MEDIUM" });
  
  const [isScriptOpen, setIsScriptOpen] = useState(false);
  const [viewingScript, setViewingScript] = useState<string | null>(null);
  const [scriptLoading, setScriptLoading] = useState(false);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const res = await fetch("/api/ideas");
      const data = await res.json();
      if (data.ideas) {
        setIdeas(data.ideas);
      }
    } catch (e) {
      toast.error("Failed to load ideas");
    } finally {
      setLoading(false);
    }
  };


  const handleAddIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdea.title) return toast.error("Title is required");
    
    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIdea)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      setIdeas([data.idea, ...ideas]);
      setIsAddOpen(false);
      setNewIdea({ title: "", category: "AI Technology", priority: "MEDIUM" });
      toast.success("Idea added successfully!");
    } catch (e: any) {
      toast.error(e.message || "Failed to add idea");
    }
  };

  const handleDelete = (id: string) => {
    setIdeas(ideas.filter(i => i.id !== id));
    toast.success("Idea deleted");
  };

  const handleGenerateScript = async (idea: any) => {
    setIdeas(ideas.map(i => i.id === idea.id ? { ...i, status: "RESEARCHING" } : i));
    
    try {
      const res = await fetch("/api/jobs/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ideaId: idea.id, title: idea.title, category: idea.category })
      });
      
      if (!res.ok) throw new Error("Failed");
      toast.info("Script generation started in background");
    } catch (e) {
      toast.error("Failed to start script generation");
      setIdeas(ideas.map(i => i.id === idea.id ? { ...i, status: "DRAFT" } : i));
    }
  };

  const handleViewScript = async (ideaId: string) => {
    setIsScriptOpen(true);
    setScriptLoading(true);
    setViewingScript(null);
    try {
      const res = await fetch(`/api/ideas/${ideaId}/script`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setViewingScript(data.script.rawJson.content || "No content generated");
    } catch (e: any) {
      toast.error(e.message || "Failed to fetch script");
      setIsScriptOpen(false);
    } finally {
      setScriptLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Content Ideas</h2>
          <p className="text-muted-foreground">
            Manage and track your video ideas.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger render={<Button><Plus className="mr-2 h-4 w-4" /> Add Idea</Button>} />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Idea</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddIdea} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter idea title..." 
                    value={newIdea.title} 
                    onChange={e => setNewIdea({...newIdea, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    placeholder="E.g., Tech, Lifestyle" 
                    value={newIdea.category} 
                    onChange={e => setNewIdea({...newIdea, category: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={newIdea.priority} onValueChange={(val) => setNewIdea({...newIdea, priority: val || "MEDIUM"})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="LOW">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter className="mt-4">
                  <Button type="submit">Save Idea</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ideas.map((idea) => (
              <TableRow key={idea.id}>
                <TableCell className="font-medium">{idea.title}</TableCell>
                <TableCell>{idea.category}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={priorityColors[idea.priority]}>
                    {idea.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${statusColors[idea.status]}`} />
                    <span className="text-sm text-muted-foreground">{idea.status}</span>
                  </div>
                </TableCell>
                <TableCell>{idea.date}</TableCell>
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
                      <DropdownMenuItem onClick={() => toast.info("Edit Idea feature coming soon")}>
                        Edit Idea
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleGenerateScript(idea)}>
                        Generate Script
                      </DropdownMenuItem>
                      {idea.status === "READY" && (
                        <DropdownMenuItem onClick={() => handleViewScript(idea.id)}>
                          View Script
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(idea.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading && (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>

      <Dialog open={isScriptOpen} onOpenChange={setIsScriptOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generated Script
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 whitespace-pre-wrap bg-muted p-4 rounded-md font-mono text-sm">
            {scriptLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              viewingScript
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
