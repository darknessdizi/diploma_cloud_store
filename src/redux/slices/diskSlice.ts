import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDiskState, IFile } from "../../models/index";

const initialState = {
  files: [],
} as IDiskState;

export const diskSlice = createSlice({ // для создания slice передаем в него объект
  name: "disk", // имя slice (нужно для обращения в store к нужному slice, например state.counter.value здесь слово counter)
  initialState, // создаем начальное значение для slice
  reducers: { // reducers - обязательное поле для slice
    // getAllFiles: {
    //   reducer: (state, action: PayloadAction<IFile>) => {
    //     state.files.push(...action.payload);
    //   },
    // },

    getAllFiles: (state, action: PayloadAction<IFile>) => {
      state.files.push(...action.payload);
    },
    

    increment: (state) => { // increment - первая инструкция (передаем в него callback)
      state.value += 1;
    },
    // increment: // может принимать сразу callback: (state) => {state.value += 1;}
    // или объект содержащий пару ключей: {
    //   reducer: (state, action: PayloadAction<number>) => { // первый ключ
    //     state.value += action.payload;
    //   },
    //   prepare: (value: number): { payload: number } => { // второй ключ
    // prepare - это перехватчик исполнения инструкции редьюсера (перехватывает значение payload из action и производит с ним манипуляции)
    // здесь можно делать валидацию
    //     const payload = value ** 2;
    //     return {
    //       payload,
    //     };
    //   },
    // }
    decrement: (state) => { // decrement - вторая инструкция (передаем в него callback)
      state.value -= 1;
    },
    incrementByAmount: {
      reducer: (state, action: PayloadAction<number>) => {
        state.value += action.payload;
      },
      prepare: (value: number): { payload: number } => {
        const payload = value ** 2;
        return {
          payload,
        };
      },
    },
  },
});

// экспортируем наши действия для slice (наши инструкции)
export const { getAllFiles } = diskSlice.actions;
export default diskSlice.reducer; // дефолтное поведение (возвращает редьюсер)
