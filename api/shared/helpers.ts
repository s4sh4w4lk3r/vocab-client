import { auth } from "@/auth";
import problemDetailsSchema, { ErrorType, StatusCode } from "@/zodSchemas/problemDetailsSchema";
import { AuthReturnType, NegativeReponse } from "./types";

const clientStatusCodes = [400, 404, 409];
export async function checkAuth(): Promise<AuthReturnType> {
    const session = await auth();
    if (!session?.user) {
        return {
            success: false,
            problemDetails: {
                status: StatusCode.Unauthorized,
                title: "Unauthorized",
                error: [
                    {
                        code: "Unauthorized",
                        errorType: ErrorType.Failure,
                        description: "Доступ запрещен.",
                    },
                ],
            },
        };
    }
    return { success: true, accessToken: session.accessToken };
}

export function getIdFromEndLocationHeader({ response }: { response: Response }): bigint {
    if (!response.ok) {
        throw "В функцию 'getIdFromEndLocationHeader' поступил HTTP отрицательный ответ.";
    }

    const splittedUrlArray = response.headers.get("Location")?.split("/");
    const idStr = splittedUrlArray!.findLast(x => x)!;
    return BigInt(idStr);
}

export async function handleUnsuccessfulResponse({
    response,
}: {
    response: Response;
}): Promise<NegativeReponse> {
    if (
        clientStatusCodes.includes(response.status) &&
        response.headers.get("Content-Type") === "application/problem+json; charset=utf-8"
    ) {
        return {
            success: false,
            problemDetails: problemDetailsSchema.parse(await response.json()),
        };
    }

    return {
        success: false,
        problemDetails: {
            status: response.status,
            title: response.statusText,
            errors: [
                {
                    errorType: ErrorType.Failure,
                    description: await response.text(),
                    code: response.statusText,
                },
            ],
        },
    };
}
