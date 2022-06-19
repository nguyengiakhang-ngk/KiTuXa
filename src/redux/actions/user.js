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
    GET_USER_BY_ID_SUCCESS,
    GET_USER_BY_ID_ERROR,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
 } from "./types";
import {
    login,
    signUp,
    getUserByBookTicket,
    getUserById,
    getUser,
    updateUser,
    checkUserDuplicate, changePass
} from "../../api/userAPI";
import {deleteTypeOfRoom, updateTypeOfRoom} from "../../api/typeOfRoomAPI";

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
    });
}
// Update User
export const doUpdateUser = (user, id) => dispatch => {
    return new Promise((resolve, reject) => {
        updateUser(user, id)
            .then(data => {
                updateUpdateUserSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                updateUpdateUserFail(dispatch, error);
                reject(error);
            });
    })
}

const updateUpdateUserSuccess = (dispatch) => {
    dispatch({
        type: UPDATE_USER_SUCCESS
    });
}

const updateUpdateUserFail = (dispatch, error) => {
    dispatch({
        type: UPDATE_USER_FAIL,
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
// Get User
export const doGetUser = (userId) => dispatch => {
    return new Promise((resolve, reject) => {
        getUser(userId)
            .then(data => {
                getUserSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getUserError(dispatch, error);
                reject(error);
            });
    })
};

const getUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_SUCCESS,
        user: user
    });
}

const getUserError = (dispatch, error) => {
    dispatch({
        type: LOGIN_ERROR,
        error: error
    });
}

// Get User
export const doCheckUserDuplicate = (numberPhone) => dispatch => {
    return new Promise((resolve, reject) => {
        checkUserDuplicate(numberPhone)
            .then(data => {
                getUserSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                getUserError(dispatch, error);
                reject(error);
            });
    })
};

// Change Pass
export const doChangePass = (pass, numberPhone) => dispatch => {
    return new Promise((resolve, reject) => {
        changePass(pass, numberPhone)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
};
