import IProduct from "../models/product.model";
import IUser, { IUserLogin } from "../models/user.model";

export default interface IApiClient {
    loadProducts(): Promise<IProduct[]>
    login(login: IUserLogin): Promise<IUser>
}