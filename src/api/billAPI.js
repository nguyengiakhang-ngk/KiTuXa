import {doPost, doGet, doPut, doDelete} from './apiCommon'
import {GET_BILL_BY_CONTRACT, ADD_BILL, GET_BILL_BY_ID, UPDATE_BILL, DELETE_BILL} from '../constant/apiUrl'

export const getListBillByContract = (contractId) => {
    return doGet(GET_BILL_BY_CONTRACT, contractId);
}

export const getBillById = (id) => {
    return doGet(GET_BILL_BY_ID, id);
}

export const addBill = (bill) => {
    return doPost(ADD_BILL, bill);
}

export const updateBill = (bill ,id) => {
    return doPut(UPDATE_BILL, bill, id);
}

export const deleteBill = (id) => {
    return doDelete(DELETE_BILL, id);
}