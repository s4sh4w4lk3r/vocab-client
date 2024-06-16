import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function GoToMainPageButton() {
    return (
        <Link href={"/"}>
            <Button size={"lg"}>На главную</Button>
        </Link>
    );
}
