import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from "./types";

const signUp = () => dispatch => {
    dispatch({
        type: SIGN_UP
    });
}

const signUpSuccess = (status) => dispatch => {
    dispatch({
        type: SIGN_UP_SUCCESS,
        status: status
    });
}

const signUpError = (status) => dispatch => {
    dispatch({
        type: SIGN_UP_ERROR,
        status: status,
        error: error
    });
}
