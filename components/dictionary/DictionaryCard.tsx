"use client";
import React, { useState } from "react";
import { z } from "zod";
import StatementPair from "../StatementPair";
import {
    ModalBody,
    ModalCloseButton,
    ModalContent,
    VStack,
    useDisclosure,
    Text,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    StackDivider,
    Button,
    Center,
    HStack,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
} from "@chakra-ui/react";
import { getStatementPairsSchema } from "@/zodSchemas/statementsPairsSchema";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
    deleteDictionary,
    renameDictionary,
} from "@/api/serverActions/dictionaries";
import { useRouter } from "next/navigation";

type Type = {
    id: bigint;
    name?: string;
    statementPairs: z.infer<typeof getStatementPairsSchema>;
};
export default function DictionaryCard({ id, name, statementPairs }: Type) {
    const [isTargetHidden, setIsTargetHidden] = useState(false);
    const router = useRouter();
    const [newName, setNewName] = useState("");
    const disclosure = useDisclosure();

    function handleSetIsTargetHidden() {
        setIsTargetHidden(!isTargetHidden);
    }

    async function handleDelete() {
        await deleteDictionary({ dictionaryId: id });
        router.replace("/dictionaries");
    }

    function handleOpenRenameModal() {
        disclosure.onOpen();
    }
    function handleImport() {}

    async function handleRename() {
        await renameDictionary({ dictionaryId: id, name: newName });
        disclosure.onClose();
    }

    const statementsElement =
        statementPairs.length > 0 ? (
            statementPairs.map(x => (
                <StatementPair
                    key={x.id}
                    isTargetHidden={isTargetHidden}
                    {...x}
                />
            ))
        ) : (
            <VStack w={"full"}>
                <Text fontSize={"x-large"}>Словарь пока пустой</Text>
                <Text fontSize={"large"}>Добавьте в него что-нибудь</Text>
            </VStack>
        );

    const nameElement = name ? <Center>{name}</Center> : undefined;

    const menu = (
        <Menu>
            <HStack mx={5}>
                <MenuButton
                    as={Button}
                    // rightIcon={<ChevronDownIcon />}
                    // leftIcon={<HamburgerIcon />}
                    ml={"auto"}
                    mr={"0"}
                >
                    <HamburgerIcon />
                </MenuButton>
            </HStack>
            <MenuList>
                <MenuItem onClick={handleSetIsTargetHidden}>
                    {isTargetHidden ? "Показать перевод" : "Скрыть перевод"}
                </MenuItem>
                <MenuItem onClick={handleImport}>Импорт</MenuItem>
                <MenuItem onClick={handleOpenRenameModal}>
                    Переименовать
                </MenuItem>
                <MenuItem onClick={handleDelete}>Удалить</MenuItem>
            </MenuList>
        </Menu>
    );

    const modal = (
        <Modal {...disclosure}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Переименуй меня</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                        ></Input>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            onClick={handleRename}
                        >
                            Переименовать
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    );

    return (
        <>
            {nameElement}
            {menu}

            <VStack
                alignItems={"flex-start"}
                divider={<StackDivider />}
                my={10}
            >
                {statementsElement}
            </VStack>

            {modal}
        </>
    );
}
