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
    role: RoleInterface
}

export interface DepartmentInterface extends DefaultType {}

export interface RoleDepartmentInterface extends DefaultType {
    department: DepartmentInterface
} 

export type UseFetchScalesType = {
    scales: Array<ScaleType>
    error: Object | undefined
    loading: boolean
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

export type ErrorType = {
    message: string
}

export type UseFetchDataType<T> = {
    data: T | undefined,
    success: string | undefined,
    loading: boolean,
    error: string | undefined,
    fetchAction: Function,
}

type AttributesDefault = {
    name: string,
    createdAt: string,
    updatedAt: string
} 

export type PostReturnedDataType = {
    id: number,
    attributes: AttributesDefault
}

export type UseFetchDepartmentType = {
    departments: Array<DepartmentInterface>
    error: Object | undefined
    loading: boolean
}

export type ColumnsType<T> = {
    header: string,
    field: (item: T) => string
}

export type UseFetchRolesType = {
    roles: Array<RoleDepartmentInterface>,
    error: Object | undefined,
    loading: boolean
}

export type UseFetchRoleType = {
    role: RoleDepartmentInterface | undefined,
    error: Object | undefined,
    loading: boolean
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