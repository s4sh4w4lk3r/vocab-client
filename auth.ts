import NextAuth from "next-auth";
import keycloak from "next-auth/providers/keycloak";
import vocabConfig from "./config/vocabConfig";

const kcConfig = vocabConfig.auth.keycloak;
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        keycloak({
            issuer: kcConfig.issuer,
            clientId: kcConfig.clientId,
            clientSecret: kcConfig.secret,
        }),
    ],
});
