import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import { getUser } from "src/app/db";

const expireInSeconds = 14400;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      // eslint-disable-next-line
      //@ts-ignore
      async authorize(credentials, req) {
        console.log(credentials);

        let user = await getUser(credentials?.email as string);
        if (user.length === 0) return null;
        let passwordsMatch = await compare(
          credentials?.password as string,
          user[0].password!
        );
        if (passwordsMatch) return user[0];

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
    //   let isLoggedIn = !!auth?.user;
    //   let isOnDashboard = nextUrl.pathname.startsWith("/protected");
    //   if (isOnDashboard) {
    //     if (isLoggedIn) return true;
    //     return false; // Redirect unauthenticated users to login page
    //   } else if (isLoggedIn) {
    //     return Response.redirect(new URL("/protected", nextUrl));
    //   }
    //   return true;
    // },
    // async jwt({ token, user }) {
    //   // Persist the OAuth accessToken to the token right after signin
    //   console.log("user", user);
    //   token.accessToken = user.accessToken;
    //   token.refreshToken = user.refreshToken;
    //   token.username = user.name;
    //   token.expiry = Math.round(new Date().getTime() / 1000) + expireInSeconds;
    //   return token;
    // },
    // async session(session, user) {
    //   console.log("session", session, user);
    //   // // Send properties to the client, like an accessToken from a provider.
    //   // if (user) {
    //   //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   //   //@ts-ignore
    //   //   session.accessToken = token.accessToken;
    //   //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   //   //@ts-ignore
    //   //   session.refreshToken = token.refreshToken;
    //   // }
    //   return session;
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // jwt: {
  //   secret: process.env.NEXTAUTH_SECRET,
  //   maxAge: 3 * 24 * 60 * 60,
  // },
  session: {
    //strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};
