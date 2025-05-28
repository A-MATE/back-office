"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function handleSignin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    redirect(`/signin?error=${encodeURIComponent(result.error)}`);
  } else {
    redirect("/");
  }
}
