"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Save, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const mockTemplates = [
  {
    id: "1",
    name: "Tech Review Standard",
    purpose: "Extract specs, pros, cons, and summary",
    systemPrompt: "You are an expert tech reviewer for a major publication...",
    userPrompt: "Analyze the following device: {{device_name}}\nContext: {{context}}",
    isActive: true,
  },
  {
    id: "2",
    name: "Top 5 Comparison",
    purpose: "Compare multiple items and rank them",
    systemPrompt: "You are a specialized data analyst and reviewer...",
    userPrompt: "Compare these items: {{items}}\nCriteria: {{criteria}}",
    isActive: false,
  }
];

export default function PromptTemplatesPage() {
  const [activeTemplate, setActiveTemplate] = useState(mockTemplates[0]);

  return (
    <div className="flex-1 space-y-6 max-w-6xl mx-auto pb-10 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between space-y-2 flex-none">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Prompt Library</h2>
          <p className="text-muted-foreground">
            Manage system and user prompts used by the Research Engine.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline"><Plus className="mr-2 h-4 w-4" /> New Template</Button>
          <Button><Save className="mr-2 h-4 w-4" /> Save Template</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Template List */}
        <Card className="flex flex-col overflow-hidden">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-lg">Templates</CardTitle>
          </CardHeader>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {mockTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setActiveTemplate(template)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    activeTemplate.id === template.id ? 'bg-primary/10 border-primary' : 'hover:bg-accent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold">{template.name}</span>
                    {template.isActive && <Badge variant="secondary" className="text-[10px]">Active</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{template.purpose}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Template Editor */}
        <Card className="md:col-span-2 flex flex-col overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <div>
              <CardTitle>Edit Template</CardTitle>
              <CardDescription>Use {'{{variable_name}}'} syntax for dynamic data.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <ScrollArea className="flex-1">
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Template Name</Label>
                  <Input defaultValue={activeTemplate.name} key={`name-${activeTemplate.id}`} />
                </div>
                <div className="space-y-2">
                  <Label>Purpose</Label>
                  <Input defaultValue={activeTemplate.purpose} key={`purpose-${activeTemplate.id}`} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>System Prompt</Label>
                  <Badge variant="outline" className="text-xs font-mono bg-muted">system</Badge>
                </div>
                <Textarea 
                  className="font-mono text-sm min-h-[150px]" 
                  defaultValue={activeTemplate.systemPrompt} 
                  key={`sys-${activeTemplate.id}`}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>User Prompt</Label>
                  <Badge variant="outline" className="text-xs font-mono bg-muted">user</Badge>
                </div>
                <Textarea 
                  className="font-mono text-sm min-h-[150px]" 
                  defaultValue={activeTemplate.userPrompt} 
                  key={`usr-${activeTemplate.id}`}
                />
              </div>
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
