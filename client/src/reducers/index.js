import { combineReducers } from "redux";
import selector from "./selector";
import place from "./place";
import markSelector from "./markSelector";
import web3Init from "./web3Init";
export default combineReducers({
  selector,
  place,
  markSelector,
  web3Init
});
