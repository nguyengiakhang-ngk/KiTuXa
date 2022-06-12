import {
    ADD_ROOM,
    ADD_ROOM_SUCCESS,
    ADD_ROOM_FAIL,
    LOAD_LIST_ROOM,
    LOAD_LIST_ROOM_SUCCESS,
    LOAD_LIST_ROOM_FAIL,
    UPDATE_ROOM,
    UPDATE_ROOM_SUCCESS,
    UPDATE_ROOM_FAIL,
    DELETE_ROOM,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    roomList: []
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        // Load List Room
        case LOAD_LIST_ROOM:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case LOAD_LIST_ROOM_SUCCESS:
            return {
                ...preState,
                roomList: action.roomList
            }
        case LOAD_LIST_ROOM_FAIL:
            return {
                ...preState,
                error: action.error
            };

        // Add Room
        case ADD_ROOM:
            return {
                ...preState
            }
        case ADD_ROOM_SUCCESS:
            return {
                ...preState
            }
        case ADD_ROOM_FAIL:
            return {
                ...preState,
                error: action.error
            };

        // Update Room
        case UPDATE_ROOM:
            return {
                ...preState
            }
        case UPDATE_ROOM_SUCCESS:
            return {
                ...preState
            }
        case UPDATE_ROOM_FAIL:
            return {
                ...preState,
                error: action.error
            };

        // Delete Room
        case DELETE_ROOM:
            return {
                ...preState
            }
        case DELETE_ROOM_SUCCESS:
            return {
                ...preState
            }
        case DELETE_ROOM_FAIL:
            return {
                ...preState,
                error: action.error
            };

        default:
            return preState;
    }
};
