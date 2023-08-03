import { combineReducers, configureStore } from "@reduxjs/toolkit";
import objectsReducer from "./objects.store";
import usersListReducer from "./users.store";
import metroReducer from "./metro.store";
import districtsReducer from "./districts.store";
import objectStatusReducer from "./object-status.store";
import workingPositionReducer from "./working-position.store";

const rootReducer = combineReducers({
  objects: objectsReducer,
  metro: metroReducer,
  users: usersListReducer,
  districts: districtsReducer,
  objectStatus: objectStatusReducer,
  workingPosition: workingPositionReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
