import { z } from "zod";

export const getDictionarySchema = z.object({
    id: z.coerce.bigint(),
    name: z.string().trim().min(1),
    ownerId: z.string().uuid(),
    lastModified: z.coerce.date(),
});

export const getDictionairesSchema = z.array(getDictionarySchema);
