import { z } from "zod";

export const sessionSchema = z.object({
    accessToken: z.string(),

    user: z.object({
        id: z.string().uuid(),
        username: z.string().trim().min(3).max(255),
        email: z.string().email().max(255),
        name: z.string().trim().min(1).max(255),
    }),
});

export const tokenSchema = z.object({
    idToken: z.string().uuid(),
    accessToken: z.string().trim().min(10),
    refreshToken: z.string().trim().min(10),
    expiresAt: z.number().gte(1),
});
