import { 
    GET_LIST_CONTRACT_BY_USER,
    GET_LIST_CONTRACT_BY_USER_SUCCESS,
    GET_LIST_CONTRACT_BY_USER_FAIL,
    GET_LIST_CONTRACT_BY_ROOM,
    GET_LIST_CONTRACT_BY_ROOM_SUCCESS,
    GET_LIST_CONTRACT_BY_ROOM_FAIL,
    GET_LIST_CONTRACT_BY_ID,
    GET_LIST_CONTRACT_BY_ID_SUCCESS,
    GET_LIST_CONTRACT_BY_ID_FAIL
 } from "./types";
import { getListContractByRoom, getListContractByUser, getListContractById } from "../../api/contractAPI";


export const doLoadListContractByRoom = (roomId) => dispatch => {
    return new Promise((resolve, reject) => {
        getListContractByRoom(roomId)
            .then(data => {
                getListContractByRoomSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getListContractByRoomError(dispatch, error);
                reject(error);
            });
    })
};

export const doLoadListContractById = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        getListContractById(id)
            .then(data => {
                getListContractByIdSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getListContractByIdError(dispatch, error);
                reject(error);
            });
    })
};


const getListContractByRoomSuccess = (dispatch, listContractByRoom) => {
    dispatch({
        type: GET_LIST_CONTRACT_BY_ROOM_SUCCESS,
        listContractByRoom: listContractByRoom
    });
}

const getListContractByRoomError = (dispatch, error) => {
    dispatch({
        type: GET_LIST_CONTRACT_BY_ROOM_FAIL,
        error: error
    });
}

const getListContractByIdSuccess = (dispatch, listContractById) => {
    dispatch({
        type: GET_LIST_CONTRACT_BY_ID_SUCCESS,
        listContractById: listContractById
    });
}

const getListContractByIdError = (dispatch, error) => {
    dispatch({
        type: GET_LIST_CONTRACT_BY_ID_FAIL,
        error: error
    });
}

