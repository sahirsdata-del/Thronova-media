"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Play, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function IdeaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isResearching, setIsResearching] = useState(false);

  // Mock initial data
  const idea = {
    title: "Top 5 Phones Under ₹20,000",
    description: "A comprehensive comparison of the best budget smartphones available in India right now.",
    category: "Phone Review",
    platforms: ["YouTube", "Instagram"],
    language: "English",
    country: "India",
    tone: "Informative & Energetic",
    targetAudience: "Budget-conscious tech buyers",
    contentType: "Top 5 List",
    priority: "HIGH",
    status: "DRAFT",
    notes: "Make sure to emphasize battery life and display quality."
  };

  const handleStartResearch = () => {
    setIsResearching(true);
    // Simulate research job creation
    setTimeout(() => {
      router.push(`/ideas/${params.id}/research`);
    }, 1500);
  };

  return (
    <div className="flex-1 space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-4">
          <Link href="/ideas" className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Edit Idea</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline"><Save className="mr-2 h-4 w-4" /> Save</Button>
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg" 
            onClick={handleStartResearch}
            disabled={isResearching}
          >
            <Play className="mr-2 h-4 w-4" /> 
            {isResearching ? "Starting Job..." : "Start Research"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Core details about this content idea.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" defaultValue={idea.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" defaultValue={idea.description} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={idea.category}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Phone Review">Phone Review</SelectItem>
                    <SelectItem value="Laptop Review">Laptop Review</SelectItem>
                    <SelectItem value="AI Tool Review">AI Tool Review</SelectItem>
                    <SelectItem value="Top 5 List">Top 5 List</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type</Label>
                <Select defaultValue={idea.contentType}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Top 5 List">Top 5 List</SelectItem>
                    <SelectItem value="Deep Dive">Deep Dive</SelectItem>
                    <SelectItem value="Shorts">Shorts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Targeting & Tone</CardTitle>
            <CardDescription>Define the audience and style.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input id="language" defaultValue={idea.language} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" defaultValue={idea.country} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Input id="tone" defaultValue={idea.tone} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input id="targetAudience" defaultValue={idea.targetAudience} />
            </div>
            <div className="space-y-2">
              <Label>Target Platforms</Label>
              <div className="flex gap-2 flex-wrap">
                {['YouTube', 'Instagram', 'TikTok', 'Facebook'].map(platform => (
                  <Badge 
                    key={platform} 
                    variant={idea.platforms.includes(platform) ? "default" : "outline"}
                    className="cursor-pointer"
                  >
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Additional Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue={idea.priority}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="LOW">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={idea.status}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="RESEARCHING">Researching</SelectItem>
                    <SelectItem value="READY">Ready</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" defaultValue={idea.notes} rows={2} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
