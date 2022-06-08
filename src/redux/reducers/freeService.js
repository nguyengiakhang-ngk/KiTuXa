import {
    LOAD_LIST_FREE_SERVICE,
    LOAD_LIST_FREE_SERVICE_FAIL,
    LOAD_LIST_FREE_SERVICE_SUCCESS,
    ADD_FREE_SERVICE,
    ADD_FREE_SERVICE_SUCCESS,
    ADD_FREE_SERVICE_FAIL,
    UPDATE_FREE_SERVICE,
    UPDATE_FREE_SERVICE_SUCCESS,
    UPDATE_FREE_SERVICE_FAIL,
    DELETE_FREE_SERVICE,
    DELETE_FREE_SERVICE_FAIL,
    DELETE_FREE_SERVICE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    freeServiceList: []
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        // Load List Free Service
        case LOAD_LIST_FREE_SERVICE:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case LOAD_LIST_FREE_SERVICE_SUCCESS:
            return {
                ...preState,
                freeServiceList: action.freeServiceList
            }
        case LOAD_LIST_FREE_SERVICE_FAIL:
            return {
                ...preState,
                error: action.error
            };

        // Add Free Service
        case ADD_FREE_SERVICE:
            return {
                ...preState
            }
        case ADD_FREE_SERVICE_SUCCESS:
            return {
                ...preState
            }
        case ADD_FREE_SERVICE_FAIL:
            return {
                ...preState,
                error: action.error
            };

        // Update Free Service
        case UPDATE_FREE_SERVICE:
            return {
                ...preState
            }
        case UPDATE_FREE_SERVICE_SUCCESS:
            return {
                ...preState
            }
        case UPDATE_FREE_SERVICE_FAIL:
            return {
                ...preState,
                error: action.error
            };

        // Delete Free Service
        case DELETE_FREE_SERVICE:
            return {
                ...preState
            }
        case DELETE_FREE_SERVICE_SUCCESS:
            return {
                ...preState
            }
        case DELETE_FREE_SERVICE_FAIL:
            return {
                ...preState,
                error: action.error
            };

        default:
            return preState;
    }
};
