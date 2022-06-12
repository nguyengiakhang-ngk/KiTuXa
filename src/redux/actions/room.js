import {
    ADD_ROOM,
    ADD_ROOM_SUCCESS,
    ADD_ROOM_FAIL,
    LOAD_LIST_ROOM,
    LOAD_LIST_ROOM_SUCCESS,
    LOAD_LIST_ROOM_FAIL,
    UPDATE_ROOM,
    UPDATE_ROOM_SUCCESS,
    UPDATE_ROOM_FAIL,
    DELETE_ROOM,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_FAIL
} from "./types";
import {addRoom, deleteRoom, updateRoom} from "../../api/roomAPI";
import {getListRoom} from "../../api/roomAPI";

// Load List Room
const loadGetRoom = (dispatch) => {
    dispatch({
        type: LOAD_LIST_ROOM
    });
}

export const doGetListRoom = (userId) => dispatch => {
    loadGetRoom(dispatch);
    return new Promise((resolve, reject) => {
        getListRoom(userId)
            .then(data => {
                loadListRoomSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                loadListOfRoomFail(dispatch, error);
                reject(error);
            });
    })
}

const loadListRoomSuccess = (dispatch, roomList) => {
    dispatch({
        type: LOAD_LIST_ROOM_SUCCESS,
        roomList: roomList
    });
}

const loadListOfRoomFail = (dispatch, error) => {
    dispatch({
        type: LOAD_LIST_ROOM_FAIL,
        error: error
    });
}

// Add Paid Service
export const doAddRoom = (priceTypeOfRoom) => dispatch => {
    return new Promise((resolve, reject) => {
        addRoom(priceTypeOfRoom)
            .then(data => {
                addRoomSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                addRoomFail(dispatch, error);
                reject(error);
            });
    })
}

const addRoomSuccess = (dispatch) => {
    dispatch({
        type: ADD_ROOM_SUCCESS
    });
}

const addRoomFail = (dispatch, error) => {
    dispatch({
        type: ADD_ROOM_FAIL,
        error: error
    });
}

// Update Room
export const doUpdateRoom = (room, id) => dispatch => {
    return new Promise((resolve, reject) => {
        updateRoom(room, id)
            .then(data => {
                updateRoomSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                updateRoomFail(dispatch, error);
                reject(error);
            });
    })
}

const updateRoomSuccess = (dispatch) => {
    dispatch({
        type: UPDATE_ROOM_SUCCESS
    });
}

const updateRoomFail = (dispatch, error) => {
    dispatch({
        type: UPDATE_ROOM_FAIL ,
        error: error
    });
}

// Delete Room
export const doDeleteRoom = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        deleteRoom(id)
            .then(data => {
                deleteRoomSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                deleteRoomFail(dispatch, error);
                reject(error);
            });
    })
}

const deleteRoomSuccess = (dispatch) => {
    dispatch({
        type: DELETE_ROOM_SUCCESS
    });
}

const deleteRoomFail = (dispatch, error) => {
    dispatch({
        type: DELETE_ROOM_FAIL,
        error: error
    });
}
