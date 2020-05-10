import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: JSON.parse(localStorage.getItem('notes')) || {},
    dialogIsOpen: false,
    dialogWindowInfo: null
  },
  mutations: {
    ADD_NOTE(state, note) {
      // Добавляет новую заметку с уникальным айди, для быстрого поиска конкретной заметки
      const notesCloneObj = { ...state.notes };
      const allIdsArray = Object.keys(state.notes);
      const uniqueId = Number(allIdsArray[allIdsArray.length - 1]) + 1;

      notesCloneObj[uniqueId || 1] = note;

      state.notes = notesCloneObj
    },
    DELETE_NOTE(state, noteId) {
      const notesCloneObj = { ...state.notes };
      delete notesCloneObj[noteId];

      state.notes = notesCloneObj
    },
    SET_DIALOG_WINDOW_INFO(state, info) {
      state.dialogWindowInfo = info;
    },
    SET_DIALOG_IS_OPEN(state, bool) {
      state.dialogIsOpen = bool
    },
    EDIT_NOTE(state, note) {
      const notesCloneObj = { ...state.notes };
      notesCloneObj[note.id] = note.info;

      state.notes = notesCloneObj
    }
  },
  actions: {
    ADD_NOTE_ACTION({ commit }, note) {
      commit('ADD_NOTE', note)
    },
    DELETE_NOTE_ACTION({ commit }, noteId) {
      commit('DELETE_NOTE', noteId)
    },
    SET_DIALOG_WINDOW_INFO_ACTION({ commit }, info) {
      commit('SET_DIALOG_WINDOW_INFO', info);
      commit('SET_DIALOG_IS_OPEN', true)
    },
    SET_DIALOG_IS_OPEN_ACTION({ commit }, bool) {
      commit('SET_DIALOG_IS_OPEN', bool)
    },
    EDIT_NOTE_ACTION({ commit }, note) {
      commit('EDIT_NOTE', note)
    }
  }
})
