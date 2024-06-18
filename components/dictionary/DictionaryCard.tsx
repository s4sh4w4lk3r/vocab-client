"use client";
import React, { useState } from "react";
import { z } from "zod";
import StatementPair from "../StatementPair";
import {
    Button,
    Center,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    StackDivider,
    VStack,
} from "@chakra-ui/react";
import { getStatementPairsSchema } from "@/zodSchemas/statementsPairsSchema";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { deleteDictionary } from "@/api/serverActions/dictionaries";
import { useRouter } from "next/navigation";

type Type = {
    id: bigint;
    name?: string;
    statementPairs: z.infer<typeof getStatementPairsSchema>;
};
export default function DictionaryCard({ id, name, statementPairs }: Type) {
    const [isTargetHidden, setIsTargetHidden] = useState(false);
    const router = useRouter();
    const statementsElement = statementPairs.map(x => (
        <StatementPair
            key={x.id}
            isTargetHidden={isTargetHidden}
            {...x}
        />
    ));

    const nameElement = name ? <Center>{name}</Center> : undefined;

    function setIsTargetHiddenHandler() {
        setIsTargetHidden(!isTargetHidden);
    }

    async function deleteDictionaryHandler() {
        await deleteDictionary({ dictionaryId: id });
        router.replace("/dictionaries");
    }

    async function renameDictionaryHandler() {}
    function importStatementsHandler() {}

    const buttons = (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
            >
                Actions
            </MenuButton>
            <MenuList>
                <MenuItem onClick={setIsTargetHiddenHandler}>
                    {isTargetHidden ? "Показать перевод" : "Скрыть перевод"}
                </MenuItem>
                <MenuItem onClick={importStatementsHandler}>Импорт</MenuItem>
                <MenuItem onClick={renameDictionaryHandler}>
                    Переименовать
                </MenuItem>
                <MenuItem onClick={deleteDictionaryHandler}>Удалить</MenuItem>
            </MenuList>
        </Menu>
    );

    return (
        <>
            {nameElement}
            {buttons}

            <VStack
                alignItems={"flex-start"}
                divider={<StackDivider />}
            >
                {statementsElement}
            </VStack>
        </>
    );
}
