import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";
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
} from "@/components/ui/dropdown-menu";

const mockIdeas = [
  {
    id: "1",
    title: "Top 10 AI Tools in 2026",
    category: "AI Technology",
    priority: "HIGH",
    status: "READY",
    date: "2026-07-14",
  },
  {
    id: "2",
    title: "iPhone 16 Pro Max Review",
    category: "Tech Reviews",
    priority: "MEDIUM",
    status: "DRAFT",
    date: "2026-07-13",
  },
  {
    id: "3",
    title: "How to Build a SaaS in 24 Hours",
    category: "Software Engineering",
    priority: "HIGH",
    status: "RESEARCHING",
    date: "2026-07-12",
  },
  {
    id: "4",
    title: "React vs Vue in 2026",
    category: "Programming",
    priority: "LOW",
    status: "ARCHIVED",
    date: "2026-07-10",
  },
];

const statusColors: Record<string, string> = {
  DRAFT: "bg-zinc-500",
  RESEARCHING: "bg-blue-500",
  READY: "bg-green-500",
  RENDERING: "bg-purple-500",
  PUBLISHED: "bg-emerald-500",
  ARCHIVED: "bg-zinc-700",
};

const priorityColors: Record<string, string> = {
  HIGH: "text-red-500 border-red-500/20 bg-red-500/10",
  MEDIUM: "text-amber-500 border-amber-500/20 bg-amber-500/10",
  LOW: "text-blue-500 border-blue-500/20 bg-blue-500/10",
};

export default function IdeasPage() {
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
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Idea
          </Button>
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
            {mockIdeas.map((idea) => (
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
                    <DropdownMenuTrigger>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit Idea</DropdownMenuItem>
                      <DropdownMenuItem>Generate Script</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
