import { LOGIN } from '../actions/types';

const INITIAL_STATE = {
    userList: [],
    loading: false,
    error: ''
}

export default (preState = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...preState,
                loading: true,
                error:''
            }
        default:
            return preState;
    }
};
