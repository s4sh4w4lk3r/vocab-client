import "server-only";
import serverConfig from "@/config/serverConfig";
import { JWT } from "next-auth/jwt";
import clientConfig from "@/config/clientConfig";

export default function requestRefreshOfAccessToken(token: JWT) {
    const kcConfig = serverConfig.auth.keycloak;

    return fetch(
        `${clientConfig.auth.issuerUrl}/protocol/openid-connect/token`,
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: kcConfig.clientId,
                client_secret: kcConfig.secret,
                grant_type: "refresh_token",
                refresh_token: token.refreshToken as string,
            }),
            method: "POST",
            cache: "no-store",
        }
    );
}
