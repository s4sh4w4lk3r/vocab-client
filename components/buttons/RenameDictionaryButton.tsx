"use client";
import { renameDictionary } from "@/api/serverActions/dictionaries";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

type Type = { dictionaryId: bigint; isHidden: boolean };
export default function RenameDictionaryButton({
    dictionaryId,
    isHidden,
}: Type) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState("");

    return (
        <>
            <Button
                hidden={isHidden}
                onClick={() => onOpen()}
                colorScheme="blue"
                size={"sm"}
            >
                Переименовать
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Переименуй меня</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Новое имя"
                            onInput={e => setName(e.currentTarget.value)}
                        ></Input>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            onClick={async () => {
                                await renameDictionary({
                                    dictionaryId,
                                    name: name,
                                });
                                onClose();
                            }}
                        >
                            Сохранить
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
