import { z } from "zod";

const getStatementPairSchema = z.object({
    id: z.number(),
    source: z.string(),
    target: z.string(),
    statementCategory: z.number(),
    guessingLevel: z.number(),
    lastModified: z.string(),
    statementsDictionaryId: z.number(),
});
export const getDictionarySchema = z.object({
    id: z.coerce.bigint(),
    name: z.string().trim().min(1),
    ownerId: z.string().uuid(),
    lastModified: z.coerce.date(),
    statementPairs: z.array(getStatementPairSchema),
});

export const getDictionairesSchema = z.array(getDictionarySchema);
