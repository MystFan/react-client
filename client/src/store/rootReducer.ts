import { combineReducers } from "redux"

import commonReducer from "./common/common.reducer"
import productsReducer from "./products/products.reducer"
import usersReducer from "./users/users.reducer"

const rootReducer = combineReducers({
    productState: productsReducer,
    userState: usersReducer,
    commonState: commonReducer
})

export default rootReducer