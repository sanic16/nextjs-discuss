import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error(
    "Por favor, defina GITHUB_CLIENT_ID e GITHUB_CLIENT_SECRET en su archivo .env"
  );
}

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  trustHost: true,
});
