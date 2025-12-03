import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

export default store(function () {
  const store = createPinia()

  const installPersistedStatePlugin = createPersistedStatePlugin({
    persist: true,
    storage: sessionStorage
  })

  store.use(context => {
    installPersistedStatePlugin(context)
  })

  window.$store = store

  return store
})
