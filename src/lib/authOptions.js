import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/actions/server/userManager";
import { dbConnect, collections } from "@/db/dbConnect";


const authOptions = {
  // Configure one or more authentication providers
  providers: [

    CredentialsProvider({
      name: "Credentials",
      credentials: {},
    
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
    
        const result = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });
    
        if (!result.success) {
          // Returning null tells NextAuth: authentication failed
          return null;
        }
    
        const user = result.data;
    
        return {
          id: user.id,            
          name: user.username,
          email: user.email,
          image: user.photoURL,
          role: user.role,
          provider: "credentials",
        };
      },
    }),

    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],


  session: {
    strategy: "jwt",
  },


  callbacks: {

    async signIn({ user, account }) {

      if (account?.provider === "google") {
        const userCollection = dbConnect(collections.USERS);

        await userCollection.updateOne(
          { email: user.email.toLowerCase() },
          {
            $set: {
              lastLogin: new Date(),
              updatedAt: new Date(),
            },
          }
        );
      }

      return true;
    },
    
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.provider = account?.provider;
      }
    
      return token;
    },

    async session({ session, token }) {
      // Propagate custom fields from JWT token to session
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.provider = token.provider;
      }
      return session;
    }
  },

  // controls where NextAuth redirects users when authentication is required or fails. 
  pages: {
    signIn: "/login",
  },
}

export {authOptions};