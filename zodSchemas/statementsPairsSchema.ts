import { z } from "zod";

export const getStatementPairSchema = z.object({
    id: z.coerce.bigint(),
    source: z.string().trim().min(1),
    target: z.string().trim().min(1),
    statementCategory: z.number(),
    guessingLevel: z.number().min(1).max(5),
    lastModified: z.coerce.date(),
    statementsDictionaryId: z.coerce.bigint(),
});

export const getStatementPairsSchema = z.array(getStatementPairSchema);
