import SigninForm from "@/components/forms/signin/signin-form";

export default function SignInPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="w-full max-w-md mx-auto">
      <SigninForm error={searchParams.error} />
    </div>
  );
}
