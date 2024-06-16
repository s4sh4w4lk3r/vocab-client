"use client";

import { VStack, Button, Text } from "@chakra-ui/react";

export default function Error() {
    return (
        <VStack
            justifyContent={"center"}
            spacing={4}
        >
            <Text fontSize={80}>{"500"}</Text>
            <Text fontSize={64}>{"Произошла ошибка :("}</Text>
            <Button size={"lg"}>На главную</Button>
        </VStack>
    );
}
