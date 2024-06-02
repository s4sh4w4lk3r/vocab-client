import { z } from "zod";

export const getStatementPairSchema = z.object({
    id: z.number(),
    source: z.string().trim().min(1).max(512),
    target: z.string().trim().min(1).max(512),
    statementCategory: z.number(),
    guessingLevel: z.number(),
    lastModified: z.string(),
    statementsDictionaryId: z.number(),
    positionPriority: z.number(),
});

export const getStatementPairsSchema = z.array(getStatementPairSchema);
