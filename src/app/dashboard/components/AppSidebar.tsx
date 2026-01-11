"use client";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";

export function AppSidebar({ open }: { open: boolean }) {
  return (
    <Sidebar className={cn("blur-2x bg-white/10 backdrop:backdrop-blur-2xl")}>
      <SidebarHeader />
      <SidebarContent className="">
        <SidebarGroup />
          
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
