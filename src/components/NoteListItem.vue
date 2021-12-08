<template>
  <div>
    <div class="card border-dark mb-3 note">
      <div class="card-body">
        <template v-if="!editing">
          <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1 title">{{ title }}</h4>
            <small>
              <AppDate :timestamp="publishedAt" />
              <button
                @click.prevent="editing = true"
                type="button"
                class="btn btn-link"
                style="text-decoration:none;"
              >
                &#9997;
              </button>
              <button
                @click.prevent="deleteNote"
                type="button"
                class="btn btn-link"
                style="text-decoration:none;"
              >
                &times;
              </button>
            </small>
          </div>
          <p class="card-text">
            {{ body }}
          </p>
        </template>
        <template v-else>
          <div class="d-flex w-100 justify-content-between">
            <input
              v-model="noteTitle"
              class="form-control"
              type="text"
            />
            <small>
              <button
                @click.prevent="updateNote(); editing = false"
                type="button"
                class="btn btn-link"
                style="text-decoration:none;"
              >
                save
              </button>
              <button
                @click.prevent="editing = false"
                type="button"
                class="btn btn-link"
                style="text-decoration:none;"
              >
                cancel
              </button>
            </small>
          </div>
          <textarea
            v-model="noteBody"
            class="form-control"
            style="margin-top: 10px;"
            id="noteBody"
            rows="3"
          ></textarea>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions"
import Note from "@/store/models/NoteModel";
import AppDate from "@/components/AppDate.vue";

export default defineComponent({
  name: "NoteListItem",
  components: {
    AppDate
  },
  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    publishedAt: { type: Number, required: true }
  },
  setup(props) {
    const store = useStore();
    const editing = ref(false);
    const noteTitle = ref(props.title)
    const noteBody = ref(props.body)
    const deleteNote = () => {
      store.dispatch(ActionTypes.DeleteNote, props.id);
    };
    const updateNote = () => {
      const date = Math.floor(Date.now() / 1000);
      const note: Note = {
        title: noteTitle.value,
        body: noteBody.value,
        id: props.id,
        publishedAt: date
      };
      store.dispatch(ActionTypes.UpdateNote, note);
    };
    return { deleteNote, updateNote, editing, noteTitle, noteBody };
  },
});
</script>

<style scoped>
.note {
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 15px;
}
.title {
  color: #32fbe2;
}
/* input[type="text"] {
  background: transparent;
  border: none;
  outline-width: 0;
}
textarea {
  background: transparent;
  border: none;
  outline-width: 0;
} */
</style>