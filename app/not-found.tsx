import GoToMainPageButton from "@/components/buttons/GoToMainPageButton";
import { Text, VStack } from "@chakra-ui/react";

export default function NotFound() {
    return (
        <VStack
            justifyContent={"center"}
            spacing={4}
        >
            <Text fontSize={80}>{"404"}</Text>
            <Text fontSize={64}>{"Страница не найдена :("}</Text>
            <GoToMainPageButton />
        </VStack>
    );
}
