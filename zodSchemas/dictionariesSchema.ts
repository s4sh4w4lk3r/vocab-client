import { z } from "zod";
import { getStatementPairSchema } from "./statementsPairsSchema";

export const getDictionarySchema = z.object({
    id: z.coerce.bigint(),
    name: z.string().trim().min(1),
    ownerId: z.string().uuid(),
    lastModified: z.coerce.date(),
    statementPairs: z.array(getStatementPairSchema),
});

export const getDictionairesSchema = z.array(getDictionarySchema);
