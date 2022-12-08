import IApiClient from './IApiClient';
import IHttpClient from './HttpClient';
import IProduct from '../models/product.model';
import IUser, { IUserLogin } from '../models/user.model';
import initialState from "../store/appState";

export const loadProducts = async (): Promise<IProduct[]> => {
    const response = await IHttpClient.get<IProduct[]>("product");
    return response;
}

export const login = async (login: IUserLogin): Promise<IUser> => {
    const response = new Promise<IUser>((resolve, reject) => {
        const user: IUser = initialState.users.user;
        if (user) {
            resolve(user);
        } else {
            reject();
        }
    });

    return response;
}

const ApiClient: IApiClient = {
    loadProducts,
    login
}

export default ApiClient;