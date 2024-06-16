import NextAuth from "next-auth";
import keycloak from "next-auth/providers/keycloak";
import vocabConfig from "./config/serverConfig";
import { sessionSchema, tokenSchema } from "./zodSchemas/authSchemas";
import { JWT } from "next-auth/jwt";
import requestRefreshOfAccessToken from "./utils/server/requestRefreshOfAccessToken";

const kcConfig = vocabConfig.auth.keycloak;

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        keycloak({
            issuer: kcConfig.issuer,
            clientId: kcConfig.clientId,
            clientSecret: kcConfig.secret,
        }),
    ],

    session: {
        maxAge: 60 * 60 * 24 * 7,
    },

    callbacks: {
        async jwt({ token, user, account }) {
            if (user && account) {
                token.idToken = account.id_token!;
                token.accessToken = account.access_token!;
                token.refreshToken = account.refresh_token!;
                token.expiresAt = account.expires_at!;

                const da = await tokenSchema.parseAsync({
                    idToken: token.idToken,
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                    expiresAt: token.expiresAt,
                });
            }

            if (Date.now() < (token.expiresAt as number) * 1000 - 60 * 1000) {
                return token;
            } else {
                try {
                    const response = await requestRefreshOfAccessToken(token);

                    const tokens = await response.json();

                    if (!response.ok) throw tokens;

                    const updatedToken: JWT = {
                        ...token,
                        idToken: tokens.id_token,
                        accessToken: tokens.access_token,
                        expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
                        refreshToken: tokens.refresh_token ?? token.refreshToken,
                    };
                    return updatedToken;
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    return { ...token, error: "RefreshAccessTokenError" };
                }
            }
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
// FIXME: когда долго  не заходишь, токен не может рефрешнуться, в постмане то же самое
