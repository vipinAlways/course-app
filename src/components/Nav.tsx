"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { Input } from "./ui/input";
import { Book, LogIn, LogOut, SearchIcon, User2Icon } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
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
      href: session ? "/api/auth/logout" : "/auth/login",
      icon: session ? LogOut : LogIn,
    },
  ];

  return (
    <header
      className={cn(
        "fixed left-1/2 z-50 w-full -translate-x-1/2 text-zinc-100 transition-all duration-300",
        scrolled
          ? "top-3 h-14 w-4/5 rounded-lg bg-white/20 shadow-md backdrop-blur-md"
          : "top-0 h-20 bg-transparent",
      )}
    >
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
