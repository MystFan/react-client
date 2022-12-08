import IUser from "../../models/user.model"
import { ActionNames } from "../actionNames"
import initialState from "../appState"
import { IAction } from "../createAction"

export type UsersState = {
    user: IUser
}

const usersReducer = (state: UsersState = initialState.users, action: IAction<string, any>): UsersState => {
    switch (action.type) {
        case ActionNames.LOGIN_USER:
            return {
                ...state,
                user: { ...state.user, isAuth: action.payload.isAuth }
            }
    }

    return state
}

export default usersReducer
