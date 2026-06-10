const authConfig = {
  providers: [
    // your providers
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};

export default authConfig;