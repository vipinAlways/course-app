import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <section className=" w-full pt-30">
        <div className="mx-auto flex max-w-7xl gap-16 px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-1/5 opacity-60">
            <Image
              src={"/bg-hero.png"}
              height={500}
              width={900}
              priority
              alt="pirctue"
              className="h-120 object-contain"
            />
          </div>
          <div className="flex max-w-5xl flex-col gap-2">
            <h1 className="relative z-10 text-center text-8xl leading-[1.15] font-black text-balance max-md:text-4xl">
              GEAR UP FOR CAREER
            </h1>
            <p className="max-h-full text-lg tracking-tighter text-zinc-500">
              In today's fast-paced world, staying ahead means taking bold steps
              to expand, innovate, and lead. We're here to equip you with the
              right strategies, insights, and tools to drive growth and turn
              your business goals into reality. Let's transform your vision into
              measurable success
            </p>
            <div className="mt-10 flex w-full items-center justify-center gap-5">
              <Button className="py-5 text-xl">Start your journey </Button>

              <div>
                <h1 className="text-3xl font-semibold">10+</h1>
                <h3 className="text-lg text-zinc-500">Courses</h3>
              </div>
              <div>
                <h1 className="text-3xl font-semibold">1K+</h1>
                <h3 className="text-lg text-zinc-500">Students Enrolled</h3>
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <ul>
            <li>
              <h2>Advanced Suspension System</h2>
              <p>
                {" "}
                Advanced Suspension System Smooth out bumps and jolts with a
                front fork.
              </p>
            </li>
            <li>
              <h2>Long-Lasting Battery </h2>
              <p>
                {" "}
                ALong-Lasting Battery (for e-bike) Cruise farther with a
                powerful lithium-ion battery offering up to 80 km of ride time
                on a single charge.
              </p>
            </li>
            <li>
              <h2> Lightweight Alloy Frame </h2>
              <p>
                {" "}
                Crafted with high-grade aluminum, our frame balances strength
                and speed while keeping your ride agile and responsive.
              </p>
            </li>
          </ul>
        </div> */}
      </section>
    </HydrateClient>
  );
}
