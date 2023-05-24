import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {FilterParamsType} from "../pages/main/SearchVacanciesPage";

export type TokenType = {
    access_token: string
    refresh_token: string
    ttl: number
    expires_in: number
    token_type: string
}
export type VacancyType = {
    id: number
    profession: string
    firm_name: string
    town: { title: string }
    catalogues: Array<{ title: string }>
    type_of_work: { title: string }
    payment_to: number
    payment_from: number
    currency: 'rub' | 'uah' | 'uzs'
}

export type VacanciesResponseType = {
    objects: Array<VacancyType>
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
        fetchVacancies: builder.query<VacanciesResponseType, FilterParamsType>({
            query: (params) => {
                const keyWordParam = params.keyword !== '' ? '&keyword=' + params.keyword : ''
                const catalogParam = params.catalogues !== '' ? '&catalogues=' + params.catalogues : ''
                const payFromParam = params.payment_from !== '' ? '&payment_from=' + params.payment_from : ''
                const payToParam = params.payment_from !== '' ? '&payment_to=' + params.payment_to : ''
                return `/vacancies/?published=1&count=4${keyWordParam}${catalogParam}${payFromParam}${payToParam}`
            }
        }),
        getCatalogues: builder.query<Array<{ title: string, key: number }>, void>({
            query: () => '/catalogues/'
        }),
        getFavorites: builder.query<VacanciesResponseType, Array<string>>({
            query: (favoritesID) => `/vacancies/?ids[]=${favoritesID.join('&ids[]=')}`
        }),
        getVacancy: builder.query<VacancyType & { vacancyRichText: string }, string>({
            query: (id) => `/vacancies/${id}/`
        }),
    }),
})

export const {
    useGetTokenQuery,
    useLazyFetchVacanciesQuery,
    useGetCataloguesQuery,
    useLazyGetFavoritesQuery,
    useGetVacancyQuery,
} = superJobAPI