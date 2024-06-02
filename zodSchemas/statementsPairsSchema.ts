import { z } from "zod";

export const getStatementPairSchema = z.object({
    id: z.number(),
    source: z.string(),
    target: z.string(),
    statementCategory: z.number(),
    guessingLevel: z.number(),
    lastModified: z.string(),
    statementsDictionaryId: z.number(),
});

export const getStatementPairsSchema = z.array(getStatementPairSchema);
