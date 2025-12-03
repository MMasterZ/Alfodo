import axios from 'axios'
import { defineStore } from 'pinia'
import { useSchoolStore } from './school'
import { useSystemStore } from './system'
import levelExpList from 'src/js/level-exp'

// #region Month mini
const months_mini_th = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",];
// #endregion

// #region Month
const months_th = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม',
]
// #endregion

// #region Level exp
const levelExp = levelExpList
// #endregion

// #region Level of Age
const levelForAge = [
  {
    level: "1",
    ageOfLearning: "7",
  },
  {
    level: "3",
    ageOfLearning: "8",
  },
  {
    level: "5",
    ageOfLearning: "9",
  },
  {
    level: "7",
    ageOfLearning: "10",
  },
  {
    level: "9",
    ageOfLearning: "11",
  },
  {
    level: "11",
    ageOfLearning: "12",
  },
];
// #endregion

// ฟังก์ชันสำหรับอ่าน cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// ฟังก์ชันสำหรับตั้งค่า cookie (หมดอายุ 1 วัน)
function setCookie(name, value, days) {
  // กำหนดวันหมดอายุโดยใช้เวลาปัจจุบันจาก systemStore และหมดอายุที่เที่ยงคืน
  const systemStore = useSystemStore();
  const now = new Date(systemStore.datetime.timestamp);
  const expire = new Date(now);
  expire.setHours(24, 0, 0, 0); // set to next midnight
  const expires = "expires=" + expire.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

export const useStudentStore = defineStore('studentStore', {
  state: () => ({
    student: {
      uid: '',
      data: {},
      isUpdateCoin: false,
      isUpdateCharacter: false,
      token: "",
      isUpdateStudentData: false,
      isUpdateTier:false,
      isSortHistory: true,
      isEncrypted: false,
      isLoaded: false,
    },
    tutorialObject:{
      data: null,
      isEncrypted: false,
      isUpdate: false,
      isLoaded: false,
    },
    registerObject:{
      data: null,
      isEncrypted: false,
    },
    eventRewardObject:{
      data:null,
      isEncrypted:false,
      isStartAnimationSetCoin:false,
    },
    couponCodeObject:{
      data:null,
      isEncrypted:false,
    },
    levelRewardObject:{
      data:null,
      isEncrypted:false,
    },
  }),
  // #region Mutations
  getters: {
    // #region Student Data
    studentData: state => {
      if (state.student.uid != '') {

        let newData = {...state.student.data}

        if(!newData.birthDate){
          newData.birthDate = {
            day:"",
            month:"",
            year:"",
          }
        }

        return newData
      }
      return null
    },
    // #endregion

    // #region Birth Date
    birthDate: state => {

      if(state.student.uid){

        if(!state.student.data.birthDate){
          return "-"
        }else{

          if(state.student.data.birthDate.day == ''){
            return "-"
          }else{
            return `${state.student.data.birthDate.day} ${months_mini_th[state.student.data.birthDate.month - 1]} ${state.student.data.birthDate.year}`
          }


        }
      }

      return "-"
    },
    // #endregion

    // #region Student Full Name
    studentFullName: state => {
      if (state.student.uid) {
        return `${state.student.data.name} ${state.student.data.surname}`
      }
      return ""
    },
    // #endregion

    // #region Student level
    studentLevel: state => state.student.data.level || '',
    // #endregion

    // #region Student Type
    studentType: state => state.student.data.type || '',
    // #endregion

    // #region Student Demo Unit
    studentDemoUnit: state => state.student.data.demoUnit || 1,
    // #endregion

    // #region Student Id
    studentId: state => state.student.uid || '',
    // #endregion

    // #region Student Username
    username: state => state.student.data.username || '',
    // #endregion

    // #region Student Age
    studentAge: state => {

      const systemStore = useSystemStore()

      if (state.student.uid) {

        if(state.birthDate != '-'){
          let studentAge = systemStore.datetime.year - (state.student.data.birthDate.year - 543)

          return studentAge
        }
      }
      return 0
    },
    // #endregion

    // #region Token
    tokenId: state => state.student.token,
    // #endregion

    // #region Tutorial
    tutorial: state => state.student.data.tutorial || [],
    // #endregion

    // #region Expire Date
    expireDate: state => state.student.data.expireDate || "",
    // #endregion

    // #region Expire Date Format
    expireDateFormat: state => {
      if (state.student.uid) {
        state.student.data.expireDateForMat || ""
        let date = new Date(state.student.data.expireDate)
        return `${date.getDate()} ${months_th[date.getMonth()]} ${date.getFullYear()}`
      }
      return ""
    },
    // #endregion

    // #region Distance In Day
    distanceInDays: state => state.student.data.distanceInDays || 0,
    // #endregion

    // #region Phone Number
    phoneNumber: state => {
      if(state.student.data.tel || state.student.data.phoneNumber){
        return state.student.data.tel || state.student.data.phoneNumber
      }

      return ""
    },
    // #endregion

    // #region Email
    email: state => {

      if(state.student.data.email || state.student.data.emailToLowerCase){
        return state.student.data.email || state.student.data.emailToLowerCase
      }

      return ""

    },
    // #endregion

    // #region Gendeer
    gender: state => state.student.data.gender || '',
    // #endregion

    // #region Province
    province: state => state.student.data.province || "",
    // #endregion

    // #region History payment
    history: state => {

      let temp =  []

      if(state.student.data.history.length){
        temp = state.student.data.history.map((item) => {

          let newData = {
            ...item,
            date: "",
          }

          let c_date = new Date(item.purchaseDate)
          c_date.setTime(c_date.getTime() - (7 * 60 * 60 * 1000));
          let c_day = c_date.getDate()
          if(c_day < 10) c_day = `0${c_day}`
          let c_month = c_date.getMonth()
          let c_year = c_date.getFullYear()
          let c_hours = c_date.getHours()
          if(c_hours < 10) c_hours = `0${c_hours}`
          let c_minutes = c_date.getMinutes()
          if(c_minutes < 10) c_minutes = `0${c_minutes}`

          let fullDate = `${c_day} ${months_mini_th[c_month]} ${c_year} | ${c_hours}:${c_minutes}`

          newData.date = fullDate

          return newData
        })

        temp = temp.filter(x => x?.courseList)

        temp.sort((a, b) => {
          if (state.student.isSortHistory) {
            return a.time - b.time
          } else {
            return b.time - a.time
          }
        })
      }

      return temp
    },
    // #endregion

    // #region Coin
    coin: state => state.student.data.coin || 0,
    // #endregion

    // #region Level Reward List
    levelRewardList: state => {

      const systemStore = useSystemStore()

      let temp = []

      if(state.levelRewardObject.isEncrypted){

        let decrypt = systemStore.decryptJSON(state.levelRewardObject.data)

        decrypt.map(x => {

          // ปลดล็อคของรางวัล
          if(state.studentData.level >= x.level){
            x.isLock = false
          }

          // ตรวจสอบว่าได้รับรางวัลหรือยัง
          // ....

          return x
        })

        temp = decrypt

      }

      return temp

    },
    // #endregion

    // #region Premium Key
    premiumKey: state => state.student.data.premiumKey || 0,
    // #endregion

    // #region Progress Level
    progressLevel: state => state.student.data.levelProgressBar * 100 || 0,
    // #endregion

    // #region Character Name
    characterName: state =>
      state.student.data.character ? state.student.data.character.name : '',
    // #endregion

    // #region Character Data
    characterData: state => {

      return state.student.data.character || null
    },
    // #endregion

    // #region level for age
    levelForAge: state =>  {
      const systemStore = useSystemStore()

      let tempData = ''

      if(state.birthDate != '-'){
        let studentAge = Math.floor(systemStore.datetime.year + 543) - state.student.data.birthDate.year

        let findLevel = levelForAge.find((x) => {
          if (studentAge <= 7) {
            return x.ageOfLearning == 7;
          } else if (studentAge >= 12) {
            return x.ageOfLearning == 12;
          } else {
            return x.ageOfLearning == studentAge;
          }
        })

        tempData = findLevel.level || ""

      }

      return tempData || ""
    },
    // #endregion

    // #region Placement Test level
    placementTestLevel: state => state.student.data?.placementTestLevel || "",
    // #endregion

    // #region is Has Character
    isHasCharacter: state => state.student.data.isCreateCharacter || false,
    // #endregion

    // #region Course Id
    courseId: state => state.student.data.currentCourseId || '',
    // #endregion

    // #region School Id
    schoolId: state => state.student.data.schoolId || '',
    // #endregion

    // #region Is Pretest
    isPretest: state => state.student.data.pretest || false,
    // #endregion

    // #region Is Posttest
    isPosttest: state => state.student.data.posttest || false,
    // #endregion

    // #region Tutorial Data
    tutorialData:(state) => {

      const systemStore = useSystemStore()

      let temp = []

      if(state.tutorialObject.isEncrypted){
        let decrypt = systemStore.decryptJSON(state.tutorialObject.data)
        temp = decrypt
      }

      return temp

    },
    // #endregion

    // #region Tutorial loaded
    isTutorialLoaded: state => state.tutorialObject.isLoaded,
    // #endregion

    // #region Register Data
    registerData: state => {

        const systemStore = useSystemStore()

        let temp = null

        if(state.registerObject.isEncrypted){
          let decrypt = systemStore.decryptJSON(state.registerObject.data)
          temp = decrypt
        }

        return temp
    },
    // #endregion

    // #region is Finish Register
    isFinishRegister: state => state.student.data.isFinishRegister || false,
    // #endregion

    // #region Special Reward
    eventReward: state => {

      const systemStore = useSystemStore()

      let temp = {}

      if(state.eventRewardObject.isEncrypted){
        let decrypt = systemStore.decryptJSON(state.eventRewardObject.data)
        temp = decrypt
        temp = {
          ...decrypt,
          currentCoin:state.student.data.coin,
        }
      }

      return temp
    },
    // #endregion

    // #region Skip Placement Test
    isSkipPlacementTest: state => {
      let isCheck = false

      if (state.student.data?.isSkipPlacementTest) {
        isCheck = true
      }

      return isCheck
    },
    // #endregion

    // #region Coupon Code
    couponCodeList: state => {

      const systemStore = useSystemStore()

      let temp = []

      if(state.couponCodeObject.isEncrypted){

        let decrypt = systemStore.decryptJSON(state.couponCodeObject.data)

        temp = decrypt
      }

      return temp

    },
    // #endregion

    // #region Is Has Level Reward
    isHasLevelReward: state => {

      let isCheck = false

      if(state.levelRewardObject.isEncrypted){

        let findItem = state.levelRewardList.find((x) => !x.isLock && !x.isClaimed)

        if(findItem){
          isCheck = true
        }

      }

      return isCheck

    },
    // #endregion

    // #region Is First time Tutorial Lobby
    isFirstTimeTutorialLobby: state => {

      let isCheck = true

      if(state.tutorialObject.isEncrypted){

        let findItem = state.tutorialData.find((x) => x == 'lobby-v2')

        if(findItem){
          isCheck = false
        }

      }

      return isCheck

    },
    // #endregion

    // #region Loading
    isLoading: state => {
      if (state.student.isUpdateCharacter) return true
      else return false
    },
    // #endregion

    // #region isAgreed
    isAgreePolicy: state => state.student.data.isAgreePolicy || false,
    // #endregion

  },
  // #endregion

  // #region Actions
  actions: {

    // #region Logout
    async logout() {
      let POSTDATA = {
        studentId: this.studentId,
      }

      let APIURL = `${process.env.NEWAPI}/auth-logout`

      await axios.post(APIURL, POSTDATA)

    },
    // #endregion

    // #region Get Level
    async getLevel() {

      const systemStore = useSystemStore()

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/student-getLevel?studentId=${this.studentId}`

        const response = await axios.get(APIURL)

        this.$patch({
          student: {
            data: {
              exp: response.data.exp,
              level: response.data.level,
              levelProgressBar: response.data.levelProgressBar
            }
          }
        })

        systemStore.systemLog({
          store: this.$id,
          api: "student-getLevel",
          get: {
            studentId: this.studentId,
          },
          status: "Success Get Level",
          response: response.data,
        })
      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "student-getLevel",
          status: "Error Get Level",
          description: e,
          isError: true,
        })
        return e
      }
    },
    // #endregion

    // #region Get Coin
    async getCoin() {

      const systemStore = useSystemStore()

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/student-getCoin?studentId=${this.studentId}`

        const response = await axios.get(APIURL)

        this.$patch({
          student: {
            data: {
              coin: Number(response.data)
            }
          }
        })

        systemStore.systemLog({
          store: this.$id,
          api: "student-getCoin",
          get: {
            studentId: this.studentId,
          },
          status: "Success Get Coin",
          response: response.data,
        })

      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "student-getCoin",
          status: "Error Get Coin",
          description: e,
          isError: true,
        })

        return e
      }
    },
    // #endregion

    // #region Get Ranking
    async getRanking() {

      const systemStore = useSystemStore()

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/ranking-getSchoolRanking?schoolId=${this.schoolId}&studentId=${this.studentId}`

        let response = await axios.get(APIURL)

        if (response.data == 'No ranking yet') {
          let newData = {
            schoolRanking: {
              rankings: []
            },
            classRanking: {
              rankings: []
            }
          }
          return newData
        }

        systemStore.systemLog({
          store: this.$id,
          api: "ranking-getSchoolRanking",
          get: {
            schoolId: this.schoolId,
            studentId: this.studentId,
          },
          status: "Success Get Ranking",
          response: response.data,
        })


        return response.data
      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "ranking-getSchoolRanking",
          status: "Error Get Ranking",
          description: e,
          isError: true,
        })

        return e
      }
    },
    // #endregion

    // #region Online Ranking
    async getOnlineRanking() {

      const systemStore = useSystemStore()

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/ranking-getOnlineRanking?schoolId=${this.schoolId}&studentId=${this.studentId}`

        let response = await axios.get(APIURL)

        if (response.data == 'No ranking yet') {
          let newData = {
            schoolRanking: {
              rankings: []
            },
            classRanking: {
              rankings: []
            }
          }
          return newData
        }

        systemStore.systemLog({
          store: this.$id,
          api: "ranking-getOnlineRanking",
          get: {
            schoolId: this.schoolId,
            studentId: this.studentId,
          },
          status: "Success Get Online Ranking",
          response: response.data,
        })


        return response.data
      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "ranking-getOnlineRanking",
          status: "Error Get Online Ranking",
          description: e,
          isError: true,
        })

        return e
      }

    },
    // #endregion

    // #region Get Character Info
    async getCharacterInfo() {

      const systemStore = useSystemStore()

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/character-getCharacterInfo?studentId=${this.studentId}`

        let response = await axios.get(APIURL)

        this.student.data.character = {
          ...response.data,
          other: response.data.other || {
            isFront: false,
            isBack: false,
            itemName: ''
          }
        }

        systemStore.systemLog({
          store: this.$id,
          api: "character-getCharacterInfo",
          get: {
            studentId: this.studentId,
          },
          status: "Success Get Character",
          response: response.data,
        })

      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "character-getCharacterInfo",
          status: "Error Get Character",
          description: e,
          isError: true,
        })

        return e
      }
    },
    // #endregion

    // #region Pretest && Posttest Log
    async getPrepostLog() {

      const schoolStore = useSchoolStore()
      const systemStore = useSystemStore()

      try {

        let type = 'pretest'
        if (schoolStore.isPosttest) type = 'posttest'
        if (schoolStore.isPretest) type = 'pretest'
        if (!schoolStore.isPosttest && !schoolStore.isPretest) return

        const APIURL = `${process.env.NEWAPI_ASIA}/prePostLog-checkPrePostLog?courseId=${this.courseId}&type=${type}`

        const response = await axios.get(APIURL)

        let isHasTest = false
        if (response.data == 'passed') isHasTest = true
        else isHasTest = false

        this.$patch({
          student: {
            data: {
              [type]: isHasTest
            }
          }
        })

        systemStore.systemLog({
          store: this.$id,
          api: "prePostLog-checkPrePostLog",
          get: {
            courseId: this.courseId,
            type: type,
          },
          status: "Success Get Per-test && Post-test Log",
          response: response.data,
        })

      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "prePostLog-checkPrePostLog",
          status: "Error Get Per-test && Post-test Log",
          description: e,
          isError: true,
        })
        return e
      }
    },
    // #endregion

    // #region Get Student Data
    async getStudentData() {
      // console.clear();

      const systemStore = useSystemStore()

      // if(this.student.isLoaded && !this.student.isUpdateStudentData) return 'success'

      // this.student.isUpdateStudentData = false

      try {

        // let studentUID = this.studentId || ''

        // if(localStorage.getItem('ODY_UID')){
        //   studentUID = localStorage.getItem('ODY_UID').split("|")[1]
        // }

        let APIURL = `https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/student-getStudentData?studentId=${this.studentId}`

        let response = await axios.get(APIURL)

        if (response.data.message != 'success') {
          throw new Error('Error Get Student Data')
        }

        let newData = {...response.data.studentData}

        // #region State เลเวล

          let pendingEXP = newData.pendingEXP || 0

          let exp = newData.exp || 0

          let currentNextEXP = 0

          let currentLevel = newData.level || 0

          if(currentLevel <= 480) {
            currentNextEXP = levelExp[currentLevel].exp
          }
          else {
            currentNextEXP = 99999999
          }

          let currentTier = levelExp[currentLevel]

          if(!currentTier){
            currentTier = 'chosen-one-4'
          } else {
            currentTier = currentTier.tier
          }

          newData.exp = exp
          newData.nextEXP = currentNextEXP
          newData.tier = currentTier
          newData.pendingEXP = pendingEXP
          newData.level = newData.level || 0

        // #endregion

        newData.isShowDialogNews = false

        let cookieKey = `odc_news_pop_up_${this.studentId}`

        if(newData.isShowNewsPopup){
          if(getCookie(cookieKey) === null){
            setCookie(cookieKey,true,1);
            newData.isShowDialogNews = true;
          }else{
            // check cookie is expired and value is false
            const cookie = getCookie(cookieKey);

            if(cookie === "true"){
              newData.isShowDialogNews = true;
            }
          }
        }

        this.$patch({
          student: {
            data: {
              ...newData,
            },
            // uid: studentUID,
            isEncrypted: true,
            isLoaded: true,
            isUpdateStudentData:false
          },
        })

        systemStore.systemLog({
          api: 'student-getStudentData',
          store: this.$id,
          status: "Success Get Student Data",
          get: {
            studentId: this.studentId
          },
          response: response.data,
        })

        return 'success'

      } catch (e) {
        systemStore.systemLog({
          api: 'student-getStudentData',
          store: this.$id,
          get: {
            studentId: this.studentId
          },
          status: "Error Get Student Data",
          description: e,
          isError: true,
        })

        return 'error'
      }
    },
    // #endregion

    // #region Check Unlock Level
    async checkUnlockLevel() {

      const systemStore = useSystemStore()

      try {

        let APIURL = `${process.env.NEWAPI_ASIA}/student-checkUnlockLevel?studentId=${this.studentId}`

        let response = await axios.get(APIURL)

        if (response.status != '200') {
          throw new Error('Error')
        }

        if (response.data.message != 'unlock' && response.data.message != 'lock') {
          throw new Error('Error')
        }

        systemStore.systemLog({
          api: 'student-checkUnlockLevel',
          store: this.$id,
          status: "Success Check Unlock Level",
          get: {
            studentId: this.studentId
          },
          response: response.data,
        })

        return response
      } catch (e) {
        systemStore.systemLog({
          api: 'student-checkUnlockLevel',
          store: this.$id,
          status: "Error Check Unlock Level",
          description: e,
          isError: true,
        })
        return e
      }

    },
    // #endregion

    // #region Check event reward
    async checkEventReward(){

      const systemStore = useSystemStore()

      const APIURL = `${process.env.NEWAPI_ASIA}/itemEvent-checkEventRewardV2?studentId=${this.studentId}`;

      try{

        if(sessionStorage.getItem('isReceivedReward') == 'true') return

        sessionStorage.setItem('isReceivedReward', false)

        const response = await axios.get(APIURL);

        if(response.data.message != 'success'){
          throw new Error(response.data)
        }

        if(response.data.isShowReward){
          systemStore.systemData.activeStatus.isShowDialogEventReward = true
          let temp = {
            coin: 500,
          }

          let tempEncrypt = systemStore.encryptJSON(temp)

          this.$patch({
            eventRewardObject:{
              data:tempEncrypt,
              isEncrypted:true,
              isStartAnimationSetCoin:false,
            }
          })
        }

        systemStore.systemLog({
          store: this.$id,
          api: "itemEvent-checkEventReward",
          status: "Success Check Event Reward",
          get: {
            studentId: this.studentId
          },
          response: response.data,
        })

      }catch(e){

          systemStore.systemLog({
            store: this.$id,
            api: "itemEvent-checkEventReward",
            status: "Error Check Event Reward",
            get: {
              studentId: this.studentId
            },
            description: e,
            isError: true,
          })
      }
    },
    // #endregion

    // #region Get Current Stage
    async getCurrentStage() {

      const systemStore = useSystemStore()

      try {
        const APIURL = `${process.env.NEWAPI}/getCurrentStage?studentId=${this.studentId}`

        let response = await axios.get(APIURL)

        if (response.data.message != 'success') {
          throw new Error(response.data.message)
        }

        let registerData = systemStore.registerData

        registerData = {
          ...registerData,
          ...response.data,
        }

        systemStore.setRegisterData(registerData)

        systemStore.systemLog({
          store: this.$id,
          api: "getCurrentStage",
          status: "Success Get Current Stage",
          get: {
            studentId: this.studentId,
          },
          response: response.data,
        })

      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "getCurrentStage",
          status: "Error Get Current Stage",
          get: {
            studentId: this.studentId,
          },
          description: e,
          isError: true,
        })
      }

    },
    // #endregion

    // #region Get Student Level Reward
    async getStudentLevelReward() {

      const systemStore = useSystemStore()

      const POSTDATA = {
        studentId: this.studentId,
      }

      try{

        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/firstTimeReward-getReward?studentId=${this.studentId}`

        const response = await axios.get(APIURL)

        if(response.data.message != 'success'){
          throw new Error(response.data.message)
        }

        let tempResponse = response.data.data


        let tempReward = [];


        for (let itemIndex = 0; itemIndex < tempResponse.length; itemIndex++) {

          let data = tempResponse[itemIndex];


          let tempTier = levelExp.map(x => x.tier)

          tempTier = tempTier[itemIndex]

          let isLock = true;

          if(data.isClaimed){
            isLock = false;
          }

          let newData = {
            id: itemIndex,
            level:data.level,
            type:tempTier,
            items:data.reward,
            isLock:isLock,
            isClaimed:data.isClaimed,
          }

          tempReward.push(newData);

        }


        let encrypt = systemStore.encryptJSON(tempReward)

        this.$patch({
          levelRewardObject:{
            data:encrypt,
            isEncrypted:true,
          }
        })

        systemStore.systemLog({
          store: this.$id,
          api: "Get Level Reward",
          status: "Success Get Level Reward",
          post: POSTDATA,
          response: null,
        })

      }catch(e){
        systemStore.systemLog({
          store: this.$id,
          api: "Get Level Reward",
          status: "Error Get Level Reward",
          post: POSTDATA,
          description: e,
          isError: true,
        })
      }

    },
    // #endregion

    // #region Level Up
    async levelUp() {

      const systemStore = useSystemStore()

      let pendingEXP = 0

      if(this.isFirstTimeTutorialLobby){
        pendingEXP = 20
      }else{
        pendingEXP = this.studentData.pendingEXP + this.studentData.exp
      }

      let currentLevel = this.studentData.level

      for (let index = currentLevel; index < levelExp.length; index++) {
        let exp = levelExp[index].exp

        if(pendingEXP >= exp){
          pendingEXP -= exp
          currentLevel++
        }
        else{
          break
        }

      }

      const POSTDATA = {
        studentId:this.studentId,
        isTutorial:this.isFirstTimeTutorialLobby,
      }

      try{

        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/firstTimeReward-claimExp`

        const response = await axios.post(APIURL,POSTDATA)

        if(response.data.message != 'success'){
          throw new Error(response.data.message)
        }

        let nextEXP = levelExp[currentLevel].exp
        let tier = levelExp[currentLevel].tier

        if(this.isFirstTimeTutorialLobby){
          this.$patch({
            student:{
              data:{
                level: currentLevel,
                nextEXP:nextEXP,
                tier: tier,
                exp:pendingEXP
              }
            },
          })
        }else{
          this.$patch({
            student:{
              data:{
                level: currentLevel,
                nextEXP:nextEXP,
                tier: tier,
                exp:pendingEXP,

                pendingEXP: 0,
              }
            },
          })
        }

        systemStore.systemLog({
          store: this.$id,
          api: "Level Up",
          status: "Success Level Up",
          post: POSTDATA,
          response: null,
        })

      }catch(e){
        systemStore.systemLog({
          store: this.$id,
          api: "Level Up",
          status: "Error Level Up",
          post: POSTDATA,
          description: e,
          isError: true,
        })
      }

    },
    // #endregion

    // #region Set Character
    async setCharacter() {

      const systemStore = useSystemStore()

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/character-setCharacter`

        const POSTDATA = {
          studentId: this.studentId,
          color: this.characterData.color,
          head: this.characterData.head,
          body: this.characterData.body,
          footer: this.characterData.footer,
          pet: this.characterData.pet,
          other: this.characterData.other,
          name: this.characterData.name
        }

        let response = await axios.post(APIURL, POSTDATA)

        this.$patch(state => {
          state.student.isUpdateCharacter = true
        })

        systemStore.systemLog({
          store: this.$id,
          api: "character-setCharacter",
          status: "Success Set Character",
          post: POSTDATA,
          response: response.data,
        })

        return 'success'
      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "character-setCharacter",
          status: "Error Set Character",
          description: e,
          isError: true,
        })
        return e
      }
    },
    // #endregion

    // #region Update Coin
    async updateCoin(coin) {

      const systemStore = useSystemStore()

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/student-updateCoin`

        const POSTDATA = {
          studentId: this.studentId,
          coin: Number(coin)
        }

        let response = await axios.post(APIURL, POSTDATA)

        this.$patch({
          student: {
            isUpdateCoin: true
          }
        })

        systemStore.systemLog({
          store: this.$id,
          api: "student-updateCoin",
          status: "Success Update Coin",
          post: POSTDATA,
          response: response.data,
        })

      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "student-updateCoin",
          status: "Error Update Coin",
          description: e,
          isError: true,
        })
        return e
      }
    },
    // #endregion

    // #region Update Create Character
    async updateCreateCharacter() {

      const systemStore = useSystemStore()

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/student-updateCreateCharacterStatus`

        const POSTDATA = {
          studentId: this.studentId
        }

        let response = await axios.post(APIURL, POSTDATA)

        systemStore.systemLog({
          store: this.$id,
          api: "student-updateCreateCharacterStatus",
          status: "Success Update Create Character",
          post: POSTDATA,
          response: response.data,
        })

      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "student-updateCreateCharacterStatus",
          status: "Error Update Create Character",
          description: e,
          isError: true,
        })
        return e
      }
    },
    // #endregion

    // #region Update Current Course Id
    async updateCurrentCourseId(courseId) {

      const systemStore = useSystemStore()

      try {

        const APIURL = `${process.env.NEWAPI_ASIA}/student-updateCurrentCourseId`

        const POSTDATA = {
          studentId: this.studentId,
          courseId: courseId
        }

        let response = await axios.post(APIURL, POSTDATA)

        this.$patch(state => {
          state.student.data.currentCourseId = courseId
        })

        systemStore.systemLog({
          store: this.$id,
          api: "student-updateCurrentCourseId",
          status: "Success Update Current Course",
          post: POSTDATA,
          response: response.data,
        })

      } catch (e) {

        systemStore.systemLog({
          store: this.$id,
          api: "student-updateCurrentCourseId",
          status: "Error Update Current Course",
          description: e,
          isError: true,
        })

        return e
      }
    },
    // #endregion

    // #region Skip Placement test
    async skipPlacementTest() {

      const systemStore = useSystemStore()

      const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/student-updateIsSkipPlacementTest`

      const POSTDATA = {
        studentId: this.studentId
      }

      try {

        const response = await axios.post(APIURL, POSTDATA)

        if (response.data.message != 'success') throw new Error(response.data.message)

        this.$patch({
          student: {
            data: {
              isSkipPlacementTest: true
            }
          }
        })

        systemStore.systemLog({
          store: this.$id,
          api: 'student-skipPlacementTest',
          status: 'Success Skip Placement Test',
          post: POSTDATA,
          response: response.data,
        })

      } catch (e) {

         systemStore.systemLog({
          store: this.$id,
          api: "student-skipPlacementTest",
          status: "Error Skip Placement Test",
          post: POSTDATA,
          description: e,
          isError: true,
        })

      }

    },
    // #endregion

    // #region Student Name
    async updateStudentName(studentData) {

      const systemStore = useSystemStore()

      try {

        const APIURL = `${process.env.NEWAPI_ASIA}/student-updateStudentName`

        const POSTDATA = {
          studentId: this.studentId,
          nameTh: studentData.nameTh,
          nameEn: studentData.nameEng,
        }


        let response = await axios.post(APIURL, POSTDATA)

        this.$patch({
          student: {
            data: {
              isUpdateCertName: true,
              nameCertTh: studentData.nameTh,
              nameCertEn: studentData.nameEng
            }
          }
        })

        systemStore.systemLog({
          store: this.$id,
          api: "student-updateStudentName",
          status: "Success Update Student Name",
          post: POSTDATA,
          response: response.data,
        })

        return response.data
      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "student-updateStudentName",
          status: "Error Update Student Name",
          description: e,
          isError: true,
        })
        return e
      }
    },
    // #endregion

    // #region Load Tutorial
    async getTutorial(){

      const systemStore = useSystemStore();

      // if(this.isTutorialLoaded) return

      try{

        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/tutorial-getTutorial?studentId=${this.studentId}`

        const response = await axios.get(APIURL);

        if(response.data.message != 'Success') throw new Error(response.data.message)

        let encrypt = systemStore.encryptJSON(response.data.passedTutorial
        )

        this.$patch({
          tutorialObject: {
            data: encrypt,
            isEncrypted: true,
            isLoaded: true
          }
        })

        systemStore.systemLog({
          store: this.$id,
          api: "tutorial-getTutorial",
          status: "Success Get Tutorial",
          get: {
            studentId: this.studentId
          },
          response: response.data,
        })

      } catch(e){

        systemStore.systemLog({
          store: this.$id,
          api: "tutorial-getTutorial",
          status: "Error Get Tutorial",
          description: e,
          isError: true,
        })

        return 'error'

      }
    },
    // #endregion

    // #region Set Tutorial
    setTutorialData(routeName){

        const systemStore = useSystemStore()

        if(this.tutorialObject.isEncrypted) {
          let tempDecrypt = systemStore.decryptJSON(this.tutorialObject.data)

          tempDecrypt.push(routeName)

          let tempEncrypt = systemStore.encryptJSON(tempDecrypt)

          this.$patch({
            tutorialObject: {
              data: tempEncrypt,
              isEncrypted: true,
              isUpdate: true
            }
          })

        }


    },
    // #endregion

    // #region Check Tutorial
    checkTutorial(name){

      let isCheck = true

      if(this.tutorialObject.isEncrypted){

        let findTutorial = this.tutorialData.find(x => x == name)

        if(findTutorial){
          isCheck = false
        }

      }

      return isCheck

    },
    // #endregion

    // #region Save Character name
    async saveCharacterName(name, gender, province, birthDate, phoneNumber) {

      const systemStore = useSystemStore()

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/character-setCharacterName`

        const POSTDATA = {
          studentId: this.studentId,
          name: name,
          gender: gender,
          province: province,
          birthDate: birthDate,
          tel:phoneNumber,
        }

        let response = await axios.post(APIURL, POSTDATA)

        if(response.data.message != 'success') {
          throw new Error(response.data.message)
        }

        this.$patch({
          student: {
            data: {
              character: {
                name: name
              },
              gender: gender,
              province: province,
              birthDate: birthDate,
              tel:phoneNumber
            }
          }
        })

        systemStore.systemLog({
          store: this.$id,
          api: "character-setCharacterName",
          status: "Success Save Character Name",
          post: POSTDATA,
        })

        return "success"

      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "character-setCharacterName",
          status: "Error Save Character Name",
          description: e,
          isError: true,
        })
        return 'error'
      }
    },
    // #endregion

    // #region agree policy
    async agreePolicy() {

      const systemStore = useSystemStore()

      const POSTDATA = {
        studentId:this.studentId,
        isAgreePolicy:true
      }

      try{

        const APIURL = `${process.env.NEWAPI_ASIA}/student-agreePolicy`

        const response = await axios.post(APIURL, POSTDATA)

        if(response.data.message != 'success') {
          throw new Error(response.data.message)
        }

        this.$patch({
          student:{
            data:{
              isAgreePolicy:true,
            }
          }
        })

        systemStore.systemLog({
          store: this.$id,
          api: "student-agreedPolicy",
          status: "Success Agreed Policy",
          post: POSTDATA,
        })

        return "success"

      }catch(e){

        systemStore.systemLog({
          store: this.$id,
          api: "student-agreedPolicy",
          status: "Error Agreed Policy",
          post: POSTDATA,
          description: e,
          isError: true,
        })

        return 'error'

      }

    },
    // #endregion

    // #region Delete Account
    async deleteAccount() {

      const systemStore = useSystemStore()

      const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/auth-deleteAccount`

      const POSTDATA = {
        studentId:this.studentId
      }

      try{

        const response = await axios.post(APIURL, POSTDATA);

        if(response.data.message != 'success'){
          throw new Error(response.data.message)
        }

        systemStore.systemLog({
          store: this.$id,
          api: "auth-deleteAccount",
          status: "Success Delete Account",
          post: POSTDATA,
        })

        return "success"

      }catch(e){

        systemStore.systemLog({
          store: this.$id,
          api: "auth-deleteAccount",
          status: "Error Delete Account",
          post: POSTDATA,
          description: e,
          isError: true,
        })

        return 'error'

      }

    },
    // #endregion

    // #region Set Pre Post
    setPrePost(type, status) {

      this.$patch({
        student: {
          data: {
            [type]: status
          }
        }
      })

    },
    // #endregion

    // #region Set Update Coin
    setUpdateCoin() {

      this.$patch({
        student: {
          isUpdateCoin: true
        }
      })

    },
    // #endregion

    // #region Set name
    setName(name) {

      this.$patch({
        student: {
          data: {
            character: {
              name: name
            }
          }
        }
      })

    },
    // #endregion

    // #region Set Color
    setColor(color) {

      this.$patch({
        student: {
          data: {
            character: {
              color: color
            }
          }
        }
      })

    },
    // #endregion

    // #region Set Character Data
    setCharacterData(items) {
      items.forEach(res => {
        let newData = {
          isFront: res.isFront || false,
          isBack: res.isBack || false,
          itemName: res.itemName,
          FPS: res.FPS || 0,
          duration: res.duration || 0
        }
        if (!this.student.data.character) {
        }
        this.student.data.character[res.type] = newData
      })

    },
    // #endregion

    // #region Set Coin
    setCoin(coin) {
      this.student.data.coin -= coin
    },
    // #endregion

    // #region Set Increase Coin
    setIncreaseCoin(coin) {
      this.student.data.coin += coin
    },
    // #endregion

    // #region Set Current Coin
    setCurrentCoin(amount){
      this.student.data.coin = amount
    },
    // #endregion

    // #region Set Premium Key
    setPremiumKey(amount) {
      this.student.data.premiumKey += amount
    },
    // #endregion

    // #region Set Current  Premium Key
    setCurrentPremiumKey(amount){
      this.student.data.premiumKey = amount
    },
    // #endregion

    // #region Set Expire Date
    setExpireDate(data) {

      this.$patch({
        student: {
          data: {
            expireDate: data.expireDate,
            distanceInDays: data.distanceInDays,
            type: data.type
          }
        }
      })

    },
    // #endregion

    // #region Set Student Data
    setStudentData(data) {

      this.$patch({
        student: {
          uid: data.studentId,
          data: data
        }
      })

    },
    // #endregion

    // #region Update Student Data
    updateStudentData() {

      this.$patch({
        student: {
          isUpdateStudentData: true
        }
      })

    },
    // #endregion

    // #region Set News
    setNews() {
      let cookieKey = `odc_news_pop_up_${this.studentId}`
      if(getCookie(cookieKey) === "true"){
        setCookie(cookieKey,false,1);
      }

      this.$patch({
        student:{
          data:{
            isShowNewsPopup:false,
            isShowDialogNews:false,
          }
        }
      })
    },
    // #endregion

    // #region Set Received reward
    setReceivedReward(){

      this.$patch({
        eventRewardObject:{
          isStartAnimationSetCoin: true
        }
      })

      setTimeout(() => {
        this.$patch({
          eventRewardObject:{
            data:null,
            isEncrypted:false,
            isStartAnimationSetCoin: false,
          }
        })
      }, 1000);

    },
    // #endregion

    // #region Get Student Coupon Code
    async getStudentCouponCode(){

      const systemStore = useSystemStore()

      const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/OMS-getStudentCouponCode?studentId=${this.studentId}`;

      try{

        if(this.couponCodeObject.isEncrypted){
          return
        }

        const response = await axios.get(APIURL);

        if(response.data.message != 'success'){
          throw new Error(response.data.message)
        }

        let temp = []



        systemStore.systemLog({
          store: this.$id,
          api: "OMS-getStudentCouponCode",
          status: "Success Get Student Coupon Code",
          get:{
            studentId: this.studentId
          },
          response: response.data,

        })

      }catch(e){
        systemStore.systemLog({
          store: this.$id,
          api: "OMS-getStudentCouponCode",
          status: "Error Get Student Coupon Code",
          get:{
            studentId: this.studentId
          },
          description: e,
          isError:true
        })
      }
    },
    // #endregion

    // #region Update Total Exp
    updateTotalExp(exp) {

      if(exp == 0){
        return
      }

      let pendingEXP = this.student.data.pendingEXP || 0

      pendingEXP += exp

      this.$patch({
        student: {
          data: {
            pendingEXP: pendingEXP
          }
        }
      })

    },
    // #endregion

    // #region Update Total Exl for First time
    // updateTotalExpFirstTime(exp) {
    //   this.$patch({
    //     student: {
    //       data: {
    //         tempFirstTimeExp: exp
    //       }
    //     }
    //   })
    // },
    // #endregion

    // #region Set Claim Level Reward
    async setClaimLevelReward(){

      const systemStore = useSystemStore()

      let tempEncrypt = null
      let tempDecrypt = null
      let findReward = []
      let premiumKey = 0
      let coin = 0

      if(this.levelRewardObject.isEncrypted) {

        tempDecrypt = systemStore.decryptJSON(this.levelRewardObject.data)

        findReward = tempDecrypt.filter((x) => this.studentData.level >= x.level && x.isClaimed == false)

        premiumKey = findReward.map(x => x.items).flat().filter(x => x.type == 'key')

        if(premiumKey.length){
          premiumKey = premiumKey.reduce((acc, val) => {
            return acc + val.amount
          },0)
        }

        if(premiumKey == 0){
          premiumKey = 0
        }

        coin = findReward.map(x => x.items).flat().filter(x => x.type == 'coin')

        if(coin.length){
          coin = coin.reduce((acc, val) => {
            return acc + val.amount
          },0)
        }


        if(coin == 0){
          coin = 0
        }

        findReward = findReward.map(x => x.level.toString())

      }


      const POSTDATA = {
        studentId: this.studentId,
        rewardLevelList:findReward
      }

      try{

        const response = await axios.post(`https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/firstTimeReward-claimReward`,POSTDATA)

        if(response.data.message != 'success'){
          throw new Error(response.data.message)
        }

        if(this.levelRewardObject.isEncrypted) {

          tempDecrypt.forEach((res) => {
            if(this.studentData.level >= res.level){
              res.isClaimed = true
            }
          });

        }

        if(premiumKey){
          this.setPremiumKey(premiumKey)
        }

        if(coin){
          this.setIncreaseCoin(coin)
        }

        tempEncrypt = systemStore.encryptJSON(tempDecrypt)

        this.$patch({
          levelRewardObject:{
            data:tempEncrypt,
          }
        })

        systemStore.systemLog({
          store: this.$id,
          api: "Claim Level Reward",
          status: "Success Claim Level Reward",
          post: POSTDATA,
          response: null,
        })

      }catch(e){

        systemStore.systemLog({
          store: this.$id,
          api: "Claim Level Reward",
          status: "Error Claim Level Reward",
          post: POSTDATA,
          description: e,
          isError: true,
        })
      }

    },
    // #endregion

    // #region Add Coupon code
    addCouponCode(coupon){

      const systemStore = useSystemStore()

      let temp = []

      if(this.couponCodeObject.isEncrypted){
        temp = systemStore.decryptJSON(this.couponCodeObject.data)
      }

      let newData = {
        id:coupon.id,
        code:coupon.code,
        dueDate:coupon.dueDate,
        minPrice:coupon.minPrice || 0,
        discount:coupon.discount || 0,
        maxPrice:coupon.maxPrice || 0,
        startDate:coupon.startDate,
        endDate:coupon.endDate,
        endTime:coupon.endTime,
        type:coupon.type,
        isUseCode:false,
        useDate:"",
        useTime:"",
      }

      temp.push(newData)

      let encrypt = systemStore.encryptJSON(temp)

      this.$patch({
        couponCodeObject:{
          data:encrypt,
          isEncrypted:true,
        }
      })

    },
    // #endregion

    // #region Delete Coupon Code
    removeCouponCode(coupons){
      const systemStore = useSystemStore()

      let temp = []

      if(this.couponCodeObject.isEncrypted){
        temp = systemStore.decryptJSON(this.couponCodeObject.data)
      }

      for (let i = 0; i < temp.length; i++) {
        const coupon = temp[i];

        let findCoupon = coupons.find(res => res.id == coupon.id)

        if(findCoupon){
          temp[i].isUseCode = true
        }

      }

      let encrypt = systemStore.encryptJSON(temp)

      this.$patch({
        couponCodeObject:{
          data:encrypt,
          isEncrypted:true,
        }
      })
    },
    // #endregion

    // #region Error Student Is Undefind
    errorStudentIsUndefind() {

      const systemStore = useSystemStore()

      try {
        if (this.studentId == '') throw ''
        systemStore.systemLog('Has Student is not Undefind', this.$id)
      } catch (e) {
        systemStore.systemLog('Error Student is Undefind', this.$id, e)
        window.location.href = '/'
      }
    },
    // #endregion
  }
  // #endregion
})
