"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Folder, Image as ImageIcon, Video, Music, Type, Plus, UploadCloud, Info, Trash2, Heart, Download } from "lucide-react";

const mockAssets = [
  { id: "1", title: "Poco X6 Neo Front", type: "IMAGE", res: "1080x1920", size: "1.5 MB", date: "Oct 12", color: "#3b82f6" },
  { id: "2", title: "Tech Background Loop", type: "VIDEO", res: "4K", size: "125 MB", date: "Oct 11", color: "#111827" },
  { id: "3", title: "Camera Icon SVG", type: "SVG", res: "Vector", size: "12 KB", date: "Oct 10", color: "#ffffff" },
  { id: "4", title: "Whoosh Transition", type: "AUDIO", res: "320kbps", size: "1.2 MB", date: "Oct 10", color: null },
  { id: "5", title: "Moto G54 Back", type: "IMAGE", res: "1080x1920", size: "2.1 MB", date: "Oct 09", color: "#10b981" },
  { id: "6", title: "Gaming Setup B-Roll", type: "VIDEO", res: "1080p", size: "45 MB", date: "Oct 08", color: "#8b5cf6" },
];

export default function AssetDashboardPage() {
  const [activeAsset, setActiveAsset] = useState(mockAssets[0]);

  return (
    <div className="flex-1 h-[calc(100vh-4rem)] flex flex-col -m-6 p-0 overflow-hidden bg-background">
      
      {/* Top Bar */}
      <div className="flex-none p-4 border-b bg-background flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Media Library</h2>
          <p className="text-sm text-muted-foreground">Manage and organize all production assets.</p>
        </div>
        <div className="flex gap-3 items-center w-full max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search assets, tags, or metadata..." className="pl-8 bg-muted/50" />
          </div>
          <Button className="bg-primary hover:bg-primary/90">
             <UploadCloud className="mr-2 h-4 w-4" /> Upload
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar */}
        <div className="w-64 border-r flex flex-col bg-muted/10">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Library</h4>
                <Button variant="ghost" className="w-full justify-start h-8 px-2"><ImageIcon className="mr-2 h-4 w-4" /> Images</Button>
                <Button variant="ghost" className="w-full justify-start h-8 px-2"><Video className="mr-2 h-4 w-4" /> Videos</Button>
                <Button variant="ghost" className="w-full justify-start h-8 px-2"><Music className="mr-2 h-4 w-4" /> Audio</Button>
                <Button variant="ghost" className="w-full justify-start h-8 px-2"><Type className="mr-2 h-4 w-4" /> Fonts & Vectors</Button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Collections</h4>
                  <Button variant="ghost" size="icon" className="h-4 w-4"><Plus className="h-3 w-3" /></Button>
                </div>
                <Button variant="ghost" className="w-full justify-start h-8 px-2"><Folder className="mr-2 h-4 w-4 text-blue-400" /> Phone Reviews</Button>
                <Button variant="ghost" className="w-full justify-start h-8 px-2"><Folder className="mr-2 h-4 w-4 text-emerald-400" /> AI Tools</Button>
                <Button variant="ghost" className="w-full justify-start h-8 px-2"><Folder className="mr-2 h-4 w-4 text-orange-400" /> Branding</Button>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="cursor-pointer">#background</Badge>
                  <Badge variant="secondary" className="cursor-pointer">#b-roll</Badge>
                  <Badge variant="secondary" className="cursor-pointer">#samsung</Badge>
                  <Badge variant="secondary" className="cursor-pointer">#icon</Badge>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Main Grid */}
        <div className="flex-1 bg-zinc-950/5 flex flex-col min-w-0">
          <div className="p-4 border-b bg-background/50 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Showing 142 Assets</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Filter</Button>
              <Button variant="outline" size="sm">Sort by: Newest</Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {mockAssets.map(asset => (
                 <div 
                   key={asset.id} 
                   onClick={() => setActiveAsset(asset)}
                   className={`relative group rounded-lg overflow-hidden border transition-all cursor-pointer ${
                     activeAsset.id === asset.id ? 'ring-2 ring-primary border-transparent' : 'hover:border-primary/50 bg-card'
                   }`}
                 >
                   {/* Preview Placeholder */}
                   <div className="aspect-square bg-muted flex items-center justify-center text-muted-foreground relative">
                     {asset.type === 'IMAGE' && <ImageIcon className="h-8 w-8 opacity-20" />}
                     {asset.type === 'VIDEO' && <Video className="h-8 w-8 opacity-20" />}
                     {asset.type === 'AUDIO' && <Music className="h-8 w-8 opacity-20" />}
                     {asset.type === 'SVG' && <Type className="h-8 w-8 opacity-20" />}
                     
                     {asset.color && (
                       <div className="absolute top-2 right-2 w-3 h-3 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: asset.color }}></div>
                     )}
                   </div>
                   
                   <div className="p-3">
                     <div className="text-sm font-medium truncate" title={asset.title}>{asset.title}</div>
                     <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                       <span>{asset.type}</span>
                       <span>{asset.size}</span>
                     </div>
                   </div>
                 </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Inspector */}
        <div className="w-80 border-l bg-background flex flex-col">
          <div className="p-4 border-b flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">Asset Details</span>
          </div>
          
          <ScrollArea className="flex-1">
            {activeAsset ? (
              <div className="p-6 space-y-6">
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center border">
                   <span className="text-muted-foreground text-xs uppercase tracking-widest">{activeAsset.type} PREVIEW</span>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg leading-tight">{activeAsset.title}</h3>
                  <div className="flex gap-2 mt-2">
                    <Badge>{activeAsset.type}</Badge>
                    <Badge variant="outline">{activeAsset.date}</Badge>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Resolution</span>
                    <span className="font-medium">{activeAsset.res}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">File Size</span>
                    <span className="font-medium">{activeAsset.size}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Usage</span>
                    <span className="font-medium">4 Scenes</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">License</span>
                    <span className="font-medium text-emerald-500">Commercial (Royalty Free)</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Button className="w-full"><Download className="mr-2 h-4 w-4" /> Download Original</Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1"><Heart className="h-4 w-4" /></Button>
                    <Button variant="outline" className="flex-1 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm p-6 text-center">
                Select an asset to view its details and metadata.
              </div>
            )}
          </ScrollArea>
        </div>

      </div>
    </div>
  );
}
