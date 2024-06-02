"use client";

import { getDictionarySchema } from "@/zodSchemas/dictionariesSchema";
import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { z } from "zod";

type Type = Pick<z.infer<typeof getDictionarySchema>, "id" | "name" | "statementPairs">;
export default function DictionaryPreviewCard({ id, name, statementPairs }: Type) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <Card
            maxW={"sm"}
            borderWidth={"1px"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            _hover={isHovered ? { borderColor: "pink" } : undefined}
        >
            <CardHeader>
                <Heading
                    size={"md"}
                    noOfLines={2}
                >
                    {name}
                </Heading>
            </CardHeader>
            <CardBody>
                {statementPairs.map(x => (
                    <Text key={x.id}>{`${x.source} - ${x.target}`}</Text>
                ))}
            </CardBody>
        </Card>
    );
}
