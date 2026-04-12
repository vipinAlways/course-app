"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { signIn } from "next-auth/react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "~/components/ui/field";
import Image from "next/image";

type AuthTemplate = {
  Method: "signIn" | "singup";
};

const AuthTemplate = ({ Method }: AuthTemplate) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const [disable, setDisable] = useState<boolean>(false);

  const SignInMutaion = api.auth.singin.useMutation({
    mutationKey: ["auth", "Sign In"],
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

  const handleSignInSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);
    SignInMutaion.mutate({ email, password });
  };
  const handleSingUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);

    signUpmutation.mutate({ email, password, name });
  };

  return (
    <div className="mt-14 flex w-full items-center justify-center">
      {Method === "signIn" ? (
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className={"mt-6 flex flex-col gap-6"}>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription>
                  Sign In with your Google account
                </CardDescription>
                <GoogleAuthButton
                  disable={disable}
                  setDisable={setDisable}
                  text="Sing In with Google"
                />
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignInSubmit}>
                  <FieldGroup>
                    <Field></Field>
                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                      Or continue with
                    </FieldSeparator>
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Field>
                    <Field>
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Link
                          href="#"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Field>
                    <Field>
                      <Button
                        variant={"submit"}
                        type="submit"
                        disabled={disable}
                      >
                        Sign in
                      </Button>
                      <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/sign-up">Sign up</Link>
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
              By clicking continue, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </FieldDescription>
          </div>
        </div>
      ) : (
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className={"mt-6 flex flex-col gap-6"}>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription>
                  Sign In with your Google account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSingUpSubmit}>
                  <FieldGroup>
                    <Field>
                      <GoogleAuthButton
                        disable={disable}
                        setDisable={setDisable}
                        text="Sign Up Usibg Google"
                      />
                    </Field>
                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                      Or continue with
                    </FieldSeparator>
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="name">Username</FieldLabel>
                      <Input
                        id="text"
                        type="name"
                        placeholder="xyzams"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Field>
                    <Field>
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Link
                          href="#"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Field>
                    <Field>
                      <Button
                        variant={"submit"}
                        type="submit"
                        disabled={disable}
                      >
                        Sing Up
                      </Button>
                      <FieldDescription className="text-center">
                        Already have an account?{" "}
                        <Link href="/auth/sign-in">Sign In</Link>
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
              By clicking continue, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </FieldDescription>
          </div>
        </div>
      )}
    </div>
  );
};
const GoogleAuthButton = ({
  text,
  disable,
  setDisable,
}: {
  text: string;
  disable: boolean;
  setDisable: (value: boolean) => void;
}) => {
  return (
    <Button
      variant="outline"
      className="hover:bg-muted flex w-full items-center justify-center gap-2 transition"
      disabled={disable}
      onClick={async () => {
        setDisable(true);
        await signIn("google", { callbackUrl: "/" });
      }}
    >
      <div className="relative size-4">
        <Image
          alt="courseApp-google svg"
          src="/google.svg"
          sizes="(max-width:768px) 2rem,3rem"
          fill
          className="object-contain"
        />
      </div>
      <span className="font font-bold"> {text}</span>
    </Button>
  );
};

export default AuthTemplate;
