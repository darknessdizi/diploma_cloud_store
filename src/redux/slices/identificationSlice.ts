// import { createSlice } from "@reduxjs/toolkit"; // чтобы создать slice для работы с глобальным состоянием
import {
  buildCreateSlice,
  asyncThunkCreator,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IFetchUser, IIdentification, IUserState } from "../../models/index";
import { URL_SERVER } from "../../const/index";

const initialState = { 
  auth: false,
  loading: false,
  error: { status: false, message: '' },
  modal: false,
  user: {
    id: null,
    login: null,
    fullName: null,
    email: null,
  },
} as IIdentification; // создаем наш state и типизируем его

const createSliceWithThunk = buildCreateSlice({ // новый способ работы с асинхронными функциями
  creators: { asyncThunk: asyncThunkCreator }, // создали builder для работы с Thunk (асинхронность)
});

export const identificationSlice = createSliceWithThunk({ // при создании slice указываются обязательно три параметра
  // при работе с асинхронностью, меняется способ задания редьюсеров
  name: "identification", // имя
  initialState, // начальное состояние
  reducers: (create) => ({ // редьюсер принимает callback, он возвращает объект с именами инструкций
    // каждая инструкция создается вызовом create.reducer(callback) которая получает новый callback

    login: create.reducer((state: IIdentification) => { // успешная авторизация
      state.auth = true;
    }),

    clearError: create.reducer((state: IIdentification) => { // очистка флага наличия ошибки
      state.error.status = false;
      state.error.message = '';
    }),

    clearModal: create.reducer((state: IIdentification) => { // очистка флага наличия ошибки
      state.modal = false;
      state.auth = true;
    }),

    logout: create.reducer((state: IIdentification) => {// logout - вторая инструкция (передаем в него callback)
      state.auth = false;
    }),

    registrationUser: create.asyncThunk( // вызывается новый метод registrationUser (название метода любое)
      // create.asyncThunk принимает три параметра: type значение строкового действия, payloadCreator обратный вызов и options объект.
      async (data: IFetchUser, { rejectWithValue }) => { // асинхронная функция
        try {
          const response = await fetch(`${URL_SERVER}/registration/`, {
            method: "POST",
            body: JSON.stringify({ ...data }),
          });

          if (!response.ok) {
            return rejectWithValue(await response.json());
          }

          if (response.status === 201) {
            return await response.json(); // это будет - action.payload
          }
          
        } catch (e) {
          return rejectWithValue(e);
        }
      },
      { // описание состояния
        pending: (state: IIdentification) => {
          state.loading = true;
          state.error.status = false;
        },
        fulfilled: (state: IIdentification, action: { payload: IUserState }) => {
          console.log(action.payload)
          state.user = action.payload;
          state.error.status = false;
          state.modal = true;
        },
        rejected: (state: IIdentification, action: { payload: { error: string } }) => {
          console.log('пришла ошибка в payload', action.payload);
          state.error.status = true;
          state.error.message = action.payload.error as string;
        },
        settled: (state: IIdentification) => { // данное состояние происходит всегда при любом ответе
          state.loading = false;
        },
      }
    ),
  }),
});

// экспортируем наши действия для slice (наши инструкции)
export const { registrationUser, clearError, clearModal } = identificationSlice.actions;
export default identificationSlice.reducer; // дефолтное поведение (возвращает редьюсер)
