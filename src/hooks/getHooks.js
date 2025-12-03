import axios from 'axios'

const getnewsbystudenttype = async studentType => {
  let apiUrl = `${process.env.API}/getNewsByStudentType`

  let postData = {
    studentType: studentType
  }

  let response = await axios.post(apiUrl, postData)

  if (response.data.length) {
    return response.data
  } else {
    return []
  }
}

const getnewslog = async (newsId, uid) => {
  let apiUrl = `${process.env.API}/getNewsLog`

  let postData = {
    newsId: newsId,
    uid: uid
  }

  let response = await axios.post(apiUrl, postData)

  if (response.data.length) {
    return response.data
  } else {
    return []
  }
}

const getinventory = async uid => {
  let apiUrl = `${process.env.API}/getInventoryByStudentId`

  let postData = {
    studentId: uid
  }

  let response = await axios.post(apiUrl, postData)

  if (response.data) {
    return response.data
  } else {
    return false
  }
}

const getitemshop = async () => {
  let apiUrl = `${process.env.API}/getItemShop/`

  let response = await axios.get(apiUrl)

  if (response.data) {
    return response.data
  } else {
    return false
  }
}

const checkexpiredate = async expire => {
  let apiUrl = `${process.env.API}/checkExpireDate/`

  let response = await axios.post(apiUrl, { expireDate: expire })

  return response.data.toString()
}

const checkbuycourse = async uid => {
  let apiUrl = `${process.env.API}/customer/checkCourse/get/?studentId=`

  let response = await axios.get(apiUrl + uid)

  return response.data
}

const getservertime = async () => {
  let apiUrl = `${process.env.API}/getServerTime`

  let response = await axios.get(apiUrl)

  return response.data
}

const getminigamestype = async () => {
  let apiUrl = `${process.env.API}/getMinigamesType`

  let response = await axios.get(apiUrl)

  return response.data
}

const getpracticelistbylevel = async level => {
  let apiUrl = `${process.env.API}/getPracticeListByLevel`

  let postData = {
    level: level
  }

  let response = await axios.post(apiUrl, postData)

  return response.data
}

const getpracticedatabypracticelistid = async practiceListId => {
  let apiUrl = `${process.env.NEWAPI_ASIA}/practice-getPracticeData`

  let postData = {
    practiceListId: practiceListId,
    requestURL: window.location.hash,
  }

  let response = await axios.post(apiUrl, postData)

  return response.data
}

const getpracticeListbyunlocklist = async (courseId, skill, type, level) => {
  let apiUrl = `${process.env.API}/getPracticeListByUnlockList`

  let postData = {
    courseId: courseId,
    skill: skill,
    level: level,
    type: type
  }

  let response = await axios.post(apiUrl, postData)

  return response.data
}

const getpracticelogbycourseid = async courseId => {
  let apiUrl = `${process.env.API}/getPracticeLogByCourseId?courseId=`

  let response = await axios.get(apiUrl + courseId)

  return response.data
}

const getminigameslogbystudentid = async (studentId, type) => {
  let apiUrl = `${process.env.API}/getMinigamesLogByStudentId`

  let postData = {
    studentId: studentId,
    type: type
  }

  let response = await axios.post(apiUrl, postData)

  if (response.data == '') {
    return 0
  } else {
    return response.data.score
  }
}

//
const getminigamesunlockbypracticedata = async (studentId, courseId, level) => {
  let apiUrl = `${process.env.API}/getMinigamesUnlockByPracticeData`

  let postData = {
    studentId: studentId,
    courseId: courseId,
    level: level
  }

  let response = await axios.post(apiUrl, postData)

  return response.data || {}
}

//
const getminigamesunlock = async studentId => {
  let apiUrl = `${process.env.API}/getMinigamesUnlock`

  let postData = {
    studentId: studentId
  }

  let response = await axios.post(apiUrl, postData)

  return response.data
}

//
const getminigameslog = async (studentId, type) => {
  let apiUrl = `${process.env.API}/getMinigamesLog`

  let postData = {
    studentId: studentId,
    type: type
  }

  let response = await axios.post(apiUrl, postData)

  return response.data
}

const getminigamesranking = async (studentId, schoolId, type) => {
  let apiUrl = `${process.env.API}/getMinigamesRanking`

  let postData = {
    studentId: studentId,
    schoolId: schoolId,
    type: type
  }

  let response = await axios.post(apiUrl, postData)

  return response.data
}

const getminigamesrankingnumberallcountrybystudentid = async (studentId, type) => {
  let apiUrl = `${process.env.API}/getMinigamesRankingNumberAllCountryByStudentId`

  let postData = {
    studentId: studentId,
    type: type
  }

  let response = await axios.post(apiUrl, postData)

  return response.data
}

// ---------------- New Odyssey API ----------------

const ngetstudentdatabystudentid = async studentId => {
  const APIURL = `${process.env.API}/nGetStudentDataByStudentId?studentId=`

  const response = await axios.get(APIURL + studentId)

  return response.data
}

const ngetcoursedatabycourseid = async courseId => {
  const APIURL = `${process.env.API}/nGetCourseDataByCourseId?courseId=`

  const response = await axios.get(APIURL + courseId)

  return response.data
}

const ngetschooldatabyschoolid = async schoolId => {
  const APIURL = `${process.env.API}/nGetSChoolDataBySchoolId?schoolId=`

  const response = await axios.get(APIURL + schoolId)

  return response.data
}

const ngetpracticelistnamebylevel = async level => {
  const APIURL = `${process.env.API}/nGetPracticeListName?level=`

  const response = await axios.get(APIURL + level)

  return response.data
}

const ngetpracticelistbylevel = async level => {
  const APIURL = `${process.env.API}/nGetPracticeList?level=`

  const response = await axios.get(APIURL + level)

  return response.data
}

const ngetpracticelogbystudentidandcourseid = async (studentId, courseId) => {
  const APIURL = `${process.env.API}/nGetPracticeLog`

  const postData = {
    studentId: studentId,
    courseId: courseId
  }

  const response = await axios.post(APIURL, postData)

  return response.data
}

const ngetprepostlogbystudentidandcourseid = async (studentId, courseId) => {
  const APIURL = `${process.env.API}/nGetPrePostLog`

  const postData = {
    studentId: studentId,
    courseId: courseId
  }

  const response = await axios.post(APIURL, postData)

  return response.data
}

const ngetnews = async () => {
  const APIURL = `${process.env.API}/nGetNews`

  const response = await axios.get(APIURL)

  return response.data
}

const ngetnewslog = async studentId => {
  const APIURL = `${process.env.API}/nGetNewsLog?studentId=`

  const response = await axios.get(APIURL + studentId)

  return response.data
}

const ngetpracticedatabypracticeid = async (practiceId, practiceType) => {
  const APIURL = `${process.env.API}/nGetPracticeDataByPracticeId?practiceId=`

  let postData = {
    practiceId: practiceId,
    practiceType: practiceType
  }

  const response = await axios.post(APIURL, postData)

  return response.data
}

export default {
  getnewsbystudenttype,
  getnewslog,
  getitemshop,
  getinventory,
  checkexpiredate,
  checkbuycourse,
  getservertime,
  getpracticelistbylevel,
  getpracticedatabypracticelistid,
  getpracticelogbycourseid,

  // Practice
  getpracticeListbyunlocklist,

  // minigames
  getminigamestype,
  getminigameslog,
  getminigamesunlock,
  getminigamesunlockbypracticedata,
  getminigameslogbystudentid,
  getminigamesranking,
  getminigamesrankingnumberallcountrybystudentid,

  // new odyssey api
  ngetstudentdatabystudentid,
  ngetcoursedatabycourseid,
  ngetschooldatabyschoolid,
  ngetpracticelistnamebylevel,
  ngetpracticelistbylevel,
  ngetpracticelogbystudentidandcourseid,
  ngetprepostlogbystudentidandcourseid,
  ngetnews,
  ngetnewslog,
  ngetpracticedatabypracticeid
}
