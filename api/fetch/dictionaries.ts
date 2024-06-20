import serverConfig from "@/config/serverConfig";
import {
    getDictionairesSchema,
    getDictionarySchema,
} from "@/zodSchemas/dictionariesSchema";
import { z } from "zod";
import {
    AccessTokenParam,
    AppendAction,
    getHeadersJsonAccessToken,
} from "../sharedTypes";

export async function getDictionaries({
    accessToken,
    appendAction,
    searchQuery,
    offset,
}: {
    offset: number;
    searchQuery?: string;
} & AccessTokenParam &
    AppendAction): Promise<z.infer<typeof getDictionairesSchema>> {
    let path = `/dictionaries?offset=${offset}&appendAction=${appendAction}`;

    if (searchQuery) {
        path += `&searchQuery=${searchQuery}`;
    }

    const response = await fetch(`${serverConfig.api.baseUrl}${path}`, {
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
    dictionaryId: BigInt;
} & AccessTokenParam &
    AppendAction): Promise<z.infer<typeof getDictionarySchema>> {
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
