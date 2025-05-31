import { auth } from "@/auth.OLD";

import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h1>Welcome to the Dashboard!</h1>
    </div>
  );
}
