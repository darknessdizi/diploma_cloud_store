import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { PayloadAction } from "../../../node_modules/@reduxjs/toolkit/dist/index";
import { IIdentification, IUserState } from "../../models/index";

const initialState = { // начальное состояние хранилища
  auth: false,
  loginOccupied: false,
  loginNotFound: { status: false, message: '' },
  user: {
    id: null,
    login: null,
    fullName: null,
    email: null,
    sex: null,
  },
} as IIdentification; // создаем наш state и типизируем его

const createSliceWithThunk = buildCreateSlice({ // для работы с асинхронными функциями
  creators: { asyncThunk: asyncThunkCreator }, // создали builder для работы с Thunk (асинхронность)
});

export const identificationSlice = createSliceWithThunk({ // при создании slice указываются обязательно три параметра
  // при работе с асинхронностью, меняется способ задания редьюсеров
  name: "identification", // имя
  initialState, // начальное состояние
  reducers: {
    addLoginOccupied: (state: IIdentification) => { // добавление флага "логин занят"
      state.loginOccupied = true;
    },

    clearOccupied: (state: IIdentification) => { // очистка флага "логин занят"
      state.loginOccupied = false;
    },

    succesAuth: (state: IIdentification, action: PayloadAction<IUserState>) => { // добавление флага успешной авторизации/регистрации
      state.auth = true;
      state.user = action.payload;
    },
  }
});

// экспортируем наши действия для slice (наши инструкции)
export const { addLoginOccupied, succesAuth, clearOccupied } = identificationSlice.actions;
export default identificationSlice.reducer; // дефолтное поведение (возвращает редьюсер)
