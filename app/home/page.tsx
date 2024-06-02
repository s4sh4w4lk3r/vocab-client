import { getDictionaries } from "@/api/dictionaries";
import { auth } from "@/auth";
import { Card } from "@chakra-ui/react";
import React from "react";

export default async function page() {
    const session = await auth();
    if (!session) {
        return <div>Not authenticated</div>;
    }

    const dictionaries = await getDictionaries(session.accessToken, 0, true);
    console.log(dictionaries);
    const cards = dictionaries.map(x => <Card key={x.id}>{x.name}</Card>);
    return <div>{cards}</div>;
}
