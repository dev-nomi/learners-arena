import authRecducer from "./auth";
import { combineReducers } from "redux";

const allRecducers = combineReducers({
  auth: authRecducer,
});

export default allRecducers;
