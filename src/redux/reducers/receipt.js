import {
    GET_RECEIPT_BY_CONTRACT,
    GET_RECEIPT_BY_CONTRACT_SUCCESS,
    GET_RECEIPT_BY_CONTRACT_FAIL,
    GET_RECEIPT_BY_ID,
    GET_RECEIPT_BY_ID_SUCCESS,
    GET_RECEIPT_BY_ID_FAIL,
    ADD_RECEIPT,
    ADD_RECEIPT_SUCCESS,
    ADD_RECEIPT_FAIL,
    UPDATE_RECEIPT,
    UPDATE_RECEIPT_SUCCESS,
    UPDATE_RECEIPT_FAIL,
    DELETE_RECEIPT,
    DELETE_RECEIPT_SUCCESS,
    DELETE_RECEIPT_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    listReceiptByContract: [],
    error: ''
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_RECEIPT_BY_CONTRACT:
            return {
                ...preState,
            }
        case GET_RECEIPT_BY_CONTRACT_SUCCESS:
            return {
                ...preState,
                listReceiptByContract: action.listReceiptByContract,
            }
        case GET_RECEIPT_BY_CONTRACT_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case GET_RECEIPT_BY_ID:
            return {
                ...preState,
            }
        case GET_RECEIPT_BY_ID_SUCCESS:
            return {
                ...preState,
            }
        case GET_RECEIPT_BY_ID_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case ADD_RECEIPT:
            return {
                ...preState,
            }
        case ADD_RECEIPT_SUCCESS:
            return {
                ...preState,
            }
        case ADD_RECEIPT_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case UPDATE_RECEIPT:
            return {
                ...preState,
            }
        case UPDATE_RECEIPT_SUCCESS:
            return {
                ...preState,
            }
        case UPDATE_RECEIPT_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case DELETE_RECEIPT:
            return {
                ...preState,
            }
        case DELETE_RECEIPT_SUCCESS:
            return {
                ...preState,
            }
        case DELETE_RECEIPT_FAIL:
            return {
                ...preState,
                error: action.error
            }
        default:
            return preState;
    }
};
