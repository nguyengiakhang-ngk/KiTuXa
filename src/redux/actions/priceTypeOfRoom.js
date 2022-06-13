import {
    ADD_PRICE_TYPE_OF_ROOM, ADD_PRICE_TYPE_OF_ROOM_SUCCESS, ADD_PRICE_TYPE_OF_ROOM_FAIL
} from "./types";
import {addPriceService, addPriceTypeOfRoom} from "../../api/priceTypeOfRoomAPI";

// Add Paid Service
export const doAddPriceTypeOfRoom = (priceTypeOfRoom) => dispatch => {
    return new Promise((resolve, reject) => {
        addPriceTypeOfRoom(priceTypeOfRoom)
            .then(data => {
                addPriceTypeOfRoomSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                addPriceTypeOfRoomFail(dispatch, error);
                reject(error);
            });
    })
}

const addPriceTypeOfRoomSuccess = (dispatch) => {
    dispatch({
        type: ADD_PRICE_TYPE_OF_ROOM_SUCCESS
    });
}

const addPriceTypeOfRoomFail = (dispatch, error) => {
    dispatch({
        type: ADD_PRICE_TYPE_OF_ROOM_FAIL,
        error: error
    });
}

export const doAddPriceService = (priceService) => dispatch => {
    return new Promise((resolve, reject) => {
        addPriceService(priceService)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}
