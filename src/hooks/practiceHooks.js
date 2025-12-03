import axios from 'axios'
import { db, auth } from 'src/router'
import { usePracticeStore } from 'src/stores/practice'
import { useStudentStore } from 'src/stores/student'

const practice = level => {
  // GET PRACTICE LIST FROM LEVEL
  const practiceList = async () => {
    try {
      let getPractice = await db
        .collection('practiceList')
        .where('level', '==', level)
        .where('status', '==', true)
        .get()

      let temp = []

      const convertPracticeTypeToThai = type => {
        let result
        if (type == 'flashcard') {
          result = 'การ์ดคำศัพท์'
        } else if (type == 'grammaraction') {
          result = 'ถามตอบ'
        } else if (type == 'grammarlesson') {
          result = 'ไวยากรณ์'
        } else if (type.includes('multiple')) {
          result = 'เลือกคำตอบ'
        } else if (type == 'phonicslesson') {
          result = 'การออกเสียง'
        } else if (type == 'translation') {
          result = 'แต่งประโยค'
        } else if (type == 'languagetips') {
          result = 'เคล็ดลับภาษา'
        } else if (type == 'matching') {
          result = 'จับคู่'
        } else if (type == 'clozetest') {
          result = 'เนื้องเรื่องเติมคำ'
        } else if (type == 'conversationlesson') {
          result = 'บทสนทนา'
        } else if (type == 'spellingbee') {
          result = 'สะกดคำ'
        } else {
          result = type
        }
        return result
      }

      getPractice.forEach(res => {
        temp.push({
          practiceListId: res.id,
          ...res.data(),
          practiceTypeThai: convertPracticeTypeToThai(res.data().practiceType)
        })
      })
      return temp
    } catch (error) {
      return error
    }
  }

  // GET PRACTICE NAME
  const practiceName = async () => {
    try {
      let getPractice = await db
        .collection('practiceListName')
        .where('level', '==', level)
        .get()

      let temp = []

      getPractice.forEach(res => {
        temp.push(res.data())
      })

      return temp
    } catch (error) {
      // console.log(error)
      return error
    }
  }

  // Get Practice Log
  const log = async () => {
    const getPracticeList = await practiceList()

    const uid = firebase.auth().currentUser.uid
    const getCourseId = await db
      .collection('student')
      .doc(uid)
      .get()

    const courseId = getCourseId.data().currentCourseId
    let practiceLog = await db
      .collection('practiceLog')
      .where('courseId', '==', courseId)
      .get()

    let getPracticeData = practiceListId => {
      let result = getPracticeList.filter(
        x => x.practiceListId == practiceListId
      )
      return result.length ? result[0] : {}
    }

    let temp = []
    practiceLog.forEach(element => {
      temp.push({
        ...element.data(),
        level: getPracticeData(element.data().practiceListId).level,
        unit: getPracticeData(element.data().practiceListId).unit,
        skill: getPracticeData(element.data().practiceListId).skill,
        practiceType: getPracticeData(element.data().practiceListId)
          .practiceType
      })
    })

    temp.sort(
      (a, b) =>
        Number(a.level) - Number(b.level) || Number(a.unit) - Number(b.unit)
    )

    return temp
  }

  // prepost practice
  const prepost = async type => {
    let apiUrl = `${process.env.API}/getPrePostTestPractice/`

    let postData = {
      level: level,
      testType: type
    }

    let response = await axios.post(apiUrl, postData)

    if (response.data) {
      return response.data
    } else {
      // console.log('error')
    }
  }

  const checkprepostlog = async courseId => {
    let apiUrl = `${process.env.API}/checkPrePostLog/?courseId=`

    let response = await axios.get(apiUrl + courseId)

    if (response.data) {
      return response.data
    } else {
      // console.log('error')
    }
  }

  const checkquestionnaire = async (questionnairId, studentId) => {
    let apiUrl = `${process.env.API}/checkQuestionnaire/`

    let postData = {
      studentId: questionnairId,
      questionnaireId: studentId
    }

    let response = await axios.post(apiUrl, postData)

    if (response.data) {
      return response.data
    } else {
      // console.log('error')
    }
  }

  return {
    practiceList,
    practiceName,
    log,
    prepost,
    saveprepostlog,
    checkprepostlog,
    checkquestionnaire
  }
}

// Get All Level
const level = async () => {
  try {
    let getLevel = await db.collection('level').get()
    let temp = []
    getLevel.forEach(element => {
      temp.push({
        id: element.id,
        ...element.data()
      })
    })
    return temp
  } catch (error) {
    // console.log(error)
    return
  }
}

// GET PRACTICE INFOMATION
const practiceListInfo = async practiceListId => {
  let apiUrl = `${process.env.API}/getPracticeListDataByPracticeListId/?practiceListId=`

  let response = await axios.get(apiUrl + practiceListId)

  if (response.data) {
    return response.data
  } else {
    return false
  }
}

const getCourseId = async uid => {
  const getCourseId = await db
    .collection('student')
    .doc(uid)
    .get()
  const courseId = getCourseId.data().currentCourseId
  return courseId
}

const checkPracticePermission = async (courseId, practiceListId) => {

  const practiceStore = usePracticeStore()

  if(practiceStore.skill == 'Reading') {

    const response = await db
    .collection('practiceLog')
    .where('courseId', '==', courseId)
    .where('practiceListId', '==', practiceListId)
    .where('practiceType', '==', practiceStore.practiceData.type)
    .get()

  if (response.size > 0) {
    if (response.docs[0].data().counter >= 2) {
      return false
    } else {
      return true
    }
  } else {
    return true
  }

  }else{
    const response = await db
    .collection('practiceLog')
    .where('courseId', '==', courseId)
    .where('practiceListId', '==', practiceListId)
    .get()

  if (response.size > 0) {
    if (response.docs[0].data().counter >= 2) {
      return false
    } else {
      return true
    }
  } else {
    return true
  }
  }


}

// prepost log
const saveprepostlog = async data => {
  const studentStore = useStudentStore()

  try {

    let apiUrl = `${process.env.API}/savePrePostLog/`

    let postData = {
      studentId: data.studentId,
      testType: data.testType,
      score: data.score,
      schoolId: data.schoolId,
      courseId: data.courseId,
      currentQuestion: data.currentQuestion
    }

    let response = await axios.post(apiUrl, postData)

    if (response.data != 'error') {
      studentStore.setPrePost(data.testType, true)
      return response.data
    } else {
      throw new Error('error')
    }

  } catch (e) {
    return 'error'
  }


}

export default {
  practice,
  level,
  practiceListInfo,
  saveprepostlog,
  checkPracticePermission,
  getCourseId
}
