"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Palette, Megaphone } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const kpis = [
  { title: "Scripts Created", value: "84", icon: FileText, textClass: "text-blue-500" },
  { title: "Avg. Duration", value: "4m 12s", icon: Clock, textClass: "text-green-500" },
  { title: "Top Template", value: "Top 5 List", icon: Palette, textClass: "text-purple-500" },
  { title: "Top Tone", value: "Energetic", icon: Megaphone, textClass: "text-orange-500" },
];

const latestScripts = [
  { id: "1", title: "Top 5 Phones Under ₹20K", template: "Top 5 List", duration: "4m 30s", status: "READY", updated: "10 mins ago" },
  { id: "2", title: "Best AI Apps for Students", template: "Explainer", duration: "6m 15s", status: "DRAFT", updated: "1 hour ago" },
  { id: "3", title: "Nothing Phone 4 Review", template: "Single Review", duration: "8m 45s", status: "IN REVIEW", updated: "2 hours ago" },
];

export default function ScriptDashboardPage() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Script & Storyboard Engine</h2>
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

      <Card>
        <CardHeader>
          <CardTitle>Latest Scripts</CardTitle>
          <CardDescription>Recently generated and edited storyboards.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latestScripts.map((script) => (
                <TableRow key={script.id}>
                  <TableCell className="font-medium">{script.title}</TableCell>
                  <TableCell>{script.template}</TableCell>
                  <TableCell>{script.duration}</TableCell>
                  <TableCell>
                    <Badge variant={script.status === 'READY' ? 'default' : 'secondary'}>
                      {script.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{script.updated}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/scripts/${script.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>Open Editor</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
