import { SidebarInset } from "~/components/ui/sidebar";

import { Cards } from "./components/Card";
import { ChartAreaInteractive } from "~/components/ChartAreaInteractive";
import {  buttonVariants } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";

export default function Page() {
  return (
    <>
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <h1 className="text-base font-medium">Documents</h1>
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/dashboard/create-course"
              className={cn(
                "text-sm font-medium",
                "hidden sm:flex",
                buttonVariants({ variant: "ghost", size: "sm" }),
              )}
            >
              <PlusIcon /> Create
            </Link>
          </div>
        </div>
      </header>
      <SidebarInset className="bg-transparent">
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Cards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
