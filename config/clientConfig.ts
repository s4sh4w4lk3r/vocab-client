import { z } from "zod";

const schema = z.object({
    api: z.object({
        baseUrl: z.string().url(),
        webSocketUrl: z.string().url(),
    }),
    auth: z.object({
        accountUrl: z.string().url(),
        issuerUrl: z.string().url(),
    }),
});

const apiAuthority = "api.vocab.rlx";
const authAuthority = "auth.vocab.rlx";

const config: z.infer<typeof schema> = {
    api: {
        baseUrl: `http://${apiAuthority}`,
        webSocketUrl: `ws://${apiAuthority}/ws`,
    },
    auth: {
        accountUrl: `http://${authAuthority}/realms/vocab/account`,
        issuerUrl: `http://${authAuthority}/realms/vocab`,
    },
};

export default schema.parse(config);
