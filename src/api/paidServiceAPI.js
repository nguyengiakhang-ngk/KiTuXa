import {doGet, doPost, doPut, doDelete} from './apiCommon'
import {ADD_PAID_SERVICE, DELETE_PAID_SERVICE, GET_LIST_PAID_SERVICE, UPDATE_PAID_SERVICE} from '../constant/apiUrl'

export const getListPaidService = async (userId) => {
    return doGet(GET_LIST_PAID_SERVICE, userId);
}

export const addPaidService = async (paidService) => {
    return doPost(ADD_PAID_SERVICE, paidService);
}

export const updatePaidService = async (paidService, id) => {
    return doPut(UPDATE_PAID_SERVICE, paidService, id);
}

export const deletePaidService = async (paidService) => {
    return doDelete(DELETE_PAID_SERVICE, paidService);
}
