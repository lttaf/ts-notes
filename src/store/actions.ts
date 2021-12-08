import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationTypes } from './mutations'
import { State } from './state'
import Note from './models/NoteModel'
import IndexDB from '@/api/indexedDBService'

const idbs = new IndexDB();

export enum ActionTypes {
  GetNotes = 'GET_NOTES',
  SaveNote = 'SAVE_NOTE',
  UpdateNote = 'UPDATE_NOTE',
  DeleteNote = 'DELETE_NOTE'
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

export type Actions = {
  [ActionTypes.GetNotes](context: ActionAugments): void
  [ActionTypes.SaveNote](context: ActionAugments, note: Note): void
  [ActionTypes.UpdateNote](context: ActionAugments, note: Note): void
  [ActionTypes.DeleteNote](context: ActionAugments, id: string): void
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetNotes]({ commit }) {
    const notes = await idbs.getAllItems('notesOS')
    commit(MutationTypes.SetNotes, Object.values(notes))
  },
  async [ActionTypes.SaveNote]({ commit }, note: Note) {
    await idbs.saveToStorage('notesOS', note, note.id)
    commit(MutationTypes.CreateNote, note)
  },
  async [ActionTypes.UpdateNote]({ commit }, note: Note) {
    await idbs.saveToStorage('notesOS', note, note.id)
    commit(MutationTypes.UpdateNote, note)
  },
  async [ActionTypes.DeleteNote]({ commit }, id: string) {
    await idbs.removeFromStorage('notesOS', id)
    commit(MutationTypes.DeleteNote, id)
  }
}