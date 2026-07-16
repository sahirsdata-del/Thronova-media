"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, Clock, History, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockResearchData = {
  version: 2,
  summary: "Comprehensive comparison between the top 5 phones under ₹20,000 in India. Emphasizes display, processor, and battery life.",
  entities: {
    Category: "Phones",
    PriceRange: "₹20K",
    Intent: "Comparison"
  },
  facts: [
    { label: "Phone 1", value: "Poco X6 Neo - Dimensity 6080, 120Hz AMOLED" },
    { label: "Phone 2", value: "Moto G54 5G - Dimensity 7020, 6000mAh battery" },
    { label: "Phone 3", value: "Realme 12 5G - Dimensity 6100+, 108MP camera" },
    { label: "Phone 4", value: "Vivo T3x 5G - Snapdragon 6 Gen 1, 6000mAh battery" },
    { label: "Phone 5", value: "Samsung Galaxy M34 - Exynos 1280, Super AMOLED" },
  ],
  keywords: [
    { text: "Budget Phone", score: 95 },
    { text: "Best Camera", score: 88 },
    { text: "Gaming Phone", score: 92 },
    { text: "Under 20k", score: 99 },
  ],
  references: [
    { title: "GSMArena: Top phones under 20k", url: "https://gsmarena.com", snippet: "The Poco X6 Neo stands out with..." },
    { title: "91Mobiles Comparison", url: "https://91mobiles.com", snippet: "When comparing the Moto G54 and Vivo T3x..." },
  ],
  rawJson: {
    topic: "Top 5 Phones Under ₹20,000",
    summary: "Comprehensive comparison...",
    specifications: []
  }
};

export default function ResearchViewerPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex-1 h-[calc(100vh-4rem)] flex flex-col -m-6 p-0 overflow-hidden">
      {/* Header */}
      <div className="flex-none p-6 border-b bg-background flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/ideas/${params.id}`} className={buttonVariants({ variant: "ghost", size: "icon" })}><ArrowLeft className="h-4 w-4" /></Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Research Data</h2>
            <p className="text-sm text-muted-foreground">Idea: Top 5 Phones Under ₹20,000</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Completed
          </Badge>
          <span className="text-sm text-muted-foreground flex items-center">
            <Clock className="mr-1 h-3 w-3" /> Updated 5m ago
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden bg-muted/20">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="facts">Key Facts</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="references">References</TabsTrigger>
              <TabsTrigger value="json">Raw JSON</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">{mockResearchData.summary}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Topic Entities</CardTitle>
                  <CardDescription>Automatically extracted parameters.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(mockResearchData.entities).map(([key, value]) => (
                      <div key={key} className="p-4 rounded-lg bg-secondary/50 border">
                        <div className="text-xs text-muted-foreground uppercase font-semibold mb-1">{key}</div>
                        <div className="font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="facts" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Key Facts & Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockResearchData.facts.map((fact, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-lg border bg-card">
                        <div className="font-semibold w-24 shrink-0">{fact.label}</div>
                        <div className="text-muted-foreground">{fact.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="keywords" className="mt-0">
               <Card>
                <CardHeader>
                  <CardTitle>Trending Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockResearchData.keywords.map((kw, i) => (
                      <Badge key={i} variant="secondary" className="px-3 py-1.5 text-sm">
                        {kw.text} <span className="ml-2 text-muted-foreground text-xs">{kw.score}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="references" className="mt-0 space-y-4">
              {mockResearchData.references.map((ref, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{ref.title}</h4>
                        <p className="text-muted-foreground mt-1 text-sm">{ref.snippet}</p>
                      </div>
                      <a href={ref.url} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "ghost", size: "icon" })}>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="json" className="mt-0">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between py-4">
                  <CardTitle>Structured JSON Output</CardTitle>
                  <Button variant="outline" size="sm">
                    <Copy className="mr-2 h-4 w-4" /> Copy JSON
                  </Button>
                </CardHeader>
                <CardContent>
                  <pre className="p-4 rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto text-sm border">
                    <code>{JSON.stringify(mockResearchData.rawJson, null, 2)}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar (Version History) */}
        <div className="w-80 border-l bg-background flex flex-col">
          <div className="p-4 border-b flex items-center gap-2">
            <History className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">Version History</span>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <div className="p-3 rounded-lg border-2 border-primary bg-primary/5 cursor-pointer">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">Version 2</span>
                  <Badge>Current</Badge>
                </div>
                <div className="text-xs text-muted-foreground">Today, 2:30 PM</div>
              </div>
              <div className="p-3 rounded-lg border bg-card hover:bg-accent cursor-pointer transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">Version 1</span>
                </div>
                <div className="text-xs text-muted-foreground">Yesterday, 4:15 PM</div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
