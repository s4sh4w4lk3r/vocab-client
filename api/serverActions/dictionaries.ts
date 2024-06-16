"use server";

import { auth } from "@/auth";
import serverConfig from "@/config/serverConfig";
import { bearerHeader } from "../sharedTypes";
import { revalidateTag } from "next/cache";
import RevalidationTags from "./revalidationTags";

const apiUrl = serverConfig.api.baseUrl;
export async function createDictionary({ name }: { name: string }) {
    const session = await checkIsAuthenticated();
    if (!session.isAuthenticated) {
        throw "Not authenticated";
    }

    const headers = new Headers();
    headers.append(bearerHeader.key, bearerHeader.value(session.accessToken));

    const respone = await fetch(`${apiUrl}/dictionaries?name=${encodeURI(name)}`, {
        method: "POST",
        headers: headers,
    });

    if (!respone.ok) {
        throw respone;
    }

    revalidateTag(RevalidationTags.Dictionaries);
}

export async function deleteDictionary({ dictionaryId }: { dictionaryId: bigint }) {
    const session = await checkIsAuthenticated();
    if (!session.isAuthenticated) {
        throw "Not authenticated";
    }

    const headers = new Headers();
    headers.append(bearerHeader.key, bearerHeader.value(session.accessToken));

    const respone = await fetch(`${apiUrl}/dictionaries/${dictionaryId}`, {
        method: "DELETE",
        headers: headers,
    });

    if (!respone.ok) {
        throw respone;
    }

    revalidateTag(RevalidationTags.Dictionaries);
}

export async function renameDictionary({ dictionaryId, name }: { dictionaryId: bigint; name: string }) {
    const session = await checkIsAuthenticated();
    if (!session.isAuthenticated) {
        throw "Not authenticated";
    }

    const headers = new Headers();
    headers.append(bearerHeader.key, bearerHeader.value(session.accessToken));

    const respone = await fetch(`${apiUrl}/dictionaries/${dictionaryId}/set/name/${encodeURI(name)}`, {
        method: "PATCH",
    });

    if (!respone.ok) {
        throw respone;
    }
}

async function checkIsAuthenticated(): Promise<{ isAuthenticated: true; accessToken: string } | { isAuthenticated: false }> {
    const session = await auth();
    return session ? { isAuthenticated: true, accessToken: session.accessToken } : { isAuthenticated: false };
}
