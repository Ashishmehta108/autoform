export const runtime = "nodejs";

import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export default {
  providers: [
    GitHub,
    Google,
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) return null;

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (!user || !user.password) return null;

        const isPasswordCorrect = await bcrypt.compare(
          password!,
          user.password
        );
        if (!isPasswordCorrect) return null;

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },

    // async signIn({ user, account }) {
    //   if (account?.provider === "github") {
    //     const existingUser = await db
    //       .select()
    //       .from(users)
    //       .where(eq(users.email, user.email!))
    //       .limit(1);

    //     if (existingUser.length === 0) {
    //       await db.insert(users).values({
    //         id: account.providerAccountId, // GitHub ID
    //         name: user.name,
    //         email: user.email!,
    //         image: user.image,
    //       });
    //     }
    //   }

    //   return true;
    // },
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
} satisfies NextAuthConfig;
