import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials): Promise<any> => {
        if (!credentials?.email) return null;

        return {
          id: "TEMP-USER-ID",
          email: credentials.email as string
        };
      }
    })
  ]
});


