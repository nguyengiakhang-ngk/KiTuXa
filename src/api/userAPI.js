import {doPost} from './apiCommon'
import {LOGIN, SIGNUP} from '../constant/apiUrl'

export const login = async (user) => {
    return doPost(LOGIN, user);
}

export const signUp = async (user) => {
    return doPost(SIGNUP, user);
}
