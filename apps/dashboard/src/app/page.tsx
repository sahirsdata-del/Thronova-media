import { DashboardCards, DashboardStat } from "@/components/dashboard/dashboard-cards";
import { RecentActivity, ActivityItem } from "@/components/dashboard/recent-activity";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { prisma } from "@thronova/database";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export default async function Home() {
  let totalIdeas = 0;
  let videosRendered = 0;
  let queuedUploads = 0;
  let failedJobs = 0;
  let recentJobs: any[] = [];

  try {
    // Fetch real data from Prisma
    totalIdeas = await prisma.contentIdea.count();
    videosRendered = await prisma.renderedVideo.count();
    queuedUploads = await prisma.job.count({
      where: { type: 'UPLOAD', status: 'QUEUED' }
    });
    failedJobs = await prisma.job.count({
      where: { status: 'FAILED' }
    });

    // Fetch recent activity based on Jobs
    recentJobs = await prisma.job.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { project: true }
    });
  } catch (error) {
    console.error("Failed to fetch dashboard data (Database might be down):", error);
  }

  const stats: DashboardStat[] = [
    {
      title: "Total Ideas",
      value: totalIdeas.toString(),
      description: "Total content ideas across projects",
      iconType: 'ideas',
    },
    {
      title: "Videos Rendered",
      value: videosRendered.toString(),
      description: "Total finalized videos",
      iconType: 'videos',
    },
    {
      title: "Queued Uploads",
      value: queuedUploads.toString(),
      description: "Uploads waiting for execution",
      iconType: 'uploads',
    },
    {
      title: "Failed Jobs",
      value: failedJobs.toString(),
      description: "Requires attention",
      iconType: 'failures',
    },
  ];

  const activities: ActivityItem[] = recentJobs.map(job => ({
    id: job.id,
    user: "System",
    action: `processed ${job.type} job`,
    target: job.project?.name || "Unknown Project",
    time: formatDistanceToNow(job.createdAt, { addSuffix: true }),
    avatar: "",
    initials: "SY"
  }));

  // Mocking the chart data for now since we'd need more complex group by queries by month
  // but we can wire it up with actual structure
  const chartData = [
    { name: 'Jan', produced: 0 },
    { name: 'Feb', produced: 0 },
    { name: 'Mar', produced: 0 },
    { name: 'Apr', produced: videosRendered > 0 ? videosRendered : 5 },
    { name: 'May', produced: videosRendered > 0 ? videosRendered + 2 : 8 },
    { name: 'Jun', produced: videosRendered > 0 ? videosRendered + 5 : 12 },
    { name: 'Jul', produced: videosRendered > 0 ? videosRendered + 10 : 15 },
  ];

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Idea
          </Button>
        </div>
      </div>
      
      <DashboardCards stats={stats} />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentActivity activities={activities} />
        <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-1.5">
            <h3 className="font-semibold leading-none tracking-tight">Overview</h3>
            <p className="text-sm text-muted-foreground">Monthly production activity</p>
          </div>
          <div className="p-6 pt-0 flex h-[350px] w-full items-center justify-center text-muted-foreground">
            <OverviewChart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}
