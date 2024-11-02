import { configureStore, combineReducers } from "@reduxjs/toolkit";
import identificationReducer from "../slices/identificationSlice";
import diskReducer from "../slices/diskSlice";
import modalReducer from "../slices/modalSlice";

const rootReducer = combineReducers({ // создаем наш редъюсер
  identification: identificationReducer, // создаем перечень редьюсеров
  disk: diskReducer,
  modal: modalReducer,
});

// создаем наше хранилище
export const store = configureStore({ // передаем объект с редьюсерами и миделваре
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware() // дефолтный миделвеар (нужен toolkit для работы с асинхронностью и т.д.)
});

// возвращаем типы нашего состояния для типизации наших хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
