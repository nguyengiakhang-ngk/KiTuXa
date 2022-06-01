import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from "./types";
import {login, signUp} from "../../api/userAPI";

export const doLogin = (user) => dispatch => {
    return new Promise((resolve, reject) => {
        login(user)
            .then(data => {
                loginSuccess(data);
                resolve(data);
            })
            .catch(error => {
                loginError(error);
                reject(error);
            });
    })
};

export const doSignUp = (user) => dispatch => {
    signUp()
        .then(response => response.json())
        .then(
            data => signUpSuccess(data),
            error => signUpError(error.message || 'Unexpected Error!!!')
        )
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

const signUpSuccess = (user) => dispatch => {
    dispatch({
        type: SIGN_UP_SUCCESS
    });
}

const signUpError = (error) => dispatch => {
    dispatch({
        type: SIGN_UP_ERROR
    });
}
