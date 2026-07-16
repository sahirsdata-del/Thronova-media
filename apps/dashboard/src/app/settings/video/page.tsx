"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save, Palette, Video, Move } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const themes = [
  { id: "1", name: "Dark Tech", primary: "#3b82f6", secondary: "#1d4ed8", font: "Inter", bg: "Grid" },
  { id: "2", name: "Neon Glow", primary: "#ec4899", secondary: "#8b5cf6", font: "Roboto", bg: "Dark" },
  { id: "3", name: "Minimal", primary: "#000000", secondary: "#ffffff", font: "San Francisco", bg: "Solid" },
];

const renderPresets = [
  { id: "1", name: "YouTube Shorts", resolution: "1080x1920", fps: 60, platform: "YouTube" },
  { id: "2", name: "Standard Landscape", resolution: "1920x1080", fps: 30, platform: "Universal" },
];

export default function VideoSettingsPage() {
  return (
    <div className="flex-1 space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Video Engine Settings</h2>
          <p className="text-muted-foreground">
            Configure global themes, animation presets, and export formats.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button><Save className="mr-2 h-4 w-4" /> Save Configuration</Button>
        </div>
      </div>

      <Tabs defaultValue="themes" className="w-full">
        <TabsList>
          <TabsTrigger value="themes"><Palette className="mr-2 h-4 w-4" /> Brand Themes</TabsTrigger>
          <TabsTrigger value="presets"><Video className="mr-2 h-4 w-4" /> Render Presets</TabsTrigger>
          <TabsTrigger value="animations"><Move className="mr-2 h-4 w-4" /> Animations</TabsTrigger>
        </TabsList>
        
        {/* BRAND THEMES */}
        <TabsContent value="themes" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Global Themes</h3>
            <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4" /> Create Theme</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => (
              <Card key={theme.id} className="relative group">
                <CardHeader className="pb-2">
                   <div className="flex justify-between items-center">
                     <CardTitle className="text-lg">{theme.name}</CardTitle>
                     <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Trash2 className="h-4 w-4 text-destructive" />
                     </Button>
                   </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full border border-zinc-700" style={{ backgroundColor: theme.primary }}></div>
                     <div className="w-8 h-8 rounded-full border border-zinc-700" style={{ backgroundColor: theme.secondary }}></div>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>Font: <span className="font-medium text-foreground">{theme.font}</span></div>
                    <div>Background: <span className="font-medium text-foreground">{theme.bg}</span></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* RENDER PRESETS */}
        <TabsContent value="presets" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Export Presets</h3>
            <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4" /> Add Preset</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {renderPresets.map((preset) => (
               <Card key={preset.id}>
                 <CardContent className="pt-6 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg">{preset.name}</h4>
                      <div className="text-muted-foreground text-sm flex gap-2 mt-1">
                         <Badge variant="outline">{preset.resolution}</Badge>
                         <Badge variant="outline">{preset.fps} FPS</Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                       <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                 </CardContent>
               </Card>
            ))}
          </div>
        </TabsContent>

        {/* ANIMATIONS */}
        <TabsContent value="animations" className="mt-6 space-y-4">
          <Card>
             <CardHeader>
               <CardTitle>Animation Library</CardTitle>
               <CardDescription>Manage reusable Framer Motion / Remotion animation configs.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 border rounded-lg bg-card">
                   <div className="font-semibold mb-2">Pop Reveal</div>
                   <div className="text-sm font-mono text-muted-foreground bg-zinc-950 p-2 rounded">
                     {`{ type: "spring", stiffness: 200, damping: 10 }`}
                   </div>
                 </div>
                 <div className="p-4 border rounded-lg bg-card">
                   <div className="font-semibold mb-2">Smooth Slide</div>
                   <div className="text-sm font-mono text-muted-foreground bg-zinc-950 p-2 rounded">
                     {`{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }`}
                   </div>
                 </div>
               </div>
             </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
