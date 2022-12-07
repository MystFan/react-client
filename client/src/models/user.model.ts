interface IUser {
    id: number
    name: string,
    tenantId: number | undefined
    isAuth: boolean
}

export default IUser;
