import Link from "next/link";

import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center text-white">
        <h1 className="text-8xl">Hello My Name is Vipin</h1>
        <Link href={"/auth/login"}>Sign In</Link>
      </main>
    </HydrateClient>
  );
}
