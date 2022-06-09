import {doPost, doGet} from './apiCommon'
import {GET_BILL_BY_CONTRACT} from '../constant/apiUrl'

export const getListBillByContract = (contractId) => {
    return doGet(GET_BILL_BY_CONTRACT, contractId);
}
