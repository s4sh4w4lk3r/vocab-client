import "client-only";
import { z } from "zod";

const schema = z.object({
    api: z.object({
        baseUrl: z.string().url(),
        webSocketUrl: z.string().url(),
    }),
});

const authority = "api.vocab.rlx";

const config: z.infer<typeof schema> = {
    api: {
        baseUrl: `http://${authority}`,
        webSocketUrl: `ws://${authority}/ws`,
    },
};

export default schema.parse(config);
