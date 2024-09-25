import {
  buildCreateSlice,
  asyncThunkCreator,
  PayloadAction,
} from "@reduxjs/toolkit";

import { UsersState } from "../../models/index";

const initialState = {
  login: null,
  name: null,
  password: null,
  email: null,
} as UsersState;

const createSliceWithThunk = buildCreateSlice({ // новый способ работы с асинхронными функциями
  creators: { asyncThunk: asyncThunkCreator }, // создали builder для работы с Thunk (асинхронность)
});

export const userSlice = createSliceWithThunk({ // при создании slice указываются обязательно три параметра
  // при работе с асинхронностью, меняется способ задания редьюсеров
  name: "user", // имя
  initialState, // начальное состояние
  reducers: (create) => ({ // редьюсер принимает callback, он возвращает объект с именем инструкции
    // которая создается вызовом create.reducer(callback) которая получает новый callback
    // loginUser: create.reducer((state, action: PayloadAction<number>) => { // action - определяем, что будет передан параметр payload
    //   state.users = state.users.filter((user) => user.id !== action.payload);
    // }),
    // loginUser: create.reducer((state, action: PayloadAction<number>) => { // action - определяем, что будет передан параметр payload
    //   state.users = state.users.filter((user) => user.id !== action.payload);
    // }),
  }),
});

export const { removeUser, fetchUsers } = userSlice.actions;
// export const { userState, usersList } = userSlice.selectors;
export default userSlice.reducer;
