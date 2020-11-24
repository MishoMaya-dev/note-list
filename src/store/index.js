import { v4 as uuidv4 } from 'uuid'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export class Note {
  constructor( name='') {
    this.id = uuidv4()
    this.name = name
  }
}

export default new Vuex.Store({
  state: {
    notes: [
      new Note('Note one'),
      new Note('Note two'),
      new Note('Note three'),
    ]
  },
  mutations: {
    createNote(state, note) {
      state.notes.push(note)
    },
    updateNote(state, {id, name}) {
      const note = state.notes.find(n => n.id === id)
      note.name = name
    },
    deleteNote(state, {id}) {
      state.notes = state.notes.filter(n => n.id !== id)
    }
  },
  actions: {
    createNote({commit}, note) {
      const newNote = new Note(
        note.name
      )
      commit('createNote', newNote)
    },
    editNote({commit}, note) {
      commit('updateNote', note)
    },
    deleteNote({commit}, note) {
      commit('deleteNote', note)
    }
  },
  getters: {
    notes(state) {
      return state.notes
    }
  }
})
