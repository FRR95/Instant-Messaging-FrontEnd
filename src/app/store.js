import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";

import storage from "redux-persist/lib/storage";
import userSlice from "./slices/userSlice";
import chatDetailSlice from "./slices/chatDetailSlice";
import userDetailSlice from "./slices/userDetailSlice";
import searchUserSlice from "./slices/searchUserSlice";




const reducers = combineReducers({
  user: userSlice,
  chatDetail:chatDetailSlice,
  userDetail:userDetailSlice,
  searchUser:searchUserSlice
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});