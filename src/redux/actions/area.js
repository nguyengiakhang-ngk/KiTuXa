import {
    LOAD_LIST_AREA, LOAD_LIST_AREA_SUCCESS, LOAD_LIST_AREA_FAIL,
    ADD_AREA, ADD_AREA_SUCCESS, ADD_AREA_FAIL,
    UPDATE_AREA, UPDATE_AREA_SUCCESS, UPDATE_AREA_FAIL,
    DELETE_AREA, DELETE_AREA_SUCCESS, DELETE_AREA_FAIL
} from "./types";
import {getListArea, addArea, updateArea, deleteArea, getAreaById} from "../../api/areaAPI";

// Load List Area
const loadGetLArea = (dispatch) => {
    dispatch({
        type: LOAD_LIST_AREA
    });
}

export const doGetListArea = (userId) => dispatch => {
    loadGetLArea(dispatch);
    return new Promise((resolve, reject) => {
        getListArea(userId)
            .then(data => {
                loadListAreaSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                loadListAreaFail(dispatch, error);
                reject(error);
            });
    })
}

const loadListAreaSuccess = (dispatch, areaList) => {
    dispatch({
        type: LOAD_LIST_AREA_SUCCESS,
        areaList: areaList
    });
}

const loadListAreaFail = (dispatch, error) => {
    dispatch({
        type: LOAD_LIST_AREA_FAIL,
        error: error
    });
}

// Add Area
export const doAddArea = (area) => dispatch => {
    return new Promise((resolve, reject) => {
        addArea(area)
            .then(data => {
                addAreaSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                addAreaFail(dispatch, error);
                reject(error);
            });
    })
}

const addAreaSuccess = (dispatch) => {
    dispatch({
        type: ADD_AREA_SUCCESS
    });
}

const addAreaFail = (dispatch, error) => {
    dispatch({
        type: ADD_AREA_FAIL,
        error: error
    });
}

// Update Area
export const doUpdateArea = (area, id) => dispatch => {
    return new Promise((resolve, reject) => {
        updateArea(area, id)
            .then(data => {
                updateAreaSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                updateAreaFail(dispatch, error);
                reject(error);
            });
    })
}

const updateAreaSuccess = (dispatch) => {
    dispatch({
        type: UPDATE_AREA_SUCCESS
    });
}

const updateAreaFail = (dispatch, error) => {
    dispatch({
        type: UPDATE_AREA_FAIL,
        error: error
    });
}

// Delete Area
export const doDeleteArea = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        deleteArea(id)
            .then(data => {
                deleteAreaSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                deleteAreaFail(dispatch, error);
                reject(error);
            });
    })
}

const deleteAreaSuccess = (dispatch) => {
    dispatch({
        type: DELETE_AREA_SUCCESS
    });
}

const deleteAreaFail = (dispatch, error) => {
    dispatch({
        type: DELETE_AREA_FAIL,
        error: error
    });
}

// Get Area By Id
export const doGetAreaById = (areaId) => dispatch => {
    return new Promise((resolve, reject) => {
        getAreaById(areaId)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}
