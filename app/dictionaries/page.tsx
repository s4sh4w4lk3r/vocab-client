import { getDictionaries } from "@/api/fetch/dictionaries";
import { auth } from "@/auth";
import HomePanel from "@/components/dictionary/HomePanel";
import DictionaryPreviewCard from "@/components/dictionary/preview/DictionaryPreviewCard";
import { HStack } from "@chakra-ui/react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Словари",
} satisfies Metadata;

export default async function page() {
    const session = await auth();
    if (!session) {
        return <div>Not authenticated</div>;
    }

    const dictionaries = (
        await getDictionaries({
            accessToken: session.accessToken,
            appendTopStatements: true,
            offset: 0,
        })
    ).sort((a, b) =>
        a.lastModified.getTime() < b.lastModified.getTime() ? 1 : -1
    );

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
                alignItems={"flex-start"}
                m={5}
            >
                <HomePanel></HomePanel>
            </HStack>

            <HStack
                gap={7}
                mx={10}
                flexWrap={"wrap"}
            >
                {cards}
            </HStack>
        </>
    );
}
