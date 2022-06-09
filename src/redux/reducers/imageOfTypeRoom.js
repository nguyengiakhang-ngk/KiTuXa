import {
    ADD_IMAGE_TYPE_OF_ROOM,
    ADD_TYPE_OF_ROOM_SUCCESS,
    ADD_TYPE_OF_ROOM_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    areList: [],
    error: ''
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        // Load List Area
        // case LOAD_LIST_AREA:
        //     return {
        //         ...preState,
        //         ...INITIAL_STATE
        //     }
        // case LOAD_LIST_AREA_SUCCESS:
        //     return {
        //         ...preState,
        //         areList: action.areaList
        //     }
        // case LOAD_LIST_AREA_FAIL:
        //     return {
        //         ...preState,
        //         error: action.error
        //     };

        //Add Area
        case ADD_IMAGE_TYPE_OF_ROOM:
            return {
                ...preState
            }
        case ADD_TYPE_OF_ROOM_SUCCESS:
            return {
                ...preState
            }
        case ADD_TYPE_OF_ROOM_FAIL:
            return {
                ...preState,
                error: action.error
            };

        default:
            return preState;
    }
};
