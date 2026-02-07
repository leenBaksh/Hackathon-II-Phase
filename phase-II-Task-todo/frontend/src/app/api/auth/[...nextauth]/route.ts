import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Placeholder for actual login logic
// This is a minimal setup, you'll need to expand it
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
          
          // Make API call to backend for authentication
          const formData = new FormData();
          formData.append('username', credentials?.email || '');
          formData.append('password', credentials?.password || '');

          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            return null;
          }

          const tokenData = await response.json();
          
          // Get user info from token or make additional call to get user details
          // For now, return user info from credentials
          return { 
            id: credentials?.email || "unknown", 
            name: credentials?.email?.split('@')[0] || "User", 
            email: credentials?.email || "",
            accessToken: tokenData.access_token
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
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
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  // Add secret and other configurations as needed
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };