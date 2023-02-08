import { useEffect, useState } from "react";
import { UseFetchType } from "../types/types"

const useFetch = (url: string): UseFetchType => {

    const [data, setData] = useState([{}])
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL_API}${url}`)
            .then((serverResponse) => {
                return serverResponse.json();
            })
            .then((response) => {
                setData(response.data);
                setLoading(false)
            })
            .catch((err) => {
                setError(err)
            });
    }, [url])

    return { data, error, loading }
}

export default useFetch;