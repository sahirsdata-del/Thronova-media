import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckCircle, XCircle, Clock } from "lucide-react";

const kpis = [
  { title: "Jobs Today", value: "24", icon: Activity, textClass: "text-blue-500" },
  { title: "Completed", value: "21", icon: CheckCircle, textClass: "text-green-500" },
  { title: "Failed", value: "3", icon: XCircle, textClass: "text-red-500" },
  { title: "Avg. Time", value: "1.2m", icon: Clock, textClass: "text-purple-500" },
];

const latestResearch = [
  { id: "1", title: "Top 5 Phones Under ₹20K", status: "COMPLETED", time: "10 mins ago" },
  { id: "2", title: "Best AI Apps for Students", status: "RUNNING", time: "Just now" },
  { id: "3", title: "Nothing Phone 4 Review", status: "FAILED", time: "1 hour ago" },
];

const topCategories = [
  { name: "Phone Review", count: 145 },
  { name: "AI Tool Review", count: 89 },
  { name: "Top 5 List", count: 56 },
];

export default function ResearchDashboardPage() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Research Engine</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.textClass}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Latest Research Jobs</CardTitle>
            <CardDescription>Recent automated research executions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Topic</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestResearch.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>
                      <Badge variant={job.status === 'COMPLETED' ? 'default' : job.status === 'FAILED' ? 'destructive' : 'secondary'}>
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">{job.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
            <CardDescription>Most researched content types.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Researches</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCategories.map((cat) => (
                  <TableRow key={cat.name}>
                    <TableCell className="font-medium">{cat.name}</TableCell>
                    <TableCell className="text-right">{cat.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
