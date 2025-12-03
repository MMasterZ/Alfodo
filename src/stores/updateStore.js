import { defineStore } from 'pinia'
import { useNewsStore } from './news'
import { usePracticeStore } from './practice'
import { useStudentStore } from './student'

// ************************** Use Store Update **************************
export const useUpdateStore = defineStore('updateStore', {
  state: () => ({
    practiceStore: usePracticeStore(),
    studentStore: useStudentStore(),
    newsStore: useNewsStore()
  }),
  getters: {
    isPracticeStoreUpdate: state => state.practiceStore.$state,
    isStudentStoreUpdate: state => state.studentStore.$state,
    isNewsStoreUpdate: state => state.newsStore.$state
  },
  actions: {
    async funcUpdate() {
      if (this.isPracticeStoreUpdate.practiceLog.isUpdate) {
        funcUpdatePracticeLog()
      }

      if (this.isNewsStoreUpdate.newsLog.isUpdate) {
        funcUpdateNewsLog()
      }
    },

    async funcUpdatePracticeLog() {
      this.isPracticeStoreUpdate.practiceLog.isUpdate = false
    },

    async funcUpdateNewsLog() {
      this.isNewsStoreUpdate.newsLog.isUpdate = false
    }
  }
})
// ************************** Use Store Update **************************
