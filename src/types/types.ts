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
    description: string,
}

export interface PeopleInterface extends DefaultType {
    email: string,
    role: RoleInterface
}

export interface DepartmentInterface extends DefaultType {
    id: number,
    name: string,
}

export type UseFetchScalesType = {
    scales: Array<ScaleType>
    error: Object
    loading: boolean
}

export type UseFetchType = {
    data: Array<Object>,
    error: Object,
    loading: boolean
}
