import serverConfig from "@/config/serverConfig";
import { getDictionairesSchema } from "@/zodSchemas/dictionariesSchema";
import { resultVocabSchema } from "@/zodSchemas/resultVocabSchema";
import { getStatementPairsSchema } from "@/zodSchemas/statementsPairsSchema";
import { z } from "zod";

type AccessTokenParam = { accessToken: string };

type getDictionariesParams = { offset: number; appendTopStatements: boolean } & AccessTokenParam;
type getDictionariesReturnType = z.infer<typeof getDictionairesSchema>;
export async function getDictionaries({ accessToken, appendTopStatements, offset }: getDictionariesParams): Promise<getDictionariesReturnType> {
    const response = await fetch(`${serverConfig.api.baseUrl}/dictionaries?offset=${offset}&appendTopStatements=${appendTopStatements}`, {
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw response;
    }

    const resultVocab = await resultVocabSchema.parseAsync(await response.json());
    const parseResult = await getDictionairesSchema.safeParseAsync(resultVocab.value);

    return parseResult.success ? parseResult.data : [];
}

type getStatementPairsParams = { dictionaryId: bigint; offset: number } & AccessTokenParam;
type getStatementPairsReturnType = z.infer<typeof getStatementPairsSchema>;
export async function getStatementPairs({ accessToken, dictionaryId, offset }: getStatementPairsParams): Promise<getStatementPairsReturnType> {
    const response = await fetch(`${serverConfig.api.baseUrl}/dictionaries/${dictionaryId}/statements?offset=${offset}`, {
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw response;
    }

    const resultVocab = await resultVocabSchema.parseAsync(await response.json());
    const parseResult = await getStatementPairsSchema.safeParseAsync(resultVocab.value);

    return parseResult.success ? parseResult.data : [];
}
