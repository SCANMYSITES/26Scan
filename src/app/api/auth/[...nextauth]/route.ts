import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" }
    },
    authorize: async (credentials: any) => {
      if (!credentials?.email) return null;

      return {
        id: "TEMP-USER-ID",
        email: credentials.email
      };
    }
  })
]

});
