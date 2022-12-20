import ApiClient from "../../api/ApiClient"
import IProduct from "../../models/product.model"
import IRequestError from "../../models/request.error";
import { ActionNames } from "../actionNames"
import CommonActions from "../common/common.actions";
import { createAction, IAction } from "../createAction"

export type ThunkLoadProductsFunction = () => (dispatch: Function, getState: Function) => Promise<void>;

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
        dispatch(CommonActions.httpRequestsInStart())

        return ApiClient.loadProducts()
            .then((data: IProduct[]) => {          
                dispatch(CommonActions.httpRequestsInEnd())
                dispatch(loadProducts(data))
            }).catch((err: Error) => {
                dispatch(CommonActions.httpRequestsInEnd());
                const reqError: IRequestError = { error: err.message }
                dispatch(CommonActions.raiseRequestError(reqError));
            })
    }
}

const ProductActions: IProductActions = {
    loadProducts: getProducts
}

export default ProductActions;
