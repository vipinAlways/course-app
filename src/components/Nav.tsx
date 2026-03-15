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
    // Base styles: always sticky and centered
    "sticky z-50 mx-auto flex items-center justify-center transition-all duration-500 ease-in-out",
    
    scrolled
      ? "top-4 h-14 w-[90%] max-w-7xl rounded-full border border-white/10 bg-zinc-900/70 shadow-2xl backdrop-blur-xl px-4"
      : "top-0 h-20 w-full border-transparent bg-transparent px-8"
  )}
>
  {/* Rest of your navbar content */}

      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-6">
        <Link href="/" className={cn(scrolled && "hidden")}>
          <Image
            src="https://www.itsvipin.me/icon.png?5fdec058d2724ea2"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-md transition-all duration-300"
          />
        </Link>

        <div className="flex w-96 items-center gap-4 rounded-lg bg-black/50 px-3 py-0.5 text-zinc-100 ring-zinc-300 focus-within:ring-1">
          <SearchIcon className="size-6" />
          <Input
            placeholder="Search"
            className="w-full border-0 focus-visible:ring-0 dark:bg-transparent"
          />
        </div>

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
          })}
        </nav>
      </div>
    </header>
  );
}
