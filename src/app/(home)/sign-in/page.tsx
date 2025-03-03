"use client";

import { FaGoogle } from "react-icons/fa";

import { SignUp, useSignIn } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderCircle, EyeIcon, EyeOffIcon } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { Sign } from "node:crypto";
import { useToast } from "~/hooks/use-toast";

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      const form = event.currentTarget;
      // Add type assertions for form elements
      const emailInput = form.elements.namedItem("email") as HTMLInputElement;
      const passwordInput = form.elements.namedItem(
        "password",
      ) as HTMLInputElement;

      const email = emailInput.value;
      const password = passwordInput.value;

      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/drive");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleOAuthSignIn = async () => {
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/drive",
      });
    } catch (err) {
      console.error("OAuth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const { toast } = useToast();
  return (
    <div className="w-full max-w-md space-y-8">
      <h1 className="mb-4 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-4xl font-bold text-transparent">
        Welcome to your Drive
      </h1>
      <p className="text-blue-300">
        Sign in to access your secure storage space
      </p>

      <div className="rounded-md border border-blue-700 bg-blue-900/40 p-8 shadow-xl">
        <div className="mt-6 space-y-4">
          <button
            onClick={handleOAuthSignIn}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-sm border border-blue-600 bg-blue-900/50 px-6 py-3 text-base font-light text-white transition-colors hover:bg-blue-500/20"
          >
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
        </div>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-blue-900/40 px-2 text-blue-300">
                Or continue with
              </span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mt-5 block text-left text-sm font-medium text-blue-300">
              Email:{" "}
              <span
                className="group relative cursor-pointer font-bold text-white transition-colors hover:text-blue-400"
                onClick={() => {
                  navigator.clipboard
                    .writeText("xeo3221.testing@gmail.com")
                    .then(() => {
                      toast({
                        title: "Copied to clipboard!",
                        description: "Email copied successfully",
                        variant: "default",
                      });
                    })
                    .catch(() => {
                      toast({
                        title: "Failed to copy",
                        description: "Please try again",
                        variant: "destructive",
                      });
                    });
                }}
              >
                xeo3221.testing@gmail.com
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 transform rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Copy
                </span>
              </span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-sm border border-blue-700 bg-blue-900/50 px-3 py-2 text-white placeholder-blue-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="user@drive.com"
            />
          </div>

          <div>
            <label className="block text-left text-sm font-medium text-blue-300">
              Password:{" "}
              <span
                className="group relative cursor-pointer font-bold text-white transition-colors hover:text-blue-400"
                onClick={() => {
                  navigator.clipboard
                    .writeText("DriveApp!")
                    .then(() => {
                      toast({
                        title: "Copied to clipboard!",
                        description: "Email copied successfully",
                        variant: "default",
                      });
                    })
                    .catch(() => {
                      toast({
                        title: "Failed to copy",
                        description: "Please try again",
                        variant: "destructive",
                      });
                    });
                }}
              >
                DriveApp!
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 transform rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Copy
                </span>
              </span>
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="mt-1 block w-full rounded-sm border border-blue-700 bg-blue-900/50 px-3 py-2 text-white placeholder-blue-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-sm border border-blue-600 bg-blue-900/50 px-6 py-3 text-base font-light text-white transition-colors hover:bg-blue-500/20"
          >
            {isLoading ? (
              <>
                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
