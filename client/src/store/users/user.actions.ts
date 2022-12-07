import { ActionNames } from "../actionNames"
import { createAction } from "../createAction"

export const authUser = (payload: boolean) => createAction(
    ActionNames.AUTH_USER,
    payload
);
