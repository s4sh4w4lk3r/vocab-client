export type AccessTokenParam = { accessToken: string };

export const jsonContentTypeHeader = { key: "Content-Type", value: "application/json" };
export const bearerHeader = {
    key: "Authorization",
    value: (accessToken: string) => `Bearer ${accessToken}`,
};

export function getHeadersJsonAccessToken({ accessToken }: AccessTokenParam): HeadersInit {
    return {
        "Content-Type": jsonContentTypeHeader.value,
        "Authorization": bearerHeader.value(accessToken),
    } satisfies HeadersInit;
}
