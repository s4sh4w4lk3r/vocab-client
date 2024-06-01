import { getDictionaries } from "@/api/dictionaries";
import { auth } from "@/auth";
import React from "react";

export default async function page() {
    const session = await auth();
    if (!session) {
        return <div>Not authenticated</div>;
    }

    const dictionaries = await getDictionaries(session.accessToken, 0);
    console.log(dictionaries);
    return <div></div>;
}
