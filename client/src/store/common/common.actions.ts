import IRequestError from "../../models/request.error";
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

const raiseError = (payload: IRequestError): IAction<ActionNames.REQUEST_ERROR, IRequestError> => createAction(
    ActionNames.REQUEST_ERROR,
    payload
);

const removeError = (payload: IRequestError): IAction<ActionNames.REMOVE_ERROR, IRequestError> => createAction(
    ActionNames.REMOVE_ERROR,
    payload
);

const raiseRequestError = (error: IRequestError) => {
    return function (dispatch: Function, getState: Function) {
        dispatch(raiseError(error));
    }
}

const removeRequestError = (error: IRequestError) => {
    return function (dispatch: Function, getState: Function) {
        dispatch(removeError(error));
    }
}

const CommonActions = {
    httpRequestsInStart,
    httpRequestsInEnd,
    raiseRequestError,
    removeRequestError
}

export default CommonActions;
