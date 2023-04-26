import { RepositoryInterface, RoleDepartmentInterface, DepartmentInterface } from "../types";

const getAll = (): Promise<Array<RoleDepartmentInterface>> => {
    return fetch(`${process.env.NEXT_PUBLIC_URL_API}role-departments?populate=iddepartments`, {
        method:  "GET",
        headers: {
            ["Content-Type"]: "application/json",
            Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      })
        .then(async (serverResponse) => {
            if (serverResponse.ok) {
                const data: Array<any> | undefined = await serverResponse.json().then((response) => response.data);
                const rolesArray : Array<RoleDepartmentInterface> = [];
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
                return new Promise((resolve, reject) => {
                    resolve(rolesArray)
                });
            }
            throw new Error("Houve um erro ao buscar os dados.");
        });
}

const getById = (id: number): Promise<RoleDepartmentInterface> => {
    return fetch(`${process.env.NEXT_PUBLIC_URL_API}role-departments/${id}?populate=iddepartments`, {
        method:  "GET",
        headers: {
            ["Content-Type"]: "application/json",
            Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      })
        .then(async (serverResponse) => {
            if (serverResponse.ok) {
                const data: any | undefined = await serverResponse.json().then((response) => response.data);
                let role: RoleDepartmentInterface;
                role = {
                        id: data?.id,
                        name: data?.attributes?.name,
                        department: {
                            id: data?.attributes?.iddepartments?.data.id,
                            name: data?.attributes?.iddepartments?.data.attributes.name
                        } as DepartmentInterface
                    } as RoleDepartmentInterface;
                return new Promise((resolve, reject) => {
                    resolve(role)
                });
            }
            throw new Error("Houve um erro ao buscar os dados.");
        });
};

const create = (role: RoleDepartmentInterface): Promise<RoleDepartmentInterface> => {
    // create a function to be a layer between fetchAPI
    return fetch(`${process.env.NEXT_PUBLIC_URL_API}${`role-departments/`}`, {
        method: "POST",
        headers: {
            ["Content-Type"]: "application/json",
            Authorization: `Bearer ${process.env.API_TOKEN}`
        },
        body: JSON.stringify({
            data: {
              name: role.name,
              iddepartments: role.department?.id,
            },
          })
      })
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
            const data: any | undefined = await serverResponse.json().then((response) => response.data);
            let role: RoleDepartmentInterface;
            // create a  function to convert cast the return
            role = {
                    id: data?.id,
                    name: data?.attributes?.name,
                    department: {
                        id: data?.attributes?.iddepartments?.data.id,
                        name: data?.attributes?.iddepartments?.data.attributes.name
                    } as DepartmentInterface
                } as RoleDepartmentInterface;
            return new Promise((resolve, reject) => {
                resolve(role)
            });
        }
        throw new Error("Houve um erro ao salvar os dados.");
      });
};

const update = (role: RoleDepartmentInterface, id: number): Promise<RoleDepartmentInterface> => {
     // create a function to be a layer between fetchAPI
     return fetch(`${process.env.NEXT_PUBLIC_URL_API}${`role-departments/`}${id ? id : ""}`, {
        method: "PUT",
        headers: {
            ["Content-Type"]: "application/json",
            Authorization: `Bearer ${process.env.API_TOKEN}`
        },
        body: JSON.stringify({
            data: {
              name: role.name,
              iddepartments: role.department?.id,
            },
          })
      })
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
            const data: any | undefined = await serverResponse.json().then((response) => response.data);
            let role: RoleDepartmentInterface;
            // create a  function to convert cast the return
            role = {
                    id: data?.id,
                    name: data?.attributes?.name,
                    department: {
                        id: data?.attributes?.iddepartments?.data.id,
                        name: data?.attributes?.iddepartments?.data.attributes.name
                    } as DepartmentInterface
                } as RoleDepartmentInterface;
            return new Promise((resolve, reject) => {
                resolve(role)
            });
        }
        throw new Error("Houve um erro ao salvar os dados.");
      })
};

const remove = (id: number): Promise<void> => {
    return fetch(`${process.env.NEXT_PUBLIC_URL_API}${`role-departments/`}${id ? id : ""}`, {
        method: "DELETE",
        headers: {
            ["Content-Type"]: "application/json",
            Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      })
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
            return new Promise((resolve, reject) => {
                resolve()
            });
        }
        throw new Error("Houve um erro ao deletar os dados.");
      })
};

const roleDepartmentRepository: RepositoryInterface<RoleDepartmentInterface> = {
    getAll,
    getById,
    create,
    update,
    remove
    
};

export default roleDepartmentRepository;