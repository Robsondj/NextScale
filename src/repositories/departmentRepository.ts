import { RepositoryInterface, DepartmentInterface } from "../types";
import { fetchGet, fetchPost, fetchPut, fetchDelete } from "../api/fetchUrl";

const repoBaseUrl = "departments";

const getAll = (): Promise<Array<DepartmentInterface>> => {
    return fetchGet(`${repoBaseUrl}/`)
        .then(async (serverResponse) => {
            if (serverResponse.ok) {
                const data: Array<any> | undefined = await serverResponse.json().then((response: any) => response.data);
                const departmentArray : Array<DepartmentInterface> = [];
                data && data.forEach(item => {
                    departmentArray.push(castData(item))
                });
                return new Promise((resolve, reject) => {
                    resolve(departmentArray)
                });
            }
            throw new Error("Houve um erro ao buscar os dados.");
        });
};

const getById = (id: number): Promise<DepartmentInterface> => {
    return fetchGet(`${repoBaseUrl}/${id}`)
        .then(async (serverResponse) => {
            if (serverResponse.ok) {
                const data: any | undefined = await serverResponse.json().then((response: any) => response.data);
                let department: DepartmentInterface;
                department = castData(data);
                return new Promise((resolve, reject) => {
                    resolve(department)
                });
            }
            throw new Error("Houve um erro ao buscar os dados.");
        });
};

const create = (department: DepartmentInterface): Promise<DepartmentInterface> => {
    return fetchPost(`${repoBaseUrl}/`, {
        name: department.name
    })
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
            const data: any | undefined = await serverResponse.json().then((response: any) => response.data);
            let department: DepartmentInterface;
            department = castData(data);
            return new Promise((resolve, reject) => {
                resolve(department)
            });
        }
        throw new Error("Houve um erro ao salvar os dados.");
      });
};

const update = (department: DepartmentInterface, id: number): Promise<DepartmentInterface> => { 
     return fetchPut(`${repoBaseUrl}/${id}`, {
        name: department.name
     })
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
            const data: any | undefined = await serverResponse.json().then((response: any) => response.data);
            let department: DepartmentInterface;
            department = castData(data);
            return new Promise((resolve, reject) => {
                resolve(department)
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

const departmentRepository: RepositoryInterface<DepartmentInterface> = {
    getAll,
    getById,
    create,
    update,
    remove
};

const castData = (data: any | undefined) => {
    return {
        id: data.id,
        name: data?.attributes.name
        } as DepartmentInterface;
}

export default departmentRepository;