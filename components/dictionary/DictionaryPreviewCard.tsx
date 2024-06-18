"use client";
import { getDictionarySchema } from "@/zodSchemas/dictionariesSchema";
import { Button, Card, CardBody, CardHeader, HStack } from "@chakra-ui/react";
import { Text, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteDictionary } from "@/api/serverActions/dictionaries";

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

    function handleCardClick() {
        router.push(`/dictionaries/${id}`);
    }

    const statementsElement = statementPairs.map(x => (
        <Text key={x.id}>{`${x.source} - ${x.target}`}</Text>
    ));

    const hoverStyle = isHovered
        ? { borderColor: "pink", cursor: "pointer" }
        : undefined;

    const deleteButton = isHovered ? (
        <Button
            variant={"ghost"}
            borderRadius={150}
            position={"absolute"}
            right={0}
            top={0}
            mr={1}
            mt={1}
            onClick={async e => {
                e.stopPropagation();
                await deleteDictionary({ dictionaryId: id });
            }}
        >
            <DeleteIcon></DeleteIcon>
        </Button>
    ) : undefined;

    return (
        <Card
            maxW={"sm"}
            minW={72}
            borderWidth={"1px"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
            _hover={hoverStyle}
        >
            <CardHeader>
                {deleteButton}

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
