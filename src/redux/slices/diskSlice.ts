import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDiskState, IFile, IResponseUser } from "../../models/index";

const initialState = {
  cloudFiles: [],
  cloudUsers: [],
  currentFile: null,
  link: '',
} as IDiskState;

export const diskSlice = createSlice({ // для создания slice передаем в него объект
  name: "disk", // имя slice (нужно для обращения в store к нужному slice, например state.counter.value здесь слово counter)
  initialState, // создаем начальное значение для slice
  reducers: { // reducers - обязательное поле для slice
    getAllFiles: (state: IDiskState, action: PayloadAction<IFile>) => {
      state.cloudFiles = action.payload;
    },

    addFiles: (state: IDiskState, action: PayloadAction<IFile>) => {
      state.cloudFiles.push(...action.payload);
    },

    addUsers: (state: IDiskState, action: PayloadAction<IResponseUser[]>) => {
      for (const item of action.payload) {
        const obj = {
          id: item.id,
          fullName: item.full_name,
          avatar: item.avatar,
          email: item.email,
          statusAdmin: item.status_admin,
          created: item.created,
          lastVisit: item.last_visit,
        }
        state.cloudUsers.push(obj)
      }
    },

    selectedFile: (state: IDiskState, action: PayloadAction<File>) => {
      state.currentFile = action.payload;
    },

    addLink: (state: IDiskState, action: PayloadAction<string>) => {
      state.link = action.payload;
    },

    deleteLink: (state: IDiskState) => {
      state.link = '';
    },

    deleteFile: (state: IDiskState) => {
      state.cloudFiles = state.cloudFiles.filter((item) => item.id != state.currentFile?.id);
      state.currentFile = null;
    },

    clearDisk: (state: IDiskState) => {
      state.cloudFiles = [];
      state.cloudUsers = [];
      state.currentFile = null;
      state.link = '';
    },

    updateFile: (state: IDiskState, action: PayloadAction<File>) => {
      state.cloudFiles = state.cloudFiles.map((item) => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
          item.comment = action.payload.comment;
          item.created = action.payload.created;
          item.last_download = action.payload.last_download;
          item.size = action.payload.size;
        }
        return item;
      });
    },
  },
});

// экспортируем наши действия для slice (наши инструкции)
export const { getAllFiles, addFiles, deleteFile, selectedFile, updateFile, addLink, deleteLink, addUsers, clearDisk } = diskSlice.actions;
export default diskSlice.reducer; // дефолтное поведение (возвращает редьюсер)
