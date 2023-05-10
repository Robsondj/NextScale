import { RepositoryInterface, RoleDepartmentInterface, DepartmentInterface } from "../types";
import { fetchGet, fetchPost, fetchPut, fetchDelete } from "../api/fetchUrl";

const repoBaseUrl = "role-departments";

const getAll = (): Promise<Array<RoleDepartmentInterface>> => {
    return fetchGet(`${repoBaseUrl}?populate=iddepartments`)
        .then(async (serverResponse) => {
            if (serverResponse.ok) {
                const data: Array<any> | undefined = await serverResponse.json().then((response: any) => response.data);
                const rolesArray : Array<RoleDepartmentInterface> = [];
                data && data.forEach(item => {
                    rolesArray.push(castData(item))
                });
                return new Promise((resolve, reject) => {
                    resolve(rolesArray)
                });
            }
            throw new Error("Houve um erro ao buscar os dados.");
        });
};

const getById = (id: number): Promise<RoleDepartmentInterface> => {
    return fetchGet(`${repoBaseUrl}/${id}?populate=iddepartments`)
        .then(async (serverResponse) => {
            if (serverResponse.ok) {
                const data: any | undefined = await serverResponse.json().then((response: any) => response.data);
                let role: RoleDepartmentInterface;
                role = castData(data);
                return new Promise((resolve, reject) => {
                    resolve(role)
                });
            }
            throw new Error("Houve um erro ao buscar os dados.");
        });
};

const create = (role: RoleDepartmentInterface): Promise<RoleDepartmentInterface> => {
    return fetchPost(`${repoBaseUrl}/`, {
        name: role.name,
        iddepartments: role.department?.id
    })
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
            const data: any | undefined = await serverResponse.json().then((response: any) => response.data);
            let role: RoleDepartmentInterface;
            role = castData(data);
            return new Promise((resolve, reject) => {
                resolve(role)
            });
        }
        throw new Error("Houve um erro ao salvar os dados.");
      });
};

const update = (role: RoleDepartmentInterface, id: number): Promise<RoleDepartmentInterface> => { 
     return fetchPut(`${repoBaseUrl}/${id}`, {
        name: role.name,
        iddepartments: role.department?.id,
     })
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
            const data: any | undefined = await serverResponse.json().then((response: any) => response.data);
            let role: RoleDepartmentInterface;
            role = castData(data);
            return new Promise((resolve, reject) => {
                resolve(role)
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

const roleDepartmentRepository: RepositoryInterface<RoleDepartmentInterface> = {
    getAll,
    getById,
    create,
    update,
    remove
};

const castData = (data: any | undefined) => {
    return {
        id: data?.id,
        name: data?.attributes?.name,
        department: {
            id: data?.attributes?.iddepartments?.data.id,
            name: data?.attributes?.iddepartments?.data.attributes.name
        } as DepartmentInterface
    } as RoleDepartmentInterface;
}

export default roleDepartmentRepository;