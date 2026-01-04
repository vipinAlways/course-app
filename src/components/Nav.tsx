"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-1/2 z-50 w-full -translate-x-1/2 text-zinc-100 transition-all duration-300",
        scrolled
          ? "top-3 h-14 w-4/5 rounded-lg bg-white/20 shadow-md backdrop-blur-md"
          : "top-0 h-20 bg-transparent",
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className={cn(scrolled && "hidden")}>
          {/* //TODO: Add logo here <Image
            src="/logo.svg"
            alt="Logo"
            width={scrolled ? 90 : 130}
            height={40}
            className="transition-all duration-300"
          /> */}
        </Link>

        <div className="flex items-center gap-4 rounded-lg bg-black/50 px-3 py-0.5 text-zinc-50">
          <SearchIcon className="size-6" />
          <Input placeholder="Search" className="border-0 text-sm" />
        </div>

        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/auth/login">Login</Link>
          <Link href="/course">Courses</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
