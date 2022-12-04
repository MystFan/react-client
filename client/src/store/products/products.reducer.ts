import IProduct from "../../models/product.model"
import { ActionNames } from "../actionNames"
import initialState from "../appState"
import { IAction } from "../createAction"

export type ProductsState = {
    all: IProduct[]
}

const productsReducer = (state: ProductsState = initialState.products, action: IAction<string, any>): ProductsState => {
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
                all: state.all.concat(newProduct),
            }
        case ActionNames.REMOVE_PRODUCT:
            const updatedProducts: IProduct[] = state.all.filter(
                product => product.id !== action.payload.id
            )

            return {
                ...state,
                all: updatedProducts,
            }

        case ActionNames.LOAD_PRODUCTS:
            const products: IProduct[] = action.payload.map((product: IProduct) => {
                return { ...product };
            });

            return {
                ...state,
                all: products
            }
    }

    return state
}

export default productsReducer
