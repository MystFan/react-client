import IProduct from "../models/product.model";
import IUser, { IUserLogin } from "../models/user.model";

export default interface IApiClient {
    loadProducts(): Promise<IProduct[]>
    createProduct (product: IProduct): Promise<IProduct>
    updateProduct (product: IProduct): Promise<IProduct>
    deleteProduct (id: number): Promise<void>
    login(login: IUserLogin): Promise<IUser>
}