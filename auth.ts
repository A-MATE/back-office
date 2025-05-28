import { jwtDecode, JwtPayload } from "jwt-decode";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials", credentials);
          return null;
        }

        try {
          const response = await fetch(
            `${process.env.API_URL}/api/v1/auth/signin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-origin": process.env.ORIGIN || "",
                "x-client-id": process.env.CLIENT_ID || "",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            console.log(
              "Bad response:",
              response.status,
              await response.text()
            );
            return null;
          }

          const data = await response.json();

          if (!data.access_token) {
            console.log("No access_token in response:", data);
            return null;
          }

          const decodedToken: JwtPayload & { username: string } = jwtDecode(
            data.access_token
          );

          console.log("Received data from backend:", data);

          if (!decodedToken || !decodedToken.sub || !decodedToken.username) {
            console.log("Missing fields in response:", data);
            return null;
          }

          return {
            id: decodedToken.sub,
            email: decodedToken.username,
            name: decodedToken.username,
            token: data.access_token,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      const customToken = token as {
        accessToken?: string;
        id?: string;
        email?: string;
      };

      session.accessToken = customToken.accessToken ?? "";
      session.user.id = customToken.id ?? "";
      session.user.email = customToken.email ?? "";

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
