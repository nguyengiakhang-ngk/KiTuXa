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
    ADD_NUMBER_WATER_FAIL
} from "./types";
import { getRoomByArea, getRoomById, getRoomByBookTicket, addNumberElectric, addNumberWater } from "../../api/roomAPI";

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

const getRoomByAreaSuccess = (dispatch, listRoomByArea) => {
    dispatch({
        type: GET_ROOM_BY_AREA_SUCCESS,
        listRoomByArea: listRoomByArea
    });
}

const getRoomByAreaError = (dispatch, error) => {
    dispatch({
        type: GET_ROOM_BY_AREA_ERROR,
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
        error: error
    });
}
