import {doPost, doGet, doPut, doDelete} from './apiCommon'
import {
    GET_LIST_CONTRACT_BY_ROOM, 
    GET_LIST_CONTRACT_BY_USER, 
    GET_LIST_CONTRACT_BY_ID, 
    ADD_CONTRACT, 
    UPDATE_CONTRACT,
    DELETE_CONTRACT
} from '../constant/apiUrl'

export const getListContractByRoom = (roomId) => {
    return doGet(GET_LIST_CONTRACT_BY_ROOM, roomId);
}

export const getListContractByUser = (userId) => {
    return doGet(GET_LIST_CONTRACT_BY_USER, userId);
}

export const getListContractById = (id) => {
    return doGet(GET_LIST_CONTRACT_BY_ID, id);
}

export const addContract = (contract) => {
    return doPost(ADD_CONTRACT, contract);
}

export const updateContract = (contract, id) => {
    return doPut(UPDATE_CONTRACT, contract, id);
}

export const deleteContract = (id) => {
    return doDelete(DELETE_CONTRACT, id);
}
