import { getStatementPairsSchema } from "@/zodSchemas/statementsPairsSchema";
import { z } from "zod";
import { AccessTokenParam, getHeadersJsonAccessToken } from "../sharedTypes";
import clientConfig from "@/config/clientConfig";

export async function getStatementPairs({
    accessToken,
    dictionaryId,
    page,
}: {
    dictionaryId: bigint;
    page: number;
} & AccessTokenParam): Promise<z.infer<typeof getStatementPairsSchema>> {
    const response = await fetch(
        `${clientConfig.api.baseUrl}/dictionaries/${dictionaryId}/statements?page=${page}`,
        {
            headers: getHeadersJsonAccessToken({ accessToken }),
        }
    );

    if (!response.ok) {
        throw response;
    }

    return await getStatementPairsSchema.parseAsync(await response.json());
}

export async function getStatementsPair(
    params: { statementsPairId: bigint } & AccessTokenParam
) {}
