"use client";
import { getDictionarySchema } from "@/zodSchemas/dictionariesSchema";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    HStack,
    useToast,
} from "@chakra-ui/react";
import { Text, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteDictionary } from "@/api/serverActions/dictionaries";
import { getStatementPairsSchema } from "@/zodSchemas/statementsPairsSchema";

type Type = {
    dictionary: Pick<z.infer<typeof getDictionarySchema>, "id" | "name">;
    statementPairs: z.infer<typeof getStatementPairsSchema>;
};
export default function DictionaryPreviewCard(params: Type) {
    const { dictionary, statementPairs } = params;

    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const toast = useToast();

    function handleMouseEnter() {
        setIsHovered(true);
        router.prefetch(`/dictionaries/${dictionary.id}`);
    }

    function handleMouseLeave() {
        setIsHovered(false);
    }

    function handleCardClick() {
        router.push(`/dictionaries/${dictionary.id}`);
    }

    async function handleDelete(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.stopPropagation();
        await deleteDictionary({ dictionaryId: dictionary.id });
        toast({ status: "success", duration: 2000, title: "Словарь удален" });
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
            onClick={handleDelete}
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
                    {dictionary.name}
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
