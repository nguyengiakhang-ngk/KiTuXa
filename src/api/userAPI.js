import {doGet, doPost, doPut} from './apiCommon'
import {GET_USER, LOGIN, SIGNUP, UPDATE_USER} from '../constant/apiUrl'

export const getUser = async (userId) => {
    return doGet(GET_USER, userId);
}

export const login = (user) => {
    return doPost(LOGIN, user);
}

export const signUp = async (user) => {
    return doPost(SIGNUP, user);
}

export const updateUser = async (user, id) => {
    return doPut(UPDATE_USER, user, id);
}
