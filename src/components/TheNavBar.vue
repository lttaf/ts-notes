<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand disabled" href="#">TSNOTES</a>

        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'Notes'}">My Notes</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'NewNote'}">New Note</router-link>
            </li>
          </ul>
          <form @submit.prevent="filterNotes" class="d-flex">
            <input
              v-model="keyword"
              class="form-control me-sm-2"
              type="text"
              placeholder="Search"
            />
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import router from '@/router'

export default defineComponent({
  name: "TheNavBar",
  setup() {
    const keyword = ref("");
    const filterNotes = () => {
      router.push({ name: "Notes", params: { keyword: keyword.value } })
      keyword.value = ""
    }

    return { filterNotes, keyword }
  },
});
</script>

<style scoped>
a.disabled {
  pointer-events: none;
}
</style>
