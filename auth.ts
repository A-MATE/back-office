import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { jwtDecode } from "jwt-decode";
import { fetcher } from "./lib/api/fetcher";

export const config = {
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials", credentials);
          return null;
        }

        try {
          const data = await fetcher<{ access_token: string }>(
            "/api/v1/auth/signin",
            undefined,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!data.access_token) {
            console.log("No access_token in response:", data);
            return null;
          }

          const decodedToken = jwtDecode<{ sub: string; username: string }>(
            data.access_token
          );

          if (!decodedToken?.sub || !decodedToken.username) {
            console.log("Missing fields in decoded token:", decodedToken);
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

  callbacks: {
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
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    authorized({ request, auth }) {
      // Array of regex patterns of the paths we want to protect
      const protectedPaths = [
        /^\/$/,
        /\/organization(\/.*)?/,
        /\/team(\/.*)?/,
        /\/player(\/.*)?/,
        /\/user(\/.*)?/,
        /\/profile(\/.*)?/,
      ];

      // Get pathname from the req URL object
      const { pathname } = request.nextUrl;

      // Check if user is not authenticated and accessing a protected path
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;
    },
  },
} satisfies NextAuthConfig;

export const authOptions = config;
export const { handlers, auth, signIn, signOut } = NextAuth(config);
