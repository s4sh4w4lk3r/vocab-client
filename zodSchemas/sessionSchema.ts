import { z } from "zod";

export default z.object({
    accessToken: z.string(),

    user: z.object({
        id: z.string().uuid(),
        username: z.string().trim().min(1),
        email: z.string().email(),
        name: z.string().trim().min(1),
    }),
});
