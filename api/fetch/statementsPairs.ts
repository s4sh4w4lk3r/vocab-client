import serverConfig from "@/config/serverConfig";
import { AccessTokenParam, getHeadersJsonAccessToken } from "../sharedTypes";
import { getStatementPairsSchema } from "@/zodSchemas/statementsPairsSchema";
import { z } from "zod";

type getStatementPairsParams = { dictionaryId: bigint; offset: number } & AccessTokenParam;
type getStatementPairsReturnType = z.infer<typeof getStatementPairsSchema>;
export async function getStatementPairs({ accessToken, dictionaryId, offset }: getStatementPairsParams): Promise<getStatementPairsReturnType> {
    const response = await fetch(`${serverConfig.api.baseUrl}/dictionaries/${dictionaryId}/statements?offset=${offset}`, {
        headers: getHeadersJsonAccessToken({ accessToken }),
    });

    if (!response.ok) {
        throw response;
    }

    return await getStatementPairsSchema.parseAsync(await response.json());
}

export async function getStatementsPair(params: { statementsPairId: bigint } & AccessTokenParam) {}
