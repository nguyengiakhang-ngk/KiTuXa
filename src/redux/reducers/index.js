import { combineReducers } from "redux";
import areaReducer from "./area";
import loginReducer from "./login";
import signUpReducer from "./signUp";

const reducers = combineReducers({
    area: areaReducer,
    login: loginReducer,
    signUp: signUpReducer
});

export default ( state, action ) => reducers(state, action);
