import { useEffect, useState } from "react";
import { UseFetchDepartmentType, UseFetchType, DepartmentInterface } from "../types";
import { useGetFetch } from "./useFetch";

 const useFetchDepartments = (): UseFetchDepartmentType => {
  const {data, error, loading}: UseFetchType = useGetFetch("departments/");
  const [departments, setDepartments] = useState<Array<DepartmentInterface>>([]);

  useEffect(() => {
    const departmentArray: Array<DepartmentInterface> = [];
    console.log("Data", data)
    data && data.forEach(item => {

      departmentArray.push({
        id: item.id,
        name: item?.attributes.name
        } as DepartmentInterface)
    })
    setDepartments(departmentArray)
  }, [data]);

  return {
    departments,
    error,
    loading
  }
};

export default useFetchDepartments;
