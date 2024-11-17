import { createSlice } from "@reduxjs/toolkit";
import { IModalState } from "../../models/index";

const initialState = {
  modal: false,
  modalType: '',
  message: '',
} as IModalState;

export const diskSlice = createSlice({ // для создания slice передаем в него объект
  name: "modal", // имя slice (нужно для обращения в store к нужному slice, например state.counter.value здесь слово counter)
  initialState, // создаем начальное значение для slice
  reducers: { // reducers - обязательное поле для slice
    runModal: (state, { payload }) => { // запуск модального окна с ошибкой
      state.modal = true;
      state.modalType = payload.type;
      state.message = payload.message as string;
    },

    clearModal: (state) => { // очистка флага наличия модального окна
      state.modalType = '';
      state.message = '';
      state.modal = false;
    },
  },
});

// экспортируем наши действия для slice (наши инструкции)
export const { runModal, clearModal } = diskSlice.actions;
export default diskSlice.reducer; // дефолтное поведение (возвращает редьюсер)
