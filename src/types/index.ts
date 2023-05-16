type DefaultType = {
    id: number,
    name: string,
}

export interface RoleInterface extends DefaultType {} 

export type ScaleType = {
    id: number,
    department: DepartmentInterface,
    people: Array<PeopleInterface>
    date: string,
    dayOfWeek: string,
    description: string,
}

export interface PeopleInterface extends DefaultType {
    email: string,
    role: RoleInterface,
    profile: ProfileInterface,
}

export interface PeopleWithPasswordInterface extends DefaultType {
    email: string,
    password: string,
    role: RoleInterface,
    profile: ProfileInterface,
}

export interface ProfileInterface extends DefaultType {}

export interface DepartmentInterface extends DefaultType {}

export interface RoleDepartmentInterface extends DefaultType {
    department: DepartmentInterface
}

export type UseFetchType<T> = {
    data: T | undefined,
    error: Object | undefined,
    loading: boolean
}

export type UseFetchArrayType<T> = {
    data: Array<T> | undefined,
    error: Object | undefined,
    loading: boolean
}

export type UseFetchDataType<T> = {
    data: T | undefined,
    success: string | undefined,
    loading: boolean,
    error: string | undefined,
    fetchAction: Function,
}

export type UseFetchDepartmentType = {
    departments: Array<DepartmentInterface>
}

export type ColumnsType<T> = {
    header: string,
    field: (item: T) => string
}

export interface RepositoryInterface<T> {
    getAll(): Promise<T[]>;
    getById(id: number): Promise<T>;
    create(data: T): Promise<T>;
    update(data: T, id: number): Promise<T>;
    remove(id: number): Promise<void>;
}

export type GenericObjectWithId = {
    id: number
}