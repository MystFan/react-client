import IRequestError from "../../models/request.error"
import { ActionNames } from "../actionNames"
import initialState from "../appState"
import { IAction } from "../createAction"

export type CommonState = {
    httpRequestsInProgress: number,
    requestErrors: IRequestError[]
}

const commonReducer = (state: CommonState = initialState.commonState, action: IAction<string, any>): CommonState => {
    switch (action.type) {
        case ActionNames.BEGIN_REQUEST:
            return {
                ...state,
                httpRequestsInProgress: state.httpRequestsInProgress + action.payload
            }
        case ActionNames.END_REQUEST:
            return {
                ...state,
                httpRequestsInProgress: state.httpRequestsInProgress - action.payload
            }
        case ActionNames.REQUEST_ERROR:
            const errors = state.requestErrors.map(err => {
                return { ...err }
            })

            errors.push(action.payload);            
            return {
                ...state,
                requestErrors: errors
            }
        case ActionNames.REMOVE_ERROR:
            const updatedErrors: IRequestError[] = state.requestErrors.filter(
                err => err.id !== action.payload.id
            );

            return {
                ...state,
                requestErrors: updatedErrors.map((err: IRequestError) => {
                    return { ...err }
                })
            }
    }

    return state
}

export default commonReducer
