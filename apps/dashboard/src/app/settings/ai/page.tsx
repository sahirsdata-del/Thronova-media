"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save, Key } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function AIProviderSettingsPage() {
  return (
    <div className="flex-1 space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Provider Settings</h2>
          <p className="text-muted-foreground">
            Configure the language model used for the Research Engine.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Save className="mr-2 h-4 w-4" /> Save Configuration
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Provider</CardTitle>
          <CardDescription>Select the AI service to handle your research jobs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Provider</Label>
              <Select defaultValue="GEMINI">
                <SelectTrigger>
                  <SelectValue placeholder="Select Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GEMINI">Google Gemini</SelectItem>
                  <SelectItem value="OPENAI">OpenAI</SelectItem>
                  <SelectItem value="CLAUDE">Anthropic Claude</SelectItem>
                  <SelectItem value="LOCAL">Local LLM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Model</Label>
              <Select defaultValue="gemini-1.5-pro">
                <SelectTrigger>
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                  <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>API Key</Label>
            <div className="flex gap-2">
              <Input type="password" value="************************" readOnly className="font-mono bg-muted" />
              <Button variant="outline"><Key className="mr-2 h-4 w-4" /> Edit</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Model Parameters</CardTitle>
          <CardDescription>Fine-tune the output behavior of the LLM.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Temperature</Label>
              <span className="text-sm text-muted-foreground">0.7</span>
            </div>
            <Slider defaultValue={[0.7]} max={2} step={0.1} />
            <p className="text-xs text-muted-foreground">
              Higher values make the output more random, while lower values make it more focused and deterministic.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Max Tokens</Label>
              <span className="text-sm text-muted-foreground">4096</span>
            </div>
            <Slider defaultValue={[4096]} max={8192} step={128} />
            <p className="text-xs text-muted-foreground">
              The maximum number of tokens to generate in the completion.
            </p>
          </div>

          <div className="space-y-2 w-1/2">
            <Label>Default Language</Label>
            <Select defaultValue="English">
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
