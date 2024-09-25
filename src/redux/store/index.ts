import { configureStore, combineReducers } from "@reduxjs/toolkit";
import identificationReducer from "../slices/identificationSlice";

const rootReducer = combineReducers({ // создаем наш редъюсер
  identification: identificationReducer, // создаем перечень редьюсеров
});

// создаем наше хранилище
export const store = configureStore({ // передаем объект с редьюсерами и миделваре
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware() // дефолтный миделвеар (нужен toolkit для работы с асинхронностью и т.д.)
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(сюда добавить) // если хотим добавить свои миделвеар
});

// возвращаем типы нашего состояния для типизации наших хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
