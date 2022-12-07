import { combineReducers } from "redux"

import productsReducer from "./products/products.reducer"
import usersReducer from "./users/users.reducer"

const rootReducer = combineReducers({
    products: productsReducer,
    users: usersReducer,
})

export default rootReducer