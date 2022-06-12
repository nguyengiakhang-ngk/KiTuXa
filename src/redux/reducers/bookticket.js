import {
    APPROVE_BOOKTICKET,
    APPROVE_BOOKTICKET_SUCCESS,
    APPROVE_BOOKTICKET_FAIL,
    ADD_BOOKTICKET,
    ADD_BOOKTICKET_SUCCESS,
    ADD_BOOKTICKET_FAIL
} from "../actions/types";


const INITIAL_STATE = {
    error: ''
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        case APPROVE_BOOKTICKET:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case APPROVE_BOOKTICKET_SUCCESS:
            return {
                ...preState,
            }
        case APPROVE_BOOKTICKET_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case ADD_BOOKTICKET:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case ADD_BOOKTICKET_SUCCESS:
            return {
                ...preState,
            }
        case ADD_BOOKTICKET_FAIL:
            return {
                ...preState,
                error: action.error
            }
        default:
            return preState;
    }
};
