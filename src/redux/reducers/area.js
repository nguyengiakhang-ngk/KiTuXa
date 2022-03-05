import { LOAD_LIST_AREA, LOAD_USERS_SUCCESS, LOAD_USERS_ERROR } from '../actions/types';

const INITIAL_STATE = {
    areList: [],
    loading: false,
    error: ''
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_LIST_AREA:
            return {
                ...preState,
                loading: true,
                error:''
            }
        case LOAD_USERS_SUCCESS: {
            return {
                ...preState,
                areList: action.data,
                loading: false
            }
        }
        case LOAD_USERS_ERROR: {
            return {
                ...preState,
                loading: false,
                error: action.error
            };
        }
        default:
            return preState;
    }
};
