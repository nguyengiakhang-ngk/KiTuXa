import {doPost, doGet, doPut, doDelete} from './apiCommon'
import {GET_RECEIPT_BY_CONTRACT, GET_RECEIPT_BY_ID, ADD_RECEIPT, UPDATE_RECEIPT, DELETE_RECEIPT} from '../constant/apiUrl'

export const getReceiptByContract = async (billId) => {
    return doGet(GET_RECEIPT_BY_CONTRACT, billId);
}

export const getReceiptById = async (id) => {
    return doGet(GET_RECEIPT_BY_ID, id);
}

export const addReceipt = async (receipt) => {
    return doPost(ADD_RECEIPT, receipt);
}

export const updateReceipt = async (receipt, id) => {
    return doPut(UPDATE_RECEIPT, receipt, id);
}

export const deleteReceipt = async (id) => {
    return doDelete(DELETE_RECEIPT, id);
}


