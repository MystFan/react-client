import HttpClient from "../../api/ApiClient"
import IProduct from "../../models/product.model"
import { ActionNames } from "../actionNames"
import { createAction, IAction } from "../createAction"

export interface IProductAction {
    addProduct(payload: IProduct): IAction<string, IProduct>,
    removeProduct(payload: IProduct): IAction<string, IProduct>,
    loadProducts(payload: IProduct[]): IAction<string, IProduct[]>,
    getProducts(): any
}

export const addProduct = (payload: IProduct) => createAction(
    ActionNames.ADD_PRODUCT,
    payload
);
export const removeProduct = (payload: IProduct) => createAction(
    ActionNames.REMOVE_PRODUCT,
    payload
);
export const loadProducts = (payload: IProduct[]) => createAction(
    ActionNames.LOAD_PRODUCTS,
    payload
)

export function getProducts() {
    return function (dispatch: Function) {
        return HttpClient.get<IProduct[]>("product")
            .then((data: IProduct[]) => {
                dispatch(loadProducts(data))
            }).catch(err => {
                throw err;
            })
    }
}
