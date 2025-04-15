import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { Session } from "next-auth";

interface CustomSession extends Session {
    idToken: string;
}

export const  {handlers, signIn, signOut, auth} = NextAuth({
    providers: [Google],
    callbacks: {
        async jwt({ token, account }) {
            if (account?.id_token) {
                token.idToken = account.id_token;
            }
            return token;
        },
        async session({ session, token }) {
            // Add the idToken property to the session object
            const customSession: CustomSession = {
                ...session,
                idToken: token.idToken as string,
            };
            return customSession;
        }
    }
})