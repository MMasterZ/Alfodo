import { createPersistedState } from 'pinia-plugin-persistedstate'

export default ({ store }) => {
  store.use(createPersistedState())
}
