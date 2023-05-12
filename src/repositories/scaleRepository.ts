import { RepositoryInterface, ScaleType, DepartmentInterface, PeopleInterface } from "../types";
import { fetchGet, fetchPost, fetchPut, fetchDelete } from "../api/fetchUrl";
import { getBrDateFormat, getDayOfWeek } from "../utils"

const repoBaseUrl = "scales-peoples";
const idUser = 1;

const getAll = (): Promise<Array<ScaleType>> => {
    return fetchGet(`${repoBaseUrl}?populate[idscales][populate][0]=iddepartments&populate[idpeople][filters][id][$eq]=${idUser}&populate[idrole_departments][populate]`)
        .then(async (serverResponse) => {
            if (serverResponse.ok) {
                const data: Array<any> | undefined = await serverResponse.json().then((response: any) => response.data);
                const scaleArray : Array<ScaleType> = [];
                data && data.forEach(item => {
                    if (item?.attributes?.idpeople?.data === null) {
                        return;
                    }
                    scaleArray.push(castData(item))
                });
                return new Promise((resolve, reject) => {
                    resolve(scaleArray)
                });
            }
            throw new Error("Houve um erro ao buscar os dados.");
        });
};

const getById = (id: number): Promise<ScaleType> => {
    return fetchGet(`${repoBaseUrl}/${id}`)
        .then(async (serverResponse) => {
            if (serverResponse.ok) {
                const data: any | undefined = await serverResponse.json().then((response: any) => response.data);
                let scale: ScaleType;
                scale = castData(data);
                return new Promise((resolve, reject) => {
                    resolve(scale)
                });
            }
            throw new Error("Houve um erro ao buscar os dados.");
        });
};

const create = (scale: ScaleType): Promise<ScaleType> => {
    return fetchPost(`${repoBaseUrl}/`, {
        scale
    })
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
            const data: any | undefined = await serverResponse.json().then((response: any) => response.data);
            let scale: ScaleType;
            scale = castData(data);
            return new Promise((resolve, reject) => {
                resolve(scale)
            });
        }
        throw new Error("Houve um erro ao salvar os dados.");
      });
};

const update = (scale: ScaleType, id: number): Promise<ScaleType> => { 
     return fetchPut(`${repoBaseUrl}/${id}`, {
        scale
     })
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
            const data: any | undefined = await serverResponse.json().then((response: any) => response.data);
            let scale: ScaleType;
            scale = castData(data);
            return new Promise((resolve, reject) => {
                resolve(scale)
            });
        }
        throw new Error("Houve um erro ao salvar os dados.");
      });
};

const remove = (id: number): Promise<void> => {
    return fetchDelete(`${repoBaseUrl}/${id}`)
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
            return new Promise((resolve, reject) => {
                resolve()
            });
        }
        throw new Error("Houve um erro ao deletar os dados.");
      });
};

const departmentRepository: RepositoryInterface<ScaleType> = {
    getAll,
    getById,
    create,
    update,
    remove
};

const castData = (data: any | undefined) => {
    let scale = data?.attributes?.idscales?.data;
    let people = data?.attributes?.idpeople?.data;
    let department = data?.attributes?.idrole_departments?.data;
      
    return {
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
      } as ScaleType;
}

export default departmentRepository;