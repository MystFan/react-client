import apiClient from "../../api/ApiClient";
import IRequestError from "../../models/request.error";
import IUser, { IUserLogin } from "../../models/user.model";
import { ActionNames } from "../actionNames"
import CommonActions from "../common/common.actions";
import { createAction, IAction } from "../createAction"

type ThunkLoginAction = (userLogin: IUserLogin) => (dispatch: Function, getState: Function) => Promise<void>
type VoidAction = (dispatch: Function, getState: Function) => void;

export interface IUserActions {
    login: ThunkLoginAction,
    logout: VoidAction
    saveUserToStore: (user: IUser) => (dispatch: Function, getState: Function) => void
    loadUserFromStore: VoidAction
}

const login = (userLogin: IUserLogin) => {  
    return function (dispatch: Function, getState: Function) {
        dispatch(CommonActions.httpRequestsInStart());

        return apiClient.login(userLogin)
            .then((user: IUser) => {
                dispatch(CommonActions.httpRequestsInEnd());
                dispatch(loginUser(user));
                dispatch(saveUser(user));
            }).catch((err: Error) => {
                dispatch(CommonActions.httpRequestsInEnd());
                const reqError: IRequestError = { error: err.message }
                dispatch(CommonActions.raiseRequestError(reqError));
            });
    }
}

const logout = () => {
    return function (dispatch: Function, getState: Function) {
        dispatch(logoutUser());
    }
}

const loadUserFromStore = () => {
    return (dispatch: Function, getState: Function) => {
        dispatch(loadUser());
    }
}

const saveUserToStore = (user: IUser) => {
    return (dispatch: Function, getState: Function) => {
        dispatch(saveUser(user));
    }
}


const loginUser = (payload: IUser): IAction<ActionNames.LOGIN_USER, IUser> => createAction(
    ActionNames.LOGIN_USER,
    payload
);

const logoutUser = (): IAction<ActionNames.LOGOUT_USER> => createAction(
    ActionNames.LOGOUT_USER
);

const loadUser = (): IAction<ActionNames.LOAD_USER> => createAction(
    ActionNames.LOAD_USER
);

const saveUser = (payload: IUser): IAction<ActionNames.SAVE_USER, IUser> => createAction(
    ActionNames.SAVE_USER,
    payload
);

const UserActions: IUserActions = {
    login,
    logout,
    loadUserFromStore,
    saveUserToStore
}

export default UserActions;
