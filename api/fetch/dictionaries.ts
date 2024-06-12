import serverConfig from "@/config/serverConfig";
import { getDictionairesSchema } from "@/zodSchemas/dictionariesSchema";
import { z } from "zod";
import { AccessTokenParam, getHeadersJsonAccessToken } from "../sharedTypes";

type getDictionariesParams = { offset: number; appendTopStatements: boolean } & AccessTokenParam;
type getDictionariesReturnType = z.infer<typeof getDictionairesSchema>;
export async function getDictionaries({ accessToken, appendTopStatements, offset }: getDictionariesParams): Promise<getDictionariesReturnType> {
    const response = await fetch(`${serverConfig.api.baseUrl}/dictionaries?offset=${offset}&appendTopStatements=${appendTopStatements}`, {
        headers: getHeadersJsonAccessToken({ accessToken }),
    });

    if (!response.ok) {
        throw response;
    }

    return await getDictionairesSchema.parseAsync(await response.json());
}
