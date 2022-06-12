import {
    ADD_TYPE_OF_ROOM,
    ADD_PAID_SERVICE_SUCCESS,
    ADD_PAID_SERVICE_FAIL,
    GET_TYPE_OF_ROOM_BY_SAVE,
    GET_TYPE_OF_ROOM_BY_SAVE_SUCCESS,
    GET_TYPE_OF_ROOM_BY_SAVE_FAIL,
    GET_PRICE_OF_ROOM,
    GET_PRICE_OF_ROOM_SUCCESS,
    GET_PRICE_OF_ROOM_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    paidServiceList: []
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        // Load List Paid Service
        // case LOAD_LIST_PAID_SERVICE:
        //     return {
        //         ...preState,
        //         ...INITIAL_STATE
        //     }
        // case LOAD_LIST_PAID_SERVICE_SUCCESS:
        //     return {
        //         ...preState,
        //         paidServiceList: action.paidServiceList
        //     }
        // case LOAD_LIST_PAID_SERVICE_FAIL:
        //     return {
        //         ...preState,
        //         error: action.error
        //     };

        // Add Paid Service
        case ADD_TYPE_OF_ROOM:
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
        //Get Type by save
        case GET_TYPE_OF_ROOM_BY_SAVE:
            return {
                ...preState
            }
        case GET_TYPE_OF_ROOM_BY_SAVE_SUCCESS:
            return {
                ...preState
            }
        case GET_TYPE_OF_ROOM_BY_SAVE_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case GET_PRICE_OF_ROOM:
            return {
                ...preState
            }
        case GET_PRICE_OF_ROOM_SUCCESS:
            return {
                ...preState
            }
        case GET_PRICE_OF_ROOM_FAIL:
            return {
                ...preState,
                error: action.error
            }
        // Update Paid Service
        // case UPDATE_PAID_SERVICE:
        //     return {
        //         ...preState
        //     }
        // case UPDATE_PAID_SERVICE_SUCCESS:
        //     return {
        //         ...preState
        //     }
        // case UPDATE_PAID_SERVICE_FAIL:
        //     return {
        //         ...preState,
        //         error: action.error
        //     };
        //
        // // Delete Paid Service
        // case DELETE_PAID_SERVICE:
        //     return {
        //         ...preState
        //     }
        // case DELETE_PAID_SERVICE_SUCCESS:
        //     return {
        //         ...preState
        //     }
        // case DELETE_PAID_SERVICE_FAIL:
        //     return {
        //         ...preState,
        //         error: action.error
        //     };

        default:
            return preState;
    }
};
