import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModal, IModalState } from "../../models/index";

const initialState = {
  modal: false,
  modalType: '',
  message: '',
} as IModalState;

export const diskSlice = createSlice({ // для создания slice передаем в него объект
  name: "modal", // имя slice (нужно для обращения в store к нужному slice, например state.counter.value здесь слово counter)
  initialState, // создаем начальное значение для slice
  reducers: { // reducers - обязательное поле для slice
    runModal: (state: IModalState, action: PayloadAction<IModal>) => { // запуск модального окна с ошибкой
      state.modal = true;
      state.modalType = action.payload.type;
      state.message = action.payload.message as string;
    },

    clearModal: (state: IModalState) => { // очистка флага наличия модального окна
      state.modalType = '';
      state.message = '';
      state.modal = false;
    },
  },
});

// экспортируем наши действия для slice (наши инструкции)
export const { runModal, clearModal } = diskSlice.actions;
export default diskSlice.reducer; // дефолтное поведение (возвращает редьюсер)
