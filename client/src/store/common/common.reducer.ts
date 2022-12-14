import { ActionNames } from "../actionNames"
import initialState from "../appState"
import { IAction } from "../createAction"

export type CommonState = {
    httpRequestsInProgress: number
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
    }

    return state
}

export default commonReducer
