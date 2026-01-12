import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "CREATOR" | "STUDENT"; // or string if you prefer
    } & DefaultSession["user"];
  }

  interface User {
    role: "ADMIN" | "CREATOR" | "STUDENT";
  }
}
