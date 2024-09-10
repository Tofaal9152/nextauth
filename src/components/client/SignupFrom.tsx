"use client";
import { credentialsSignup } from "@/action/signup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const LoginForm = () => {
  const router = useRouter();
  const handleSubmit = async (data: FormData) => {
    const name = data.get("name") as string | undefined;
    const email = data.get("email") as string | undefined;
    const password = data.get("password") as string | undefined;

    const toastID = toast.loading("Logging in...");
    const error = await credentialsSignup(name, email, password);
  };
  return (
    <form action={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="name"
        required
        placeholder="Enter Your Full Name"
        className="w-full px-3 py-2 border  border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Email Address"
        className="w-full px-3 py-2 border  border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        className="w-full px-3 py-2 mt-2 border    border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition"
      />

      <button
        type="submit"
        className="w-full py-3 text-sm font-medium text-white bg-black dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white transition hover:bg-gray-800 dark:hover:bg-gray-600"
      >
        Submit
      </button>
    </form>
  );
};
