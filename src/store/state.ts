import Note from './models/NoteModel'

export type State = {
  // loading: boolean
  notes: Note[]
}

export const state: State = {
  // loading: false,
  notes: []
}