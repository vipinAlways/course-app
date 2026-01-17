"use client";

import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { Input } from "~/components/ui/input";
import { AppSidebar } from "./AppSidebar";

export function SidebarShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider
      open={open}
      onOpenChange={setOpen}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <main className="relative z-10 flex min-h-screen flex-1 flex-col gap-10 bg-transparent">
        <div className="sticky top-0 z-50 flex w-full items-center justify-between px-3 py-2">
          <div className="m-1 flex w-full items-center gap-2 px-3">
            <SidebarTrigger className="" />{" "}
            <Input
              name="dashboard-Search"
              type="search"
              className=""
              placeholder="Search"
            />
           
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
