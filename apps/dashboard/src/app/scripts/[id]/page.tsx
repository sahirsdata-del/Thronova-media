"use client";
import Image from "next/image";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, GripVertical, PlayCircle, Settings, Image as ImageIcon, Mic, Play, Volume2, Wand2, Check, X, RefreshCw, DownloadCloud } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockScenes = [
  { id: "s1", time: "00:00", duration: 4, purpose: "Hook", title: "Stop Scrolling" },
  { id: "s2", time: "00:04", duration: 8, purpose: "Intro", title: "Top 5 Phones" },
  { id: "s3", time: "00:12", duration: 15, purpose: "Item 5", title: "Poco X6 Neo" },
  { id: "s4", time: "00:27", duration: 15, purpose: "Item 4", title: "Moto G54" },
  { id: "s5", time: "00:42", duration: 10, purpose: "CTA", title: "Subscribe CTA" },
];

export default function ScriptEditorPage() {
  const _params = useParams();
  const [activeTab, setActiveTab] = useState("scenes");
  const [activeScene, setActiveScene] = useState(mockScenes[0]);

  return (
    <div className="flex-1 h-[calc(100vh-4rem)] flex flex-col -m-6 p-0 overflow-hidden bg-muted/20">
      {/* Top Bar */}
      <div className="flex-none p-4 border-b bg-background flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/scripts" className={buttonVariants({ variant: "ghost", size: "icon" })}><ArrowLeft className="h-4 w-4" /></Link>
          <div>
            <div className="flex items-center gap-3">
               <h2 className="text-xl font-bold tracking-tight">Top 5 Phones Under ₹20K</h2>
               <select className="bg-transparent border border-input rounded-md text-sm px-2 py-1 outline-none focus:ring-1 focus:ring-primary cursor-pointer text-muted-foreground">
                 <option value="v3">v3 - Current (Zod Validated)</option>
                 <option value="v2">v2 - 2 hours ago</option>
                 <option value="v1">v1 - Yesterday</option>
               </select>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-[10px]">Top 5 Template</Badge>
              Duration: 01:25
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline"><Settings className="mr-2 h-4 w-4" /> Script Settings</Button>
           <Button><Save className="mr-2 h-4 w-4" /> Save All</Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Timeline */}
        <div className="w-80 border-r bg-background flex flex-col">
          <div className="p-4 border-b bg-card">
            <h3 className="font-semibold flex items-center gap-2">
              <PlayCircle className="h-4 w-4" /> Timeline
            </h3>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-2">
              {mockScenes.map((scene) => (
                <div 
                  key={scene.id}
                  onClick={() => setActiveScene(scene)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer group transition-colors ${
                    activeScene.id === scene.id ? 'bg-primary/10 border-primary' : 'bg-card hover:bg-accent'
                  }`}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground opacity-50 group-hover:opacity-100 cursor-grab" />
                  <div className="w-12 text-xs font-mono text-muted-foreground">{scene.time}</div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-sm font-medium truncate">{scene.title}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">{scene.purpose} • {scene.duration}s</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 border-dashed">
              + Add Scene
            </Button>
          </ScrollArea>
        </div>

        {/* Right Panel: Editor */}
        <div className="flex-1 flex flex-col overflow-hidden bg-background">
          <div className="px-6 pt-4 border-b">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="script">Core Script</TabsTrigger>
                <TabsTrigger value="scenes">Scene Detail</TabsTrigger>
                <TabsTrigger value="captions">Captions</TabsTrigger>
                <TabsTrigger value="voice" className="text-purple-500 data-[state=active]:text-purple-500">Voice & Audio</TabsTrigger>
                <TabsTrigger value="metadata">Metadata & Thumbnails</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <ScrollArea className="flex-1 p-6">
            <Tabs value={activeTab} className="w-full">
              
              {/* CORE SCRIPT TAB */}
              <TabsContent value="script" className="mt-0 max-w-4xl space-y-6">
                <Card>
                  <CardHeader><CardTitle>Hook</CardTitle></CardHeader>
                  <CardContent><Textarea rows={2} defaultValue="Don't buy a phone before watching this!" /></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Intro</CardTitle></CardHeader>
                  <CardContent><Textarea rows={3} defaultValue="Welcome back to the channel. Today we're looking at the top 5 phones under 20K." /></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Call To Action (CTA)</CardTitle></CardHeader>
                  <CardContent><Textarea rows={2} defaultValue="Subscribe for more daily tech reviews!" /></CardContent>
                </Card>
              </TabsContent>

              {/* SCENE DETAIL TAB */}
              <TabsContent value="scenes" className="mt-0 max-w-4xl space-y-6">
                 <div className="flex items-center justify-between mb-4">
                   <h3 className="text-xl font-bold">{activeScene.time} - {activeScene.title}</h3>
                   <Badge variant="outline">{activeScene.purpose} ({activeScene.duration}s)</Badge>
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-6">
                    <Card className="md:col-span-2">
                      <CardHeader><CardTitle>Narration</CardTitle></CardHeader>
                      <CardContent><Textarea rows={3} defaultValue={`Narration for ${activeScene.title}...`} /></CardContent>
                    </Card>

                    <Card>
                      <CardHeader><CardTitle>On-Screen Text</CardTitle></CardHeader>
                      <CardContent><Textarea rows={2} defaultValue="Top 5 Phones Under ₹20K" /></CardContent>
                    </Card>

                    <Card>
                      <CardHeader><CardTitle className="flex justify-between items-center">Asset Requirements (DAM) <Badge>3 Assets</Badge></CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg bg-card/50 flex justify-between items-center group">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded bg-muted overflow-hidden flex-shrink-0 relative">
                                <Image fill src="https://picsum.photos/seed/asset1/100/100" alt="Asset" className="object-cover" />
                              </div>
                              <div>
                                <div className="font-semibold text-sm">Poco X6 Neo Front</div>
                                <div className="text-xs text-muted-foreground flex gap-2 mt-1">
                                  <Badge variant="secondary" className="text-[10px]">Unsplash</Badge>
                                  <span>IMAGE</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-500/10">
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-3 border rounded-lg bg-card/50 flex justify-between items-center border-orange-500/50">
                            <div>
                              <div className="font-semibold text-sm text-orange-500">Tech Background Loop</div>
                              <div className="text-xs text-muted-foreground flex gap-2 mt-1"><span>VIDEO</span> • <span>Background</span></div>
                            </div>
                            <Button size="sm" variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white">
                              <DownloadCloud className="mr-2 h-3 w-3" /> Auto-fetch
                            </Button>
                          </div>

                          <div className="p-3 border rounded-lg bg-card/50 flex justify-between items-center opacity-75">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded bg-muted flex items-center justify-center flex-shrink-0">
                                <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
                              </div>
                              <div>
                                <div className="font-semibold text-sm">Brand Logo</div>
                                <div className="text-xs text-muted-foreground flex gap-2 mt-1">
                                  <span>Brandfetch</span> • <span>Searching...</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader><CardTitle>Camera & Transitions</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2"><Label>Camera Style</Label><Input defaultValue="Fast Push In" /></div>
                        <div className="space-y-2"><Label>Transition In</Label><Input defaultValue="Zoom In" /></div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader><CardTitle>Animation Notes</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2"><Label>Notes</Label><Textarea rows={3} defaultValue="Scale up text with motion blur." /></div>
                      </CardContent>
                    </Card>
                 </div>
              </TabsContent>

              {/* CAPTIONS TAB */}
              <TabsContent value="captions" className="mt-0 max-w-4xl space-y-6">
                <Card>
                  <CardHeader><CardTitle>YouTube Description</CardTitle></CardHeader>
                  <CardContent><Textarea rows={5} defaultValue="Watch this before buying your next phone! Check out the links below..." /></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Instagram Caption</CardTitle></CardHeader>
                  <CardContent><Textarea rows={3} defaultValue="Top 5 Phones under ₹20K 🔥 Which one is your favorite? Link in bio! #tech #smartphones" /></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Pinned Comment</CardTitle></CardHeader>
                  <CardContent><Input defaultValue="Did we miss any phone? Let us know!" /></CardContent>
                </Card>
              </TabsContent>

              {/* METADATA TAB */}
              <TabsContent value="metadata" className="mt-0 max-w-4xl space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader><CardTitle>SEO Metadata</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2"><Label>SEO Title</Label><Input defaultValue="Top 5 Phones Under ₹20,000 (2026)" /></div>
                        <div className="space-y-2"><Label>Tags (Comma separated)</Label><Input defaultValue="tech, budget phone, review" /></div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-6">
                    <Card>
                      <CardHeader><CardTitle>Thumbnail Ideas</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 border rounded-lg bg-card space-y-2">
                          <div className="font-semibold flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Concept 1</div>
                          <div className="text-sm"><strong>Headline:</strong> STOP! Watch This First</div>
                          <div className="text-sm"><strong>Layout:</strong> Split screen with sad/happy face.</div>
                          <div className="text-sm"><strong>Colors:</strong> Red/Black High Contrast</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* VOICE & AUDIO TAB */}
              <TabsContent value="voice" className="mt-0 max-w-4xl space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2"><Mic className="h-5 w-5 text-purple-500" /> Voiceover Generation</h3>
                    <p className="text-sm text-muted-foreground mt-1">Generate TTS audio tracks for the selected scene.</p>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Wand2 className="mr-2 h-4 w-4" /> Generate Scene Voice
                  </Button>
                </div>

                <Card>
                  <CardHeader><CardTitle>Scene Narration Source</CardTitle></CardHeader>
                  <CardContent>
                    <div className="p-4 bg-muted/50 rounded-lg text-sm font-medium border">
                      {`"Narration for ${activeScene.title}..."`}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 shadow-md shadow-purple-500/5">
                  <CardHeader className="pb-3 border-b border-purple-500/10 bg-purple-500/5">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm flex items-center gap-2">
                        Generated Audio (Gemini TTS)
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Ready</Badge>
                      </CardTitle>
                      <span className="text-xs text-muted-foreground font-mono">00:04 / 00:04</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {/* Mock Waveform UI */}
                    <div className="w-full h-16 bg-muted/30 rounded-md border flex items-center justify-center overflow-hidden mb-4 relative">
                       {/* Playhead line */}
                       <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] z-10"></div>
                       {/* CSS Bars for fake waveform */}
                       <div className="flex items-center gap-[2px] h-full w-full px-1 opacity-60">
                         {Array.from({ length: 60 }).map((_, i) => (
                           <div key={i} className="flex-1 bg-purple-500/60 rounded-full" style={{ height: `${Math.max(10, (Math.sin(i * 123) * 45) + 55)}%` }}></div>
                         ))}
                       </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-500">
                          <Play className="h-4 w-4 ml-0.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Voice: <strong>en-US-Journey-F</strong></span>
                        <Button variant="link" className="h-auto p-0 text-xs">Download MP3</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
