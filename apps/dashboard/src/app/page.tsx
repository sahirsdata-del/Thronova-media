"use client";

import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockOverviewData = [
  { name: 'Jan', produced: 12 },
  { name: 'Feb', produced: 19 },
  { name: 'Mar', produced: 15 },
  { name: 'Apr', produced: 22 },
  { name: 'May', produced: 28 },
  { name: 'Jun', produced: 32 },
  { name: 'Jul', produced: 45 },
];

export default function Home() {
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
      
      <DashboardCards />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentActivity />
        <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-1.5">
            <h3 className="font-semibold leading-none tracking-tight">Overview</h3>
            <p className="text-sm text-muted-foreground">Monthly production activity</p>
          </div>
          <div className="p-6 pt-0 flex h-[350px] w-full items-center justify-center text-muted-foreground">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockOverviewData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.2} />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                />
                <Bar dataKey="produced" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
