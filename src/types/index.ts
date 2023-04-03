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
    department: string
} 

export type UseFetchScalesType = {
    scales: Array<ScaleType>
    error: Object | undefined
    loading: boolean
}

export type UseFetchType = {
    data: Array<any> | undefined,
    error: Object | undefined,
    loading: boolean
}

export type ErrorType = {
    message: string
}

export type UseFetchDataType = {
    data: PostReturnedDataType | undefined,
    success: string | undefined,
    loading: boolean,
    error: string | undefined,
    saveFetch: Function,
    deleteFetch: Function,
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
