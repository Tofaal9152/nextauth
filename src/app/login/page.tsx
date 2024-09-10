"use client";
import { auth, signIn } from "@/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { credentialsLogin } from "@/action/login";
import { useState } from "react";

export default function SignInComponent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;


    try {
      const error = await credentialsLogin(email, password);
      if (!error) {
        toast.success("Logged in successfully");
        router.push("/");
      } else {
        toast.error(String(error));
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r bg-gray-50 dark:bg-gray-900 dark:bg-none absolute top-0 z-50 w-full">
      <div className="relative bg-white dark:shadow-lg dark:shadow-green-500 dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-md p-6 mx-4">
        <div className="p-5">
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Sign In
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              You need to be signed in to perform this action.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className="w-full px-3 py-2 mt-2 border border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              <a
                href="/forgot-password"
                className="text-blue-800 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition"
              >
                Reset your password?
              </a>
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 text-sm font-medium text-white bg-black dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white transition hover:bg-gray-800 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-2">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="px-3 text-sm text-gray-600 dark:text-gray-400">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>
          
          {/* Social Buttons */}
          <form
            action={async () => {
              await signIn("google");
            }}
            className="space-y-3"
          >
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 h-10 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 p-2 text-sm font-medium text-black dark:text-white focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-[18px] w-[18px]"
              />
              Continue with Google
            </button>
          </form>
          
          <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-[#4285f4] hover:underline transition"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
