import { 
    LOGIN, 
    LOGIN_SUCCESS, 
    LOGIN_ERROR, 
    SIGN_UP, 
    SIGN_UP_SUCCESS, 
    SIGN_UP_ERROR,
    GET_USER_BY_BOOKTICKET,
    GET_USER_BY_BOOKTICKET_SUCCESS,
    GET_USER_BY_BOOKTICKET_ERROR,
    GET_USER_BY_ID,
    GET_USER_BY_ID_SUCCESS,
    GET_USER_BY_ID_ERROR
 } from "./types";
import { login, signUp, getUserByBookTicket, getUserById } from "../../api/userAPI";

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

export const doGetUserById = (userId) => dispatch => {
    return new Promise((resolve, reject) => {
        getUserById(userId)
            .then(data => {
                getUserByIdSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getUserByIdError(error);
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

const getUserByBookTicketSuccess = (dispatch, userAddContract) => {
    dispatch({
        type: GET_USER_BY_BOOKTICKET_SUCCESS,
        userAddContract: userAddContract
    });
}

const getUserByBookTicketError = (dispatch, error) => {
    dispatch({
        type: GET_USER_BY_BOOKTICKET_ERROR,
        error: error
    });
}

const getUserByIdSuccess = (dispatch) => {
    dispatch({
        type: GET_USER_BY_ID_SUCCESS,
    });
}

const getUserByIdError = (dispatch, error) => {
    dispatch({
        type: GET_USER_BY_ID_ERROR,
        error: error
    });
}