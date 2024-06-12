export type AccessTokenParam = { accessToken: string };

export function getHeadersJsonAccessToken({ accessToken }: AccessTokenParam): HeadersInit {
    return {
        "Content-Type": "",
        "Authorization": `Bearer ${accessToken}`,
    } satisfies HeadersInit;
}
