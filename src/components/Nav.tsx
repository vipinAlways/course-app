"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { Input } from "./ui/input";
import {
  Book,
  LayoutDashboard,
  LogIn,
  LogOut,
  SearchIcon,
  User2Icon,
} from "lucide-react";
import { buttonVariants } from "./ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { api } from "~/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useDebounce } from "~/hooks/use-debounce";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

  const role = session?.user.role;

  useEffect(() => {
    const onScroll = () => {
      setScrolled((prev) => {
        if (!prev && window.scrollY > 90) return true;
        if (prev && window.scrollY < 60) return false;
        return prev;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    {
      name: "Profile",
      href: "/profile",
      icon: User2Icon,
    },
    {
      name: "Courses",
      href: "/courses",
      icon: Book,
    },
    {
      name: session ? "Logout" : "Login",
      href: session ? "/api/auth/signout" : "/auth/login",
      icon: session ? LogOut : LogIn,
    },
  ];
  if (status === "loading") {
    return null;
  }
  return (
    <header
      className={cn(
        "sticky z-50 mx-auto flex max-w-7xl items-center justify-center transition-all duration-500 ease-in-out",

        scrolled
          ? "top-2 h-14 w-[90%] rounded-full border border-white/10 bg-zinc-900/70 px-4 shadow-2xl backdrop-blur-xl"
          : "top-0 h-20 w-full border-transparent bg-transparent",
      )}
    >
      {" "}
      <div className="mx-auto flex h-full w-full items-center justify-between gap-3">
        <Link href="/" className={cn(scrolled && "hidden")}>
          <Image
            src="https://www.itsvipin.me/icon.png?5fdec058d2724ea2"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-md transition-all duration-300"
          />
        </Link>

        <Search />

        <nav className="flex gap-2 text-sm font-medium">
          {role === "CREATOR" && (
            <Link
              href={"/dashboard"}
              className={cn(buttonVariants({ variant: "link" }))}
              target="_blank"
            >
              <LayoutDashboard />
              DashBoard
            </Link>
          )}
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <Link
                key={i}
                href={link.href}
                className={cn(buttonVariants({ variant: "link" }))}
              >
                {Icon && <Icon className="mr-2 inline-block" />}
                {link.name}
              </Link>
            );
            ``;
          })}
        </nav>
      </div>
    </header>
  );
}

function Search() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const { data } = api.course.getAll.useQuery(
    { search: debouncedSearch },
    { enabled: !!debouncedSearch },
  );

  return (
    <div className="">
      <Dialog>
        <DialogTrigger className="group flex w-full max-w-md items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-zinc-300 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white">
          <div className="flex size-9 items-center justify-center rounded-xl bg-white/5 transition group-hover:bg-white/8">
            <SearchIcon className="size-4 text-zinc-400 transition-colors group-hover:text-white" />
          </div>

          <div className="flex flex-1 flex-col items-start">
            <span className="text-xs text-zinc-500">
              Courses, creators, AI tools & more
            </span>
          </div>

          <kbd className="hidden rounded-lg border border-white/10 bg-white/4 px-2 py-1 text-[10px] text-zinc-500 sm:block">
            ⌘ K
          </kbd>
        </DialogTrigger>

        <DialogContent className="overflow-hidden border border-white/10 bg-[#070B14]/95 px-2 py-4 shadow-2xl backdrop-blur-3xl sm:max-w-2xl">
          {/* Glow */}
          <div className="absolute top-0 left-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl" />

          {/* Compact Header */}
          <DialogHeader className="relative border-b border-white/10 px-5 py-4">
            <DialogTitle className="sr-only">Search</DialogTitle>

            <div className="group relative">
              <SearchIcon className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white" />

              <Input
                placeholder="Search courses, creators, topics..."
                className="h-11 rounded-xl border border-white/10 bg-white/4 pl-11 text-sm text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-blue-500/40"
              />
            </div>
          </DialogHeader>

          {/* Results */}
          <div className="relative max-h-80 overflow-y-auto p-4">
            <div className="space-y-3">
              {/* Result Item */}
              <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 p-3 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/5">
                <Image
                  src="https://imgs.search.brave.com/jqclAzxPE3BMNGgnaHh9w7tt-jDF-BjzmK4Ep9o9O24/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGQU1p/ckNzWDQvNC8wLzE2/MDB3L2NhbnZhLXB1/cnBsZS1jcmVhdGl2/ZS1saXZlc3RyZWFt/LXlvdXR1YmUtdGh1/bWJuYWlsLWpXNVEx/cHNZRWFjLmpwZw"
                  alt="course"
                  width={90}
                  height={60}
                  className="aspect-video rounded-lg object-cover"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-300">
                      AI
                    </span>

                    <span className="text-[11px] text-zinc-500">6h 24m</span>
                  </div>

                  <h3 className="mt-1 truncate text-sm font-semibold text-white transition-colors group-hover:text-blue-300">
                    Generative AI Mastery Course
                  </h3>

                  <p className="mt-1 line-clamp-1 text-xs text-zinc-400">
                    Learn prompting, workflows, automation, and AI integrations.
                  </p>
                </div>
              </div>

              {/* Result Item */}
              {/* <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.05]">
                <Image
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600"
                  alt="course"
                  width={90}
                  height={60}
                  className="aspect-video rounded-lg object-cover"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium text-purple-300">
                      Next.js
                    </span>

                    <span className="text-[11px] text-zinc-500">8h 10m</span>
                  </div>

                  <h3 className="mt-1 truncate text-sm font-semibold text-white transition-colors group-hover:text-purple-300">
                    Advanced Next.js Architecture
                  </h3>

                  <p className="mt-1 line-clamp-1 text-xs text-zinc-400">
                    Build scalable full-stack apps with Prisma and auth systems.
                  </p>
                </div>

                <button className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-purple-500">
                  View
                </button>
              </div> */}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
