import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockActivities = [
  {
    id: 1,
    user: "Sahir",
    action: "generated a new script",
    target: "Tech Review: iPhone 16",
    time: "2 hours ago",
    avatar: "/avatars/01.png",
    initials: "SA"
  },
  {
    id: 2,
    user: "System",
    action: "completed rendering",
    target: "Top 10 AI Tools 2026",
    time: "4 hours ago",
    avatar: "/avatars/02.png",
    initials: "SY"
  },
  {
    id: 3,
    user: "System",
    action: "published video to YouTube",
    target: "Top 10 AI Tools 2026",
    time: "5 hours ago",
    avatar: "/avatars/03.png",
    initials: "SY"
  },
  {
    id: 4,
    user: "Alex",
    action: "added a new content idea",
    target: "Setup Tour 2026",
    time: "1 day ago",
    avatar: "/avatars/04.png",
    initials: "AL"
  }
];

export function RecentActivity() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          You have {mockActivities.length} recent activities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.avatar} alt={activity.user} />
                <AvatarFallback>{activity.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.action} <span className="font-medium text-foreground">{activity.target}</span>
                </p>
              </div>
              <div className="ml-auto font-medium text-sm text-muted-foreground">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
