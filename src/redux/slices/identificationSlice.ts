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
    name: null,
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
  reducers: (create) => ({ // редьюсер принимает callback, он возвращает объект с именем инструкции
    // которая создается вызовом create.reducer(callback) которая получает новый callback
    login: create.reducer((state) => { // login - первая инструкция (передаем в него callback)
      state.status = true;
    }),
    logout: create.reducer((state) => {// logout - вторая инструкция (передаем в него callback)
      state.status = false;
    }),
    fetchUser: create.asyncThunk<IUserState>( // вызывается новый метод fetchUsers (название метода любое)
    // fetchUsers принимает два параметра (асинхронную функцию и описание состояния)
      async (_, { rejectWithValue }) => { // асинхронная функция
        try {
          const response = await fetch(`${URL_SERVER}/login/`);

          if (!response.ok) {
            return rejectWithValue("Loading users error!");
          }

          return await response.json(); // это будет - action.payload
        } catch (e) {
          return rejectWithValue(e);
        }
      },
      { // описание состояния
        pending: (state) => {
          state.loading = true;
          state.error = "";
        },
        fulfilled: (state, action) => {
          console.log(action.payload)
          state.user = action.payload;
          state.error = "";
          state.status = false;
        },
        rejected: (state, action) => {
          state.error = action.payload as string;
        },
        settled: (state) => { // данное состояние происходит всегда при любом ответе
          state.loading = false;
        },
      }
    ),
  }),
});

// export const identificationSlice = createSlice({ // для создания slice передаем в него объект
//   name: "identification", // имя slice (нужно для обращения в store к нужному slice, например state.identification.status здесь слово identification)
//   initialState, // создаем начальное значение для slice
//   reducers: { // reducers - обязательное поле для slice
//     login: (state) => { // login - первая инструкция (передаем в него callback)
//       state.status = true;
//     },
//     logout: (state) => { // logout - вторая инструкция (передаем в него callback)
//       state.status = false;
//     },
//   },
// });

// экспортируем наши действия для slice (наши инструкции)
export const { login, logout, fetchUser } = identificationSlice.actions;
export default identificationSlice.reducer; // дефолтное поведение (возвращает редьюсер)
