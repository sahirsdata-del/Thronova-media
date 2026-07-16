import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Video, UploadCloud, AlertCircle } from "lucide-react";

const mockStats = [
  {
    title: "Total Ideas",
    value: "128",
    description: "+12 from last month",
    icon: Lightbulb,
    color: "text-blue-500",
  },
  {
    title: "Videos Rendered",
    value: "45",
    description: "+4 this week",
    icon: Video,
    color: "text-green-500",
  },
  {
    title: "Queued Uploads",
    value: "8",
    description: "Scheduled for next 7 days",
    icon: UploadCloud,
    color: "text-purple-500",
  },
  {
    title: "Failed Jobs",
    value: "2",
    description: "Requires attention",
    icon: AlertCircle,
    color: "text-red-500",
  },
];

export function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {mockStats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
