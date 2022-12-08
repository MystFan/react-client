interface IUser {
    id: number
    name: string
    tenantId: number | undefined
    isAuth: boolean
    token: string | undefined | null
}

export interface IUserLogin {
    username: string,
    password: string
} 

export default IUser;
