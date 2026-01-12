"use client";

import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export function SidebarShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar open={open} />
      <main className="relative flex min-h-screen flex-1">
      <SidebarTrigger className="sticky top-1"/>
        {children}</main>
    </SidebarProvider>
  );
}
