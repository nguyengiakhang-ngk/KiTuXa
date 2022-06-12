import {
    ADD_PRICE_TYPE_OF_ROOM,
    ADD_PRICE_TYPE_OF_ROOM_SUCCESS,
    ADD_PRICE_TYPE_OF_ROOM_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    error: ''
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {

        // Add Paid Service
        case ADD_PRICE_TYPE_OF_ROOM:
            return {
                ...preState
            }
        case ADD_PRICE_TYPE_OF_ROOM_SUCCESS:
            return {
                ...preState
            }
        case ADD_PRICE_TYPE_OF_ROOM_FAIL:
            return {
                ...preState,
                error: action.error
            };

        default:
            return preState;
    }
};
