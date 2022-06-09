import { 
    LOGIN, 
    LOGIN_SUCCESS, 
    LOGIN_ERROR, 
    SIGN_UP, 
    SIGN_UP_SUCCESS, 
    SIGN_UP_ERROR,
    GET_USER_BY_BOOKTICKET,
    GET_USER_BY_BOOKTICKET_SUCCESS,
    GET_USER_BY_BOOKTICKET_ERROR
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
                error: ''
            }
        case SIGN_UP_ERROR:
            return {
                ...preState,
                error: action.error
            }
        case GET_USER_BY_BOOKTICKET:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case GET_USER_BY_BOOKTICKET_SUCCESS:
            return {
                ...preState,
                user: action.user,
            }
        case GET_USER_BY_BOOKTICKET_ERROR:
            return {
                ...preState,
                error: action.error
            }
        default:
            return preState;
    }
};
