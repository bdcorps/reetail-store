import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ], callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // if (account.provider === "google") {
      //   return profile.email_verified && email.endsWith("@example.com")
      // }
      return true
      // Do different verification for other providers that don't have `email_verified`
    }
  }
})
