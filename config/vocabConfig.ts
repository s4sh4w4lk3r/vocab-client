import { z } from "zod";

const vars = process.env;

const configSchema = z.object({
    auth: z.object({
        keycloak: z.object({
            clientId: z.string().trim().min(1),
            secret: z.string().trim().min(1),
            issuer: z.string().url(),
        }),
        next: z.object({
            secret: z.string().trim().min(1),
        }),
    }),
    apiUrl: z.string().url(),
});

const config: z.infer<typeof configSchema> = {
    auth: {
        keycloak: {
            clientId: vars.AUTH_KEYCLOAK_ID!,
            secret: vars.AUTH_KEYCLOAK_SECRET!,
            issuer: vars.AUTH_KEYCLOAK_ISSUER!,
        },
        next: {
            secret: vars.AUTH_SECRET!,
        },
    },
    apiUrl: vars.API_URL!,
};

export default configSchema.parse(config);
