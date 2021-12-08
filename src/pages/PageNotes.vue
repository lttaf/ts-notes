<template>
  <div>
    <h1 class="notes">NOTES</h1>
    <div class="progress pb-reduced">
      <div
        class="progress-bar bar-color"
        role="progressbar"
        style="width: 100%"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <NoteList :keyword="keyword" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted} from "vue";
import NoteList from "@/components/NoteList.vue"
import { useStore } from '@/store'
import { ActionTypes } from '@/store/actions'

export default defineComponent({
  name: "Notes",
  components: {
    NoteList
  },
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  setup() {
    const store = useStore()
    onMounted(() => store.dispatch(ActionTypes.GetNotes))
  },
});
</script>

<style scoped>
.pb-reduced {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  height: 3px;
  width: 800px;
}
.bar-color {
  background-color: #32fbe2;
}
.notes {
  margin-top: 20px;
  text-align: center;
}
</style>