import { getDictionary } from "@/api/fetch/dictionaries";
import { getStatementPairs } from "@/api/fetch/statementsPairs";
import { auth } from "@/auth";
import DictionaryCard from "@/components/dictionary/DictionaryCard";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
    const session = await auth();
    if (!session) {
        throw session;
    }

    const getDictionaryPromise = getDictionary({
        accessToken: session.accessToken,
        dictionaryId: BigInt(params.id),
    });

    const getStatementsPairPromise = getStatementPairs({
        accessToken: session.accessToken,
        dictionaryId: BigInt(params.id),
        page: 0,
    });

    const [dictionary, statementPairs] = await Promise.all([
        getDictionaryPromise,
        getStatementsPairPromise,
    ]);

    return (
        <DictionaryCard
            id={dictionary.id}
            name={dictionary.name}
            statementPairs={statementPairs}
            key={dictionary.id}
        ></DictionaryCard>
    );
}
