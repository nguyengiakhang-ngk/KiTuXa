import {
    GET_ROOM_BY_AREA,
    GET_ROOM_BY_AREA_SUCCESS,
    GET_ROOM_BY_AREA_ERROR,
    GET_ROOM_BY_ID,
    GET_ROOM_BY_ID_SUCCESS,
    GET_ROOM_BY_ID_FAIL,
    GET_ROOM_BY_BOOKTICKET,
    GET_ROOM_BY_BOOKTICKET_SUCCESS,
    GET_ROOM_BY_BOOKTICKET_FAIL,
    ADD_NUMBER_ELECTRIC,
    ADD_NUMBER_ELECTRIC_SUCCESS,
    ADD_NUMBER_ELECTRIC_FAIL,
    ADD_NUMBER_WATER,
    ADD_NUMBER_WATER_SUCCESS,
    ADD_NUMBER_WATER_FAIL,
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
    DELETE_ROOM_FAIL,
    GET_BOOKTICKET_BY_ROOM,
    GET_BOOKTICKET_BY_ROOM_SUCCESS,
    GET_BOOKTICKET_BY_ROOM_FAIL,
    GET_LIST_ROOM_BY_TYPE,
    GET_LIST_ROOM_BY_TYPE_SUCCESS,
    GET_LIST_ROOM_BY_TYPE_FAIL
} from "./types";
import {
    getRoomByArea,
    getRoomById,
    getRoomByBookTicket,
    addNumberElectric,
    addNumberWater,
    addRoom,
    deleteRoom,
    updateRoom,
    getListRoom,
    getBookTicketByRoom,
    getRoomByType, getBillMaterialRoom
} from "../../api/roomAPI";

export const doGetRoomByArea = (areaId) => dispatch => {
    return new Promise((resolve, reject) => {
        getRoomByArea(areaId)
            .then(data => {
                getRoomByAreaSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getRoomByAreaError(dispatch, error);
                reject(error);
            });
    })
};

export const doGetRoomByType = (typeOfRoomId) => dispatch => {
    return new Promise((resolve, reject) => {
        getRoomByType(typeOfRoomId)
            .then(data => {
                getRoomByTypeSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getRoomByTypeError(dispatch, error);
                reject(error);
            });
    })
};

export const doGetRoomByBookTicket = (userId) => dispatch => {
    return new Promise((resolve, reject) => {
        getRoomByBookTicket(userId)
            .then(data => {
                getRoomByBookTicketSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getRoomByBookTicketError(dispatch, error);
                reject(error);
            });
    })
};

export const doGetRoomById = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        getRoomById(id)
            .then(data => {
                getRoomByIdSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getRoomByIdError(dispatch, error);
                reject(error);
            });
    })
};

const getRoomByAreaAction = () => dispatch => {
    dispatch({
        type: GET_ROOM_BY_AREA
    });
}

const getRoomByTypeSuccess = (dispatch) => {
    dispatch({
        type: GET_LIST_ROOM_BY_TYPE_SUCCESS,
    });
}

const getRoomByTypeError = (dispatch, error) => {
    dispatch({
        type: GET_LIST_ROOM_BY_TYPE_FAIL,
    });
}

const getRoomByAreaSuccess = (dispatch, listRoomByArea) => {
    dispatch({
        type: GET_ROOM_BY_AREA_SUCCESS,
        listRoomByArea: listRoomByArea
    });
}

const getRoomByAreaError = (dispatch, error) => {
    dispatch({
        type: GET_ROOM_BY_AREA_ERROR,
    });
}

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

const getRoomByIdSuccess = (dispatch) => {
    dispatch({
        type: GET_ROOM_BY_ID_SUCCESS,
    });
}

const getRoomByIdError = (dispatch, error) => {
    dispatch({
        type: GET_ROOM_BY_ID_ERROR,
        error: error
    });
}

const getRoomByBookTicketSuccess = (dispatch) => {
    dispatch({
        type: GET_ROOM_BY_BOOKTICKET_SUCCESS,
    });
}

const getRoomByBookTicketError = (dispatch, error) => {
    dispatch({
        type: GET_ROOM_BY_BOOKTICKET_FAIL,
    })
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

//electric and water

export const doAddNumberElectric = (number) => dispatch => {
    return new Promise((resolve, reject) => {
        console.log(number, ":)")
        addNumberElectric(number)
            .then(data => {
                addNumberElectricSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                addNumberElectricError(dispatch, error);
                reject(error);
            });
    })
};

export const doAddNumberWater = (number) => dispatch => {
    return new Promise((resolve, reject) => {
        addNumberWater(number)
            .then(data => {
                addNumberWaterSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                addNumberWaterError(dispatch, error);
                reject(error);
            });
    })
};
const addNumberElectricSuccess = (dispatch) => {
    dispatch({
        type: ADD_NUMBER_ELECTRIC_SUCCESS,
    });
}

const addNumberElectricError = (dispatch, error) => {
    dispatch({
        type: ADD_NUMBER_ELECTRIC_FAIL,
        error: error
    });
}

const addNumberWaterSuccess = (dispatch) => {
    dispatch({
        type: ADD_NUMBER_WATER_SUCCESS,
    });
}

const addNumberWaterError = (dispatch, error) => {
    dispatch({
        type: ADD_NUMBER_ELECTRIC_FAIL,
    })
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

// doGetBookTicketByRoom
export const doGetBookTicketByRoom = (roomId) => dispatch => {
    return new Promise((resolve, reject) => {
        getBookTicketByRoom(roomId)
            .then(data => {
                getBookTicketByRoomSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                getBookTicketByRoomFail(dispatch, error);
                reject(error);
            });
    })
}

const getBookTicketByRoomSuccess = (dispatch) => {
    dispatch({
        type: DELETE_ROOM_SUCCESS
    });
}

const getBookTicketByRoomFail = (dispatch, error) => {
    dispatch({
        type: DELETE_ROOM_FAIL,
        error: error
    });
}

export const doGetBillMaterialRoom = (roomId) => dispatch => {
    return new Promise((resolve, reject) => {
        getBillMaterialRoom(roomId)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}
