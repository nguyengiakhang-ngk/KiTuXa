import {
    LOAD_LIST_AREA,
    LOAD_LIST_AREA_SUCCESS,
    LOAD_LIST_AREA_FAIL,
    ADD_AREA_SUCCESS,
    ADD_AREA_FAIL,
    ADD_AREA
} from '../actions/types';

const INITIAL_STATE = {
    areList: [],
    error: ''
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        // Load List Area
        case LOAD_LIST_AREA:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case LOAD_LIST_AREA_SUCCESS:
            return {
                ...preState,
                areList: action.areaList
            }
        case LOAD_LIST_AREA_FAIL:
            return {
                ...preState,
                error: action.error
            };

        //Add Area
        case ADD_AREA:
            return {
                ...preState
            }
        case ADD_AREA_SUCCESS:
            return {
                ...preState
            }
        case ADD_AREA_FAIL:
            return {
                ...preState,
                error: action.error
            };

        default:
            return preState;
    }
};
