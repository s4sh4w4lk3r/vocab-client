import { z } from "zod";

export default z.object({
    accessToken: z.string(),

    user: z.object({
        id: z.string().uuid(),
        username: z.string().trim().min(3).max(255),
        email: z.string().email().max(255),
        name: z.string().trim().min(1).max(255),
    }),
});
