import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from "./types";

export const  doLogin = (userName, pass) => ({

});

const login = () => dispatch => {
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
