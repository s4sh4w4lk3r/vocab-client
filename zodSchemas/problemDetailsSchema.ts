import { z } from "zod";

export enum ErrorType {
    Failure = 0,
    Validation = 1,
    NotFound = 2,
    Conflict = 3,
}

export enum StatusCode {
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    Conflict = 409,
}

export default z.object({
    title: z.string().trim().min(1),
    status: z.nativeEnum(StatusCode),
    errors: z.array(
        z.object({
            code: z.string().trim().min(1),
            description: z.string().trim().min(1),
            errorType: z.nativeEnum(ErrorType),
        })
    ),
});
