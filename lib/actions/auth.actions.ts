"use server";

import { signIn, signOut } from "@/auth.OLD";
import { signInFormSchema } from "../validators";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// export async function signInWithCredentials(formData: FormData) {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   const result = await signIn("credentials", {
//     email,
//     password,
//     redirect: false,
//   });

//   if (result?.error) {
//     redirect(`/signin?error=${encodeURIComponent(result.error)}`);
//   } else {
//     redirect("/");
//   }
// }

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    await signIn("credentials", user);
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid email or password" };
  }
}

export async function signOutUser() {
  await signOut();
}
