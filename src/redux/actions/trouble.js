import { 
    GET_LIST_TROUBLE_BY_ROOM,
    GET_LIST_TROUBLE_BY_ROOM_SUCCESS,
    GET_LIST_TROUBLE_BY_ROOM_FAIL,
    ADD_TROUBLE,
    ADD_TROUBLE_SUCCESS,
    ADD_TROUBLE_FAIL,
    UPDATE_TROUBLE,
    UPDATE_TROUBLE_SUCCESS,
    UPDATE_TROUBLE_FAIL,
    DELETE_TROUBLE,
    DELETE_TROUBLE_SUCCESS,
    DELETE_TROUBLE_FAIL
} from "./types";
import { getListTroubleByRoom, addTrouble, updateTrouble, deleteTrouble, getTroubleById } from "../../api/troubleAPI";
import { GET_TROUBLE_BY_ID } from "../../constant/apiUrl";

export const doGetListTroubleByRoom = (roomId) => dispatch => {
    return new Promise((resolve, reject) => {
        getListTroubleByRoom(roomId)
            .then(data => {
                getListTroubleByRoomSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getListTroubleByRoomError(dispatch, error);
                reject(error);
            });
    })
};

export const doGetTroubleById = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        getTroubleById(id)
            .then(data => {
                getTroubleByIdSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getTroubleByIdError(dispatch, error);
                reject(error);
            });
    })
};

export const doAddTrouble = (trouble) => dispatch => {
    return new Promise((resolve, reject) => {
        addTrouble(trouble)
            .then(data => {
                addTroubleSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                addTroubleError(dispatch, error);
                reject(error);
            });
    })
};

export const doUpdateTrouble = (trouble, id) => dispatch => {
    return new Promise((resolve, reject) => {
        console.log("log trouble api>>>", trouble,">>>", id);
        updateTrouble(trouble, id)
            .then(data => {
                updateTroubleSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                updateTroubleError(dispatch, error);
                reject(error);
            });
    })
};

export const doDeleteTrouble = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        deleteTrouble(id)
            .then(data => {
                deleteTroubleSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                deleteTroubleError(dispatch, error);
                reject(error);
            });
    })
};

const getListTroubleByRoomSuccess = (dispatch, listTroubleByRoom)  => {
    dispatch({
        type: GET_LIST_TROUBLE_BY_ROOM_SUCCESS,
        listTroubleByRoom: listTroubleByRoom
    });
}

const getListTroubleByRoomError = (status) => dispatch => {
    dispatch({
        type: GET_LIST_TROUBLE_BY_ROOM_FAIL,
        error: error
    });
}

const addTroubleSuccess = () => dispatch  => {
    dispatch({
        type: ADD_TROUBLE_SUCCESS,
    });
}

const addTroubleError = (dispatch, error) => {
    dispatch({
        type: ADD_TROUBLE_FAIL,
        error: error
    });
}

const updateTroubleSuccess = (dispatch) => {
    dispatch({
        type: UPDATE_TROUBLE_SUCCESS,
    });
}

const updateTroubleError = () => dispatch  => {
    dispatch({
        type:  UPDATE_TROUBLE_FAIL,
        error: error
    });
}

const deleteTroubleSuccess = () => dispatch  => {
    dispatch({
        type: DELETE_TROUBLE_SUCCESS,
    });
}

const deleteTroubleError = (dispatch)  => {
    dispatch({
        type:  DELETE_TROUBLE_FAIL,
        error: error
    });
}

const getTroubleByIdSuccess = () => dispatch  => {
    dispatch({
        type: GET_TROUBLE_BY_ID_SUCCESS,
    });
}

const getTroubleByIdError = () => dispatch  => {
    dispatch({
        type:  GET_TROUBLE_BY_ID_FAIL,
        error: error
    });
}
