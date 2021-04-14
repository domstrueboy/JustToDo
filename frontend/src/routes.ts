import Todos from './components/Todos.vue'
import List from './components/List.vue'

export default [
  { path: '/', component: Todos },
  { path: '/:listId', component: List },
]