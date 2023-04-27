import { useState } from "react";
import { GenericObjectWithId } from "../types";

const useForm = <T>(initialValues: T) => {
    const [formValues, setFormValues] = useState<T>(initialValues)
    const setFormValue = (key: string, value: string) => {
        setFormValues({
            ...formValues,
            [key]: value,
        })
    }

    const handleChange = (target: HTMLInputElement) => {
        setFormValue(
            target.getAttribute("name") as string,
            target.value
        )
    }

    const handleChangeSelect = <T extends GenericObjectWithId>(target: HTMLSelectElement, selectData: Array<T>) => {
        const data: T | undefined = selectData.find(
          (data) => data?.id === parseInt(target.value)
        );
        setFormValues({ ...formValues, [target.name]: data });
    };

    const clearForm = () => {
        setFormValues(initialValues)
    }

    return {
        formValues,
        handleChange,
        handleChangeSelect,
        clearForm,
        setFormValues
    }
}

export default useForm;