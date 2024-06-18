"use client";

import { createDictionary } from "@/api/serverActions/dictionaries";
import { AddIcon } from "@chakra-ui/icons";
import { Button, HStack, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

export default function HomePanel() {
    const [query, setQuery] = useState("");
    const toast = useToast();

    async function handleCreate() {
        await createDictionary({ name: query });
        setQuery("");
        toast({
            status: "success",
            duration: 2000,
            title: "Словарь создан",
        });
    }

    return (
        <HStack>
            <Input
                placeholder={"Введите имя нового словаря"}
                onChange={e => setQuery(e.target.value)}
                value={query}
                w={300}
            ></Input>
            <Button onClick={handleCreate}>
                <AddIcon />
            </Button>
        </HStack>
    );
}
