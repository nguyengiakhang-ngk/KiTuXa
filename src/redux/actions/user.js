import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SIGN_UP,
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_TYPE_OF_ROOM_SUCCESS,
    UPDATE_TYPE_OF_ROOM_FAIL,
    DELETE_TYPE_OF_ROOM_SUCCESS, DELETE_TYPE_OF_ROOM_FAIL
} from "./types";
import {getUser, login, signUp, updateUser} from "../../api/userAPI";
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
