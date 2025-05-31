import UserProfile from "@/components/user-profile/user-profile";

export default async function ProfilePage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <h1>Welcome to the Profile page!</h1>
      <UserProfile />
    </div>
  );
}
