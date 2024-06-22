"use client";

import { createDictionary } from "@/api/serverActions/dictionaries";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import { Button, HStack, Input, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function HomePanel() {
    const [query, setQuery] = useState("");
    const toast = useToast();
    const router = useRouter();

    async function handleCreate() {
        await createDictionary({ name: query });
        setQuery("");
        toast({
            status: "success",
            duration: 2000,
            title: "Словарь создан",
        });
    }

    function handleSearch() {
        if (!query) {
            router.push(`/dictionaries`);
        }

        router.push(`/dictionaries?q=${query}`);
    }

    return (
        <HStack>
            <Input
                placeholder={"Имя словаря"}
                onChange={e => setQuery(e.target.value)}
                value={query}
                w={300}
            ></Input>
            <Button onClick={handleCreate}>
                <AddIcon />
            </Button>

            <Button onClick={handleSearch}>
                <Search2Icon />
            </Button>
        </HStack>
    );
}
