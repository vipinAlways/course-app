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
        <DialogTrigger className="group flex w-96 items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/70 px-4 py-2.5 text-zinc-300 shadow-sm backdrop-blur transition-all duration-200 hover:bg-zinc-800/80 hover:text-white hover:shadow-md focus:ring-2 focus:ring-zinc-400/40 focus:outline-none active:scale-[0.98]">
          <SearchIcon className="size-5 text-zinc-400 transition-colors group-hover:text-white" />

          <span className="flex-1 text-start text-sm tracking-wide">
            Search anything...
          </span>

          {/* Optional shortcut hint */}
          {/* <kbd className="hidden rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400 sm:inline-block">
            ⌘K
          </kbd> */}
        </DialogTrigger>
        <DialogContent className="min-h-96 space-y-0 gap-0 max-w-4xl border-2 bg-black/80 py-10 backdrop-blur-2xl grid-cols-[repeat(1, minmax(0))]">
          <DialogHeader className=" h-fit m-0">
            <DialogTitle />
            <div className="group flex items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/70 text-zinc-300 shadow-sm backdrop-blur transition-all duration-200 focus-within:ring-2 focus-within:ring-zinc-400/40 hover:bg-zinc-800/80 hover:shadow-md">
              <SearchIcon className="absolute left-4 size-5 text-zinc-400 transition-colors group-focus-within:text-white group-hover:text-white" />

              <Input
                placeholder="Search..."
                className="ml-10 flex-1 border-none bg-transparent p-2 text-sm text-zinc-100 shadow-none placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:outline-none"
              />

              {/* Optional shortcut hint */}
              {/* <kbd className="hidden rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400 sm:inline-block">
                  ⌘K
                </kbd> */}
            </div>
          </DialogHeader>

          <div className="flex flex-col h-fit justify-start">
            <div className="flex h-10 justify-between">
              <h3 className="text-xl">this is a example </h3>
              <Image
                src="https://imgs.search.brave.com/jqclAzxPE3BMNGgnaHh9w7tt-jDF-BjzmK4Ep9o9O24/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGQU1p/ckNzWDQvNC8wLzE2/MDB3L2NhbnZhLXB1/cnBsZS1jcmVhdGl2/ZS1saXZlc3RyZWFt/LXlvdXR1YmUtdGh1/bWJuYWlsLWpXNVEx/cHNZRWFjLmpwZw"
                alt="example"
                height={36}
                width={64}
                className="aspect-video rounded-lg"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
