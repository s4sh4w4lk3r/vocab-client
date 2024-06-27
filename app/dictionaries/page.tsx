import { auth } from "@/auth";
import HomePanel from "@/components/dictionary/HomePanel";
import DictionaryPreviewCard from "@/components/dictionary/DictionaryPreviewCard";
import { HStack } from "@chakra-ui/react";
import { Metadata } from "next";
import React from "react";
import { getDictionaries } from "@/api/fetch/dictionaries";

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
            page: 0,
            appendStatements: true,
        })
    ).sort((a, b) =>
        a.lastModified.getTime() < b.lastModified.getTime() ? 1 : -1
    );

    const dictionaryCards = dictionaries.map(x => (
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
                {dictionaryCards}
            </HStack>
        </>
    );
}
