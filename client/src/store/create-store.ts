import { combineReducers, configureStore } from "@reduxjs/toolkit";
import objectsReducer from "./objects.store";
import usersListReducer from "./users-store";
import metroReducer from "./metro-store";
// import notesListReducer from "../../../entities/note/store/notes-store";
// import usersListReducer from "../../../entities/user/store/users-store";
// import commentsListReducer from "../../../entities/comment/store/comments-store";
// import categoriesListReducer from "../../../entities/categories/store/categories-store";
// import selectedNoteReducer from "./selected-note-store";
// import searchQueryReducer from "./search-query-store";

const rootReducer = combineReducers({
  objects: objectsReducer,
  metro: metroReducer,
  users: usersListReducer,
  // comments: commentsListReducer,
  // categories: categoriesListReducer,
  // selectedNote: selectedNoteReducer,
  // searchQuery: searchQueryReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
