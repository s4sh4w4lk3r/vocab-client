import "server-only";
import { z } from "zod";

const vars = process.env;

const configSchema = z.object({
    auth: z.object({
        keycloak: z.object({
            clientId: z.string().trim().min(1),
            secret: z.string().trim().min(1),
        }),
        next: z.object({
            secret: z.string().trim().min(1),
            url: z.string().url(),
        }),
    }),
});

const config: z.infer<typeof configSchema> = {
    auth: {
        keycloak: {
            clientId: vars.AUTH_KEYCLOAK_ID!,
            secret: vars.AUTH_KEYCLOAK_SECRET!,
        },
        next: {
            secret: vars.AUTH_SECRET!,
            url: vars.AUTH_URL!,
        },
    },
};

export default configSchema.parse(config);
