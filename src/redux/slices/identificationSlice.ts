// import { createSlice } from "@reduxjs/toolkit"; // чтобы создать slice для работы с глобальным состоянием
import {
  buildCreateSlice,
  asyncThunkCreator,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IIdentification, IUserState } from "../../models/index";
import { URL_SERVER } from "../../const/index"; 

const initialState = { 
  status: false,
  loading: false,
  error: "",
  user: {
    login: null,
    fullName: null,
    email: null,
    password: null,
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

    changeUserParams: create.reducer((state, action) => { // сохраняет значение полей в форме регистрации
      state.user[action.payload.name] = action.payload.value.trim();
    }),

    login: create.reducer((state) => { // login - первая инструкция (передаем в него callback)
      state.status = true;
    }),

    logout: create.reducer((state) => {// logout - вторая инструкция (передаем в него callback)
      state.status = false;
    }),

    registrationUser: create.asyncThunk<IUserState>( // вызывается новый метод registrationUser (название метода любое)
      // create.asyncThunk принимает три параметра: type значение строкового действия, payloadCreator обратный вызов и options объект.
      async (data, { rejectWithValue }) => { // асинхронная функция
        try {
          const response = await fetch(`${URL_SERVER}/registration/`, {
            method: "POST",
            body: JSON.stringify({ ...data }),
          });

          // const jsonResponse = await response.json();
          return await response.json();

          // if (!response.ok) {
          //   return rejectWithValue(await response.json());
          // }

          // console.log('response.status', response.status)
          // if (response.status === 201) {
          //   return await response.json(); // это будет - action.payload
          // }
          
        } catch (e) {
          console.log('пришла ошибка', e)
          return rejectWithValue(e);
        }
      },
      { // описание состояния
        pending: (state) => {
          state.loading = true;
          state.error = "";
        },
        fulfilled: (state, action: { payload: any; }) => {
          console.log(action.payload)
          state.user = action.payload;
          state.error = "";
          state.status = false;
        },
        rejected: (state: { error: string; }, action: { payload: string; }) => {
          console.log('пришла ошибка в payload', action.payload.error)
          state.error = action.payload.error as string;
        },
        settled: (state) => { // данное состояние происходит всегда при любом ответе
          state.loading = false;
        },
      }
    ),
  }),
});

// экспортируем наши действия для slice (наши инструкции)
export const { login, logout, registrationUser, changeUserParams } = identificationSlice.actions;
export default identificationSlice.reducer; // дефолтное поведение (возвращает редьюсер)
