import { setItemToStorage, deleteItemFromStorage } from "../app/common/storage";
import IUser from "../models/user.model";
import { ActionNames } from "./actionNames";
import { IAction } from "./createAction";

const userMiddleware = function (store: any) {
    return function (next: any) {
        return function (action: IAction<string, IUser>) {
            if (action.type === ActionNames.LOGOUT_USER) {
                deleteItemFromStorage("user");
            }

            if (action.type === ActionNames.SAVE_USER) {
                setItemToStorage("user", action.payload);
            }

            next(action);
        }
    }
}

export default userMiddleware;
