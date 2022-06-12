import {
    ADD_TYPE_OF_ROOM, 
    ADD_TYPE_OF_ROOM_SUCCESS, 
    ADD_TYPE_OF_ROOM_FAIL,
    GET_TYPE_OF_ROOM_BY_SAVE,
    GET_TYPE_OF_ROOM_BY_SAVE_SUCCESS,
    GET_TYPE_OF_ROOM_BY_SAVE_FAIL,
    GET_PRICE_OF_ROOM,
    GET_PRICE_OF_ROOM_SUCCESS,
    GET_PRICE_OF_ROOM_FAIL,
    LOAD_LIST_TYPE_OF_ROOM, LOAD_LIST_TYPE_OF_ROOM_SUCCESS, LOAD_LIST_TYPE_OF_ROOM_FAIL,
    ADD_TYPE_OF_ROOM, ADD_TYPE_OF_ROOM_SUCCESS, ADD_TYPE_OF_ROOM_FAIL,
    UPDATE_TYPE_OF_ROOM, UPDATE_TYPE_OF_ROOM_SUCCESS, UPDATE_TYPE_OF_ROOM_FAIL,
    DELETE_TYPE_OF_ROOM, DELETE_TYPE_OF_ROOM_SUCCESS, DELETE_TYPE_OF_ROOM_FAIL
} from "./types";
import {
    addTypeOfRoom, 
    getListTypeOfRoomBySaveRoomTicket, 
    getPriceOfRoom,
    addTypeOfRoom,
    deleteTypeOfRoom,
    getListTypeOfRoom,
    getListTypeOfRoomNew, getListTypeOfRoomSearch, getListTypeOfRoomSearchAddress,
    updateTypeOfRoom
} from "../../api/typeOfRoomAPI";

// Load List Type Of Room
const loadGetTypeOfRoom = (dispatch) => {
    dispatch({
        type: LOAD_LIST_TYPE_OF_ROOM
    });
}

export const doGetListTypeOfRoom = (userId) => dispatch => {
    loadGetTypeOfRoom(dispatch);
    return new Promise((resolve, reject) => {
        getListTypeOfRoom(userId)
            .then(data => {
                loadListTypeOfRoomSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                loadListTypeOfRoomFail(dispatch, error);
                reject(error);
            });
    })
}

const loadListTypeOfRoomSuccess = (dispatch, typeOfRoomList) => {
    dispatch({
        type: LOAD_LIST_TYPE_OF_ROOM_SUCCESS,
        typeOfRoomList: typeOfRoomList
    });
}

const loadListTypeOfRoomFail = (dispatch, error) => {
    dispatch({
        type: LOAD_LIST_TYPE_OF_ROOM_FAIL,
        error: error
    });
}

// Add Paid Service
export const doAddTypeOfRoom = (typeOfRoom) => dispatch => {
    return new Promise((resolve, reject) => {
        addTypeOfRoom(typeOfRoom)
            .then(data => {
                addTypeOfRoomSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                addTypeOfRoomFail(dispatch, error);
                reject(error);
            });
    })
}

const addTypeOfRoomSuccess = (dispatch) => {
    dispatch({
        type: ADD_TYPE_OF_ROOM_SUCCESS
    });
}

const addTypeOfRoomFail = (dispatch, error) => {
    dispatch({
        type: ADD_TYPE_OF_ROOM_FAIL,
        error: error
    });
}

//Get List type by save
export const doGetListTypeOfRoomBySave = (userId) => dispatch => {
    return new Promise((resolve, reject) => {
        getListTypeOfRoomBySaveRoomTicket(userId)
            .then(data => {
                getListTypeOfRoomBySaveRoomTicketSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                getListTypeOfRoomBySaveRoomTicketFail(dispatch, error);
            })
        })
    }
// Update Type Of Room
export const doUpdateTypeOfRoom = (paidService, id) => dispatch => {
    return new Promise((resolve, reject) => {
        updateTypeOfRoom(paidService, id)
            .then(data => {
                updateTypeOfRoomSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                updateTypeOfRoomFail(dispatch, error);
                reject(error);
            });
    })
}

const getListTypeOfRoomBySaveRoomTicketSuccess = (dispatch) => {
    dispatch({
        type: GET_TYPE_OF_ROOM_BY_SAVE_SUCCESS
    });
}

const getListTypeOfRoomBySaveRoomTicketFail = (dispatch, error) => {
    dispatch({
        type: GET_TYPE_OF_ROOM_BY_SAVE_FAIL,
    })
}
const updateTypeOfRoomSuccess = (dispatch) => {
    dispatch({
        type: UPDATE_TYPE_OF_ROOM_SUCCESS
    });
}

const updateTypeOfRoomFail = (dispatch, error) => {
    dispatch({
        type: UPDATE_TYPE_OF_ROOM_FAIL ,
        error: error
    });
}

export const doGetPriceOfRoom = (typeOfRoomId) => dispatch => {
    return new Promise((resolve, reject) => {
        getPriceOfRoom(typeOfRoomId)
            .then(data => {
                getListTypeOfRoomBySaveRoomTicketSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                getListTypeOfRoomBySaveRoomTicketFail(dispatch, error);
            });
        })
    }
    
// Delete Type Of Room
export const doDeleteTypeOfRoom = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        deleteTypeOfRoom(id)
            .then(data => {
                deleteTypeOfRoomSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                deleteTypeOfRoomFail(dispatch, error);
                reject(error);
            });
    })
}

const getPriceOfRoomSuccess = (dispatch) => {
    dispatch({
        type: GET_PRICE_OF_ROOM_SUCCESS
    });
}

const getPriceOfRoomFail = (dispatch, error) => {
    dispatch({
        type: GET_PRICE_OF_ROOM_FAIL,
    });
}
const deleteTypeOfRoomSuccess = (dispatch) => {
    dispatch({
        type: DELETE_TYPE_OF_ROOM_SUCCESS
    });
}

const deleteTypeOfRoomFail = (dispatch, error) => {
    dispatch({
        type: DELETE_TYPE_OF_ROOM_FAIL,
        error: error
    });
}

export const doGetListTypeOfRoomNew = () => dispatch => {
    loadGetTypeOfRoom(dispatch);
    return new Promise((resolve, reject) => {
        getListTypeOfRoomNew()
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}

export const doGetListTypeOfRoomSearch = (key) => dispatch => {
    loadGetTypeOfRoom(dispatch);
    return new Promise((resolve, reject) => {
        getListTypeOfRoomSearch(key)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}

export const doGetListTypeOfRoomSearchAddress = (key) => dispatch => {
    loadGetTypeOfRoom(dispatch);
    return new Promise((resolve, reject) => {
        getListTypeOfRoomSearchAddress(key)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}
