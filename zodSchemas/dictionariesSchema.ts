import { z } from "zod";
import { getStatementPairSchema } from "./statementsPairsSchema";

const dictionaryMaxNameLength = 256;
const MaxcountOfStatementPairs = 15;

export const getDictionarySchema = z.object({
    id: z.coerce.bigint(),
    name: z.string().trim().min(1).max(dictionaryMaxNameLength),
    ownerId: z.string().uuid(),
    lastModified: z.coerce.date(),
});

export const getDictionairesSchema = z
    .array(
        z.object({
            id: z.bigint(),
            name: z.string().trim().min(1).max(dictionaryMaxNameLength),
            ownerId: z.string().uuid(),
            lastModified: z.coerce.date(),
            statementPairs: z
                .array(getStatementPairSchema)
                .max(MaxcountOfStatementPairs),
        })
    )
    .max(20);
