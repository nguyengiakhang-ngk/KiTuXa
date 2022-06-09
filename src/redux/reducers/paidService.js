import {
    LOAD_LIST_PAID_SERVICE,
    LOAD_LIST_PAID_SERVICE_SUCCESS,
    LOAD_LIST_PAID_SERVICE_FAIL,
    ADD_PAID_SERVICE,
    ADD_PAID_SERVICE_SUCCESS,
    ADD_PAID_SERVICE_FAIL,
    UPDATE_PAID_SERVICE,
    UPDATE_PAID_SERVICE_SUCCESS,
    UPDATE_PAID_SERVICE_FAIL,
    DELETE_PAID_SERVICE,
    DELETE_PAID_SERVICE_SUCCESS,
    DELETE_PAID_SERVICE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    paidServiceList: []
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        // Load List Paid Service
        case LOAD_LIST_PAID_SERVICE:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case LOAD_LIST_PAID_SERVICE_SUCCESS:
            return {
                ...preState,
                paidServiceList: action.paidServiceList
            }
        case LOAD_LIST_PAID_SERVICE_FAIL:
            return {
                ...preState,
                error: action.error
            };

        // Add Paid Service
        case ADD_PAID_SERVICE:
            return {
                ...preState
            }
        case ADD_PAID_SERVICE_SUCCESS:
            return {
                ...preState
            }
        case ADD_PAID_SERVICE_FAIL:
            return {
                ...preState,
                error: action.error
            };

        // Update Paid Service
        case UPDATE_PAID_SERVICE:
            return {
                ...preState
            }
        case UPDATE_PAID_SERVICE_SUCCESS:
            return {
                ...preState
            }
        case UPDATE_PAID_SERVICE_FAIL:
            return {
                ...preState,
                error: action.error
            };

        // Delete Paid Service
        case DELETE_PAID_SERVICE:
            return {
                ...preState
            }
        case DELETE_PAID_SERVICE_SUCCESS:
            return {
                ...preState
            }
        case DELETE_PAID_SERVICE_FAIL:
            return {
                ...preState,
                error: action.error
            };

        default:
            return preState;
    }
};
