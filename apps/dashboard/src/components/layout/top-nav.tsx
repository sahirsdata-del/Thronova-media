"use client";

import { Bell, Search, Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function TopNav() {
  const { setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 shadow-sm md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>

      <div className="flex flex-1 items-center gap-4 md:gap-8">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[336px]"
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          {/* Theme Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger 
              render={
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-destructive" />
            <span className="sr-only">Toggle notifications</span>
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger 
              render={
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image ?? ""} alt={session?.user?.name ?? "User"} />
                    <AvatarFallback>{session?.user?.name?.[0] ?? "U"}</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{session?.user?.name || "My Account"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{session?.user?.email || "user@example.com"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href="/profile" />}>Profile</DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/settings" />}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
