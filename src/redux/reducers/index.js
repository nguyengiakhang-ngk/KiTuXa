import { combineReducers } from "redux";
import areaReducer from "./area"
import loginReducer from "./login"

const reducers = combineReducers({
    area: areaReducer,
    login: loginReducer
});

export default ( state, action ) => reducers(state, action);
