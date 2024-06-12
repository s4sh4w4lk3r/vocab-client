"use client";

import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";

export default function AddDictionaryButton({}: { onClick: () => void }) {
    return (
        <Button>
            <AddIcon />
        </Button>
    );
}
