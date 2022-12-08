import ApiClient from "../../api/ApiClient"
import IProduct from "../../models/product.model"
import { ActionNames } from "../actionNames"
import { createAction, IAction } from "../createAction"

export const addProduct = (payload: IProduct): IAction<ActionNames.ADD_PRODUCT, IProduct> => createAction(
    ActionNames.ADD_PRODUCT,
    payload
);

export const removeProduct = (payload: IProduct):IAction<ActionNames.REMOVE_PRODUCT, IProduct> => createAction(
    ActionNames.REMOVE_PRODUCT,
    payload
);

export const loadProducts = (payload: IProduct[]):IAction<ActionNames.LOAD_PRODUCTS, IProduct[]> => createAction(
    ActionNames.LOAD_PRODUCTS,
    payload
)

export function getProducts() {
    return function (dispatch: Function, getState: Function) {
        ApiClient.loadProducts()
            .then((data: IProduct[]) => {
                dispatch(loadProducts(data))
            }).catch(err => {
                throw err;
            })

        return loadProducts;
    }
}
