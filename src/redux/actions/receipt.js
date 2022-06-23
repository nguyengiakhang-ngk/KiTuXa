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
} from "./types";

import { getReceiptByContract, getReceiptById, addReceipt, updateReceipt, deleteReceipt } from "../../api/receiptAPI";

export const doGetReceiptByBill = (billId) => dispatch => {
    return new Promise((resolve, reject) => {
        getReceiptByContract(billId)
            .then(data => {
                getReceiptByContractSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getReceiptByContractError(error);
                reject(error);
            });
    })
};

export const doGetReceiptById = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        getReceiptById(id)
            .then(data => {
                getReceiptByIdSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getReceiptByIdError(error);
                reject(error);
            });
    })
};

export const doAddReceipt = (receipt) => dispatch => {
    return new Promise((resolve, reject) => {
        addReceipt(receipt)
            .then(data => {
                addReceiptSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                addReceiptError(error);
                reject(error);
            });
    })
};

export const doUpdateReceipt = (receipt, id) => dispatch => {
    return new Promise((resolve, reject) => {
        updateReceipt(receipt, id)
            .then(data => {
                updateReceiptSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                updateReceiptError(error);
                reject(error);
            });
    })
};

export const doDeleteReceipt = (receipt) => dispatch => {
    return new Promise((resolve, reject) => {
        deleteReceipt(receipt)
            .then(data => {
                deleteReceiptSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                deleteReceiptError(error);
                reject(error);
            });
    })
};

const getReceiptByContractSuccess = (dispatch, listReceiptByContract) => {
    dispatch({
        type: GET_RECEIPT_BY_CONTRACT_SUCCESS,
        listReceiptByContract: listReceiptByContract
    });
}

const getReceiptByContractError = (error, dispatch) => {
    dispatch({
        type: GET_RECEIPT_BY_CONTRACT_FAIL,
        error: error
    });
}

const getReceiptByIdSuccess = (dispatch) => {
    dispatch({
        type: GET_RECEIPT_BY_ID_SUCCESS,
    });
}

const getReceiptByIdError = (error, dispatch) => {
    dispatch({
        type: GET_RECEIPT_BY_ID_FAIL,
        error: error
    });
}

const addReceiptSuccess = (dispatch) => {
    dispatch({
        type: ADD_RECEIPT_SUCCESS,
    });
}

const addReceiptError = (status) => dispatch => {
    dispatch({
        type: ADD_RECEIPT_FAIL,
        error: error
    });
}

const updateReceiptSuccess = (dispatch, data) => {
    dispatch({
        type: UPDATE_RECEIPT_SUCCESS,
    });
}

const updateReceiptError = () => dispatch => {
    dispatch({
        type: UPDATE_RECEIPT_FAIL,
        error: error
    });
}

const deleteReceiptSuccess = (dispatch) => {
    dispatch({
        type: DELETE_RECEIPT_SUCCESS,
    });
}

const deleteReceiptError = (status) => dispatch => {
    dispatch({
        type: DELETE_RECEIPT_FAIL,
        error: error
    });
}
