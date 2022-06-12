import { 
    GET_LIST_CONTRACT_BY_USER,
    GET_LIST_CONTRACT_BY_USER_SUCCESS,
    GET_LIST_CONTRACT_BY_USER_FAIL,
    GET_LIST_CONTRACT_BY_ROOM,
    GET_LIST_CONTRACT_BY_ROOM_SUCCESS,
    GET_LIST_CONTRACT_BY_ROOM_FAIL,
    GET_LIST_CONTRACT_BY_ID,
    GET_LIST_CONTRACT_BY_ID_SUCCESS,
    GET_LIST_CONTRACT_BY_ID_FAIL,
    ADD_CONTRACT,
    ADD_CONTRACT_SUCCESS,
    ADD_CONTRACT_FAIL,
    UPDATE_CONTRACT,
    UPDATE_CONTRACT_SUCCESS,
    UPDATE_CONTRACT_FAIL,
    DELETE_CONTRACT_SUCCESS,
    DELETE_CONTRACT_FAIL,
    APPROVE_CONTRACT,
    APPROVE_CONTRACT_SUCCESS,
    APPROVE_CONTRACT_FAIL
 } from "./types";
import { 
    getListContractByRoom, 
    getListContractByUser, 
    getListContractById, 
    addContract, 
    updateContract,
    deleteContract,
    approveContract
} from "../../api/contractAPI";


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

export const doAddContract = (contract) => dispatch => {
    return new Promise((resolve, reject) => {
        addContract(contract)
            .then(data => {
                addContractSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                addContractError(dispatch, error);
                reject(error);
            });
    })
};

export const doUpdateContract = (contract, id) => dispatch => {
    return new Promise((resolve, reject) => {
        updateContract(contract, id)
            .then(data => {
                updateContractSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                updateContractError(dispatch, error);
                reject(error);
            });
    })
};

export const doApproveContract = (contract, id) => dispatch => {
    return new Promise((resolve, reject) => {
        approveContract(contract, id)
            .then(data => {
                approveContractSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                approveContractError(dispatch, error);
                reject(error);
            });
    })
};

export const doDeleteContract = (contract, id) => dispatch => {
    return new Promise((resolve, reject) => {
        deleteContract(contract, id)
            .then(data => {
                deleteContractSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                deleteContractError(dispatch, error);
                reject(error);
            });
    })
};

const approveContractSuccess = (dispatch) => {
    dispatch({
        type: APPROVE_CONTRACT_SUCCESS
    });
}
const approveContractError = (dispatch, error) => {
    dispatch({
        type: APPROVE_CONTRACT_FAIL,
        error: error
    });
}

const getListContractByRoomSuccess = (dispatch, error) => {
    dispatch({
        type: GET_LIST_CONTRACT_BY_ROOM_SUCCESS,
        error: error
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

const addContractSuccess = (dispatch) => {
    dispatch({
        type: ADD_CONTRACT_SUCCESS
    });
}

const addContractError = (dispatch, error) => {
    dispatch({
        type: ADD_CONTRACT_FAIL,
        error: error
    });
}

const updateContractSuccess = (dispatch) => {
    dispatch({
        type: UPDATE_CONTRACT_SUCCESS
    });
}

const updateContractError = (dispatch, error) => {
    dispatch({
        type: UPDATE_CONTRACT_FAIL,
        error: error
    });
}

const deleteContractSuccess = (dispatch) => {
    dispatch({
        type: DELETE_CONTRACT_SUCCESS
    });
}

const deleteContractError = (dispatch, error) => {
    dispatch({
        type: DELETE_CONTRACT_FAIL,
        error: error
    });
}
