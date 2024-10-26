import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { PayloadAction } from "../../../node_modules/@reduxjs/toolkit/dist/index";
import { IIdentification, IResponseUser } from "../../models/index";

const initialState = { // начальное состояние хранилища
  auth: false,
  loginOccupied: false,
  loginNotFound: { status: false, message: '' },
  user: {
    id: null,
    login: null,
    fullName: null,
    email: null,
    avatar: null,
    statusAdmin: false
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

    clearLoginOccupied: (state: IIdentification) => { // очистка флага "логин занят"
      state.loginOccupied = false;
    },

    succesAuth: (state: IIdentification, action: PayloadAction<IResponseUser>) => { // добавление флага успешной авторизации/регистрации
      const { token, ...user } = action.payload;
      localStorage.setItem('sessionToken', token!);
      state.user = {
        id: user.id,
        login: user.login,
        fullName: user.full_name,
        email: user.email,
        avatar: user.avatar,
        statusAdmin: user.status_admin,
      };
    },

    logoutUser: (state: IIdentification) => { // добавление флага успешной авторизации/регистрации
      localStorage.removeItem('sessionToken');
      state.user = initialState.user;
    },

    setAuthTrue: (state: IIdentification) => { // ручная установка успешной регистрации (после перезапуска страницы не было выхода пользователем)
      state.auth = true;
    },

    setAuthFalse: (state: IIdentification) => { // ручная установка успешной регистрации (после перезапуска страницы не было выхода пользователем)
      state.auth = false;
    },
  }
});

// экспортируем наши действия для slice (наши инструкции)
export const { addLoginOccupied, succesAuth, clearLoginOccupied, logoutUser, setAuthTrue, setAuthFalse } = identificationSlice.actions;
export default identificationSlice.reducer; // дефолтное поведение (возвращает редьюсер)
