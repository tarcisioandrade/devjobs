import NextAuth, { type NextAuthOptions } from "next-auth";
import prisma from "@libs/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "src/types/User";
import fetchLogin from "@services/fetchLogin";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetchLogin(credentials);

        if (res.status === 200 && res.data) return res.data;
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      if (token) {
        session.user = token.user as User;
      }
      return session;
    },
  },

  pages: {
    signIn: "/user/login",
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
