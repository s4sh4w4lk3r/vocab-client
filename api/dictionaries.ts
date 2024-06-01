import serverConfig from "@/config/serverConfig";
import { getDictionairesSchema } from "@/zodSchemas/dictionariesSchema";
import { resultVocabSchema } from "@/zodSchemas/resultVocabSchema";
import { z } from "zod";

export async function getDictionaries(accessToken: string, offset: number): Promise<z.infer<typeof getDictionairesSchema>> {
    const response = await fetch(`${serverConfig.api.baseUrl}/dictionaries?offset=${offset}`, {
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
