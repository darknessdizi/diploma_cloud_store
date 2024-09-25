import { createSlice } from "@reduxjs/toolkit"; // чтобы создать slice для работы с глобальным состоянием

export interface IIdentification {
  status: boolean;
}
const initialState = { status: false } as IIdentification; // создаем наш state и типизируем его

export const identificationSlice = createSlice({ // для создания slice передаем в него объект
  name: "identification", // имя slice (нужно для обращения в store к нужному slice, например state.identification.status здесь слово identification)
  initialState, // создаем начальное значение для slice
  reducers: { // reducers - обязательное поле для slice
    login: (state) => { // login - первая инструкция (передаем в него callback)
      state.status = true;
    },
    logout: (state) => { // logout - вторая инструкция (передаем в него callback)
      state.status = false;
    },
  },
});

// экспортируем наши действия для slice (наши инструкции)
export const { login, logout } = identificationSlice.actions;
export default identificationSlice.reducer; // дефолтное поведение (возвращает редьюсер)
