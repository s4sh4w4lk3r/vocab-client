import { deleteDictionary, renameDictionary } from "@/api/actions/dictionaries";
import { Button } from "@chakra-ui/react";
import React from "react";

export default function TestButton() {
    return <Button onClick={() => deleteDictionary({ id: BigInt(13) })}></Button>;
}
