import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import nodeApi from "@/services/nodeApi";
import authSlice from "@/store/slice/authSlice";
import configSlice from "@/store/slice/config";

const rootReducer = combineReducers({
  [nodeApi.reducerPath]: nodeApi.reducer,
  auth: authSlice,
  config: configSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(nodeApi.middleware),
});

export const persistor = persistStore(store);

export default store;
