import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from '../actions/types';

const INITIAL_STATE = {
    status: null,
    error: ''
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...preState,
                status: null,
                error: ''
            }
        case SIGN_UP_SUCCESS:
            return {
                ...preState,
                status: action.status,
                error: ''
            }
        case SIGN_UP_ERROR:
            return {
                ...preState,
                status: action.status,
                error: action.error
            }
        default:
            return preState;
    }
};
