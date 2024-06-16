"use client";

import { createDictionary } from "@/api/serverActions/dictionaries";
import { AddIcon } from "@chakra-ui/icons";
import { Button, HStack, Input } from "@chakra-ui/react";
import React, { useState } from "react";

export default function HomePanel() {
    const [query, setQuery] = useState("");

    return (
        <HStack>
            <Input
                placeholder={"Введите имя нового словаря"}
                onChange={e => setQuery(e.target.value)}
                w={300}
            ></Input>
            <Button
                onClick={async () => await createDictionary({ name: query })}
            >
                <AddIcon />
            </Button>
        </HStack>
    );
}
