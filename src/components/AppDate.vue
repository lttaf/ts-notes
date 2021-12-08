<template>
  <small
    class="card-subtitle mb-2 text-muted"    
  >
    {{ humanFriendlyDate(timestamp) }}
  </small>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";

export default defineComponent({
  name: "AppDate",
  props: {
    timestamp: {
      required: true,
      type: Number,
    },
  },
  setup() {
    const humanFriendlyDate = (date: number) => {
      return moment.unix(date).format("MMMM Do YYYY, h:mm a")
    }

    return { humanFriendlyDate }
  }
});
</script>

<style scoped>
</style>