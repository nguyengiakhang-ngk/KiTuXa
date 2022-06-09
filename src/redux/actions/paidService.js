import {
    LOAD_LIST_PAID_SERVICE, LOAD_LIST_PAID_SERVICE_SUCCESS, LOAD_LIST_PAID_SERVICE_FAIL,
    ADD_PAID_SERVICE, ADD_PAID_SERVICE_SUCCESS, ADD_PAID_SERVICE_FAIL,
    UPDATE_PAID_SERVICE, UPDATE_PAID_SERVICE_SUCCESS, UPDATE_PAID_SERVICE_FAIL,
    DELETE_PAID_SERVICE, DELETE_PAID_SERVICE_SUCCESS, DELETE_PAID_SERVICE_FAIL
} from "./types";
import {getListPaidService, addPaidService, updatePaidService, deletePaidService} from "../../api/paidServiceAPI";

// Load List Paid Service
const loadGetLPaidService = (dispatch) => {
    dispatch({
        type: LOAD_LIST_PAID_SERVICE
    });
}

export const doGetListPaidService = (userId) => dispatch => {
    loadGetLPaidService(dispatch);
    return new Promise((resolve, reject) => {
        getListPaidService(userId)
            .then(data => {
                loadListPaidServiceSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                loadListPaidServiceFail(dispatch, error);
                reject(error);
            });
    })
}

const loadListPaidServiceSuccess = (dispatch, paidServiceList) => {
    dispatch({
        type: LOAD_LIST_PAID_SERVICE_SUCCESS,
        paidServiceList: paidServiceList
    });
}

const loadListPaidServiceFail = (dispatch, error) => {
    dispatch({
        type: LOAD_LIST_PAID_SERVICE_FAIL,
        error: error
    });
}

// Add Paid Service
export const doAddPaidService = (paidService) => dispatch => {
    return new Promise((resolve, reject) => {
        addPaidService(paidService)
            .then(data => {
                addPaidServiceSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                addPaidServiceFail(dispatch, error);
                reject(error);
            });
    })
}

const addPaidServiceSuccess = (dispatch) => {
    dispatch({
        type: ADD_PAID_SERVICE_SUCCESS
    });
}

const addPaidServiceFail = (dispatch, error) => {
    dispatch({
        type: ADD_PAID_SERVICE_FAIL,
        error: error
    });
}

// Update Paid Service
export const doUpdatePaidService = (paidService, id) => dispatch => {
    return new Promise((resolve, reject) => {
        updatePaidService(paidService, id)
            .then(data => {
                updatePaidServiceSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                updatePaidServiceFail(dispatch, error);
                reject(error);
            });
    })
}

const updatePaidServiceSuccess = (dispatch) => {
    dispatch({
        type: UPDATE_PAID_SERVICE_SUCCESS
    });
}

const updatePaidServiceFail = (dispatch, error) => {
    dispatch({
        type: UPDATE_PAID_SERVICE_FAIL,
        error: error
    });
}

// Delete Free Service
export const doDeletePaidService = (paidService) => dispatch => {
    return new Promise((resolve, reject) => {
        deletePaidService(paidService)
            .then(data => {
                deletePaidServiceSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                deletePaidServiceFail(dispatch, error);
                reject(error);
            });
    })
}

const deletePaidServiceSuccess = (dispatch) => {
    dispatch({
        type: DELETE_PAID_SERVICE_SUCCESS
    });
}

const deletePaidServiceFail = (dispatch, error) => {
    dispatch({
        type: DELETE_PAID_SERVICE_FAIL,
        error: error
    });
}
