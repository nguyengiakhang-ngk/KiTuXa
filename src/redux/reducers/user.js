import {
    LOGIN, LOGIN_SUCCESS, LOGIN_ERROR,
    SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_ERROR,
    UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    user: '',
    error: ''
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case LOGIN_SUCCESS:
            return {
                ...preState,
                user: action.user,
            }
        case LOGIN_ERROR:
            return {
                ...preState,
                error: action.error
            }
        case SIGN_UP:
            return {
                ...preState,
                error: ''
            }
        case SIGN_UP_SUCCESS:
            return {
                ...preState,
                error:''
            }
        case SIGN_UP_ERROR:
            return {
                ...preState,
                error: action.error
            }
        case UPDATE_USER:
            return {
                ...preState,
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...preState
            }
        case UPDATE_USER_FAIL:
            return {
                ...preState,
                error: action.error
            }
        default:
            return preState;
    }
};
