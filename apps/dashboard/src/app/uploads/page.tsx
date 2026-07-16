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
} from "@/components/ui/dropdown-menu";

const mockUploads = [
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
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Manual Upload
          </Button>
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
            {mockUploads.map((upload) => (
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
                    <DropdownMenuTrigger>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit Metadata</DropdownMenuItem>
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Cancel Upload</DropdownMenuItem>
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
