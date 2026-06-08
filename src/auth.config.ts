// src/auth.config.ts
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials?.email) return null;

        return {
          id: "TEMP-USER-ID",
          email: credentials.email
        };
      }
    })
  ],

  pages: {
    signIn: "/login"
  },

  session: {
    strategy: "jwt"
  }
};
