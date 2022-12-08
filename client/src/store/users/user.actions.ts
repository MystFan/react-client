import ApiClient from "../../api/ApiClient";
import IUser, { IUserLogin } from "../../models/user.model";
import { ActionNames } from "../actionNames"
import { createAction, IAction } from "../createAction"

export const authUser = (payload: IUser): IAction<ActionNames.LOGIN_USER, IUser> => createAction(
    ActionNames.LOGIN_USER,
    payload
);

export function login(userLogin: IUserLogin) {
    return function (dispatch: Function, getState: Function) {
        ApiClient.login(userLogin)
            .then((user: IUser) => {
                dispatch(authUser(user))
            }).catch(err => {
                throw err;
            })

        return authUser;
    }
}