import { useEffect, useState } from "react"
import { UseFetchType, UseFetchRolesType, RoleDepartmentInterface, DepartmentInterface } from "../types";
import { useGetFetch } from "./useFetch"

const useFetchRoles = (): UseFetchRolesType => {
    const { data, error, loading }: UseFetchType = useGetFetch('role-departments?populate=iddepartments');
    const [roles,setRoles] = useState<Array<RoleDepartmentInterface>>([]);

    useEffect(() => {
        const rolesArray : Array<RoleDepartmentInterface> = [];
        console.log("Data", data)
        data && data.forEach(item => {
            rolesArray.push({
                id: item.id,
                name: item?.attributes.name,
                department: {
                    id: item?.attributes?.iddepartments?.data.id,
                    name: item?.attributes?.iddepartments?.data.attributes.name
                } as DepartmentInterface
            } as RoleDepartmentInterface)
        });
        setRoles(rolesArray)
    }, [data])

    return {
        roles,
        error,
        loading
    }
}

export default useFetchRoles;