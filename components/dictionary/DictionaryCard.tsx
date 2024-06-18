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

    function handleSetIsTargetHidden() {
        setIsTargetHidden(!isTargetHidden);
    }

    async function handleDelete() {
        await deleteDictionary({ dictionaryId: id });
        router.replace("/dictionaries");
    }

    async function handleRename() {}
    function handleImport() {}

    const buttons = (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
            >
                Actions
            </MenuButton>
            <MenuList>
                <MenuItem onClick={handleSetIsTargetHidden}>
                    {isTargetHidden ? "Показать перевод" : "Скрыть перевод"}
                </MenuItem>
                <MenuItem onClick={handleImport}>Импорт</MenuItem>
                <MenuItem onClick={handleRename}>Переименовать</MenuItem>
                <MenuItem onClick={handleDelete}>Удалить</MenuItem>
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
