import {
    GET_LIST_CONTRACT_BY_USER,
    GET_LIST_CONTRACT_BY_USER_SUCCESS,
    GET_LIST_CONTRACT_BY_USER_FAIL,
    GET_LIST_CONTRACT_BY_ROOM,
    GET_LIST_CONTRACT_BY_ROOM_SUCCESS,
    GET_LIST_CONTRACT_BY_ROOM_FAIL,
    GET_LIST_CONTRACT_BY_ID,
    GET_LIST_CONTRACT_BY_ID_SUCCESS,
    GET_LIST_CONTRACT_BY_ID_FAIL,
    ADD_CONTRACT,
    ADD_CONTRACT_SUCCESS,
    ADD_CONTRACT_FAIL,
    UPDATE_CONTRACT,
    UPDATE_CONTRACT_SUCCESS,
    UPDATE_CONTRACT_FAIL,
    DELETE_CONTRACT,
    DELETE_CONTRACT_SUCCESS,
    DELETE_CONTRACT_FAIL,
    APPROVE_CONTRACT,
    APPROVE_CONTRACT_SUCCESS,
    APPROVE_CONTRACT_FAIL,
    GET_LIST_CONTRACT_BY_AREA,
    GET_LIST_CONTRACT_BY_AREA_SUCCESS,
    GET_LIST_CONTRACT_BY_AREA_FAIL
} from "../actions/types";

const INITIAL_STATE = {
    listContractByRoom: '',
    listContractById: '',
    listContractByUser: '',
    error: ''
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LIST_CONTRACT_BY_ROOM:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case GET_LIST_CONTRACT_BY_ROOM_SUCCESS:
            return {
                ...preState,
                listContractByRoom: action.listContractByRoom,
            }
        case GET_LIST_CONTRACT_BY_ROOM_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case GET_LIST_CONTRACT_BY_AREA:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case GET_LIST_CONTRACT_BY_AREA_SUCCESS:
            return {
                ...preState,
            }
        case GET_LIST_CONTRACT_BY_AREA_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case GET_LIST_CONTRACT_BY_ID:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case GET_LIST_CONTRACT_BY_ID_SUCCESS:
            return {
                ...preState,
                listContractById: action.listContractById,
            }
        case GET_LIST_CONTRACT_BY_ID_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case ADD_CONTRACT:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case ADD_CONTRACT_SUCCESS:
            return {
                ...preState,
            }
        case ADD_CONTRACT_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case UPDATE_CONTRACT:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case UPDATE_CONTRACT_SUCCESS:
            return {
                ...preState,
            }
        case UPDATE_CONTRACT_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case APPROVE_CONTRACT:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case APPROVE_CONTRACT_SUCCESS:
            return {
                ...preState,
            }
        case APPROVE_CONTRACT_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case DELETE_CONTRACT:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case DELETE_CONTRACT_SUCCESS:
            return {
                ...preState,
            }
        case DELETE_CONTRACT_FAIL:
            return {
                ...preState,
                error: action.error
            }
        default:
            return preState;
    }
};
