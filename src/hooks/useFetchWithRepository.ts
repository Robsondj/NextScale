import { use, useEffect, useState } from "react";
import { UseFetchType, UseFetchArrayType, UseFetchDataType } from "../types";
import { RepositoryInterface } from "../types"

const useFetchAll = <T>(repository: RepositoryInterface<T>): UseFetchArrayType<T> => {

    const [data, setData] = useState<Array<T>>()
    const [error, setError] = useState()
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        repository.getAll()
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, [repository])

    return { data, error, loading }
}

const useFetch = <T>(repository: RepositoryInterface<T>, id: number): UseFetchType<T> => {
    const [data, setData] = useState<T>()
    const [error, setError] = useState()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        repository.getById(id)
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, [repository, id])

    return { data, error, loading }
}

const useFetchPost = <T>(repository: RepositoryInterface<T>): UseFetchDataType<T> => {

    const [data, setData] = useState<T>()
    const [error, setError] = useState<undefined | string>(undefined)
    const [success, setSuccess] = useState<undefined | string>(undefined)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchAction = (dataCreate: T) => {
        repository.create(dataCreate)
            .then((data) => {
                setLoading(false)
                setSuccess("Dados salvos com sucesso!")
                setData(data);
            })
            .catch((err) => {
                setLoading(false)
                setError(err)
            });
    };

    return {
        data,
        success,
        loading,
        error,
        fetchAction
    }
}

const useFetchPut = <T>(repository: RepositoryInterface<T>): UseFetchDataType<T> => {

    const [data, setData] = useState<T>()
    const [error, setError] = useState<undefined | string>(undefined)
    const [success, setSuccess] = useState<undefined | string>(undefined)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchAction = (dataUpdate: T, id: number) => {
        repository.update(dataUpdate, id)
            .then((data) => {
                setLoading(false)
                setSuccess("Dados atualizados com sucesso!")
                setData(data);
            })
            .catch((err) => {
                setLoading(false)
                setError(err)
            });
    };

    return {
        data,
        success,
        loading,
        error,
        fetchAction
    }
}

export  {
    useFetchAll,
    useFetch,
    useFetchPost,
    useFetchPut
};