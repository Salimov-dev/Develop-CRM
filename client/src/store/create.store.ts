import { combineReducers, configureStore } from "@reduxjs/toolkit";
import objectsReducer from "./objects.store";
import usersListReducer from "./users.store";
import metroReducer from "./metro.store";
import districtsReducer from "./districts.store";
import objectStatusReducer from "./object-status.store";
import workingPositionReducer from "./working-position.store";
import sidebarCollapsStateReducer from "./sidebar-collaps-state.store";
import currentRenterReducer from "./current-renter.store";
import estateConditionsReducer from "./estate-conditions.store";
import rentTypesReducer from "./rent-types.store";
import objectTypesReducer from "./object-types.store";
import estateTypesReducer from "./estate-types.store";

const rootReducer = combineReducers({
  objects: objectsReducer,
  metro: metroReducer,
  users: usersListReducer,
  districts: districtsReducer,
  objectStatus: objectStatusReducer,
  workingPosition: workingPositionReducer,
  sidebarCollapsState: sidebarCollapsStateReducer,
  currentRenter: currentRenterReducer,
  estateConditions: estateConditionsReducer,
  rentTypes: rentTypesReducer,
  objectTypes: objectTypesReducer,
  estateTypes: estateTypesReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
