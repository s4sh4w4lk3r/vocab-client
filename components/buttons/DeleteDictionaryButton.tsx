"use client";
import { deleteDictionary } from "@/api/serverActions/dictionaries";
import { Button } from "@chakra-ui/react";
import React from "react";

type Type = { dictionaryId: bigint; isHidden: boolean };
export default function DeleteDictionaryButton({
    dictionaryId,
    isHidden,
}: Type) {
    return (
        <Button
            size={"sm"}
            hidden={isHidden}
            onClick={() => deleteDictionary({ dictionaryId })}
            colorScheme="red"
        >
            Удалить
        </Button>
    );
}
