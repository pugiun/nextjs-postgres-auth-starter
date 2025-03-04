import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import { getUser } from "src/app/db";
import { cookies } from "next/headers";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

//let maxAge = 356 * 24 * 60 * 60;
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
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
        const cookieStore = cookies();
        const remember = (await cookieStore).get("remember");
        console.log("credentials", credentials, remember);
        let user = await getUser(credentials?.username as string);
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
    async jwt({ token, user }) {
      // Persist the OAuth accessToken to the token right after signin

      console.log("user jwt", user, token);
      if (user) {
        token.name = user.username;
      }
      return token;
    },
    async session(params: { session: Session; token: JWT; user: AdapterUser }) {
      const { session, token, user } = params;
      console.log("session", session, token, user);
      // // Send properties to the client, like an accessToken from a provider.
      // if (user) {
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   //@ts-ignore
      //   session.accessToken = token.accessToken;
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   //@ts-ignore
      //   session.refreshToken = token.refreshToken;
      // }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    //strategy: "jwt",
    //maxAge: maxAge,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};
