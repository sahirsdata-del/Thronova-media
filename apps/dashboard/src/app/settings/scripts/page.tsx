"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const hooks = [
  { id: "1", text: "Don't buy a {{product}} before watching this!", category: "Review", favorite: true },
  { id: "2", text: "You won't believe what happens when...", category: "Entertainment", favorite: false },
  { id: "3", text: "The best {{category}} in {{year}} is finally here.", category: "Tech", favorite: true },
];

const ctas = [
  { id: "1", text: "Subscribe for more daily tech reviews.", category: "YouTube" },
  { id: "2", text: "Comment your favorite below!", category: "Engagement" },
  { id: "3", text: "Link in bio to check it out.", category: "Instagram" },
];

export default function ScriptSettingsPage() {
  return (
    <div className="flex-1 space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Script Engine Settings</h2>
          <p className="text-muted-foreground">
            Manage reusable templates, hooks, and CTAs for faster generation.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
        </div>
      </div>

      <Tabs defaultValue="hooks" className="w-full">
        <TabsList>
          <TabsTrigger value="hooks">Hook Library</TabsTrigger>
          <TabsTrigger value="ctas">CTA Library</TabsTrigger>
          <TabsTrigger value="templates">Script Templates</TabsTrigger>
        </TabsList>
        
        {/* HOOK LIBRARY */}
        <TabsContent value="hooks" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Reusable Hooks</h3>
            <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4" /> Add Hook</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {hooks.map((hook) => (
              <Card key={hook.id} className="relative group">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <Textarea defaultValue={hook.text} className="min-h-[80px] resize-none mb-4" />
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant="secondary">{hook.category}</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className={hook.favorite ? "text-yellow-500" : "text-muted-foreground"}>
                      <Star className="h-4 w-4" fill={hook.favorite ? "currentColor" : "none"} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* CTA LIBRARY */}
        <TabsContent value="ctas" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Call to Action Templates</h3>
            <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4" /> Add CTA</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {ctas.map((cta) => (
              <Card key={cta.id} className="relative group">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <Textarea defaultValue={cta.text} className="min-h-[80px] resize-none mb-4" />
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{cta.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* SCRIPT TEMPLATES */}
        <TabsContent value="templates" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Master Script Templates</h3>
            <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4" /> Add Template</Button>
          </div>
          <Card>
             <CardHeader>
               <CardTitle>Top 5 List Template</CardTitle>
               <CardDescription>Ideal for comparisons and countdowns.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="space-y-2">
                 <Label>Default Tone</Label>
                 <Input defaultValue="Energetic & Fast-Paced" />
               </div>
               <div className="space-y-2">
                 <Label>Structure (JSON format)</Label>
                 <Textarea className="font-mono text-sm min-h-[150px]" defaultValue={JSON.stringify(["Hook", "Intro", "Item 5", "Item 4", "Item 3", "Item 2", "Item 1", "Summary", "CTA"], null, 2)} />
               </div>
             </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
