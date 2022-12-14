import { ActionNames } from "../actionNames"
import { createAction, IAction } from "../createAction"

const httpRequestsInStart = (payload: number = 1): IAction<ActionNames.BEGIN_REQUEST, number> => createAction(
    ActionNames.BEGIN_REQUEST,
    payload
);

const httpRequestsInEnd = (payload: number = 1): IAction<ActionNames.END_REQUEST, number> => createAction(
    ActionNames.END_REQUEST,
    payload
);

const CommonActions = {
    httpRequestsInStart,
    httpRequestsInEnd
}

export default CommonActions;
