import {
    getDictionairesSchema,
    getDictionarySchema,
} from "@/zodSchemas/dictionariesSchema";
import { z } from "zod";
import { AccessTokenParam, getHeadersJsonAccessToken } from "../sharedTypes";
import clientConfig from "@/config/clientConfig";

export async function getDictionaries({
    accessToken,
    appendStatements,
    page,
    searchQuery,
}: {
    searchQuery?: string;
    appendStatements: boolean;
    page: number;
} & AccessTokenParam): Promise<z.infer<typeof getDictionairesSchema>> {
    let path = `/dictionaries?page=${page}&appendStatements=${appendStatements}`;

    path += searchQuery ? searchQuery : "";

    const response = await fetch(`${clientConfig.api.baseUrl}${path}`, {
        headers: getHeadersJsonAccessToken({ accessToken }),
    });

    if (!response.ok) {
        throw response;
    }

    return await getDictionairesSchema.parseAsync(await response.json());
}

export async function getDictionary({
    accessToken,
    dictionaryId,
}: {
    dictionaryId: bigint;
} & AccessTokenParam): Promise<z.infer<typeof getDictionarySchema>> {
    const response = await fetch(
        `${clientConfig.api.baseUrl}/dictionaries/${dictionaryId}`,
        {
            headers: getHeadersJsonAccessToken({ accessToken }),
        }
    );

    if (!response.ok) {
        throw response;
    }

    return await getDictionarySchema.parseAsync(await response.json());
}
