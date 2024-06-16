import "client-only";
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

const apiAuthority = "api.vocab.rlx";

const config: z.infer<typeof schema> = {
    api: {
        baseUrl: `http://${apiAuthority}`,
        webSocketUrl: `ws://${apiAuthority}/ws`,
    },
    auth: {
        accountUrl: "http://auth.vocab.rlx/realms/vocab/account/",
    },
};

export default schema.parse(config);
