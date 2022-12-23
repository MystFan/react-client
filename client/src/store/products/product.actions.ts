import apiClient from "../../api/ApiClient"
import IProduct from "../../models/product.model"
import IRequestError from "../../models/request.error";
import { ActionNames } from "../actionNames"
import CommonActions from "../common/common.actions";
import { createAction, IAction } from "../createAction"

export type ThunkLoadProductsFunction = () => (dispatch: Function, getState: Function) => Promise<void>;
export type ThunkCreateProductFunction = (product: IProduct) => (dispatch: Function, getState: Function) => Promise<void>;
export type ThunkUpdateProductFunction = (product: IProduct) => (dispatch: Function, getState: Function) => Promise<void>;
export type ThunkDeleteProductFunction = (product: IProduct) => (dispatch: Function, getState: Function) => Promise<void>;

export interface IProductActions {
    loadProducts: ThunkLoadProductsFunction,
    createProduct: ThunkCreateProductFunction,
    updateProduct: ThunkUpdateProductFunction,
    deleteProduct: ThunkDeleteProductFunction
}

const addProduct = (payload: IProduct): IAction<ActionNames.ADD_PRODUCT, IProduct> => createAction(
    ActionNames.ADD_PRODUCT,
    payload
);

const editProduct = (payload: IProduct): IAction<ActionNames.UPDATE_PRODUCT, IProduct> => createAction(
    ActionNames.UPDATE_PRODUCT,
    payload
);

const removeProduct = (payload: IProduct): IAction<ActionNames.DELETE_PRODUCT, IProduct> => createAction(
    ActionNames.DELETE_PRODUCT,
    payload
);

const loadProducts = (payload: IProduct[]): IAction<ActionNames.LOAD_PRODUCTS, IProduct[]> => createAction(
    ActionNames.LOAD_PRODUCTS,
    payload
)

const getProducts = () => {
    return function (dispatch: Function, getState: Function) {
        dispatch(CommonActions.httpRequestsInStart())

        return apiClient.loadProducts()
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

const createProduct = (product: IProduct) => {
    return function (dispatch: Function, getState: Function) {
        dispatch(CommonActions.httpRequestsInStart())

        return apiClient.createProduct(product)
            .then((data: IProduct) => {          
                dispatch(CommonActions.httpRequestsInEnd())
                dispatch(addProduct(data))
            }).catch((err: Error) => {
                dispatchError(dispatch, err);
            })
    }
}

const updateProduct = (product: IProduct) => {
    return function (dispatch: Function, getState: Function) {
        dispatch(CommonActions.httpRequestsInStart())

        return apiClient.updateProduct(product)
            .then((data: IProduct) => {          
                dispatch(CommonActions.httpRequestsInEnd())
                dispatch(editProduct(data))
            }).catch((err: Error) => {
                dispatchError(dispatch, err);
            })
    }
}

const deleteProduct = (product: IProduct) => {
    return function (dispatch: Function, getState: Function) {
        dispatch(CommonActions.httpRequestsInStart())

        return apiClient.deleteProduct(product.id)
            .then(() => {          
                dispatch(CommonActions.httpRequestsInEnd())
                dispatch(removeProduct(product))
            }).catch((err: Error) => {
                dispatchError(dispatch, err);
            })
    }
}

const dispatchError = (dispatch: Function, err: Error): void => {
    dispatch(CommonActions.httpRequestsInEnd());
    const reqError: IRequestError = { error: err.message };
    dispatch(CommonActions.raiseRequestError(reqError));
}

const ProductActions: IProductActions = {
    loadProducts: getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}

export default ProductActions;
