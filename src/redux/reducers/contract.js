import { 
    GET_LIST_CONTRACT_BY_USER,
    GET_LIST_CONTRACT_BY_USER_SUCCESS,
    GET_LIST_CONTRACT_BY_USER_FAIL,
    GET_LIST_CONTRACT_BY_ROOM,
    GET_LIST_CONTRACT_BY_ROOM_SUCCESS,
    GET_LIST_CONTRACT_BY_ROOM_FAIL,
    GET_LIST_CONTRACT_BY_ID,
    GET_LIST_CONTRACT_BY_ID_SUCCESS,
    GET_LIST_CONTRACT_BY_ID_FAIL
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
        default:
            return preState;
    }
};
