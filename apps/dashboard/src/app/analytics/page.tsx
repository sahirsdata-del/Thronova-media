"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, Eye, MousePointerClick, Clock, Users, PlaySquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data representing the aggregated timeseries from our Analytics snapshots
const data = [
  { date: "Jul 1", views: 4000, watchTime: 240, ctr: 4.5 },
  { date: "Jul 2", views: 5200, watchTime: 310, ctr: 4.8 },
  { date: "Jul 3", views: 6100, watchTime: 380, ctr: 5.2 },
  { date: "Jul 4", views: 8500, watchTime: 490, ctr: 5.5 },
  { date: "Jul 5", views: 12000, watchTime: 720, ctr: 6.1 },
  { date: "Jul 6", views: 18500, watchTime: 1100, ctr: 6.8 },
  { date: "Jul 7", views: 24000, watchTime: 1450, ctr: 7.2 },
];

export default function AnalyticsDashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Performance Analytics</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10">Live Sync Active</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,000</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +22% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Watch Time (Hours)</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,450</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +15% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. CTR</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2%</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +1.1% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+342</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              Across YouTube & Instagram
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>View Velocity</CardTitle>
            <CardDescription>Aggregated views across all connected platforms over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Performing Videos</CardTitle>
            <CardDescription>Videos driving the most engagement this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { title: "Top 5 Phones Under ₹20K", views: "12,430", platform: "YouTube", growth: "+14%" },
                { title: "Is the iPhone 15 Pro Max Worth It?", views: "8,200", platform: "Instagram", growth: "+42%" },
                { title: "Samsung S24 Ultra Camera Test", views: "3,370", platform: "YouTube", growth: "+5%" },
              ].map((video, i) => (
                <div key={i} className="flex items-center">
                  <div className="h-10 w-10 rounded bg-muted flex items-center justify-center flex-shrink-0">
                    <PlaySquare className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{video.title}</p>
                    <p className="text-sm text-muted-foreground">{video.platform}</p>
                  </div>
                  <div className="ml-auto font-medium text-right">
                    <div>{video.views}</div>
                    <div className="text-xs text-emerald-500">{video.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
