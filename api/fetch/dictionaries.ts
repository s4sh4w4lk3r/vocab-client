import serverConfig from "@/config/serverConfig";
import {
    getDictionairesSchema,
    getDictionarySchema,
} from "@/zodSchemas/dictionariesSchema";
import { z } from "zod";
import { AccessTokenParam, getHeadersJsonAccessToken } from "../sharedTypes";

export async function getDictionaries({
    accessToken,
    appendTopStatements,
    offset,
}: {
    offset: number;
    appendTopStatements: boolean;
} & AccessTokenParam): Promise<z.infer<typeof getDictionairesSchema>> {
    const response = await fetch(
        `${serverConfig.api.baseUrl}/dictionaries?offset=${offset}&appendTopStatements=${appendTopStatements}`,
        {
            headers: getHeadersJsonAccessToken({ accessToken }),
        }
    );

    if (!response.ok) {
        throw response;
    }

    return await getDictionairesSchema.parseAsync(await response.json());
}

export async function getDictionary({
    accessToken,
    dictionaryId,
}: {
    dictionaryId: BigInt;
} & AccessTokenParam): Promise<z.infer<typeof getDictionarySchema>> {
    const response = await fetch(
        `${serverConfig.api.baseUrl}/dictionaries/${dictionaryId}`,
        {
            headers: getHeadersJsonAccessToken({ accessToken }),
        }
    );

    if (!response.ok) {
        throw response;
    }

    return await getDictionarySchema.parseAsync(await response.json());
}
