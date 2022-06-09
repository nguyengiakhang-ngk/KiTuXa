import { 
    GET_BILL_BY_CONTRACT,
    GET_BILL_BY_CONTRACT_SUCCESS,
    GET_BILL_BY_CONTRACT_FAIL,
 } from "./types";
import { getListBillByContract } from "../../api/billAPI";



export const doLoadListBillByContract = (contractId) => dispatch => {
    return new Promise((resolve, reject) => {
        getListBillByContract(contractId)
            .then(data => {
                getListBillByContractSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getListBillByContractError(dispatch, error);
                reject(error);
            });
    })
};


const getListBillByContractSuccess = (dispatch, listBillByContract) => {
    dispatch({
        type: GET_BILL_BY_CONTRACT_SUCCESS,
        listBillByContract: listBillByContract
    });
}

const getListBillByContractError = (dispatch, error) => {
    dispatch({
        type: GET_BILL_BY_CONTRACT_FAIL,
        error: error
    });
}


