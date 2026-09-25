import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "zod";


export const authConfig = {
  pages: {
    signIn: "/login"
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      // console.log({
      //   isLoggedIn,
      //   isOnDashboard
      // });

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // No Dashboard access
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true; // Not authenticated but it doesn't matter for non Dashboard Pages
    },
  },
  providers: []
} satisfies NextAuthConfig;
