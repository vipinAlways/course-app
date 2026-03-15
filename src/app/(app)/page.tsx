import Image from "next/image";
import SkillCard from "~/components/SkillCard";
import { Button } from "~/components/ui/button";

import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <section className="relative w-full overflow-hidden pt-32 pb-20">
        {/* Modern glow effect behind the text */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[120px]" />

        <div className="mx-auto flex max-w-7xl flex-col items-center px- text-center">
          {/* Badge - subtle trend for 2026 */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
            </span>
            New: Generative AI Mastery Course
          </div>

          <h1 className=" relative z-10 font-bold text-7xl  tracking-tight text-balance text-white uppercase italic max-md:text-5xl">
            GEAR UP FOR <br />
            <span className="bg-linear-to-b from-indigo-400 to-indigo-700 bg-clip-text text-transparent">
              YOUR CAREER
            </span>   
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-balance text-zinc-400">
            In today's fast-paced world, staying ahead means taking bold steps.
            We equip you with the strategies and tools to turn goals into
            reality.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Button className="h-14 rounded-full bg-indigo-600 px-8 text-lg shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:scale-105 hover:bg-indigo-500">
              Start your journey
            </Button>

            {/* Visual Social Proof */}
            <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 p-2 pr-6 backdrop-blur-sm">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-neutral-950 bg-zinc-800"
                  />
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">1K+ Students</p>
                <p className="text-xs text-zinc-500">Joined this month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image - Placed below the text for a "Software Landing" feel */}
        <div className="mx-auto mt-16 max-w-5xl px-6">
          <div className="relative rounded-2xl border border-white/10 bg-zinc-900/50 p-2 shadow-2xl backdrop-blur-sm">
            <Image
              src="/bg-hero.png"
              height={600}
              width={1200}
              alt="Dashboard Preview"
              className="rounded-xl border border-white/5 object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-10">
        {" "}
        <div className="mx-auto flex max-w-7xl gap-16">
          {" "}
          <div className="max-w-1/4">
            {" "}
            <h1>
              Learn essential career <br /> and life skills{" "}
            </h1>{" "}
            <p>
              Course-App helps you build in-demand skills quickly and advance
              your career in an evolving job market{" "}
            </p>{" "}
          </div>{" "}
          <div className="flex w-full justify-evenly gap-3">
            {" "}
            <SkillCard
              skillTitle="generative ai"
              imageUrl="https://cms-images.udemycdn.com/96883mtakkm8/9Gj6y7OdRKhBmHkgJ9lWV/4589dcd6feb8009798924f70f515b731/generative-ai.png"
            />{" "}
            <SkillCard
              skillTitle="generative ai"
              imageUrl="https://cms-images.udemycdn.com/96883mtakkm8/9Gj6y7OdRKhBmHkgJ9lWV/4589dcd6feb8009798924f70f515b731/generative-ai.png"
            />{" "}
            <SkillCard
              skillTitle="generative ai"
              imageUrl="https://cms-images.udemycdn.com/96883mtakkm8/9Gj6y7OdRKhBmHkgJ9lWV/4589dcd6feb8009798924f70f515b731/generative-ai.png"
            />{" "}
          </div>{" "}
        </div>{" "}
      </section>
    </HydrateClient>
  );
}
