import { route } from 'quasar/wrappers'
import axios from 'axios'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import routes from './routes'
import practiceHooks from '../hooks/practiceHooks'
import store from 'src/stores'
import { usePracticeStore } from 'src/stores/practice'
import { useStudentStore } from 'src/stores/student'
import { useBuddyStore } from 'src/stores/buddy'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import 'firebase/compat/analytics'
import 'firebase/compat/messaging'
import 'firebase/compat/performance'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

var firebaseConfig = {
  apiKey: 'AIzaSyAYLNGOWZtYLE0zS4nqVTVkvfilQ0QAraM',
  authDomain: 'winnerenglish2-e0f1b.firebaseapp.com',
  databaseURL: 'https://winnerenglish2-e0f1b.firebaseio.com',
  projectId: 'winnerenglish2-e0f1b',
  storageBucket: 'winnerenglish2-e0f1b.appspot.com',
  messagingSenderId: '771031700651',
  appId: '1:771031700651:web:a7f06b7595c5539a7b13ee',
  measurementId: 'G-HW612TDMZF'
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const perf = firebase.performance();

let getCookie = null
// let analytics = null
let analyticsLogEvent = null
export const checkCookies = () => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; Allowed_Cookies=`)
  getCookie = parts
    .pop()
    .split(';')
    .shift()

  if (getCookie == 'no') {
    for (var i = 0; i < getCookie.length; i++) {
      var cookie = getCookie[i]
      var eqPos = cookie.indexOf('=')
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }

    return 'hasCookies'
  } else if (getCookie == 'yes') {

    // analytics = firebase.analytics()
    // // [START analytics_log_event]
    // analytics.setCurrentScreen('Login')

    // analytics.logEvent('screen_view', 'Login')
    // // [END analytics_log_event]

    return 'hasCookies'
  } else {
    return 'noCookies'
  }
}

export { analyticsLogEvent }

export const auth = firebase.auth()
export const db = firebase.firestore()
export const ts = firebase.firestore.FieldValue.serverTimestamp()
export const st = firebase.storage().ref()
export const analytics = firebase.analytics()

let messaging = null
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging()
}

export { messaging }

export const apiURL =
  'https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions'

let tempBackgroundAudio = null

let effectAudioList = [
  { sound: new Audio('/sound/effects/correct.mp3') },
  { sound: new Audio('/sound/effects/incorrect.mp3') },
  { sound: new Audio('/sound/effects/pass.mp3') },
  { sound: new Audio('/sound/effects/fail.mp3') }
]

let backgroundAudioList = [
  new Audio('/sound/background/Vocabulary.mp3'),
  new Audio('/sound/background/Grammar.mp3'),
  new Audio('/sound/background/Reading.mp3'),
  new Audio('/sound/background/Writing.mp3'),
  new Audio('/sound/background/Phonics.mp3'),
  new Audio('/sound/background/Listening.mp3')
]
let backgroundValentine2022 = new Audio('/sound/background/valentine2022.mp3')

let setSound = 0.0

export const playSoundEffect = (type, isPlay) => {
  console.log('isPlay: ', isPlay);
  let audioPath

  if (audioPath) {
    audioPath.puase()
  }

  if (type == 'correct') {
    audioPath = effectAudioList[0].sound
  } else if (type == 'incorrect') {
    audioPath = effectAudioList[1].sound
  } else if (type == 'pass') {
    audioPath = effectAudioList[2].sound
  } else if (type == 'fail') {
    audioPath = effectAudioList[3].sound
  }

  let audio = audioPath
  audio.volume = 0.6

  if (isPlay) {
    if (tempBackgroundAudio) {
      tempBackgroundAudio.volume = 0.01
    }

    if (type == 'pass') {
      audio.volume = 0.2
    } else if (type == 'fail') {
      audio.volume = 0.2
    }
    audioPath.currentTime = 0

    audio.play()

    setTimeout(() => {
      tempBackgroundAudio.volume = setSound
    }, 1000)
  }
}

export const playSoundBackground = (routeName, isPlay) => {
  if (tempBackgroundAudio) {
    tempBackgroundAudio.pause()
  }

  if (routeName == 'odyssey-login') {
    tempBackgroundAudio = backgroundValentine2022

    tempBackgroundAudio.volume = 0.2
    setSound = 0.2
  } else if (
    routeName == 'character' ||
    routeName == 'shop' ||
    routeName == 'equipment'
  ) {
    tempBackgroundAudio = backgroundValentine2022

    tempBackgroundAudio.volume = 0.2
    setSound = 0.2
  } else if (routeName == 'lobby' || routeName == 'practicemain') {
    tempBackgroundAudio = backgroundValentine2022

    tempBackgroundAudio.volume = 0.2
    setSound = 0.2
  } else if (
    routeName == 'flashcard' ||
    routeName == 'spellingbee' ||
    routeName == 'matching' ||
    routeName == 'multiplevocab'
  ) {
    tempBackgroundAudio = backgroundAudioList[0]

    tempBackgroundAudio.volume = 0.05
    setSound = 0.05
  } else if (routeName == 'grammarmultiple' || routeName == 'grammaraction') {
    tempBackgroundAudio = backgroundAudioList[1]

    tempBackgroundAudio.volume = 0.05
    setSound = 0.05
  } else if (routeName == 'readingmultiple') {
    tempBackgroundAudio = backgroundAudioList[2]

    tempBackgroundAudio.volume = 0.05
    setSound = 0.05
  } else if (routeName == 'translation') {
    tempBackgroundAudio = backgroundAudioList[3]

    tempBackgroundAudio.volume = 0.05
    setSound = 0.05
  } else if (routeName == 'phonicsmultiple') {
    tempBackgroundAudio = backgroundAudioList[4]

    tempBackgroundAudio.volume = 0.05
    setSound = 0.05
  } else if (
    routeName == 'languagetipmultiple' ||
    routeName == 'conversationmultiple'
  ) {
    tempBackgroundAudio = backgroundAudioList[5]

    tempBackgroundAudio.volume = 0.05
    setSound = 0.05
  } else {
    if (tempBackgroundAudio) {
      tempBackgroundAudio.pause()
    }
    return
  }

  tempBackgroundAudio.onended = () => {
    if (isPlay) {
      tempBackgroundAudio.play()
    } else {
      tempBackgroundAudio.pause()
    }
  }

  // console.log(isPlay);

  if (isPlay) {
    tempBackgroundAudio.play()
  } else {
    tempBackgroundAudio.pause()
  }
}

export const funcFinishPractice = async (val, key, platform) => {
  const practiceStore = usePracticeStore()

  // const practiceLogData = {
  //   practiceListId: key,
  //   score: val.score,
  //   star: val.star,
  //   coin: val.correct,
  //   totalCorrectQuestion: val.totalCorrectQuestion,
  // }

  let response = await practiceStore.savePracticeLog(val, platform)

  if (response) return response.counter
  else return 0
}

export const funcPracticePermissionLog = async key => {
  try {
    let uid = await auth.currentUser.uid
    let courseId = await practiceHooks.getCourseId(uid)
    let permission = await practiceHooks.checkPracticePermission(courseId, key)
    return permission
  } catch (error) {
    console.error(error)
  }
}

export const saveCourseSyncData = async (
  currentQuestion,
  currentPracticeListId,
  answer,
  currentScore
) => {
  const uid = await auth.currentUser.uid
  const courseId = await practiceHooks.getCourseId(uid)
  const buddyStore = useBuddyStore()

  const url = `${process.env.API}/updateCourseSync`

  const postData = {
    courseId: courseId,
    currentQuestion: currentQuestion,
    currentPracticeListId: currentPracticeListId,
    answer: answer,
    currentScore: currentScore
  }
  // console.log(postData);
  axios.post(url, postData)

  if (buddyStore.isBuddy) {
    const postData2 = {
      courseId: buddyStore.courseId,
      currentQuestion: currentQuestion,
      currentPracticeListId: currentPracticeListId,
      answer: answer,
      currentScore: currentScore
    }
    // console.log(postData);
    axios.post(url, postData2)
  }

}
export default route(function (/* { store, ssrContext } */) {
  const createHistory =
    process.env.MODE === 'ssr'
      ? createMemoryHistory
      : process.env.VUE_ROUTER_MODE === 'history'
        ? createWebHistory
        : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    )
  })

  Router.afterEach((to, from) => {

    if (process.env.IS_PRODUCTION) {
      analytics.logEvent('page_view', {
        page_title: to.name,
      });
    }

  })

  return Router
})

export const genCodeClearCatch = Math.random()
  .toString(36)
  .substr(3)

export const funcCheckStore = () => {
  const $store = store()

  if ($store.state.initialData) {
  } else {
    sessionStorage.clear()
    return
  }
}

export const funcChangeNameSkill = type => {
  let name = ''
  if (type == 'flashcard') {
    name = 'Flashcard'
  } else if(type == 'multiplevocab'){
    name = 'Multiple Vocab'
  } else if (type == 'matching') {
    name = 'Matching'
  } else if (type == 'spellingbee') {
    name = 'Spelling Bee'
  } else if (
    type == 'multiplechoices' ||
    type == 'readingmultiplechoices' ||
    type == 'multiplechoices(questionsound)' ||
    type == 'multiplechoices(answersound)'
  ) {
    name = 'Multiple Choices'
  } else if (type == 'grammarlesson') {
    name = 'Grammar Lesson'
  } else if (type == 'grammaraction') {
    name = 'Grammar Action'
  } else if (type == 'translation') {
    name = 'Translation'
  } else if (type == 'phonicslesson') {
    name = 'Phonics Lesson'
  } else if (type == 'languagetips') {
    name = 'Language tips'
  } else if (type == 'conversationlesson') {
    name = 'Conversation'
  } else if (type == 'roleplay') {
    name = 'Role play'
  } else if(type == 'readinglesson'){
    name = 'Reading Lesson'
  }

  return name
}

export const setWidthImage = (size) => {

  let width = (size / 1600) * 100

  return width

}

// #region set current token
export const setAmount = (val) => {
  let total = val;

  // total = total > 100000 ? 99999 : total;

  return `${Number(total).toLocaleString()}`;
};
// #endregion

// funcCheckStatusOnline
//   const $store = store()

//   window.addEventListener('load', () => {
//     let vuexIsHas = window.sessionStorage.getItem('vuex')

//     if (vuexIsHas == null) {
//       window.sessionStorage.clear()
//       window.location.href = '/'
//     }
//   })

//   window.addEventListener('offline', event => {
//     // console.log('Offline');
//     $store.commit('systemStore/setOnlineStatus', false)
//   })

//   window.addEventListener('online', event => {
//     // console.log('Online');
//     $store.commit('systemStore/setOnlineStatus', true)
//   })
// }

// export const funcLoadPracticeData = async () => {
//   const $store = store()
//   const $q = useQuasar()

//   $q.loading.show()

//   let response = await getHooks.ngetpracticedatabypracticeid(
//     $store.state.practiceStore.currentPracticeId,
//     $store.state.practiceStore.currentPracticeType
//   )

//   $q.loading.hide()

//   return response
// }


export const logout = async () => {
  const studentStore = useStudentStore()
  const buddyStore = useBuddyStore()

  if (buddyStore.isBuddy) {
    buddyStore.logout();

  }
  studentStore.logout()

  auth.signOut()
}
