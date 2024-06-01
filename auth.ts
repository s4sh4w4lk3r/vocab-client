import NextAuth from "next-auth";
import keycloak from "next-auth/providers/keycloak";
import vocabConfig from "./config/serverConfig";
import sessionSchema from "./zodSchemas/sessionSchema";
import { JWT } from "next-auth/jwt";
import serverConfig from "./config/serverConfig";

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
        // TODO: Почекать тут
        maxAge: 60 * 60 * 2,
    },

    callbacks: {
        async jwt({ token, user, account }) {
            if (user && account) {
                token.idToken = account.id_token!;
                token.accessToken = account.access_token!;
                token.refreshToken = account.refresh_token!;
                token.expiresAt = account.expires_at!;
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
                return token;
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

export function requestRefreshOfAccessToken(token: JWT) {
    const kcConfig = serverConfig.auth.keycloak;

    return fetch(`${kcConfig.issuer}/protocol/openid-connect/token`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: kcConfig.clientId,
            client_secret: kcConfig.secret,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken as string,
        }),
        method: "POST",
        cache: "no-store",
    });
}
