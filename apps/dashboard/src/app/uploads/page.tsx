"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MonitorPlay, Camera, Upload, MoreHorizontal } from "lucide-react";
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
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const initialUploads = [
  {
    id: "1",
    title: "Top 10 AI Tools in 2026",
    platform: "YouTube",
    scheduledTime: "Today, 5:00 PM",
    status: "SCHEDULED",
    thumbnail: "bg-red-900/20",
  },
  {
    id: "2",
    title: "Top 10 AI Tools - Shorts",
    platform: "Instagram",
    scheduledTime: "Today, 6:00 PM",
    status: "SCHEDULED",
    thumbnail: "bg-pink-900/20",
  },
  {
    id: "3",
    title: "iPhone 16 Review",
    platform: "YouTube",
    scheduledTime: "2026-07-13, 10:00 AM",
    status: "PUBLISHED",
    thumbnail: "bg-zinc-800",
  },
];

const statusColors: Record<string, string> = {
  SCHEDULED: "bg-blue-500",
  UPLOADING: "bg-purple-500 animate-pulse",
  PUBLISHED: "bg-emerald-500",
  FAILED: "bg-red-500",
};

export default function UploadQueuePage() {
  const [uploads, setUploads] = useState(initialUploads);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newUpload, setNewUpload] = useState({ title: "", platform: "YouTube", scheduledTime: "" });

  const handleManualUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpload.title) return toast.error("Title is required");
    
    const upload = {
      id: Date.now().toString(),
      title: newUpload.title,
      platform: newUpload.platform,
      scheduledTime: newUpload.scheduledTime || "Now",
      status: "UPLOADING",
      thumbnail: "bg-zinc-500",
    };
    
    setUploads([upload, ...uploads]);
    setIsAddOpen(false);
    setNewUpload({ title: "", platform: "YouTube", scheduledTime: "" });
    toast.success("Upload started!");
    
    // Simulate upload finishing
    setTimeout(() => {
      setUploads(current => current.map(u => 
        u.id === upload.id ? { ...u, status: "PUBLISHED" } : u
      ));
      toast.success(`${upload.title} published successfully`);
    }, 3000);
  };

  const handleCancel = (id: string) => {
    setUploads(uploads.filter(u => u.id !== id));
    toast.success("Upload cancelled");
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Upload Queue</h2>
          <p className="text-muted-foreground">
            Manage scheduled publications across platforms.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger render={<Button><Upload className="mr-2 h-4 w-4" /> Manual Upload</Button>} />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manual Upload</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleManualUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="upload-title">Title</Label>
                  <Input 
                    id="upload-title" 
                    placeholder="Video title..." 
                    value={newUpload.title} 
                    onChange={e => setNewUpload({...newUpload, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select value={newUpload.platform} onValueChange={(val) => setNewUpload({...newUpload, platform: val || "YOUTUBE"})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Scheduled Time (Optional)</Label>
                  <Input 
                    id="schedule" 
                    placeholder="e.g. Today, 5:00 PM" 
                    value={newUpload.scheduledTime} 
                    onChange={e => setNewUpload({...newUpload, scheduledTime: e.target.value})}
                  />
                </div>
                <DialogFooter className="mt-4">
                  <Button type="submit">Start Upload</Button>
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
              <TableHead className="w-[100px]">Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Scheduled Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uploads.map((upload) => (
              <TableRow key={upload.id}>
                <TableCell>
                  <div className={`h-12 w-20 rounded-md border ${upload.thumbnail} flex items-center justify-center`}>
                    <span className="text-[10px] text-muted-foreground opacity-50">Thumb</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{upload.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {upload.platform === "YouTube" ? (
                      <MonitorPlay className="h-4 w-4 text-red-500" />
                    ) : (
                      <Camera className="h-4 w-4 text-pink-500" />
                    )}
                    <span>{upload.platform}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{upload.scheduledTime}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${statusColors[upload.status]}`} />
                    <span className="text-sm font-medium">{upload.status}</span>
                  </div>
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
                      <DropdownMenuItem onClick={() => toast.info("Edit Metadata coming soon")}>
                        Edit Metadata
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info("Reschedule coming soon")}>
                        Reschedule
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleCancel(upload.id)}>
                        Cancel Upload
                      </DropdownMenuItem>
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
