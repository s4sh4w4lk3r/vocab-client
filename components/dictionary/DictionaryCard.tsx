"use client";
import { getDictionarySchema } from "@/zodSchemas/dictionariesSchema";
import React, { useState } from "react";
import { z } from "zod";
import StatementPair from "../StatementPair";
import { Center, StackDivider, VStack } from "@chakra-ui/react";
import { getStatementPairsSchema } from "@/zodSchemas/statementsPairsSchema";

type Type = Pick<z.infer<typeof getDictionarySchema>, "id" | "name"> & {
    statementPairs: z.infer<typeof getStatementPairsSchema>;
};
export default function DictionaryCard({ name, statementPairs }: Type) {
    //const [isTargetHidden, setIsTargetHidden] = useState(false);
    const statementsElement = statementPairs.map(x => (
        <StatementPair
            key={x.id}
            isTargetHidden={true}
            {...x}
        />
    ));

    return (
        <>
            <Center>{name}</Center>

            <VStack
                alignItems={"flex-start"}
                divider={<StackDivider />}
            >
                {statementsElement}
            </VStack>
        </>
    );
}
