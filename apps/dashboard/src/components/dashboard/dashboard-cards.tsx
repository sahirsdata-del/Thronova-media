import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Video, UploadCloud, AlertCircle } from "lucide-react";

export interface DashboardStat {
  title: string;
  value: string | number;
  description: string;
  iconType: 'ideas' | 'videos' | 'uploads' | 'failures';
}

interface DashboardCardsProps {
  stats: DashboardStat[];
}

export function DashboardCards({ stats }: DashboardCardsProps) {
  const getIconData = (type: string) => {
    switch (type) {
      case 'ideas': return { icon: Lightbulb, color: "text-blue-500" };
      case 'videos': return { icon: Video, color: "text-green-500" };
      case 'uploads': return { icon: UploadCloud, color: "text-purple-500" };
      case 'failures': return { icon: AlertCircle, color: "text-red-500" };
      default: return { icon: Lightbulb, color: "text-gray-500" };
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const IconData = getIconData(stat.iconType);
        const Icon = IconData.icon;
        
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${IconData.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
