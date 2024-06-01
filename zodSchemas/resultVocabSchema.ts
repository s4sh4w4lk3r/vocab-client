import { z } from "zod";

export const resultVocabSchema: z.ZodSchema<ResultVocab> = z.lazy(() =>
    z.object({
        success: z.boolean(),
        description: z.string(),
        innerResult: resultVocabSchema.nullish(),
        value: z.unknown().nullish(),
    })
);

export interface ResultVocab {
    success: boolean;
    description: string;
    innerResult?: ResultVocab | null;
    value?: unknown;
}
