"use client";

import {
  CreateUser,
  CreateUserSchema,
  LoginUser,
  LoginUserSchema,
} from "@/app/types/users";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthForm() {
  const pathname = usePathname();
  const router = useRouter();

  type Auth = CreateUser | LoginUser;

  const [userInputs, setUserInputs] = useState<Auth>({
    email: "",
    fName: "",
    lName: "",
    password: "",
  });

  const [error, setError] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let validation;
    if (pathname === "/auth/sign-up") {
      validation = CreateUserSchema.safeParse(userInputs);
    } else {
      validation = LoginUserSchema.safeParse(userInputs);
    }

    if (!validation?.success) {
      const errorMessageArray: string[] = [];
      validation.error._zod.def.forEach((err) => {
        errorMessageArray.push(err.message);
      });
      setError(errorMessageArray);
      return;
    }

    const apiUrl =
      pathname === "/auth/sign-up"
        ? "/api/auth/sign-up"
        : "/api/auth/login";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userInputs),
    });

    const result = await response.json();
    if (!response.ok) {
      return setError([result.message]);
    }


    if (result.success) {
      router.push("/dashboard/reviews");
    }
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
        {pathname === "/auth/sign-up" ? "Create Account" : "Welcome Back"}
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        {pathname === "/auth/sign-up"
          ? "Sign up to get started"
          : "Login to your account"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {pathname === "/auth/sign-up" && (
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="First Name"
              className="col-span-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={(e) =>
                setUserInputs({ ...userInputs, fName: e.target.value })
              }
            />

            <input
              placeholder="Last Name"
              className="col-span-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={(e) =>
                setUserInputs({ ...userInputs, lName: e.target.value })
              }
            />
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          onChange={(e) =>
            setUserInputs({ ...userInputs, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          onChange={(e) =>
            setUserInputs({ ...userInputs, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-md"
        >
          {pathname === "/auth/sign-up" ? "Sign Up" : "Login"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {pathname === "/auth/sign-up" ? (
          <>
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {error.length > 0 && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
          {error.map((errtext) => (
            <div key={errtext} className="text-sm text-red-600">
              • {errtext}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

}
