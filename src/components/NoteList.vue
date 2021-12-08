<template>
  <div>
    <NoteListItem v-for="note in notes" :key="note.id" v-bind="note" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import NoteListItem from '@/components/NoteListItem.vue'

export default defineComponent({
  name: 'NoteList',
  components: {
    NoteListItem
  },
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const notes = computed(() => {
      if (props.keyword.length > 0) return store.getters.filterNotesByKeyword(props.keyword)
      return store.getters.filterNotesByDate
    })

    return {
      notes
    }
  },
})
</script>

<style scoped>

</style>