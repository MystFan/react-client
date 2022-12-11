import { combineReducers } from "redux"

import productsReducer from "./products/products.reducer"
import usersReducer from "./users/users.reducer"

const rootReducer = combineReducers({
    productState: productsReducer,
    userState: usersReducer,
})

export default rootReducer