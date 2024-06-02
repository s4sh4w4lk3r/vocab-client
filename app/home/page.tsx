import { getDictionaries, getStatementPairs } from "@/api/dictionaries";
import { auth } from "@/auth";
import DictionaryPreviewCard from "@/components/dictionary/DictionaryPreviewCard";

import { Flex } from "@chakra-ui/react";
import React from "react";

export default async function page() {
    const session = await auth();
    if (!session) {
        return <div>Not authenticated</div>;
    }

    const dictionaries = await getDictionaries({ accessToken: session.accessToken, appendTopStatements: true, offset: 0 });
    const cards = dictionaries.map(x => (
        <DictionaryPreviewCard
            key={x.id}
            {...x}
        ></DictionaryPreviewCard>
    ));
    // TODO: добавить возможность упорядочивать элементы и сохр в бд.
    return <Flex gap={7}>{cards}</Flex>;
}
