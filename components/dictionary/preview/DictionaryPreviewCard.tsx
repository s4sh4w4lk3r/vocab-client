"use client";
import { getDictionarySchema } from "@/zodSchemas/dictionariesSchema";
import { Card, CardBody, CardHeader, HStack } from "@chakra-ui/react";
import { Text, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

type Type = Pick<
    z.infer<typeof getDictionarySchema>,
    "id" | "name" | "statementPairs"
>;
export default function DictionaryPreviewCard(params: Type) {
    const { id, name, statementPairs } = params;

    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseEnter() {
        setIsHovered(true);
        router.prefetch(`/dictionaries/${id}`);
    }

    function handleMouseLeave() {
        setIsHovered(false);
    }

    function handleClick() {
        router.push(`/dictionaries/${id}`);
    }

    const statementsElement = statementPairs.map(x => (
        <Text key={x.id}>{`${x.source} - ${x.target}`}</Text>
    ));

    const hoverStyle = isHovered
        ? { borderColor: "pink", cursor: "pointer" }
        : undefined;

    return (
        <Card
            maxW={"sm"}
            minW={72}
            borderWidth={"1px"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            _hover={hoverStyle}
        >
            <CardHeader>
                <Heading
                    size={"md"}
                    noOfLines={2}
                >
                    {name}
                </Heading>
            </CardHeader>
            <CardBody>{statementsElement}</CardBody>

            <HStack
                justifyContent={"center"}
                w={"full"}
                flexDirection={"row"}
                gap={3}
                p={5}
                h={"35px"}
                mb={3}
            ></HStack>
        </Card>
    );
}
