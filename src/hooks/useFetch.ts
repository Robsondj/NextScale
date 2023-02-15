import { useEffect, useState } from "react";
import { UseFetchType } from "../types"

const useFetch = (url: string, method: string): UseFetchType => {

    const [data, setData] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL_API}${url}`, {
            method: method,
            headers: {
                ["Content-Type"]: "application/json",
                Authorization: `Bearer ${process.env.API_TOKEN}`
            }
          })
            .then((serverResponse) => {
                return serverResponse.json();
            })
            .then((response) => {
                setData(response.data);
                setLoading(false)
            })
            .catch((err) => {
                setError(err)
                setLoading(false)
            });
    }, [url, method])

    return { data, error, loading }
}

const useGetFetch = (url: string): UseFetchType => useFetch(url, "GET")

const usePostFetch = (url: string): UseFetchType => useFetch(url, "POST")

export  {
    useGetFetch,
    usePostFetch
};