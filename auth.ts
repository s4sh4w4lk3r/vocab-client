import NextAuth from "next-auth";
import keycloak from "next-auth/providers/keycloak";
import vocabConfig from "./config/serverConfig";
import sessionSchema from "./zodSchemas/sessionSchema";

const kcConfig = vocabConfig.auth.keycloak;

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        keycloak({
            issuer: kcConfig.issuer,
            clientId: kcConfig.clientId,
            clientSecret: kcConfig.secret,
        }),
    ],

    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.accessToken = account?.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            const tokenPayload = JSON.parse(Buffer.from(session.accessToken?.split(".")[1], "base64").toString());
            session.user.id = tokenPayload.sub;
            session.user.username = tokenPayload.preferred_username;

            await sessionSchema.parseAsync(session);

            return session;
        },
    },
});
