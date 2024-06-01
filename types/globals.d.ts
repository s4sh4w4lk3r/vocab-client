import { UUID } from "crypto";
import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken: string;
        user: {
            id: string;
            username: string;
        } & DefaultSession["user"];

        error: string?;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        idToken: string;
        accessToken: string;
        refreshToken: string;
        expiresAt: number;
    }
}
