import { useEffect, useState } from "react";
import { UseFetchDepartmentType, DepartmentInterface } from "../types";
import departmentRepository from "../repositories/departmentRepository";

 const useDepartments = (): UseFetchDepartmentType => {
  const [departments, setDepartments] = useState<Array<DepartmentInterface>>([]);

  useEffect(() => {
    departmentRepository.getAll()
      .then((departments) => setDepartments(departments))
      .catch((err) => console.log("Erro ao buscar departamentos."))
  }, []);

  return {
    departments
  }
};

export default useDepartments;
