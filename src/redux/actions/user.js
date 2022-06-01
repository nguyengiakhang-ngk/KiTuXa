import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from "./types";
import { login, signUp } from "../../api/userAPI";

export const doLogin = (user) => dispatch => {
    login()
        .then(response => response.json())
        .then(
            data => loginSuccess(data),
            error => loginError(error.message || 'Unexpected Error!!!')
        )
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

const loginSuccess = (user) => dispatch => {
    dispatch({
        type: LOGIN_SUCCESS,
        user: user
    });
}

const loginError = (error) => dispatch => {
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
