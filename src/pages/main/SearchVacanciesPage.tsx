import React from "react";
import {useFetchVacanciesQuery} from "../../store/superJobAPI";

export const SearchVacanciesPage = () => {
    const {data} = useFetchVacanciesQuery()
    return <>
        {data?.objects.map(o => <div key={o.id}>{o.firm_name}</div>)}
    </>
}