import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { IFetchUser, IIdentification, IUserState } from "../../models/index";
import { URL_SERVER } from "../../const/index";

const initialState = { // начальное состояние хранилища
  auth: false,
  loading: false,
  error: { status: false, message: '' },
  modal: false,
  loginOccupied: false,
  loginNotFound: { status: false, message: '' },
  user: {
    id: null,
    login: null,
    fullName: null,
    email: null,
  },
} as IIdentification; // создаем наш state и типизируем его

const createSliceWithThunk = buildCreateSlice({ // для работы с асинхронными функциями
  creators: { asyncThunk: asyncThunkCreator }, // создали builder для работы с Thunk (асинхронность)
});

export const identificationSlice = createSliceWithThunk({ // при создании slice указываются обязательно три параметра
  // при работе с асинхронностью, меняется способ задания редьюсеров
  name: "identification", // имя
  initialState, // начальное состояние
  reducers: (create) => ({ // редьюсер принимает callback, он возвращает объект с именами инструкций
    // каждая инструкция создается вызовом create.reducer(callback) которая получает новый callback

    clearOccupied: create.reducer((state: IIdentification) => { // очистка флага наличия ошибки
      state.loginOccupied = false;
    }),

    clearError: create.reducer((state: IIdentification) => { // очистка флага наличия ошибки
      state.error.status = false;
      state.error.message = '';
    }),

    clearModal: create.reducer((state: IIdentification) => { // очистка флага наличия ошибки
      state.modal = false;
      state.auth = true;
    }),

    loginUser: create.asyncThunk( // вызывается новый метод registrationUser (название метода любое)
      // create.asyncThunk принимает три параметра: type значение строкового действия, payloadCreator обратный вызов и options объект.
      async (data: IFetchUser, { rejectWithValue }) => { // асинхронная функция
        try {
          const response = await fetch(`${URL_SERVER}/login/`, {
            method: "POST",
            body: JSON.stringify({ ...data }),
          });

          if (!response.ok) return rejectWithValue(await response.json()); // rejectWithValue - возвращаем ошибку
          if (response.status === 205) {
            // это будет - action.payload
            return { error: 'Не верно указаны логин или пароль. Попробуйте повторить ввод или нажмите на кнопку регистрация.' };
          }
          if (response.status === 200) return await response.json();
        } catch (e) {
          console.log('пришла ошибка в fetch запросе', e.message);
          return rejectWithValue({error: e.message});
        }
      },
      { // описание состояний для асинхронной функции
        fulfilled: (state: IIdentification, action: { payload: IUserState }) => {
          if (action.payload.error) {
            state.error.status = true;
            state.error.message = action.payload.error as string;
          } else {
            state.user = action.payload;
            state.error.status = false;
            state.error.message = '';
            state.auth = true;
          }
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

    registrationUser: create.asyncThunk( // вызывается новый метод registrationUser (название метода любое)
      // create.asyncThunk принимает три параметра: type значение строкового действия, payloadCreator обратный вызов и options объект.
      async (data: IFetchUser, { rejectWithValue }) => { // асинхронная функция
        try {
          const response = await fetch(`${URL_SERVER}/registration/`, {
            method: "POST",
            body: JSON.stringify({ ...data }),
          });

          if (!response.ok) return rejectWithValue(await response.json());
          if (response.status === 201) return await response.json(); // это будет - action.payload
          if (response.status === 205) return { error: 'Логин занят' }; // это будет - action.payload
          
        } catch (e) {
          return rejectWithValue({error: e.message});
        }
      },
      { // описание состояния запроса
        pending: (state: IIdentification) => {
          state.loading = true;
          state.error.status = false;
        },
        fulfilled: (state: IIdentification, action: { payload: IUserState }) => {
          if (action.payload.error) {
            state.loginOccupied = true;
          } else {
            console.log('action.payload', action.payload);
            state.user = action.payload;
            state.error.status = false;
            state.modal = true;
            state.loginOccupied = false;
          }
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
export const { registrationUser, clearError, clearModal, clearOccupied, loginUser } = identificationSlice.actions;
export default identificationSlice.reducer; // дефолтное поведение (возвращает редьюсер)
