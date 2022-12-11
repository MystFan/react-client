import IProduct from "../../models/product.model"
import { ActionNames } from "../actionNames"
import initialState from "../appState"
import { IAction } from "../createAction"

export type ProductsState = {
    products: IProduct[]
}

const productsReducer = (state: ProductsState = initialState.productState, action: IAction<string, any>): ProductsState => {
    switch (action.type) {
        case ActionNames.ADD_PRODUCT:
            const newProduct: IProduct = {
                id: action.payload.id,
                name: action.payload.name,
                price: action.payload.price,
                image: action.payload.image
            }

            return {
                ...state,
                products: state.products.concat(newProduct),
            }
        case ActionNames.REMOVE_PRODUCT:
            const updatedProducts: IProduct[] = state.products.filter(
                product => product.id !== action.payload.id
            )

            return {
                ...state,
                products: updatedProducts,
            }

        case ActionNames.LOAD_PRODUCTS:
            const products: IProduct[] = action.payload.map((product: IProduct) => {
                return { ...product };
            });

            return {
                ...state,
                products: products
            }
    }

    return state
}

export default productsReducer
