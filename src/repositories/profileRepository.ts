import { RepositoryInterface, ProfileInterface } from "../types";
import { fetchGet, fetchPost, fetchPut, fetchDelete } from "../api/fetchUrl";

const repoBaseUrl = "perfis";

const getAll = (): Promise<Array<ProfileInterface>> => {
    return fetchGet(`${repoBaseUrl}/`)
        .then(async (serverResponse) => {
            if (serverResponse.ok) {
                const data: Array<any> | undefined = await serverResponse.json().then((response: any) => response.data);
                const profileArray : Array<ProfileInterface> = [];
                data && data.forEach(item => {
                    profileArray.push(castData(item))
                });
                return new Promise((resolve, reject) => {
                    resolve(profileArray)
                });
            }
            throw new Error("Houve um erro ao buscar os dados.");
        });
};

const getById = (id: number): Promise<ProfileInterface> => {
    return fetchGet(`${repoBaseUrl}/${id}`)
        .then(async (serverResponse) => {
            if (serverResponse.ok) {
                const data: any | undefined = await serverResponse.json().then((response: any) => response.data);
                let profile: ProfileInterface;
                profile = castData(data);
                return new Promise((resolve, reject) => {
                    resolve(profile)
                });
            }
            throw new Error("Houve um erro ao buscar os dados.");
        });
};

const create = (profile: ProfileInterface): Promise<ProfileInterface> => {
    return fetchPost(`${repoBaseUrl}/`, {
        name: profile.name
    })
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
            const data: any | undefined = await serverResponse.json().then((response: any) => response.data);
            let profile: ProfileInterface;
            profile = castData(data);
            return new Promise((resolve, reject) => {
                resolve(profile)
            });
        }
        throw new Error("Houve um erro ao salvar os dados.");
      });
};

const update = (profile: ProfileInterface, id: number): Promise<ProfileInterface> => { 
     return fetchPut(`${repoBaseUrl}/${id}`, {
        name: profile.name
     })
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
            const data: any | undefined = await serverResponse.json().then((response: any) => response.data);
            let profile: ProfileInterface;
            profile = castData(data);
            return new Promise((resolve, reject) => {
                resolve(profile)
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

const profileRepository: RepositoryInterface<ProfileInterface> = {
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
        } as ProfileInterface;
}

export default profileRepository;