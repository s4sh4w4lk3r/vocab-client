type AccessToken = { accessToken: string };
type PositiveActionResponse = { success: true; locationId?: bigint };
type PositiveFetchReponse<T> = { success: true; value: T };
type AuthReturnType = ({ success: true } & AccessToken) | NegativeReponse;
type FetchResponse<T> = PositiveFetchReponse<T> | NegativeReponse;

export type NegativeReponse = {
    success: false;
    problemDetails: z.infer<typeof problemDetailsSchema>;
};
export type ActionResponse = PositiveActionResponse | NegativeReponse;
