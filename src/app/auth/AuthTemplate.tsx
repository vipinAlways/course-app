"use client";
import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { signIn } from "next-auth/react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AuthTemplate = ({ Method }: AuthTemplate) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const [disable, setDisable] = useState<boolean>(false);

  const LoginMutaion = api.auth.login.useMutation({
    mutationKey: ["auth", "login"],
    onSuccess: () => {
      router.push(`/auth/verification?email=${email}`);
    },
  });
  const signUpmutation = api.auth.singUp.useMutation({
    mutationKey: ["auth", "singup"],
    onSuccess: () => {
      router.push(`/auth/verification?email=${email}`);
    },
  });

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);
    LoginMutaion.mutate({ email, password });
  };
  const handleSingUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);

    signUpmutation.mutate({ email, password, name });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {Method === "Login" ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Link href={"/auth/signup"}>Sign Up</Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={disable}>
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              variant="outline"
              className="w-full"
              disabled={disable}
              onClick={async () => {
                await signIn("google", { callbackUrl: "/" });
              }}
            >
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Sing up your account</CardTitle>
            <CardDescription>
              Enter your Details below to login to your account
            </CardDescription>
            <CardAction>
              <Link href={"/auth/login"}>Login</Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSingUpSubmit} className="space-y-4">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="xyz"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={disable}>
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={async () => {
                await signIn("google", {
                  callbackUrl: "/",
                });
              }}
              disabled={disable}
            >
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AuthTemplate;
