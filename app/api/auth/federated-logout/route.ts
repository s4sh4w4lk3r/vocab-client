import clientConfig from "@/config/clientConfig";
import serverConfig from "@/config/serverConfig";
import { JWT, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({
            req: req,
            secret: serverConfig.auth.next.secret,
            salt: undefined!,
        });

        console.error(token);
        if (token) {
            return sendEndSessionEndpointToURL(token);
        }
        return handleEmptyToken();
    } catch (error) {
        console.error(error);
        const response = {
            error: "Unable to logout from the session",
        };
        const responseHeaders = {
            status: 500,
        };
        return NextResponse.json(response, responseHeaders);
    }
}

function logoutParams(token: JWT): Record<string, string> {
    return {
        id_token_hint: token.idToken,
        post_logout_redirect_uri: serverConfig.auth.next.url,
    };
}

function handleEmptyToken() {
    const response = { error: "No session present" };
    const responseHeaders = { status: 400 };
    return NextResponse.json(response, responseHeaders);
}

function sendEndSessionEndpointToURL(token: JWT) {
    const endSessionEndPoint = new URL(
        `${clientConfig.auth.issuerUrl}/protocol/openid-connect/logout`
    );
    const params: Record<string, string> = logoutParams(token);
    const endSessionParams = new URLSearchParams(params);
    const response = { url: `${endSessionEndPoint.href}/?${endSessionParams}` };
    return NextResponse.json(response);
}
