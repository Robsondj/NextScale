import { RepositoryInterface, PeopleInterface, PeopleWithPasswordInterface, RoleDepartmentInterface, ProfileInterface } from "../types";
import { fetchGet, fetchPost, fetchPut, fetchDelete } from "../api/fetchUrl";

const repoBaseUrl = "peoples";

const getAll = (): Promise<Array<PeopleInterface>> => {
    return fetchGet(`${repoBaseUrl}?populate=*`)
        .then(async (serverResponse) => {
            if (serverResponse.ok) {
                const data: Array<any> | undefined = await serverResponse.json().then((response: any) => response.data);
                const peopleArray : Array<PeopleInterface> = [];
                data && data.forEach(item => {
                    if (item?.attributes?.idpeople?.data === null) {
                        return;
                    }
                    peopleArray.push(castData(item))
                });
                return new Promise((resolve, reject) => {
                    resolve(peopleArray)
                });
            }
            throw new Error("Houve um erro ao buscar os dados.");
        });
};

const getById = (id: number): Promise<PeopleInterface> => {
    return fetchGet(`${repoBaseUrl}/${id}?populate=*`)
        .then(async (serverResponse) => {
            if (serverResponse.ok) {
                const data: any | undefined = await serverResponse.json().then((response: any) => response.data);
                let people: PeopleInterface;
                people = castData(data);
                return new Promise((resolve, reject) => {
                    resolve(people)
                });
            }
            throw new Error("Houve um erro ao buscar os dados.");
        });
};

const create = (people: PeopleWithPasswordInterface): Promise<PeopleInterface> => {
    return fetchPost(`${repoBaseUrl}/`, {
        name: people.name,
        email: people.email,
        password: people.password,
        idrole_departments : people.role.id,
        idperfis: people.profile.id
    })
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
            const data: any | undefined = await serverResponse.json().then((response: any) => response.data);
            let people: PeopleInterface;
            people = castData(data);
            return new Promise((resolve, reject) => {
                resolve(people)
            });
        }
        throw new Error("Houve um erro ao salvar os dados.");
      });
};

const update = (people: PeopleWithPasswordInterface, id: number): Promise<PeopleInterface> => { 
     return fetchPut(`${repoBaseUrl}/${id}`, {
        name: people.name,
        email: people.email,
        password: people.password,
        idrole_departments : people.role.id,
        idperfis: people.profile.id
    })
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
            const data: any | undefined = await serverResponse.json().then((response: any) => response.data);
            let people: PeopleInterface;
            people = castData(data);
            return new Promise((resolve, reject) => {
                resolve(people)
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

const peopleRepository: RepositoryInterface<PeopleInterface> = {
    getAll,
    getById,
    create,
    update,
    remove
};

const castData = (data: any | undefined) => {

    let profile = data?.attributes?.idperfis?.data;
    let role = data?.attributes?.idrole_departments?.data;
      
    return {
        id: data.id,
        name: data.attributes.name,
        email: data.attributes.email,
        role: role && {
            id: role.id,
            name: role.attributes.name,
        } as RoleDepartmentInterface,
        profile: profile && {
            id: profile.id,
            name: profile.attributes.name,
        } as ProfileInterface
    } as PeopleInterface;
}

export default peopleRepository;