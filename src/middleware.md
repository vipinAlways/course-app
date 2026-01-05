// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { ratelimit } from "./lib/ratelimt";
// import { auth } from "./server/auth";

// export async function middleware(req: NextRequest) {
//   const ip =
//     req.headers.get("x-forwarded-for")?.split(",")[0] ??
//     req.headers.get("x-real-ip") ??
//     "127.0.0.1";

//   if (req.nextUrl.pathname.startsWith("/api/auth")) {
//     const { success } = await ratelimit.limit(ip);

//     if (!success) {
//       return new NextResponse("Too many requests", { status: 429 });
//     }
//   }
// // 
//   // const { pathname } = req.nextUrl;
//   // const session = await auth();
//   // const isProtectedAuthRoute =
//   //   pathname.startsWith("/api/auth/verification") ||
//   //   pathname.startsWith("/api/auth/signup") ||
//   //   pathname.startsWith("/api/auth/signin");

//   // if (isProtectedAuthRoute && session) {
//   //   return NextResponse.redirect("/");
//   // }

//   return NextResponse.next();
// }
