import {doPost, doGet} from './apiCommon'
import {GET_LIST_CONTRACT_BY_ROOM, GET_LIST_CONTRACT_BY_USER, GET_LIST_CONTRACT_BY_ID} from '../constant/apiUrl'

export const getListContractByRoom = (roomId) => {
    return doGet(GET_LIST_CONTRACT_BY_ROOM, roomId);
}

export const getListContractByUser = (userId) => {
    return doGet(GET_LIST_CONTRACT_BY_USER, userId);
}

export const getListContractById = (id) => {
    return doGet(GET_LIST_CONTRACT_BY_ID, id);
}
