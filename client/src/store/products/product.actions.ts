import ApiClient from "../../api/ApiClient"
import IProduct from "../../models/product.model"
import { ActionNames } from "../actionNames"
import { createAction, IAction } from "../createAction"

type ThunkLoadProductsFunction = () => (dispatch: Function, getState: Function) => Promise<void>;

export interface IProductActions {
    loadProducts: ThunkLoadProductsFunction
}

const addProduct = (payload: IProduct): IAction<ActionNames.ADD_PRODUCT, IProduct> => createAction(
    ActionNames.ADD_PRODUCT,
    payload
);

const removeProduct = (payload: IProduct): IAction<ActionNames.REMOVE_PRODUCT, IProduct> => createAction(
    ActionNames.REMOVE_PRODUCT,
    payload
);

const loadProducts = (payload: IProduct[]): IAction<ActionNames.LOAD_PRODUCTS, IProduct[]> => createAction(
    ActionNames.LOAD_PRODUCTS,
    payload
)

const getProducts = () => {
    return function (dispatch: Function, getState: Function) {
        return ApiClient.loadProducts()
            .then((data: IProduct[]) => {
                dispatch(loadProducts(data))
            }).catch(err => {
                throw err;
            })
    }
}

const ProductActions: IProductActions = {
    loadProducts: getProducts
}

export default ProductActions;