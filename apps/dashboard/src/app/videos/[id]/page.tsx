"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Play, Film, Music, Mic, Download, Layers } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockScenes = [
  { id: "s1", time: "00:00", title: "Hook" },
  { id: "s2", time: "00:04", title: "Intro" },
  { id: "s3", time: "00:12", title: "Poco X6" },
  { id: "s4", time: "00:27", title: "Moto G54" },
];

export default function VideoEditorPage() {
  const [activeTab, setActiveTab] = useState("theme");
  const [isRendering, setIsRendering] = useState(false);

  const handleRender = () => {
    setIsRendering(true);
    setTimeout(() => setIsRendering(false), 2000);
  };

  return (
    <div className="flex-1 h-[calc(100vh-4rem)] flex flex-col -m-6 p-0 overflow-hidden bg-zinc-950 text-zinc-50">
      
      {/* Top Bar */}
      <div className="flex-none p-4 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/renders" className={buttonVariants({ variant: "ghost", size: "icon", className: "hover:bg-zinc-800 text-zinc-300" })}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Top 5 Phones Under ₹20K <Badge variant="secondary" className="ml-2 bg-blue-900 text-blue-100">Draft</Badge></h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <Select defaultValue="1080x1920">
             <SelectTrigger className="w-32 h-9 bg-zinc-900 border-zinc-700">
               <SelectValue placeholder="Format" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="1080x1920">9:16 Shorts</SelectItem>
               <SelectItem value="1920x1080">16:9 Landscape</SelectItem>
               <SelectItem value="1080x1080">1:1 Square</SelectItem>
             </SelectContent>
           </Select>
           <Button 
             className="bg-blue-600 hover:bg-blue-700 text-white" 
             onClick={handleRender}
             disabled={isRendering}
           >
             {isRendering ? (
               "Rendering..."
             ) : (
               <><Download className="mr-2 h-4 w-4" /> Render Video</>
             )}
           </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Panel: Scenes & Assets */}
        <div className="w-64 border-r border-zinc-800 bg-zinc-900 flex flex-col">
          <div className="p-4 border-b border-zinc-800">
            <h3 className="font-semibold flex items-center gap-2 text-sm"><Layers className="h-4 w-4" /> Storyboard</h3>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {mockScenes.map((scene, i) => (
                <div key={scene.id} className={`p-3 rounded-md cursor-pointer text-sm transition-colors ${i === 1 ? 'bg-zinc-800 border-l-2 border-blue-500' : 'hover:bg-zinc-800/50'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-zinc-200">{scene.title}</span>
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">{scene.time}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Center Panel: Remotion Player & Timeline */}
        <div className="flex-1 flex flex-col min-w-0 bg-black">
          {/* Player Container */}
          <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
             <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Badge variant="outline" className="bg-black/50 text-white border-zinc-700 backdrop-blur">FPS: 30</Badge>
                <Badge variant="outline" className="bg-black/50 text-white border-zinc-700 backdrop-blur">1080x1920</Badge>
             </div>
             
             {/* Standard Video Player */}
             <div className="w-full max-w-[300px] h-[533px] bg-zinc-900 rounded-lg overflow-hidden shadow-2xl shadow-blue-900/20 border border-zinc-800 ring-1 ring-white/10 flex items-center justify-center">
               <video
                 className="w-full h-full object-cover"
                 controls
                 loop
                 autoPlay
                 muted
                 poster="/placeholder-thumbnail.jpg"
               >
                 <source src="/mock-render.mp4" type="video/mp4" />
                 Your browser does not support the video tag.
               </video>
             </div>
          </div>

          {/* Timeline Panel */}
          <div className="h-64 border-t border-zinc-800 bg-zinc-950 flex flex-col">
             <div className="p-2 border-b border-zinc-800 flex items-center gap-4 bg-zinc-900/50">
                <Button variant="ghost" size="icon" className="h-8 w-8"><Play className="h-4 w-4" /></Button>
                <div className="text-xs font-mono text-zinc-400">00:04.12 / 01:00.00</div>
             </div>
             <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {/* Tracks */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-xs text-zinc-500 flex items-center gap-2"><Film className="h-3 w-3" /> Video</div>
                    <div className="flex-1 h-10 bg-zinc-900 rounded border border-zinc-800 flex relative">
                      <div className="absolute left-0 w-1/5 h-full bg-blue-900/50 border-r border-blue-500/30 p-1 text-[10px] text-blue-200 truncate">Hook</div>
                      <div className="absolute left-[20%] w-2/5 h-full bg-blue-800/50 border-r border-blue-500/30 p-1 text-[10px] text-blue-200 truncate">Intro</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-xs text-zinc-500 flex items-center gap-2"><Mic className="h-3 w-3" /> Voice</div>
                    <div className="flex-1 h-8 bg-zinc-900 rounded border border-zinc-800 flex relative">
                       <div className="absolute left-[2%] w-[15%] h-full bg-green-900/50 border-r border-green-500/30 rounded-sm"></div>
                       <div className="absolute left-[22%] w-[35%] h-full bg-green-900/50 border-r border-green-500/30 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-xs text-zinc-500 flex items-center gap-2"><Music className="h-3 w-3" /> Audio</div>
                    <div className="flex-1 h-8 bg-zinc-900 rounded border border-zinc-800 flex relative">
                       <div className="absolute left-0 w-full h-full bg-purple-900/30 border-r border-purple-500/30"></div>
                    </div>
                  </div>
                </div>
             </ScrollArea>
          </div>
        </div>

        {/* Right Panel: Inspector */}
        <div className="w-80 border-l border-zinc-800 bg-zinc-950 flex flex-col">
          <div className="px-4 pt-3 border-b border-zinc-800">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-zinc-900 w-full">
                <TabsTrigger value="theme" className="flex-1">Theme</TabsTrigger>
                <TabsTrigger value="props" className="flex-1">Props</TabsTrigger>
                <TabsTrigger value="anim" className="flex-1">Anim</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <Tabs value={activeTab} className="w-full">
              
              <TabsContent value="theme" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-400">Global Theme</Label>
                    <Select defaultValue="dark-tech">
                      <SelectTrigger className="bg-zinc-900 border-zinc-700">
                        <SelectValue placeholder="Select Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark-tech">Dark Tech</SelectItem>
                        <SelectItem value="neon">Neon Glow</SelectItem>
                        <SelectItem value="minimal">Minimal Light</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-zinc-400">Colors</Label>
                    <div className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800">
                      <span className="text-sm">Primary</span>
                      <div className="w-6 h-6 rounded bg-blue-500 border border-zinc-700"></div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800">
                      <span className="text-sm">Secondary</span>
                      <div className="w-6 h-6 rounded bg-indigo-500 border border-zinc-700"></div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="props" className="mt-0 space-y-4">
                 <div className="p-3 bg-zinc-900 rounded-md border border-zinc-800">
                    <div className="text-xs text-zinc-500 mb-2 uppercase font-semibold">Active Scene: Intro</div>
                    
                    <div className="space-y-4 mt-4">
                       <div className="space-y-2">
                         <Label className="text-zinc-400">Title Text</Label>
                         <Input defaultValue="Top 5 Phones" className="bg-black border-zinc-700" />
                       </div>
                       <div className="space-y-2">
                         <Label className="text-zinc-400">Subtitle</Label>
                         <Input defaultValue="Under ₹20,000" className="bg-black border-zinc-700" />
                       </div>
                       <div className="space-y-2">
                         <Label className="text-zinc-400">Background Asset</Label>
                         <div className="h-20 bg-zinc-800 rounded flex items-center justify-center border border-dashed border-zinc-600 text-zinc-500 text-xs cursor-pointer hover:bg-zinc-700 transition">
                            + Click to replace
                         </div>
                       </div>
                    </div>
                 </div>
              </TabsContent>

              <TabsContent value="anim" className="mt-0 space-y-4">
                <div className="space-y-2">
                  <Label className="text-zinc-400">Transition In</Label>
                  <Select defaultValue="fade">
                    <SelectTrigger className="bg-zinc-900 border-zinc-700">
                      <SelectValue placeholder="Transition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fade">Cross Fade</SelectItem>
                      <SelectItem value="swipe">Swipe Left</SelectItem>
                      <SelectItem value="zoom">Zoom In</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-400">Text Animation</Label>
                  <Select defaultValue="blur">
                    <SelectTrigger className="bg-zinc-900 border-zinc-700">
                      <SelectValue placeholder="Animation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blur">Blur Reveal</SelectItem>
                      <SelectItem value="typewriter">Typewriter</SelectItem>
                      <SelectItem value="slide">Slide Up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

            </Tabs>
          </ScrollArea>
        </div>

      </div>
    </div>
  );
}
