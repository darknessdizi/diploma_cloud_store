import { createSlice } from "@reduxjs/toolkit";
import { IDiskState } from "../../models/index";

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
    getAllFiles: (state, { payload }) => {
      const array = [];
      for (const item of payload) {
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

    addFiles: (state, { payload }) => {
      for (const item of payload) {
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

    addUsers: (state, { payload }) => {
      state.cloudUsers = [];
      for (const item of payload) {
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

    changeUsers: (state, { payload }) => {
      const index = state.cloudUsers.findIndex((item) => item.id === payload.id)
      state.cloudUsers[index].statusAdmin = payload.status
    },

    selectedFile: (state, { payload }) => {
      state.currentFile = payload;
    },

    selectedUser: (state, { payload }) => {
      state.currentUser = payload;
    },

    changeFlag: (state) => {
      state.flagLookUser = true;
      state.cloudFiles = [];
    },

    cancelUser: (state) => {
      state.currentUser = null;
      state.flagLookUser = false;
    },

    deleteUser: (state) => {
      state.cloudUsers = state.cloudUsers.filter((item) => item.id != state.currentUser?.id);
      state.cloudFiles = state.cloudFiles.filter((item) => item.userId != state.currentUser?.id);
      state.currentUser = null;
    },

    addLink: (state, { payload }) => {
      state.link = payload;
    },

    deleteLink: (state) => {
      state.link = '';
    },

    deleteFile: (state) => {
      state.cloudFiles = state.cloudFiles.filter((item) => item.id != state.currentFile?.id);
      state.currentFile = null;
    },

    clearDisk: (state) => {
      state.cloudFiles = [];
      state.cloudUsers = [];
      state.currentFile = null;
      state.currentUser = null;
      state.flagLookUser = false;
      state.link = '';
    },

    updateFile: (state, { payload }) => {
      state.cloudFiles = state.cloudFiles.map((item) => {
        if (item.id === payload.id) {
          item.title = payload.title;
          item.comment = payload.comment;
          item.created = payload.created;
          item.lastDownload = payload.last_download;
          item.size = payload.size;
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
