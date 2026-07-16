"use client";

import { Home, Lightbulb, Search, FileText, Mic, Image as ImageIcon, LayoutTemplate, MonitorPlay, UploadCloud, Video, BarChart2, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Content Ideas", url: "/ideas", icon: Lightbulb },
  { title: "Research", url: "/research", icon: Search },
  { title: "Scripts", url: "/scripts", icon: FileText },
  { title: "Voiceovers", url: "/voiceovers", icon: Mic },
  { title: "Assets", url: "/assets", icon: ImageIcon },
  { title: "Templates", url: "/templates", icon: LayoutTemplate },
  { title: "Render Queue", url: "/renders", icon: MonitorPlay },
  { title: "Upload Queue", url: "/uploads", icon: UploadCloud },
  { title: "Published Videos", url: "/published", icon: Video },
  { title: "Analytics", url: "/analytics", icon: BarChart2 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Video className="size-5" />
          </div>
          <span className="truncate font-semibold group-data-[collapsible=icon]:hidden">
            Content Factory
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={pathname === item.url}
                    render={
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
