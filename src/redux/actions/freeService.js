import {
    LOAD_LIST_FREE_SERVICE, LOAD_LIST_FREE_SERVICE_SUCCESS, LOAD_LIST_FREE_SERVICE_FAIL,
    ADD_FREE_SERVICE, ADD_FREE_SERVICE_SUCCESS, ADD_FREE_SERVICE_FAIL,
    UPDATE_FREE_SERVICE, UPDATE_FREE_SERVICE_SUCCESS, UPDATE_FREE_SERVICE_FAIL,
    DELETE_FREE_SERVICE, DELETE_FREE_SERVICE_SUCCESS, DELETE_FREE_SERVICE_FAIL
} from "./types";
import {getListFreeService, addFreeService, updateFreeService, deleteFreeService} from "../../api/freeServiceAPI";

// Load List Free Service
const loadGetLFreeService = (dispatch) => {
    dispatch({
        type: LOAD_LIST_FREE_SERVICE
    });
}

export const doGetListFreeService = (userId) => dispatch => {
    loadGetLFreeService(dispatch);
    return new Promise((resolve, reject) => {
        getListFreeService(userId)
            .then(data => {
                loadListFreeServiceSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                loadListFreeServiceFail(dispatch, error);
                reject(error);
            });
    })
}

const loadListFreeServiceSuccess = (dispatch, freeServiceList) => {
    dispatch({
        type: LOAD_LIST_FREE_SERVICE_SUCCESS,
        freeServiceList: freeServiceList
    });
}

const loadListFreeServiceFail = (dispatch, error) => {
    dispatch({
        type: LOAD_LIST_FREE_SERVICE_FAIL,
        error: error
    });
}

// Add Free Service
export const doAddFreeService = (freeService) => dispatch => {
    return new Promise((resolve, reject) => {
        addFreeService(freeService)
            .then(data => {
                addFreeServiceSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                addFreeServiceFail(dispatch, error);
                reject(error);
            });
    })
}

const addFreeServiceSuccess = (dispatch) => {
    dispatch({
        type: ADD_FREE_SERVICE_SUCCESS
    });
}

const addFreeServiceFail = (dispatch, error) => {
    dispatch({
        type: ADD_FREE_SERVICE_FAIL,
        error: error
    });
}

// Update Free Service
export const doUpdateFreeService = (freeService, id) => dispatch => {
    return new Promise((resolve, reject) => {
        console.log("free>>>",freeService,">>>",id);
        updateFreeService(freeService, id)
            .then(data => {
                updateFreeServiceSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                updateFreeServiceFail(dispatch, error);
                reject(error);
            });
    })
}

const updateFreeServiceSuccess = (dispatch) => {
    dispatch({
        type: UPDATE_FREE_SERVICE_SUCCESS
    });
}

const updateFreeServiceFail = (dispatch, error) => {
    dispatch({
        type: UPDATE_FREE_SERVICE_FAIL,
        error: error
    });
}

// Delete Free Service
export const doDeleteFreeService = (freeService) => dispatch => {
    return new Promise((resolve, reject) => {
        deleteFreeService(freeService)
            .then(data => {
                deleteFreeServiceSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                deleteFreeServiceFail(dispatch, error);
                reject(error);
            });
    })
}

const deleteFreeServiceSuccess = (dispatch) => {
    dispatch({
        type: DELETE_FREE_SERVICE_SUCCESS
    });
}

const deleteFreeServiceFail = (dispatch, error) => {
    dispatch({
        type: DELETE_FREE_SERVICE_FAIL,
        error: error
    });
}
