"use server";
import clientConfig from "@/config/clientConfig";
import {
    checkAuth,
    getIdFromEndLocationHeader,
    handleUnsuccessfulResponse,
} from "../shared/helpers";
import { ActionResponse } from "../shared/types";

const baseUrl = `${clientConfig.api.baseUrl}/dictionaries`;

export async function createDictionary({ name }: { name: string }): Promise<ActionResponse> {
    const session = await checkAuth();
    if (!session.success) {
        return session;
    }

    name = encodeURIComponent(name);
    const url = `${baseUrl}?name=${name}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Authorization": `Bearer ${session.accessToken}` },
    });

    if (response.ok) {
        const id = getIdFromEndLocationHeader({ response: response });
        return { success: true, locationId: id };
    }

    return handleUnsuccessfulResponse({ response });
}

export async function deleteDictionary({ id }: { id: bigint }): Promise<ActionResponse> {
    const session = await checkAuth();
    if (!session.success) {
        return session;
    }

    const url = `${baseUrl}/${id}`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${session.accessToken}` },
    });

    if (response.ok) {
        return { success: true };
    }

    return handleUnsuccessfulResponse({ response });
}

export async function renameDictionary({
    id,
    name,
}: {
    id: bigint;
    name: string;
}): Promise<ActionResponse> {
    const session = await checkAuth();
    if (!session.success) {
        return session;
    }

    name = encodeURIComponent(name);
    const url = `${baseUrl}/${id}?name=${name}`;

    const response = await fetch(url, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${session.accessToken}` },
    });

    if (response.ok) {
        return { success: true };
    }

    return handleUnsuccessfulResponse({ response });
}
