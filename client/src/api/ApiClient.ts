import IApiClient from './IApiClient';
import httpClient from './HttpClient';
import IProduct from '../models/product.model';
import IUser, { IUserLogin } from '../models/user.model';

export const loadProducts = async (): Promise<IProduct[]> => {
    const response = await httpClient.get<IProduct[]>("product");
    return response;
}

export const login = (login: IUserLogin): Promise<IUser> => {
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
    login
}

export default ApiClient;