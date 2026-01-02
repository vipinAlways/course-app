import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ratelimit } from "./lib/ratelimt";

export async function middleware(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ??
    req.headers.get("x-real-ip") ??
    "127.0.0.1";

  // Protect NextAuth routes
  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return new NextResponse("Too many requests", { status: 429 });
    }
  }

  return NextResponse.next();
}
