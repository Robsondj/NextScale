import { useState } from "react";
import { DepartmentInterface, PeopleInterface } from "../types"

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

    const clearForm = () => {
        setFormValues(initialValues)
    }

    return {
        formValues,
        handleChange,
        clearForm
    }
}

export default useForm;