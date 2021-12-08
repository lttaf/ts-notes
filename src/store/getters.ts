import { GetterTree } from 'vuex'
import { State } from './state'
import Note from './models/NoteModel'
import _ from 'lodash'

export type Getters = {
  filterNotesByKeyword: (state: State) => (keyword: string) => Array<Note>
  filterNotesByDate: (state: State) => Array<Note>
  getIndexById: (state: State) => (id: string) => number
}

export const getters: GetterTree<State, State> & Getters = {
  filterNotesByKeyword: (state) => (keyword) => {
    return state.notes.filter((note) => note.title.includes(keyword) || note.body.includes(keyword))
  },
  filterNotesByDate: (state) => {
    return _.cloneDeep(state.notes).sort((a, b) => b.publishedAt - a.publishedAt)
  },
  getIndexById: (state) => (id) => {
    const note = state.notes.filter((n) => n.id === id)[0]
    return state.notes.indexOf(note)
  }
}