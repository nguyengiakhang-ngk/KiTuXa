import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/types';

const INITIAL_STATE = {
    user: '',
    error: ''
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...preState,
                user: '',
                error: ''
            }
        case LOGIN_SUCCESS:
            return {
                ...preState,
                user: action.user,
                error:''
            }
        case LOGIN_ERROR:
            return {
                ...preState,
                user: '',
                error: action.error
            }
        default:
            return preState;
    }
};
