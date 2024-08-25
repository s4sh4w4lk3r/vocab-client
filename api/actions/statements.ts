import { StatementCategory } from "@/zodSchemas/statementsPairsSchema";

export async function createStatement({
    source,
    target,
    category,
}: {
    source: string;
    target: string;
    category?: StatementCategory;
}) {}
export async function deleteStatement({ id }: { id: bigint }) {}
export async function updateStatementSource({ id, source }: { id: bigint; source: string }) {}

export async function updateStatementTarget({ id, target }: { id: bigint; target: string }) {}

export async function updateStatementCategory({
    id,
    category,
}: {
    id: bigint;
    category: StatementCategory;
}) {}
