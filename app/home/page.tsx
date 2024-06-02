import { getDictionaries, getStatementPairs } from "@/api/dictionaries";
import { auth } from "@/auth";
import { Card } from "@chakra-ui/react";
import React from "react";

export default async function page() {
    const session = await auth();
    if (!session) {
        return <div>Not authenticated</div>;
    }

    const dictionaries = await getDictionaries({ accessToken: session.accessToken, appendTopStatements: true, offset: 0 });
    const cards = dictionaries.map(x => <Card key={x.id}>{x.name}</Card>);
    const wordsPromise = dictionaries.map(x => getStatementPairs({ accessToken: session.accessToken, dictionaryId: x.id, offset: 0 }));
    const words = await Promise.all(wordsPromise);

    return <div>{cards}</div>;
}
