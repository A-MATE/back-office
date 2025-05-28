import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h1>Welcome to the Dashboard!</h1>
      <p>You are logged in as {session.user?.email}.</p>
    </div>
  );
}
