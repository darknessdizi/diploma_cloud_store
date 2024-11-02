import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDiskState, IFile, IFileServer, IItemUser, IResponseUser } from "../../models/index";

const initialState = {
  cloudFiles: [],
  cloudUsers: [],
  currentFile: null,
  currentUser: null,
  flagLookUser: false,
  link: '',
} as IDiskState;

export const diskSlice = createSlice({ // для создания slice передаем в него объект
  name: "disk", // имя slice (нужно для обращения в store к нужному slice, например state.counter.value здесь слово counter)
  initialState, // создаем начальное значение для slice
  reducers: { // reducers - обязательное поле для slice
    getAllFiles: (state: IDiskState, action: PayloadAction<IFileServer[]>) => {
      const array = [];
      for (const item of action.payload) {
        const obj = {
          id: item.id,
          title: item.title,
          file: item.file,
          comment: item.comment,
          size: item.size,
          created: item.created,
          lastDownload: item.last_download,
          userId: item.user_id,
        }
        array.push(obj);
      }
      state.cloudFiles = array;
    },

    addFiles: (state: IDiskState, action: PayloadAction<IFileServer[]>) => {
      for (const item of action.payload) {
        const obj = {
          id: item.id,
          title: item.title,
          file: item.file,
          comment: item.comment,
          size: item.size,
          created: item.created,
          lastDownload: item.last_download,
          userId: item.user_id,
        }
        state.cloudFiles.push(obj);
      }
    },

    addUsers: (state: IDiskState, action: PayloadAction<IResponseUser[]>) => {
      state.cloudUsers = [];
      for (const item of action.payload) {
        const obj = {
          id: item.id,
          login: item.login,
          fullName: item.full_name,
          email: item.email,
          statusAdmin: item.status_admin,
          created: item.created,
          lastVisit: item.last_visit,
        }
        state.cloudUsers.push(obj)
      }
    },

    changeUsers: (state: IDiskState, action: PayloadAction<{id: string, status: boolean}>) => {
      const index = state.cloudUsers.findIndex((item) => item.id === action.payload.id)
      state.cloudUsers[index].statusAdmin = action.payload.status
    },

    selectedFile: (state: IDiskState, action: PayloadAction<IFile>) => {
      state.currentFile = action.payload;
    },

    selectedUser: (state: IDiskState, action: PayloadAction<IItemUser>) => {
      state.currentUser = action.payload;
    },

    changeFlag: (state: IDiskState) => {
      state.flagLookUser = true;
      state.cloudFiles = [];
    },

    cancelUser: (state: IDiskState) => {
      state.currentUser = null;
      state.flagLookUser = false;
    },

    deleteUser: (state: IDiskState) => {
      state.cloudUsers = state.cloudUsers.filter((item) => item.id != state.currentUser?.id);
      state.cloudFiles = state.cloudFiles.filter((item) => item.userId != state.currentUser?.id);
      state.currentUser = null;
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
      state.currentUser = null;
      state.flagLookUser = false;
      state.link = '';
    },

    updateFile: (state: IDiskState, action: PayloadAction<IFileServer>) => {
      state.cloudFiles = state.cloudFiles.map((item) => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
          item.comment = action.payload.comment;
          item.created = action.payload.created;
          item.lastDownload = action.payload.last_download;
          item.size = action.payload.size;
        }
        return item;
      });
    },
  },
});

// экспортируем наши действия для slice (наши инструкции)
export const { 
  getAllFiles, 
  addFiles, 
  deleteFile, 
  selectedFile, 
  updateFile, 
  addLink, 
  deleteLink, 
  deleteUser, 
  addUsers, 
  clearDisk, 
  changeFlag, 
  cancelUser, 
  changeUsers, 
  selectedUser 
} = diskSlice.actions;
export default diskSlice.reducer; // дефолтное поведение (возвращает редьюсер)
