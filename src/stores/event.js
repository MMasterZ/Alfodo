import axios from 'axios'
import { defineStore } from 'pinia'
import { useCourseStore } from './course'
import { useInventoryStore } from './inventory'
import { useStudentStore } from './student'
import { useSystemStore } from './system'
import { db, st } from 'src/router'
import { useSchoolStore } from './school'
import { registerRuntimeCompiler } from 'vue'

class eventDataClass {

  constructor() {
    this.stage = "0"
    this.name = ""
    this.isStartEvent = false
    this.isFinishEvent = false
    this.isAcceptEvent = false
  }

}

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    event: {
      data: [],
      isEncrypt: false,
      isLoaded: false,
    },
    speakUpEvent: {
      data: null,
      isEncrypt: false,
      isLoaded: false,
    },
  }),
  // #region Getter Data
  getters: {
    // #region Event Store
    eventList: (state) => {
      const systemStore = useSystemStore()

      let eventList = []

      // Speak up Event
      if (state.speakUpEvent.isLoaded && state.speakUpEvent.isEncrypt) {
        let tempEncrypt = systemStore.decryptJSON(state.speakUpEvent.data)
        let speakUpData = {
          name: "SPEAK UP",

        }
        if (tempEncrypt.dateDiff > 0) {
          speakUpData = {
            ...tempEncrypt,
            eventEnd: "12:00 am",
          }
        }
        eventList.push(speakUpData)
      }


      return eventList
    },
    // #endregion Event Store

    // #region Speak up Event Store
    // ***** Speakup Event ***** //
    // Stage 0 : Accept Event
    // Stage 1 : Accept Condition and Activity
    // Stage 2 : Story Menu
    // Stage 3 : Let Speakup
    // Stage 4 : Chapter Menu
    // Stage 5 : Chapter Content
    // Stage 6 : Extra Chapter
    speakUp: (state) => {
      const systemStore = useSystemStore();

      let data = {
        name: "SPEAK UP",
        stage: "0",

      }

      if (state.speakUpEvent.isEncrypt) {
        let tempEncrypt = systemStore.decryptJSON(state.speakUpEvent.data)
        data = {
          ...tempEncrypt,
          eventEnd: "12:00 am",
        }
      }

      return {
        data,
      }
    },
    // #endregion Speak up Event Store

    // #region Has Event
    isHasEvent: (state) => {

      let isHasEvent = false

      if (state.speakUpEvent.isLoaded && state.speakUpEvent.isEncrypt) {
        isHasEvent = true
      }

      return isHasEvent

    },
    // #endregion
  },
  // #endregion

  // #region Actions
  actions: {

    // #region **** Speak up Event Store ****
    // #region **** Get Speak up Event ****
    // #region Get Speak up Event
    async getSpeakUpEvent() {

      const studentStore = useStudentStore()
      const systemStore = useSystemStore()

      const APIURL = `${process.env.NEWAPI_ASIA}/speakUp-getSpeakUpEvent?courseId=${studentStore.courseId}`

      try {

        let response = await axios.get(APIURL)

        if(response.data.message != 'success'){
          throw new Error(response.data.message)
        }

        let tempResponse = {
          name: "SPEAK UP",
          stage: "0",
          ...response.data.data,
        }

        if (response.data.data.dateDiff > 0) {
          let tempIconSetting = await this.getSpeakUpIconSetting()

          tempResponse = {
            ...tempResponse,
            ...tempIconSetting,
          }

        }

        let tempData = null

        tempData = systemStore.encryptJSON(tempResponse)

        this.$patch({
          speakUpEvent: {
            data: tempData,
            isEncrypt: true,
            isLoaded: true,
          }
        })

        await this.getSpeakUpRewardSetting()

        systemStore.systemLog({
          api: "speakUp-getSpeakUpEvent",
          store: this.$id,
          status: "Success Get Speak Up Event",
          get: {
            courseId: studentStore.courseId,
          },
          response: response.data.data,
          description: `Status Code : ${response.status}`,
        })

      } catch (e) {

        systemStore.systemLog({
          api: "speakUp-getSpeakUpEvent",
          store: this.$id,
          status: "Error Get Speak Up Event",
          get: {
            courseId: studentStore.courseId,
          },
          description: `Status Code : ${e}`,
          isError: true,
        })
      }


    },
    // #endregion

    // #region Get Speak up Icon Setting
    async getSpeakUpIconSetting() {
      // console.log(" Get Speak up Icon Setting ");

      const systemStore = useSystemStore()

      const APIURL = `${process.env.NEWAPI}/speakUp-getSpeakUpIconSettings`

      try {

        const response = await axios.get(APIURL)

        if (response.data.message == "success") {
          systemStore.systemLog({
            api: "speakUp-getSpeakUpIconSettings",
            store: this.$id,
            status: "Success Get Speak up icon setting",
            response: response.data.data,
            description: `Status Code : ${response.status}`,
          })

          return response.data.data
        } else {
          throw new Error(response.data.message)
        }

      } catch (e) {
        systemStore.systemLog({
          api: "speakUp-getSpeakUpIconSettings",
          store: this.$id,
          status: "Error Get Speak up icon setting",
          isError: true,
        })
      }
    },
    // #endregion

    // #region Get Speak up Reward
    async getSpeakUpRewardSetting() {

      // console.log(" Get Speak up Reward Setting ");

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()

      const APIURL = `${process.env.NEWAPI}/speakUp-getSpeakUpRewardSettings?courseId=${studentStore.courseId}`

      try {

        const response = await axios.get(APIURL)
        if (response.data.message == "success") {

          let tempRewardSetting = response.data.data

          if (tempRewardSetting.progressReward.length) {
            tempRewardSetting.progressReward = tempRewardSetting.progressReward.map((x, index) => {
              let percentage = 1
              let imageIcon = ""

              if (index == 0) {
                percentage = 0.5
                imageIcon = 'head'
              } else if (index == 1) {
                percentage = 0.75
                imageIcon = 'pants'
              } else {
                percentage = 1
                imageIcon = 'shirt'
              }

              let temp = {
                index: index,
                percentage: percentage,
                imageIcon: imageIcon,
                ...x,
              }
              return temp
            })
          }

          let tempDecrypt = systemStore.decryptJSON(this.speakUpEvent.data)

          tempDecrypt = {
            ...tempDecrypt,
            ...tempRewardSetting
          }

          let tempEncrypt = systemStore.encryptJSON(tempDecrypt)

          this.$patch({
            speakUpEvent: {
              data: tempEncrypt,
              isEncrypt: true,
              isLoaded: true,
            }
          })

          systemStore.systemLog({
            api: "speakUp-getSpeakUpRewardSettings",
            store: this.$id,
            status: "Success Get Speak up reward setting",
            get: {
              courseId: studentStore.courseId,
            },
            response: response.data.data,
            description: `Status Code : ${response.status}`,
          })

        } else {
          throw new Error(response.data.message)
        }

      } catch (e) {
        systemStore.systemLog({
          api: "speakUp-getSpeakUpRewardSettings",
          store: this.$id,
          get: {
            courseId: studentStore.courseId,
          },
          status: "Error Get Speak up reward setting",
          isError: true,
        })
      }

    },
    // #endregion

    // #region Get Speak up Topics
    async getSpeakUpTopics() {

      // console.log(" Get Speak Up Event ");

      const courseStore = useCourseStore()
      const systemStore = useSystemStore()

      const APIURL = `${process.env.NEWAPI}/speakUp-getSpeakUpTopics?level=${courseStore.courseLevel}`

      try {

        const response = await axios.get(APIURL)

        if (response.data.message == 'success') {

          systemStore.systemLog({
            api: "speakUp-getSpeakUpTopics",
            store: this.$id,
            status: "Success Get Speak Up Event Topics",
            get: {
              level: courseStore.courseLevel,
            },
            response: response.data.data,
            description: `Status Code : ${response.status}`,
          })

          return response.data.data
        } else {
          throw new Error(response.data.message)
        }


      } catch (e) {
        systemStore.systemLog({
          api: "speakUp-getSpeakUpTopics",
          store: this.$id,
          status: "Error Get Speak Up Event Topics",
          get: {
            level: courseStore.courseLevel,
          },
          isError: true,
        })
      }

    },
    // #endregion

    // #region Get Speak up pretest Sentence
    async getSpeakUpPretestSentence() {

      // console.log(" Get Speak Up Event ");

      const studentStore = useStudentStore()
      const courseStore = useCourseStore()
      const systemStore = useSystemStore()
      const schoolStore = useSchoolStore()

      const APIURL = `${process.env.NEWAPI}/speakUp-getSpeakUpPretestSentence?courseId=${studentStore.courseId}&topicId=${courseStore.course.data.selectedSpeakUpTopic}`

      try {

        const response = await axios.get(APIURL)

        if (response.data.message == 'success') {

          let temp = {
            list: [],
            audioUrl: response.data.audioUrl,
            counter: response.data.counter,
          }

          response.data.data.forEach((res) => {

            let newSentenceEn = res.sentenceEn
            let newSentenceTh = res.sentenceTh

            if (newSentenceEn.includes('{{')) {

              let setClassroom = courseStore.class

              newSentenceEn = newSentenceEn.replace(/{{name}}/g, studentStore.studentFullName)
              newSentenceTh = newSentenceTh.replace(/{{name}}/g, studentStore.studentFullName)

              setClassroom = setClassroom.replace(/ป./g, '').replace(/ม./g, '')
              newSentenceEn = newSentenceEn.replace(/{{classroom}}/g, setClassroom)
              newSentenceTh = newSentenceTh.replace(/{{classroom}}/g, courseStore.class)

              newSentenceEn = newSentenceEn.replace(/{{school}}/g, `${schoolStore.schoolName}`)
              newSentenceTh = newSentenceTh.replace(/{{school}}/g, `โรงเรียน${schoolStore.schoolName}`)

              newSentenceEn = newSentenceEn.replace(/{{at}}/g, 'at')
            }

            let newData = {
              ...res,
              sentenceEn: newSentenceEn,
              sentenceTh: newSentenceTh,
            }

            temp.list.push(newData)

          })

          systemStore.systemLog({
            api: "speakUp-getSpeakUpPretestSentence",
            store: this.$id,
            status: "Success Get speak up pretest sentence",
            get: {
              courseId: studentStore.courseLevel,
              topicId: "RKrQjHMWRilkLxiVnEJZ"
            },
            response: response.data,
          })

          return temp
        }

      } catch (e) {
        systemStore.systemLog({
          api: "speakUp-getSpeakUpPretestSentence",
          store: this.$id,
          status: "Error Get speak up pretest sentence",
          get: {
            courseId: studentStore.courseLevel,
            topicId: "RKrQjHMWRilkLxiVnEJZ"
          },
          description: `Status : ${e}`,
          isError: true,
        })
      }

    },
    // #endregion

    // #region Get Speak up posttest Sentence
    async getSpeakUpPosttestRecord() {

      // console.log(" Get Speak Up Posttest Record ");

      const studentStore = useStudentStore()
      const systemStore = useSystemStore()

      const APIURL = `${process.env.NEWAPI}/speakUp-getSpeakUpPosttestRecord?courseId=${studentStore.courseId}`


      try {

        const response = await axios.get(APIURL)

        const message = response.data.message

        if (message == 'success') {

          systemStore.systemLog({
            api: "speakUp-getSpeakUpPosttestRecord",
            store: this.$id,
            status: "Success Get speak up posttest record",
            get: {
              courseId: studentStore.courseId,
            },
            response: response.data,
          })

          return response.data.data

        } else {
          throw new Error(message)
        }

      } catch (e) {

        systemStore.systemLog({
          api: "speakUp-getSpeakUpPosttestRecord",
          store: this.$id,
          status: "Error Get speak up posttest record",
          get: {
            courseId: studentStore.courseId,
          },
          description: `Status : ${e}`,
          isError: true,
        })

        return {
          audioUrl: "",
        }

      }

    },
    // #endregion

    // #region Get Speak up Chapters
    async getSpeakUpChapters() {

      // console.log(" Get Speak Up Event ");

      const studentStore = useStudentStore()
      const courseStore = useCourseStore()
      const schoolStore = useSchoolStore()
      const systemStore = useSystemStore()

      const APIURL = `${process.env.NEWAPI}/speakUp-getSpeakUpChapters?courseId=${studentStore.courseId}`

      try {

        const response = await axios.get(APIURL)

        if (response.data.message == 'success') {

          let tempData = response.data.data

          tempData.forEach((res, index) => {

            let temp = []

            for (let i = 0; i < res.sentences.length; i++) {
              let newRes = res.sentences[i]

              let newSentenceEn = newRes.sentenceEn
              let newSentenceTh = newRes.sentenceTh

              let tempTimer = 0

              let regexp = /\s+/g;

              let setSpecialText = newSentenceEn
                .replace(/\./g, " . ")
                .replace(/\,/g, " , ")
                .replace(/\!/g, " ! ")
                .replace(/\’/g, "'")
                .replace(/\?/g, " ? ")
                .replace(/\:/g, " : ")
                .replace(/\;/g, " ; ")
                .split(regexp)
                .filter((x) => x != " " && x != "");

              let tempSpecialText = []

              for (let ii = 0; ii < setSpecialText.length; ii++) {

                let newData = {
                  text: setSpecialText[ii],
                  isCorrect: false,
                  ignore: false,
                  ignoreText: false,
                };

                if (newData.text.includes('{{')) {
                  let setClassroom = courseStore.class
                  setClassroom = setClassroom.replace(/ป./g, '').replace(/ม./g, '')

                  newData.text = newData.text.replace(/{{name}}/g, studentStore.studentFullName)
                  newData.text = newData.text.replace(/{{classroom}}/g, setClassroom)
                  newData.text = newData.text.replace(/{{school}}/g, `${schoolStore.schoolName}`)
                  newData.text = newData.text.replace(/{{at}}/g, 'at')
                  newData.ignoreText = true;
                  newData.ignore = true;
                }

                if (
                  newData.text.includes("!") ||
                  newData.text.includes("?") ||
                  newData.text.includes(".") ||
                  newData.text.includes(",") ||
                  newData.text.includes(":") ||
                  newData.text.includes(";")
                ) {
                  newData.ignore = true;
                }

                tempSpecialText.push(newData);
              }

              let newSentenceQuestion = tempSpecialText.filter((x) => x.text != "");

              tempTimer = newSentenceQuestion.length * 700

              if (newSentenceEn.includes('{{')) {

                let setClassroom = courseStore.class
                setClassroom = setClassroom.replace(/ป./g, '').replace(/ม./g, '')


                newSentenceEn = newSentenceEn.replace(/{{classroom}}/g, setClassroom)
                newSentenceTh = newSentenceTh.replace(/{{classroom}}/g, courseStore.class)

                newSentenceEn = newSentenceEn.replace(/{{name}}/g, studentStore.studentFullName)
                newSentenceTh = newSentenceTh.replace(/{{name}}/g, studentStore.studentFullName)

                newSentenceEn = newSentenceEn.replace(/{{school}}/g, `${schoolStore.schoolName}`)
                newSentenceTh = newSentenceTh.replace(/{{school}}/g, `${schoolStore.schoolName}`)

                newSentenceEn = newSentenceEn.replace(/{{at}}/g, 'at')

                tempTimer = newSentenceQuestion.length * 1000
              }

              let newData = {
                ...newRes,
                question: newSentenceQuestion,
                sentenceEn: newSentenceEn,
                sentenceTh: newSentenceTh,
                timer: tempTimer,
              }

              temp.push(newData)

            }

            res.isSpecialChapter = false

            // กรณีคูณ 3 ของ Chapter 4
            if (index % 4 == 3) {
              res.isSpecialChapter = true
            }

            res.name = `Chapter ${index + 1}`
            res.index = index
            res.sentences = temp
            res.highScore = res.score
            res.score = 0
            res.coin = 0
            res.currentStar = res.star

          })

          systemStore.systemLog({
            api: "speakUp-getSpeakUpChapters",
            store: this.$id,
            status: "Success Get speak up Chapters",
            get: {
              courseId: studentStore.courseLevel,
            },
            response: response.data,
          })

          return tempData

        } else {
          throw new Error(response.data.message)
        }

      } catch (e) {
        systemStore.systemLog({
          api: "speakUp-getSpeakUpChapters",
          store: this.$id,
          status: "Error Get speak up Chapters",
          get: {
            courseId: studentStore.courseLevel,
          },
          description: `Status : ${e}`,
          isError: true,
        })

      };

    },
    // #endregion

    // #region Get Speak up Itemshop
    async getSpeakUpItemShop() {
      // console.log(" Get Speak up ItemShop ");

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()

      const APIURL = `${process.env.NEWAPI}/speakUp-getSpeakUpItemShop?courseId=${studentStore.courseId}`

      try {

        const response = await axios.get(APIURL)

        if (response.data.message == 'success') {

          let tempData = []

          response.data.data.forEach((res) => {
            let pathURL = `https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory/${res.itemName}.png`
            res.pathItem = pathURL
            tempData.push(res)
          })

          let decryptTemp = systemStore.decryptJSON(this.speakUpEvent.data)

          decryptTemp.itemShop = tempData

          systemStore.systemLog({
            api: "speakUp-getSpeakUpItemShop",
            store: this.$id,
            status: "Success Get speak up ItemShop",
            get: {
              courseId: studentStore.courseLevel,
            },
            response: response.data,
          })

          let encryptTemp = systemStore.encryptJSON(decryptTemp)

          this.$patch({
            speakUpEvent: {
              data: encryptTemp,
              isEncrypt: true,
              isLoaded: true,
            }
          })

        } else {
          throw new Error(response.data.message)
        }

      } catch (e) {
        systemStore.systemLog({
          api: "speakUp-getSpeakUpItemShop",
          store: this.$id,
          status: "Error Get speak up ItemShop",
          get: {
            courseId: studentStore.courseLevel,
          },
          description: `Status : ${e}`,
          isError: true,
        })

      }
    },
    // #endregion

    // #region Get Speak up event Current Stage
    async getCurrentSpeakUpStage() {

      const studentStore = useStudentStore()
      const systemStore = useSystemStore()

      const APIURL = `${process.env.NEWAPI}/speakUp-getCurrentSpeakUpStage?courseId=${studentStore.courseId}`

      try {

        const response = await axios.get(APIURL)

        if (response.data.message == 'success') {
          systemStore.systemLog({
            api: "speakUp-getCurrentSpeakUpStage",
            store: this.$id,
            status: "Success Get Current Speak Up Stage",
            get: {
              courseId: studentStore.courseId,
            },
            response: response.data.data,
            description: `Status Code : ${response.status}`,
          })

          return response.data.data
        }

      } catch (e) {

        systemStore.systemLog({
          api: "speakUp-getCurrentSpeakUpStage",
          store: this.$id,
          status: "Error Get Current Speak Up Stage",
          get: {
            courseId: studentStore.courseId,
          },
          response: "",
          isError: true,
        })

      }

    },
    // #endregion
    // #endregion **** Get Speak up Event ****

    // #region **** Save and Update Speak up Event ****
    // #region Update Speak Up Current Stage
    async updateSpeakUpCurrentStage(stage) {

      // console.log(" Update Speak Up Current Stage ");

      const studentStore = useStudentStore()
      const systemStore = useSystemStore()

      const APIURL = `${process.env.NEWAPI}/speakUp-updateSpeakUpCurrentStage`

      const POSTDATA = {
        courseId: studentStore.courseId,
        currentStage: stage,
      }

      try {

        const response = await axios.post(APIURL, POSTDATA)

        if (response.data.message == 'success') {

          let tempData = systemStore.decryptJSON(this.speakUpEvent.data)

          tempData.stage = stage

          let tempEncrypt = systemStore.encryptJSON(tempData)

          this.$patch({
            speakUpEvent: {
              data: tempEncrypt,
              isEncrypt: true,
              isLoaded: true,
            }
          })

          systemStore.systemLog({
            api: "speakUp-updateSpeakUpCurrentStage",
            store: this.$id,
            status: "Success Update Speak Up Current Stage",
            post: POSTDATA,
            response: response.data.data,
            description: `Status Code : ${response.status}`,
          })
        } else {
          throw new Error(response.data.message)
        }

      } catch (e) {
        systemStore.systemLog({
          api: "speakUp-updateSpeakUpCurrentStage",
          store: this.$id,
          status: "Error Update Speak Up Current Stage",
          post: POSTDATA,
          description: `Status Code : ${e}`,
          isError: true,
        })
      }

    },
    // #endregion

    // #region Save Selected Speak Up Story
    async saveSelectedSpeakUpTopics(storyId) {
      // console.log(" Save Selected Speak Up Topics ");

      const studentStore = useStudentStore()
      const courseStore = useCourseStore()
      const systemStore = useSystemStore()

      const APIURL = `${process.env.NEWAPI}/speakUp-saveSelectSpeakUpTopic`

      const POSTDATA = {
        courseId: studentStore.courseId,
        studentId: studentStore.studentId,
        topicId: storyId,
      }

      try {

        const response = await axios.post(APIURL, POSTDATA)

        if (response.data.message == 'success') {

          courseStore.$patch({
            course: {
              data: {
                ...courseStore.course.data,
                selectedSpeakUpTopic: storyId,
              },
              isLoaded: true,
            }
          })

          systemStore.systemLog({
            api: "speakUp-saveSelectSpeakUpTopic",
            store: this.$id,
            status: "Success save selected speak up topics",
            post: POSTDATA,
            response: response.data.data,
          })

        }

      } catch (e) {
        systemStore.systemLog({
          api: "speakUp-saveSelectSpeakUpTopic",
          store: this.$id,
          status: "Error save selected speak up topics",
          post: POSTDATA,
          isError: true,
        })
      }
    },
    // #endregion

    // #region Save Speak up pretest record
    async saveSpeakUpPretestRecord(fileBlob) {

      // console.log(" Save Speak up pretest record ");

      const studentStore = useStudentStore()
      const courseStore = useCourseStore()
      const systemStore = useSystemStore()

      const APIURL = `${process.env.NEWAPI}/speakUp-saveSpeakUpPretestRecord`

      const POSTDATA = {
        courseId: studentStore.courseId,
        audioUrl: fileBlob,
      }

      try {

        const response = await axios.post(APIURL, POSTDATA)

        if (response.data.message == 'success') {

          await courseStore.getCourse();

          systemStore.systemLog({
            api: "speakUp-saveSpeakUpPretestRecord",
            store: this.$id,
            status: "Success save speak up pretest record",
            post: POSTDATA,
            response: response.data.data,
            description: `Status Code : ${response.status}`,
          })

        } else {
          throw new Error(response.data.message)
        }

      } catch (e) {
        systemStore.systemLog({
          api: "speakUp-saveSpeakUpPretestRecord",
          store: this.$id,
          status: "Error save speak up pretest record",
          post: POSTDATA,
          isError: true,
        })
      }

    },
    // #endregion

    // #region Save Speak up Posttest Record
    async saveSpeakUpPosttestRecord(audioBlob) {

      // console.log(" Save Speak up Posttest Record ");

      const studentStore = useStudentStore()
      const systemStore = useSystemStore()
      const inventoryStore = useInventoryStore()

      const responseAudio = await st
        .child(`/speakUp/posttest/${studentStore.courseId}-${this.speakUp.data.speakUpId}`)
        .put(audioBlob);

      let getAudioURL = await responseAudio.ref.getDownloadURL();

      const APIURL = `${process.env.NEWAPI}/speakUp-saveSpeakUpPosttestRecord`

      const POSTDATA = {
        courseId: studentStore.courseId,
        audioUrl: getAudioURL,
      }

      try {

        const response = await axios.post(APIURL, POSTDATA)

        if (response.data.message == 'success') {

          inventoryStore.getInventory()

          systemStore.systemLog({
            api: "speakUp-saveSpeakUpPosttestRecord",
            store: this.$id,
            status: "Success save speak up posttest record",
            post: POSTDATA,
            response: response.data.data,
            description: `Status Code : ${response.status}`,
          })

        } else {
          throw new Error(response.data.message)
        }

      } catch (e) {
        systemStore.systemLog({
          api: "speakUp-saveSpeakUpPosttestRecord",
          store: this.$id,
          status: "Error save speak up posttest record",
          post: POSTDATA,
          isError: true,
        })
      }


    },
    // #endregion

    // #region Save Speak up Chapter Log
    async saveSpeakUpChapterLog(eventData) {

      // console.log(" Save Speak up Chapter Log ");

      const studentStore = useStudentStore()
      const systemStore = useSystemStore()

      const APIURL = `${process.env.NEWAPI}/speakUp-saveSpeakUpChapterLog`

      const POSTDATA = {
        courseId: studentStore.courseId,
        studentId: studentStore.studentId,
        chapterId: eventData.chapterId,
        score: eventData.chapterData.highScore.toString(),
      }

      try {

        const response = await axios.post(APIURL, POSTDATA)

        if (response.data.message == 'success') {

          // await this.updateSpeakUpProgress()

          // this.setProgressSpeakUp(eventData)

          systemStore.systemLog({
            api: "speakUp-saveSpeakUpChapterLog",
            store: this.$id,
            status: "Success Save Speak up Chapter Log",
            post: POSTDATA,
            response: response.data.data,
            description: `Status Code : ${response.status}`,
          })
        } else {
          throw new Error(response.data.message)
        }

      } catch (e) {
        systemStore.systemLog({
          api: "speakUp-saveSpeakUpChapterLog",
          store: this.$id,
          status: "Error Save Speak up Chapter Log",
          post: POSTDATA,
          isError: true,
        })
      }
    },
    // #endregion

    // #region Update Speak Up Progress
    async updateSpeakUpProgress() {

      // console.log(" Update Speak Up Progress ");

      const studentStore = useStudentStore()
      const systemStore = useSystemStore()

      const APIURL = `${process.env.NEWAPI}/speakUp-updateSpeakUpProgress?courseId=${studentStore.courseId}`

      try {

        const response = await axios.get(APIURL)

        if (response.data.message == 'success') {

          systemStore.systemLog({
            api: "speakUp-updateSpeakUpProgress",
            store: this.$id,
            status: "Success Update Speak Up Progress",
            get: {
              courseId: studentStore.courseId,
            },
            response: response.data.data,
            description: `Status Code : ${response.status}`,
          })

        } else {
          throw new Error(response.data.message)
        }

      } catch (e) {

        systemStore.systemLog({
          api: "speakUp-updateSpeakUpProgress",
          store: this.$id,
          status: "Error Update Speak Up Progress",
          get: {
            courseId: studentStore.courseId,
          },
          description: `Status Code : ${e}`,
          isError: true,
        })
      }
    },
    // #endregion

    // #region Buy Speak up Item Shop
    async buySpeakUpItem(items) {

      // console.log(" Buy Speak up Item Shop ");

      const studentStore = useStudentStore()
      const systemStore = useSystemStore()
      const inventoryStore = useInventoryStore()

      const APIURL = `${process.env.NEWAPI}/speakUp-buySpeakUpItem`

      let tempItemShop = items.filter(x => !x.isHasItem)

      const POSTDATA = {
        courseId: studentStore.courseId,
        studentId: studentStore.studentId,
        items: tempItemShop
      }

      try {

        const response = await axios.post(APIURL, POSTDATA)

        if (response.data.message == 'success') {

          let tempData = systemStore.decryptJSON(this.speakUpEvent.data)

          tempData.itemShop.forEach(res => {
            let findItemBuyId = tempItemShop.find(x => x.itemId == res.itemId)

            if (findItemBuyId) {
              res.isHasItem = true
            }

          })

          let tempEncrypt = systemStore.encryptJSON(tempData)

          this.$patch({
            speakUpEvent: {
              data: tempEncrypt,
              isEncrypt: true,
              isLoaded: true,
            }
          })

          inventoryStore.getInventory()

          systemStore.systemLog({
            api: "speakUp-buySpeakUpItem",
            store: this.$id,
            status: "Success Buy Speak up Item Shop",
            post: POSTDATA,
            response: response.data.data,
            description: `Status Code : ${response.status}`,
          })

        } else {
          throw new Error(response.data.message)
        }

      } catch (e) {

        systemStore.systemLog({
          api: "speakUp-buySpeakUpItem",
          store: this.$id,
          status: "Error Buy Speak up Item Shop",
          post: POSTDATA,
          isError: true,
        })

        return false;

      }

    },
    // #endregion

    // #region Receive Speak up Progress Reward
    async receiveSpeakUpProgressReward(item) {

      // console.log(" Receive Speak up Progress Reward ");

      const studentStore = useStudentStore()
      const systemStore = useSystemStore()
      const inventoryStore = useInventoryStore()

      const APIURL = `${process.env.NEWAPI}/speakUp-receiveSpeakUpProgressReward`

      const POSTDATA = {
        courseId: studentStore.courseId,
        rewardLabel: item.label,
        item: item.item,
      }

      try {

        const response = await axios.post(APIURL, POSTDATA)

        if (response.data.message == 'success') {

          inventoryStore.getInventory()

          systemStore.systemLog({
            api: "speakUp-receiveSpeakUpProgressReward",
            store: this.$id,
            status: "Success Receive Speak up Progress Reward",
            post: POSTDATA,
            response: response.data.data,
            description: `Status Code : ${response.status}`,
          })

        } else {
          throw new Error(response.data.message)
        }

      } catch (e) {

        systemStore.systemLog({
          api: "speakUp-receiveSpeakUpProgressReward",
          store: this.$id,
          status: "Error Receive Speak up Progress Reward",
          post: POSTDATA,
          isError: true,
        })

      }


    },
    // #endregion
    // #endregion **** Save and Update Speak up Event ****
    // #endregion **** Speak up Event Store ****

    // #region Other Function
    // #region Set Speak up Event Progress
    setProgressSpeakUp(eventData) {

      const systemStore = useSystemStore()

      let tempDecrypt = systemStore.decryptJSON(this.speakUpEvent.data)

      let sumTotalProgress = 0

      let findChapterPassList = eventData.chapterList.filter(x => x.star > 0)

      if (findChapterPassList.length) {
        sumTotalProgress = Math.round((findChapterPassList.length / eventData.chapterList.length) * 100)
      }

      if (sumTotalProgress > 100) sumTotalProgress = 100

      tempDecrypt.speakUpProgress = sumTotalProgress

      let tempEncrypt = systemStore.encryptJSON(tempDecrypt)

      this.$patch({
        speakUpEvent: {
          data: tempEncrypt,
          isEncrypt: true,
          isLoaded: true,
        }
      })

    },
    // #endregion
    // #region Load Event Data
    async getEventAll() {

      const systemStore = useSystemStore()

      try {

        const response = await this.getSpeakUpEvent()

        if(!response){
          throw new Error("Error Get All Event")
        }

        console.log(response);

        systemStore.systemLog({
          api: "-",
          store: this.$id,
          status: "Success Get All Event",
          response: "-",
          description: `Status Code -`,
        })

      } catch (e) {
        systemStore.systemLog({
          api: "-",
          store: this.$id,
          status: "Error Get All Event",
          description: `Error : ${e}`,
          isError: true,
        })
      }

    },
    // #endregion
    // #endregion
  }
  // #endregion

})
