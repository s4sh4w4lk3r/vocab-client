import { z } from "zod";

const schema = z.object({
    api: z.object({
        baseUrl: z.string().url(),
        webSocketUrl: z.string().url(),
    }),
    auth: z.object({
        accountUrl: z.string().url(),
    }),
});

const apiAuthority = "api.vocab.atc";
const authAuthority = "auth.vocab.atc";

const config: z.infer<typeof schema> = {
    api: {
        baseUrl: `http://${apiAuthority}`,
        webSocketUrl: `ws://${apiAuthority}/ws`,
    },
    auth: {
        accountUrl: `http://${authAuthority}/realms/vocab/account/`,
    },
};

export default schema.parse(config);
