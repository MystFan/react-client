import IUser from "../../models/user.model"
import { ActionNames } from "../actionNames"
import initialState from "../appState"
import { IAction } from "../createAction"

export type UsersState = {
    user: IUser
}

const usersReducer = (state: UsersState = initialState.users, action: IAction<string, any>): UsersState => {
    switch (action.type) {
        case ActionNames.AUTH_USER:
            return {
                ...state,
                user: { ...state.user, isAuth: action.payload }
            }
    }

    return state
}

export default usersReducer
