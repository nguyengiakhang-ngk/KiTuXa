import {
    GET_BILL_BY_CONTRACT,
    GET_BILL_BY_CONTRACT_SUCCESS,
    GET_BILL_BY_CONTRACT_FAIL,
    GET_BILL_BY_ID,
    GET_BILL_BY_ID_SUCCESS,
    GET_BILL_BY_ID_FAIL,
    ADD_BILL,
    ADD_BILL_SUCCESS,
    ADD_BILL_FAIL,
    UPDATE_BILL,
    UPDATE_BILL_SUCCESS,
    UPDATE_BILL_FAIL,
    DELETE_BILL,
    DELETE_BILL_SUCCESS,
    DELETE_BILL_FAIL,
    GET_BILL_BY_AREA,
    GET_BILL_BY_AREA_SUCCESS,
    GET_BILL_BY_AREA_FAIL

} from "../actions/types";

const INITIAL_STATE = {
    listBillByContract: '',
    error: ''
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BILL_BY_CONTRACT:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case GET_BILL_BY_CONTRACT_SUCCESS:
            return {
                ...preState,
                listBillByContract: action.listBillByContract,
            }
        case GET_BILL_BY_CONTRACT_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case GET_BILL_BY_AREA:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case GET_BILL_BY_AREA_SUCCESS:
            return {
                ...preState,
            }
        case GET_BILL_BY_AREA_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case ADD_BILL:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case ADD_BILL_SUCCESS:
            return {
                ...preState,
            }
        case ADD_BILL_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case UPDATE_BILL:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case UPDATE_BILL_SUCCESS:
            return {
                ...preState,
            }
        case UPDATE_BILL_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case GET_BILL_BY_ID:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case GET_BILL_BY_ID_SUCCESS:
            return {
                ...preState,
            }
        case GET_BILL_BY_CONTRACT_FAIL:
            return {
                ...preState,
                error: action.error
            }
        case DELETE_BILL:
            return {
                ...preState,
                ...INITIAL_STATE
            }
        case DELETE_BILL_SUCCESS:
            return {
                ...preState,
            }
        case DELETE_BILL_FAIL:
            return {
                ...preState,
                error: action.error
            }
        default:
            return preState;
    }
};
