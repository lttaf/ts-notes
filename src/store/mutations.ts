import { MutationTree } from 'vuex'
import Note from './models/NoteModel'
import { State } from './state'

export enum MutationTypes {
  SetNotes = 'SET_NOTES',
  CreateNote = 'CREATE_NOTE',
  UpdateNote = 'UPDATE_NOTE',
  DeleteNote = 'DELETE_NOTE'
}

export type Mutations = {
  [MutationTypes.SetNotes](state: State, notes: Note[]): void
  [MutationTypes.CreateNote](state: State, note: Note): void
  [MutationTypes.UpdateNote](state: State, noteEdited: Note): void
  [MutationTypes.DeleteNote](state: State, noteId: string): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SetNotes](state, notes) {
    state.notes = notes
  },
  [MutationTypes.CreateNote](state, note) {
    state.notes.push(note)
  },
  [MutationTypes.UpdateNote](state, noteEdited) {
    const note = state.notes.filter((n) => n.id === noteEdited.id)[0]
    const index = state.notes.indexOf(note)
    state.notes[index] = { ...noteEdited }
  },
  [MutationTypes.DeleteNote](state, noteId) {
    const note = state.notes.filter((n) => n.id === noteId)[0]
    const index = state.notes.indexOf(note)
    state.notes.splice(index, 1)
  }
};