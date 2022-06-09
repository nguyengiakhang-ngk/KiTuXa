import { 
    GET_BILL_BY_CONTRACT,
    GET_BILL_BY_CONTRACT_SUCCESS,
    GET_BILL_BY_CONTRACT_FAIL,
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
        default:
            return preState;
    }
};
