import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const { REACT_APP_API_URL } = process.env;
import { ApiConfiguration } from './ApiConfiguration';
import IHttpClient from './IHttpClient';

const apiConfiguration: ApiConfiguration = { baseUrl: REACT_APP_API_URL };

const createAxiosClient = (apiConfiguration: ApiConfiguration): AxiosInstance => {
    return Axios.create({
        baseURL: apiConfiguration.baseUrl,
        responseType: 'json' as const,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 10 * 1000,
    });
}

const client: AxiosInstance = createAxiosClient(apiConfiguration);

export const post = async <TRequest, TResponse>(path: string, payload: TRequest, config?: AxiosRequestConfig): Promise<TResponse> => {
    const response = config
        ? await client.post<TResponse>(path, payload, config)
        : await client.post<TResponse>(path, payload);
    return response.data;
}

export const patch = async<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> => {
    const response = await client.patch<TResponse>(path, payload);
    return response.data;
}

export const put = async<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> => {
    const response = await client.put<TResponse>(path, payload);
    return response.data;
}

export const get = async<TResponse>(path: string): Promise<TResponse> => {
    const response = await client.get<TResponse>(path);
    return response.data;
}

const HttpClient: IHttpClient = {
    get: get,
    post: post,
    put: put,
    patch: patch
}

export default HttpClient;
