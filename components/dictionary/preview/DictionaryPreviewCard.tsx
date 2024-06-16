"use client";
import { deleteDictionary } from "@/api/serverActions/dictionaries";
import { getDictionarySchema } from "@/zodSchemas/dictionariesSchema";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardFooter, CardHeader, Heading, Modal, ModalBody, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { z } from "zod";

type Type = Pick<z.infer<typeof getDictionarySchema>, "id" | "name" | "statementPairs">;
export default function DictionaryPreviewCard({ id, name, statementPairs }: Type) {
    const [isHovered, setIsHovered] = useState(false);
    const disclosure = useDisclosure();
    const [modalAction, setAction] = useState();

    function handleModalActionChange({ action }: { action: "delete" | "rename" }) {
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

                <CardFooter justifyContent={"flex-end"}>
                    {isHovered ? (
                        <>
                            <DeleteIcon onClick={() => deleteDictionary({ dictionaryId: id })}></DeleteIcon>
                            <EditIcon onClick={() => alert("rename")}></EditIcon>
                        </>
                    ) : null}
                </CardFooter>
            </Card>

            <Modal {...disclosure}>
                <ModalBody></ModalBody>
            </Modal>
        </>
    );
}
