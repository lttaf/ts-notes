import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Notes from '@/pages/PageNotes.vue'
import Tags from '@/pages/PageTags.vue'
import NewNote from '@/pages/PageNewNote.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: {
      name: "Notes"
    }
  },
  {
    path: "/notes/:keyword?",
    name: "Notes",
    component: Notes,
    props: true
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags
  },
  {
    path: '/new_note',
    name: 'NewNote',
    component: NewNote
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
