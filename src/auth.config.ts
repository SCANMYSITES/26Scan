import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

const authConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // TODO: implement your login logic
        return null;
      },
    }),
  ],
};

export default authConfig;
