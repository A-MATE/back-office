import axios from "axios";

export async function signIn(
  email: string,
  password: string
): Promise<{ access_token: string }> {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signin`,
    JSON.stringify({ email, password }),
    {
      headers: {
        "Content-Type": "application/json",
        "x-origin": process.env.NEXT_PUBLIC_ORIGIN ?? process.env.ORIGIN ?? "",
        "x-client-id":
          process.env.NEXT_PUBLIC_CLIENT_ID ?? process.env.CLIENT_ID ?? "",
      },
    }
  );

  return response.data;
}
