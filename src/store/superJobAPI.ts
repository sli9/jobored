import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export type TokenType = {
    access_token: string
    refresh_token: string
    ttl: number
    expires_in: number
    token_type:	string
}

export type VacanciesResponseType = {
    objects: Array<{
        id: number
        profession: string
        firm_name: string
        town: { title: string }
        catalogues: Array<{ title: string }>
        type_of_work: { title: string }
        payment_to: number
        payment_from: number
        currency: 'rub' | 'uah' | 'uzs'
    }>
}

export const superJobAPI = createApi({
    reducerPath: 'superJobAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://startup-summer-2023-proxy.onrender.com/2.0/',
        prepareHeaders(headers) {
            headers.set('x-secret-key', 'GEU4nvd3rej*jeh.eqp')
            headers.set('X-Api-App-Id', 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948')

            const token = localStorage.getItem('token')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getToken: builder.query<TokenType, void>({
            query: () => '/oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
        }),
        fetchVacancies: builder.query<VacanciesResponseType, string>({
            query: (keyword) => `/vacancies/?published=1&count=4&keyword=${keyword}`
        }),
        getCatalogues: builder.query<Array<{ title: string, key: number }>, void>({
            query: () => '/catalogues/'
        }),
    }),
})

export const {useGetTokenQuery, useLazyFetchVacanciesQuery, useGetCataloguesQuery} = superJobAPI