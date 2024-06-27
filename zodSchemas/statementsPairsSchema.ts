import { z } from "zod";

const statementPairValueMaxLength = 512;

export enum StatementCategory {
    None = 0,

    /// <summary>
    /// Глагол.
    /// </summary>
    Verb = 1,

    /// <summary>
    /// Существительное
    /// </summary>
    Noun = 2,

    /// <summary>
    /// Прилагательное.
    /// </summary>
    Adjective = 3,

    /// <summary>
    /// Местоимение.
    /// </summary>
    Pronoun = 4,

    /// <summary>
    /// Числительное.
    /// </summary>
    Numerals = 5,

    /// <summary>
    /// Предложение
    /// </summary>
    Sentence = 6,

    /// <summary>
    /// Другое.
    /// </summary>
    Other = 7,
}
export const getStatementPairSchema = z.object({
    id: z.coerce.bigint(),
    source: z.string().trim().min(1).max(statementPairValueMaxLength),
    target: z.string().trim().min(1).max(statementPairValueMaxLength),
    statementCategory: z.nativeEnum(StatementCategory),
    guessingLevel: z.number().min(1).max(5),
    lastModified: z.coerce.date(),
    statementsDictionaryId: z.coerce.bigint(),
});

export const getStatementPairsSchema = z.array(getStatementPairSchema);
