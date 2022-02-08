import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      GoogleProvider({
        clientId: "1058411638662-gqhtlhb5ic6gkjj2ib1b9vc9d3sd2h29.apps.googleusercontent.com",
        clientSecret: "GOCSPX-uOCOpAS2Xdc\_\_uGj0UhKKZHmAuy0",
      }),
    ],
  })