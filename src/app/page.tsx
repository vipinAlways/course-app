import Image from "next/image";
import Link from "next/link";

import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <section className="h-[90vh] pt-30">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 sm:px-6 lg:px-8">
          <h1 className="relative z-10 text-center text-9xl leading-[1.15] font-black text-balance max-md:text-4xl">
            GEAR UP FOR FREEDOM
          </h1>

          <Image
            src={
              "https://img.freepik.com/free-psd/two-black-books-stacked-together-studio-shot_632498-25446.jpg?ga=GA1.1.1737923408.1766146549&semt=ais_hybrid&w=740&q=80"
            }
            height={160}
            width={200}
            alt="pirctue"
          />
        </div>
        <div>
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
              <p>   Crafted with high-grade aluminum, our frame
        balances strength and speed while keeping your ride agile and
        responsive.</p>
            </li>
          </ul>
        </div>
    
      </section>
    </HydrateClient>
  );
}
