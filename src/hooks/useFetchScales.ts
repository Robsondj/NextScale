import { useEffect, useState } from "react";
import { ScaleType, UseFetchScalesType, UseFetchType, PeopleInterface, DepartmentInterface } from "../types";
import { useGetFetch } from "./useFetch";
import { getBrDateFormat, getDayOfWeek } from "../utils"

const useFetchScales = (): UseFetchScalesType => {
  const idUser = 1;
  const urlScalesByUser = `scales-peoples?populate[idscales][populate][0]=iddepartments&populate[idpeople][filters][id][$eq]=${idUser}&populate[idrole_departments][populate]`;
  const {data, error, loading}: UseFetchType = useGetFetch(urlScalesByUser);
  const [scales, setScales] = useState<Array<ScaleType>>([]);

  useEffect(() => {
    const scaleArray: Array<ScaleType> = [];
    
    data && data.forEach(item => {

      if (item?.attributes?.idpeople?.data === null) {
        return;
      }

      let scale = item?.attributes?.idscales?.data;
      let people = item?.attributes?.idpeople?.data;
      let department = item?.attributes?.idrole_departments?.data;

      scaleArray.push({
        id: scale.id,
        date: getBrDateFormat(scale.attributes.date),
        dayOfWeek: getDayOfWeek(scale.attributes.date),
        description: scale.attributes.description,
        department: {
          id: department.id,
          name: department.attributes.name
        } as DepartmentInterface,
        people: [
          {
            id: people.id,
            name: people.attributes.name,
            email: people.attributes.email,
            role: {
              id: department.id,
              name: department.attributes.name,
            }
  
          } as PeopleInterface
        ]
      } as ScaleType)
    })
    setScales(scaleArray)
  }, [data]);

  return {
    scales,
    error,
    loading
  }
};

export default useFetchScales;
