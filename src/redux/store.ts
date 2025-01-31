import { combineReducers, configureStore, Dispatch } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import guestReducer from '@/features/guests/guestSlice';
import commentReducer from '@/features/comments/commentSlice';

const createNoopStorage = () => {
return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const globalPersistConfig = {
  key: "guest",
  storage: storage,
  whitelist: ["data"],
};

const persistedReducer = persistReducer(globalPersistConfig, guestReducer);


const rootReducer = combineReducers({
    guest: persistedReducer,
    comment: commentReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistor = persistStore(store);

export default store;
