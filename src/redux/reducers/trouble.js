import {
    GET_LIST_TROUBLE_BY_ROOM,
    GET_LIST_TROUBLE_BY_ROOM_SUCCESS,
    GET_LIST_TROUBLE_BY_ROOM_FAIL,
    ADD_TROUBLE,
    ADD_TROUBLE_SUCCESS,
    ADD_TROUBLE_FAIL,
    UPDATE_TROUBLE,
    UPDATE_TROUBLE_SUCCESS,
    UPDATE_TROUBLE_FAIL,
    DELETE_TROUBLE,
    DELETE_TROUBLE_SUCCESS,
    DELETE_TROUBLE_FAIL,
    GET_TROUBLE_BY_ID,
    GET_TROUBLE_BY_ID_SUCCESS,
    GET_TROUBLE_BY_ID_FAIL,
    GET_LIST_TROUBLE_BY_AREA,
    GET_LIST_TROUBLE_BY_AREA_SUCCESS,
    GET_LIST_TROUBLE_BY_AREA_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    listTroubleByRoom: null,
    error: ''
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LIST_TROUBLE_BY_ROOM:
            return {
                ...preState,
                error: ''
            }
        case GET_LIST_TROUBLE_BY_ROOM_SUCCESS:
            return {
                ...preState,
                listTroubleByRoom: action.listTroubleByRoom,
            }
        case GET_LIST_TROUBLE_BY_ROOM_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case GET_LIST_TROUBLE_BY_AREA:
            return {
                ...preState,
                error: ''
            }
        case GET_LIST_TROUBLE_BY_AREA_SUCCESS:
            return {
                ...preState,
            }
        case GET_LIST_TROUBLE_BY_AREA_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case ADD_TROUBLE:
            return {
                ...preState,
                error: ''
            }
        case ADD_TROUBLE_SUCCESS:
            return {
                ...preState,
            }
        case ADD_TROUBLE_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case UPDATE_TROUBLE:
            return {
                ...preState,
                error: ''
            }
        case UPDATE_TROUBLE_SUCCESS:
            return {
                ...preState,
            }
        case UPDATE_TROUBLE_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case DELETE_TROUBLE:
            return {
                ...preState,
                error: ''
            }
        case DELETE_TROUBLE_SUCCESS:
            return {
                ...preState,
            }
        case DELETE_TROUBLE_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case GET_TROUBLE_BY_ID:
            return {
                ...preState,
                error: ''
            }
        case GET_TROUBLE_BY_ID_SUCCESS:
            return {
                ...preState,
            }
        case GET_TROUBLE_BY_ID_FAIL:
            return {
                ...preState,
                error: action.error
            }
        default:
            return preState;
    }
};
