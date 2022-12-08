export default interface IHttpClient {
    post<TRequest, TResponse>(path: string, object: TRequest, config?: any): Promise<TResponse>;
    patch<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
    put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
    get<TResponse>(path: string): Promise<TResponse>;
}
