"use server";
import clientConfig from "@/config/clientConfig";
import { StatementCategory } from "@/zodSchemas/statementsPairsSchema";
import {
    checkAuth,
    getIdFromEndLocationHeader,
    handleUnsuccessfulResponse,
} from "../shared/helpers";
import { ActionResponse } from "../shared/types";

const baseUrl = `${clientConfig.api.baseUrl}/statements`;
export async function createStatement(statement: {
    source: string;
    target: string;
    statementCategory: StatementCategory;
    relatedDictionaryId: bigint;
}): Promise<ActionResponse> {
    const session = await checkAuth();
    if (!session.success) {
        return session;
    }

    const statementSafeBigint = {
        ...statement,
        relatedDictionaryId: statement.relatedDictionaryId.toString(),
    };

    const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(statementSafeBigint),
    });

    if (response.ok) {
        const id = getIdFromEndLocationHeader({ response: response });
        return { success: true, locationId: id };
    }
    return handleUnsuccessfulResponse({ response });
}
export async function deleteStatement({ id }: { id: bigint }): Promise<ActionResponse> {
    const session = await checkAuth();
    if (!session.success) {
        return session;
    }

    const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${session.accessToken}`,
        },
    });

    if (response.ok) {
        return { success: true };
    }
    return handleUnsuccessfulResponse({ response });
}
export async function updateStatementSource({ id, source }: { id: bigint; source: string }) {
    const session = await checkAuth();
    if (!session.success) {
        return session;
    }

    source = encodeURIComponent(source);
    const response = await fetch(`${baseUrl}/${id}?source=${source}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${session.accessToken}`,
        },
    });

    if (response.ok) {
        return { success: true };
    }
    return handleUnsuccessfulResponse({ response });
}

export async function updateStatementTarget({ id, target }: { id: bigint; target: string }) {
    const session = await checkAuth();
    if (!session.success) {
        return session;
    }

    target = encodeURIComponent(target);
    const response = await fetch(`${baseUrl}/${id}?target=${target}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${session.accessToken}`,
        },
    });

    if (response.ok) {
        return { success: true };
    }
    return handleUnsuccessfulResponse({ response });
}

export async function updateStatementCategory({
    id,
    statementCategory,
}: {
    id: bigint;
    statementCategory: StatementCategory;
}) {
    const session = await checkAuth();
    if (!session.success) {
        return session;
    }

    const response = await fetch(`${baseUrl}/${id}?statementCategory=${statementCategory}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${session.accessToken}`,
        },
    });

    if (response.ok) {
        return { success: true };
    }
    return handleUnsuccessfulResponse({ response });
}
