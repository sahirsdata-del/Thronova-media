"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Lightbulb, Target, Sparkles, TrendingUp, Clock, FileText, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock data representing the latest AI Performance Report
const aiReport = {
  videoTitle: "Top 5 Phones Under ₹20K (2026)",
  platform: "YouTube",
  score: 87,
  analysis: "The video is experiencing incredible traction, but suffers from a slight drop-off in the first 5 seconds. CTR is exceptionally healthy at 8.2%, indicating strong initial interest and thumbnail optimization, but the content fails to deliver on the hook's promise quickly enough, causing early viewer abandonment.",
  recommendations: {
    hooks: "Start the video exactly at the climax. Cut the 3-second animated intro logo entirely.",
    titles: "Your title is working perfectly. No changes needed.",
    thumbnails: "Increase the contrast on the main subject and use fewer than 4 words of text to make it pop on mobile.",
    uploadTime: "Try publishing 2 hours earlier (around 2PM EST) to catch the afternoon algorithm spike.",
    duration: "Cut the video down by 15% - the pacing drags during the 3rd phone review."
  },
  nextIdeas: [
    "I Bought The Best Phone Under ₹20K - Here's What Happened",
    "The Brutal Truth About Budget Phones in 2026",
    "Stop Buying Flagships (Why this ₹20K phone is better)"
  ]
};

export default function AIInsightsDashboard() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center">
            <BrainCircuit className="h-8 w-8 text-indigo-500 mr-3" />
            Gemini Performance Engine
          </h2>
          <p className="text-muted-foreground mt-1">Autonomous Analytics Evaluation & Iteration</p>
        </div>
        <Link href="/analytics">
          <Button variant="outline">
            <LayoutDashboard className="mr-2 h-4 w-4" /> Back to Analytics
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Score & Summary */}
        <div className="space-y-6 md:col-span-1">
          <Card className="bg-indigo-950/20 border-indigo-500/20">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-400">AI Video Score</CardTitle>
              <CardDescription>Based on retention, CTR, and velocity</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted" />
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent"
                    strokeDasharray={377} strokeDashoffset={377 - (377 * aiReport.score) / 100}
                    className="text-indigo-500 transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute text-4xl font-bold">{aiReport.score}</div>
              </div>
              <Badge className="mt-6 bg-indigo-500 hover:bg-indigo-600">Highly Optimized</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-400" /> Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {aiReport.analysis}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Recommendations & Next Ideas */}
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Target className="h-5 w-5 mr-2 text-orange-400" /> Actionable Recommendations
              </CardTitle>
              <CardDescription>What to fix for your next generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-[24px_1fr] gap-4">
                <div className="mt-0.5 text-orange-500"><TrendingUp size={20} /></div>
                <div>
                  <h4 className="font-semibold text-sm">Hook & Intro</h4>
                  <p className="text-sm text-muted-foreground mt-1">{aiReport.recommendations.hooks}</p>
                </div>
              </div>
              <div className="grid grid-cols-[24px_1fr] gap-4">
                <div className="mt-0.5 text-blue-500"><LayoutDashboard size={20} /></div>
                <div>
                  <h4 className="font-semibold text-sm">Thumbnail & Title</h4>
                  <p className="text-sm text-muted-foreground mt-1">{aiReport.recommendations.thumbnails}</p>
                  <p className="text-sm text-muted-foreground mt-1">{aiReport.recommendations.titles}</p>
                </div>
              </div>
              <div className="grid grid-cols-[24px_1fr] gap-4">
                <div className="mt-0.5 text-emerald-500"><Clock size={20} /></div>
                <div>
                  <h4 className="font-semibold text-sm">Timing & Duration</h4>
                  <p className="text-sm text-muted-foreground mt-1">{aiReport.recommendations.uploadTime}</p>
                  <p className="text-sm text-muted-foreground mt-1">{aiReport.recommendations.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-background to-indigo-950/20 border-indigo-500/20">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-indigo-400">
                <Sparkles className="h-5 w-5 mr-2" /> AI Generated Ideas
              </CardTitle>
              <CardDescription>Generated based on your highest performing metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {aiReport.nextIdeas.map((idea, i) => (
                  <li key={i} className="flex items-center p-3 rounded-lg bg-background/50 border border-muted hover:border-indigo-500/30 transition-colors">
                    <Lightbulb className="h-5 w-5 mr-3 text-amber-500 flex-shrink-0" />
                    <span className="font-medium text-sm">{idea}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white">
                Send Ideas to Research Engine
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
