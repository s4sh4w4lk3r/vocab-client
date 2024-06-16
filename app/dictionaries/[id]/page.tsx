import { getStatementPairs } from "@/api/fetch/statementsPairs";
import { auth } from "@/auth";
import StatementPair from "@/components/StatementPair";
import { StackDivider, VStack } from "@chakra-ui/react";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
    const session = await auth();
    if (!session) {
        return "Not authenticated";
    }

    const statements = (
        await getStatementPairs({
            accessToken: session.accessToken,
            dictionaryId: BigInt(params.id),
            offset: 0,
        })
    ).map(x => (
        <StatementPair
            key={x.id}
            isTargetHidden={true}
            {...x}
        />
    ));

    return (
        <VStack
            alignItems={"flex-start"}
            divider={<StackDivider />}
        >
            {statements}
        </VStack>
    );
}
