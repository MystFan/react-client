import IApiClient from './IApiClient';
import httpClient from './HttpClient';
import IProduct from '../models/product.model';
import IUser, { IUserLogin } from '../models/user.model';

const { REACT_APP_ENV } = process.env;

const loadProducts = async (): Promise<IProduct[]> => {
    const response = await httpClient.get<IProduct[]>("product");
    return response;
}

const createProduct = async (product: IProduct): Promise<IProduct> => {
    const response = await httpClient.post<IProduct, IProduct>("product", product);
    return response;
}

const updateProduct = async (product: IProduct): Promise<IProduct> => {
    const path = REACT_APP_ENV === "Development" ? "product/" + product.id : "product";
    const response = await httpClient.put<IProduct, IProduct>(path, product);
    return response;
}

const deleteProduct = async (productId: number): Promise<void> => {
    await httpClient.delete<void>("product/" + productId);
}

const login = (login: IUserLogin): Promise<IUser> => {
    const response = new Promise<IUser>((resolve, reject) => {
        const user: IUser = { name: "Jane Doe", tenantId: 1, id: 1, isAuth: true, token: "Secret" }
        const timeout = setTimeout(() => {
            if (user) {
                resolve(user);
            } else {
                reject();
            }

            clearTimeout(timeout);
        }, 1000)
    });

    return response;
}

const ApiClient: IApiClient = {
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    login
}

export default ApiClient;