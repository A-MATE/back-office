import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { jwtDecode } from "jwt-decode";
import { fetcher } from "./lib/api/fetcher";

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") ||
    pathname.includes(".") || // .js, .css, .woff2, etc.
    pathname === "/sign-in"
  );
}

function isProtectedPath(pathname: string): boolean {
  const protectedPaths = [
    /^\/$/,
    /\/organization(\/.*)?/,
    /\/team(\/.*)?/,
    /\/player(\/.*)?/,
    /\/user(\/.*)?/,
    /\/profile(\/.*)?/,
  ];

  return protectedPaths.some((pattern) => pattern.test(pathname));
}

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
      const { pathname } = request.nextUrl;

      if (isStaticAsset(pathname)) {
        return true;
      }

      if (!auth && isProtectedPath(pathname)) {
        return false;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

export const authOptions = config;
export const { handlers, auth, signIn, signOut } = NextAuth(config);
