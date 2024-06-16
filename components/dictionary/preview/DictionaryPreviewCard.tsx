"use client";
import { getDictionarySchema } from "@/zodSchemas/dictionariesSchema";
import {
    Card,
    CardBody,
    CardHeader,
    HStack,
    Heading,
    Modal,
    ModalBody,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { z } from "zod";
import DeleteDictionaryButton from "../../buttons/DeleteDictionaryButton";
import RenameDictionaryButton from "../../buttons/RenameDictionaryButton";

type Type = Pick<
    z.infer<typeof getDictionarySchema>,
    "id" | "name" | "statementPairs"
>;
export default function DictionaryPreviewCard({
    id,
    name,
    statementPairs,
}: Type) {
    const [isHovered, setIsHovered] = useState(false);
    const disclosure = useDisclosure();
    const [modalAction, setAction] = useState();

    function handleModalActionChange({
        action,
    }: {
        action: "delete" | "rename";
    }) {
        switch (action) {
            case "delete":
                break;

            case "rename":
                break;

            default:
                break;
        }
    }

    return (
        <>
            <Card
                maxW={"sm"}
                minW={72}
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

                <HStack
                    justifyContent={"center"}
                    w={"full"}
                    flexDirection={"row"}
                    gap={3}
                    p={5}
                    h={"35px"}
                    mb={3}
                >
                    <RenameDictionaryButton
                        dictionaryId={id}
                        isHidden={!isHovered}
                    />
                    <DeleteDictionaryButton
                        dictionaryId={id}
                        isHidden={!isHovered}
                    />
                </HStack>
            </Card>

            <Modal {...disclosure}>
                <ModalBody></ModalBody>
            </Modal>
        </>
    );
}
