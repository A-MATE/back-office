import { auth } from "@/auth";
import { LoginForm } from "@/features/sign-in/login-form";
import { APP_NAME } from "@/lib/constants";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />

        <div className="relative z-20 flex items-center text-lg font-medium mb-10 ">
          <span className="bg-gradient-to-b from-white to-black bg-clip-text text-transparent">
            {APP_NAME}
          </span>
        </div>

        <div className="relative z-20 flex flex-1 items-center justify-center">
          <Image
            src="/images/logo.png"
            width={600}
            height={600}
            alt="a-mate-logo"
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to your account
            </h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
