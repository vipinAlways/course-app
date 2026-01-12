import {
  Book,
  Grid2x2,
  LampDeskIcon,
  Speaker,
  StickerIcon,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";

const dashboardLinks = [
  {
    name: "Courses",
    href: "/dashboard/courses",
    iconset: Book,
  },
  {
    name: "Students",
    href: "/dashboard/students",
    iconset: Users,
  },
  {
    name: "Teachers",
    href: "/dashboard/teachers",
    iconset: Users,
  },
  {
    name: "Classes",
    href: "/dashboard/classes",
    iconset: LampDeskIcon,
  },
  {
    name: "Grades",
    href: "/dashboard/grades",
    iconset: StickerIcon,
  },
  {
    name: "Announcements",
    href: "/dashboard/announcements",
    iconset: Speaker,
  },
  {
    name: "Assignments",
    href: "/dashboard/assignments",
    iconset: Grid2x2,
  },
];

export function AppSidebar({ open }: { open: boolean }) {
  console.log({ open });
  return (
    <Sidebar
      className={cn("blur-2x w-60 bg-white/10 backdrop:backdrop-blur-2xl")}
      collapsible="icon"
    >
      <SidebarHeader className="mt-3 border-b-2">
        {open ? (
          <h1 className="text-xl font-semibold">CourseApp</h1>
        ) : (
          <Image
            src="https://www.itsvipin.me/icon.png?5fdec058d2724ea2"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-md transition-all duration-300"
          />
        )}
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarGroup />
        <ul className="space-y-4">
          {dashboardLinks.map((link) => {
            const Icon = link.iconset;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className=" text-lg"
                >
                  {open ? (
                    <span className="flex items-center gap-2">
                      {" "}
                      {Icon && <Icon className="size-4" />} {link.name}
                    </span>
                  ) : (
                    <Icon className="size-6 mx-auto" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
