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
 } from "./types";
import { getListBillByContract,getBillById ,addBill, updateBill, deleteBill,
getListBillByArea } from "../../api/billAPI";



export const doLoadListBillByContract = (contractId) => dispatch => {
    return new Promise((resolve, reject) => {
        getListBillByContract(contractId)
            .then(data => {
                getListBillByContractSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getListBillByContractError(dispatch, error);
                reject(error);
            });
    })
};

export const doLoadListBillByArea = (areaId) => dispatch => {
    return new Promise((resolve, reject) => {
        getListBillByArea(areaId)
            .then(data => {
                getListBillByAreaSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getListBillByAreaError(dispatch, error);
                reject(error);
            });
    })
};

export const doLoadBillById = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        getBillById(id)
            .then(data => {
                getBillByIdSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getBillByIdError(dispatch, error);
                reject(error);
            });
    })
};

export const doAddBill = (bill) => dispatch => {
    return new Promise((resolve, reject) => {
        addBill(bill)
            .then(data => {
                addBillSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                addBillError(dispatch, error);
                reject(error);
            });
    })
};

export const doUpdateBill = (bill, id) => dispatch => {
    return new Promise((resolve, reject) => {
        updateBill(bill, id)
            .then(data => {
                updateBillSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                updateBillError(dispatch, error);
                reject(error);
            });
    })
};

export const doDeleteBill = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        deleteBill(id)
            .then(data => {
                deleteBillSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                deleteBillError(dispatch, error);
                reject(error);
            });
    })
};

const getListBillByContractSuccess = (dispatch, listBillByContract) => {
    dispatch({
        type: GET_BILL_BY_CONTRACT_SUCCESS,
        listBillByContract: listBillByContract
    });
}

const getListBillByContractError = (dispatch, error) => {
    dispatch({
        type: GET_BILL_BY_CONTRACT_FAIL,
        error: error
    });
}

const getBillByIdSuccess = (dispatch) => {
    dispatch({
        type: GET_BILL_BY_ID_SUCCESS,
    });
}

const getListBillByAreaSuccess = (dispatch, error) => {
    dispatch({
        type: GET_BILL_BY_AREA_SUCCESS,
        error: error
    });
}

const getListBillByAreaError = (dispatch) => {
    dispatch({
        type: GET_BILL_BY_AREA_FAIL,
    });
}

const getBillByIdError = (dispatch, error) => {
    dispatch({
        type: GET_BILL_BY_ID_FAIL,
        error: error
    });
}

const addBillSuccess = () => dispatch => {
    dispatch({
        type: ADD_BILL_SUCCESS,
    });
}

const addBillError = (dispatch, error) => {
    dispatch({
        type: GET_BILL_BY_CONTRACT_FAIL,
        error: error
    });
}

const updateBillSuccess = () => dispatch => {
    dispatch({
        type: UPDATE_BILL_SUCCESS,
    });
}

const updateBillError = (dispatch, error) => {
    dispatch({
        type: UPDATE_BILL_FAIL,
        error: error
    });
}

const deleteBillSuccess = () => dispatch => {
    dispatch({
        type: DELETE_BILL_SUCCESS,
    });
}

const deleteBillError = (dispatch, error) => {
    dispatch({
        type: DELETE_BILL_FAIL,
        error: error
    });
}


