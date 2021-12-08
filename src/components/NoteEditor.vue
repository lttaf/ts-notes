<template>
  <div>
    <form @submit.prevent="createNote">
      <fieldset class="container">
        <div class="form-group">
          <label for="noteTitle" class="form-label mt-4">Title</label>
          <input
            v-model="title"
            type="text"
            class="form-control"
            id="noteTitle"
          />
        </div>
        <div class="form-group">
          <label for="noteBody" class="form-label mt-4">Note</label>
          <textarea
            v-model="body"
            class="form-control"
            id="noteBody"
            rows="3"
          ></textarea>
        </div>
        <div class="containerBtn">
          <button type="submit" class="btn btn-secondary" style="width: 150px">
            Create
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";
import Note from "@/store/models/NoteModel";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: "NoteEditor",
  setup() {
    const title = ref("");
    const body = ref("");
    const store = useStore();
    const createNote = () => {
      if (title.value === "" || body.value === "") return;
      const note: Note = {
        title: title.value,
        body: body.value,
        id: uuidv4(),
        publishedAt: Math.floor(Date.now() / 1000),
      };
      store.dispatch(ActionTypes.SaveNote, note);
      title.value = "";
      body.value = "";
    };
    return { createNote, title, body };
  },
});
</script>

<style scoped>
.container {
  width: 600px;
  margin: auto;
}
.containerBtn {
  margin-top: 20px;
  text-align: center;
}
</style>