import { getDictionaries } from "@/api/fetch/dictionaries";
import { auth } from "@/auth";
import HomePanel from "@/components/dictionary/HomePanel";
import DictionaryPreviewCard from "@/components/dictionary/preview/DictionaryPreviewCard";

import { Flex, HStack } from "@chakra-ui/react";
import React from "react";

export default async function page() {
    const session = await auth();
    if (!session) {
        return <div>Not authenticated</div>;
    }

    const dictionaries = await getDictionaries({ accessToken: session.accessToken, appendTopStatements: true, offset: 0 });

    const cards = dictionaries.map(x => (
        <DictionaryPreviewCard
            key={x.id}
            {...x}
        ></DictionaryPreviewCard>
    ));

    return (
        <>
            <HStack
                justifyContent={"center"}
                m={5}
            >
                <HomePanel></HomePanel>
            </HStack>
            <Flex
                gap={7}
                mx={10}
            >
                {cards}
            </Flex>
        </>
    );
}
