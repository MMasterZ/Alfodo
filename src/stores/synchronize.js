import { defineStore } from 'pinia'

export const useSynchronizeStore = defineStore('synchronizeStore', {
  state: () => ({
    synchronize: {
      data: {
        isSync: false,
        lesson: {
          isFinishPractice: false,
        }
      },
      isUpdate: false
    },
    isSynchronize: false
  }),
  getters: {
    isSync: state => state.isSynchronize,
    syncData: state => {
      let setSyncData = {
        isSync: state.isSynchronize,
        ...state.synchronize.data
      }

      return setSyncData
    },
    isStartReview: state => {
      if (state.synchronize.data.lesson) {
        return state.synchronize.data.lesson.isStartReview
      } else return false
    },
    isFinishPractice: state => {
      if (state.synchronize.data.lesson) {
        return state.synchronize.data.lesson.isFinishPractice
      } else return false
    },
    isRestart: state => {
      if (state.synchronize.data.lesson) {
        return state.synchronize.data.lesson.isRestart
      } else return false
    }
  },
  actions: {
    setSynchronizeData(data) {
      this.synchronize.data = data
    },
  }
})
