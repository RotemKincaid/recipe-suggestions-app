import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/GitHub"
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db/index"

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [GitHub, GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code"
      }
    }
  })],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      return session
    }
  }
} satisfies NextAuthConfig

export const { 
  handlers, 
  auth, 
  signOut 
} = NextAuth(authConfig)
