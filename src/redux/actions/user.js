import { 
    LOGIN, 
    LOGIN_SUCCESS, 
    LOGIN_ERROR, 
    SIGN_UP, 
    SIGN_UP_SUCCESS, 
    SIGN_UP_ERROR,
    GET_USER_BY_BOOKTICKET,
    GET_USER_BY_BOOKTICKET_SUCCESS,
    GET_USER_BY_BOOKTICKET_ERROR
 } from "./types";
import { login, signUp, getUserByBookTicket } from "../../api/userAPI";

export const initUser = (user) => dispatch => {
    if(user) {
        loginSuccess(dispatch, user);
    }
};

export const doLogin = (user) => dispatch => {
    return new Promise((resolve, reject) => {
        login(user)
            .then(data => {
                loginSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                loginError(dispatch, error);
                reject(error);
            });
    })
};

export const doSignUp = (user) => dispatch => {
    return new Promise((resolve, reject) => {
        signUp(user)
            .then(data => {
                signUpSuccess();
                resolve(data);
            })
            .catch(error => {
                signUpError(error);
                reject(error);
            });
    })
};

export const doGetUserByBookTicket = (roomId) => dispatch => {
    return new Promise((resolve, reject) => {
        getUserByBookTicket(roomId)
            .then(data => {
                getUserByBookTicketSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getUserByBookTicketError(error);
                reject(error);
            });
    })
};

const loadLogin = () => dispatch => {
    dispatch({
        type: LOGIN
    });
}

const loginSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_SUCCESS,
        user: user
    });
}

const loginError = (dispatch, error) => {
    dispatch({
        type: LOGIN_ERROR,
        error: error
    });
}

const loadSignUp = () => dispatch => {
    dispatch({
        type: SIGN_UP
    });
}

const signUpSuccess = () => dispatch => {
    dispatch({
        type: SIGN_UP_SUCCESS
    });
}

const signUpError = (error) => dispatch => {
    dispatch({
        type: SIGN_UP_ERROR,
        error: error
    });
}

const loadGetUserByBookTicket = () => dispatch => {
    dispatch({
        type: GET_USER_BY_BOOKTICKET
    });
}

const getUserByBookTicketSuccess = (dispatch, user) => {
    dispatch({
        type: GET_USER_BY_BOOKTICKET_SUCCESS,
        user: user
    });
}

const getUserByBookTicketError = (dispatch, user) => {
    dispatch({
        type: GET_USER_BY_BOOKTICKET_ERROR,
        error: error
    });
}