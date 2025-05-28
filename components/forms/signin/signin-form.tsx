"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleSignin } from "@/lib/actions/auth.actions";

const SigninForm = ({ error }: { error?: string }) => {
  return (
    <>
      <h1>Sign In</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form action={handleSignin}>
        <div>
          <Label htmlFor="email">Your email address</Label>
          <Input
            type="email"
            id="email"
            name="email"
            className="border p-2 w-full"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <Label htmlFor="password">Your password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            className="border p-2 w-full"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>
        <Button variant="outline" type="submit">
          Sign in
        </Button>
      </form>
    </>
  );
};

export default SigninForm;
