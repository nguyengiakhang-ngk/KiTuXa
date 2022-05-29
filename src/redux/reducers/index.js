import { combineReducers } from "redux";
import areaReducer from "./area";
import userReducer from "./user";
import signUpReducer from "./signUp";

const reducers = combineReducers({
    area: areaReducer,
    user: userReducer,
    signUp: signUpReducer
});

export default ( state, action ) => reducers(state, action);
