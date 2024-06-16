import { Text } from "@chakra-ui/react";
import React from "react";

export default function StatementPair({
    id,
    source,
    target,
    isTargetHidden,
    guessingLevel,
}: {
    id: bigint;
    source: string;
    target: string;
    guessingLevel: number;
    isTargetHidden: boolean;
}) {
    const targetModel = isTargetHidden ? "" : ` - ${target}`;
    return <Text>{`${source} ${targetModel} ${guessingLevel}`} </Text>;
}
