export interface IAction<T extends string, P = undefined> {
    type: T
    payload: P
}

export function createAction<T extends string>(type: T): IAction<T>
export function createAction<T extends string, P>(type: T, payload: P): IAction<T, P>
export function createAction<T extends string, P>(type: T, payload?: P) {
    return payload === undefined ? { type } : { type, payload }
}
