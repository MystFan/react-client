import IUser from "../../models/user.model"
import { ActionNames } from "../actionNames"
import initialState from "../appState"
import { IAction } from "../createAction"

export type UsersState = {
    user: IUser
}

const usersReducer = (state: UsersState = initialState.userState, action: IAction<string, any>): UsersState => {
    switch (action.type) {
        case ActionNames.LOGIN_USER:
            return {
                user: { ...state.user, isAuth: !!action.payload.token, token: action.payload.token }
            }
        case ActionNames.LOAD_USER:
            return {
                user: { ...state.user }
            }
        case ActionNames.SAVE_USER:
            return {
                user: { ...action.payload }
            }
        case ActionNames.LOGOUT_USER:
            return {
                user: { id: 0, name: "", tenantId: 0, token: "", isAuth: false }
            }
    }

    return state
}

export default usersReducer
