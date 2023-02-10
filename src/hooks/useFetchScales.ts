import { useEffect, useState } from "react";
import { ScaleType, UseFetchScalesType, UseFetchType } from "../types";
import useFetch from "./useFetch";

const useFetchScales = (): UseFetchScalesType => {
  const idUser = 1;
  const urlScalesByUser = `api/scales-peoples?populate[idscales][populate][0]=iddepartments&populate[idpeople][filters][id][$eq]=${idUser}&populate[idrole_departments][populate]`;
  const {data, error, loading}: UseFetchType = useFetch(urlScalesByUser);
  const [scales, setScales] = useState<Array<ScaleType>>([]);

  useEffect(() => {
    const scaleMap = new Map();
    const scaleArray: Array<ScaleType> = [];
    data && data.forEach(item => {

      if (item?.attributes?.idpeople?.data === null) {
        return;
      }
      let scaleObject = scaleMap.get(item?.attributes?.idscales?.data.id);
      const formatedDate = new Date(item?.attributes?.idscales?.data.attributes.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})
      if (typeof scaleObject  === "undefined") {
        scaleObject = {};
        scaleObject.id = item?.attributes?.idscales?.data.id;
        scaleObject.date = formatedDate;
        scaleObject.description = item?.attributes?.idscales?.data.attributes.description;
        scaleObject.department = {
          id: item?.attributes?.idscales?.data.attributes.iddepartments.data.id,
          name: item?.attributes?.idscales?.data.attributes.iddepartments.data.attributes.name
        };
        scaleObject.people = [];
        scaleMap.set(item?.attributes?.idscales?.data.id, scaleObject)
      }
      scaleObject.people.push({
        id: item?.attributes?.idpeople?.data.id,
        name: item?.attributes?.idpeople?.data.attributes.name,
        email: item?.attributes?.idpeople?.data.attributes.email,
        role: {
          id: item?.attributes?.idrole_departments?.data.id,
          name: item?.attributes?.idrole_departments?.data.attributes.name,
        }
      });
    });

    scaleMap.forEach((scale) => {
      scaleArray.push(scale)
    });
    setScales(scaleArray);
  }, [data]);

  return {
    scales,
    error,
    loading
  }
};

export default useFetchScales;
