import { UUID } from "crypto";
import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken: string;
        user: {
            id: string;
            username: string;
        } & DefaultSession["user"];
    }
}
