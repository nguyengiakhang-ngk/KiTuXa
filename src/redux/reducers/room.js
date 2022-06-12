import {
    GET_ROOM_BY_AREA,
    GET_ROOM_BY_AREA_SUCCESS,
    GET_ROOM_BY_AREA_FAIL,
    GET_ROOM_BY_ID,
    GET_ROOM_BY_ID_SUCCESS,
    GET_ROOM_BY_ID_FAIL,
    GET_ROOM_BY_BOOKTICKET,
    GET_ROOM_BY_BOOKTICKET_SUCCESS,
    GET_ROOM_BY_BOOKTICKET_FAIL,
    ADD_NUMBER_ELECTRIC,
    ADD_NUMBER_ELECTRIC_SUCCESS,
    ADD_NUMBER_ELECTRIC_FAIL,
    ADD_NUMBER_WATER,
    ADD_NUMBER_WATER_SUCCESS,
    ADD_NUMBER_WATER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    listRoomByArea: [],
    error: ''
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ROOM_BY_AREA:
            return {
                ...preState,
            }
        case GET_ROOM_BY_AREA_SUCCESS:
            return {
                ...preState,
                listRoomByArea: action.listRoomByArea,
            }
        case GET_ROOM_BY_AREA_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case GET_ROOM_BY_ID:
            return {
                ...preState,
            }
        case GET_ROOM_BY_ID_SUCCESS:
            return {
                ...preState,
                listRoomByArea: action.listRoomByArea,
            }
        case GET_ROOM_BY_ID_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case GET_ROOM_BY_BOOKTICKET:
            return {
                ...preState,
            }
        case GET_ROOM_BY_BOOKTICKET_SUCCESS:
            return {
                ...preState,
            }
        case GET_ROOM_BY_BOOKTICKET_FAIL:
            return {
                ...preState,
                error: action.error
            }
        //Electric and water
        case ADD_NUMBER_ELECTRIC:
            return {
                ...preState,
            }
        case ADD_NUMBER_ELECTRIC_SUCCESS:
            return {
                ...preState,
            }
        case ADD_NUMBER_ELECTRIC_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case ADD_NUMBER_WATER:
            return {
                ...preState,
            }
        case ADD_NUMBER_WATER_SUCCESS:
            return {
                ...preState,
            }
        case ADD_NUMBER_WATER_FAIL:
            return {
                ...preState,
                error: action.error
            }
        default:
            return preState;
    }
};
