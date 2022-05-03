import { LOAD_LIST_AREA, LOAD_LIST_AREA_SUCCESS, LOAD_LIST_AREA_ERROR } from '../actions/types';

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
        case LOAD_LIST_AREA_SUCCESS: {
            return {
                ...preState,
                areList: action.data,
                loading: false
            }
        }
        case LOAD_LIST_AREA_ERROR: {
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
