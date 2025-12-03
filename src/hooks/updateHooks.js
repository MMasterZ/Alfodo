import axios from "axios";


// Update Current Practice List Id By Course Id
const updatecurrentpracticelistidbycourseid = async (courseId, practiceListId) => {
  let apiUrl = `${process.env.API}/updateCurrentPracticeListIdByCourseId`;

  let postData = {
    courseId: courseId,
    practiceListId: practiceListId,
  };

  let response = await axios.post(apiUrl, postData);

  if (response.data == 'success') {
    return response.data;
  } else {
    return false;
  }
};


// Update Character
const updatecharacter = async (studentId, data) => {
  let apiUrl = `${process.env.API}/updateCharacter`;

  let postData = {
    studentId: studentId,
    characterInfo: data,
  };

  let response = await axios.post(apiUrl, postData);

  if (response.data == "success") {
    return response.data;
  } else {
    return false;
  }
};


// Update Active Course
const updateactivecourse = async (studentId, courseId) => {

  let apiUrl = `${process.env.API}/updateActiveCourse`;

  let postData = {
    studentId: studentId,
    courseId: courseId
  }

  let response = await axios.post(apiUrl, postData)

  if (response.data == 'success') {
    return response.data;
  } else {
    return false
  }

}

//  Add New Log
const addnewlog = async (uid, newsId) => {

  let apiUrl = `${process.env.API}/addNewsLog`

  let postData = {
    uid: uid,
    newsId: newsId
  }


  let response = await axios.post(apiUrl, postData)

  if (response.data == 'success') {
    return response.data
  } else {
    return false
  }

}

// Update Coin by Student
const updatecoin = async (uid, coin) => {

  let apiUrl = `${process.env.API}/updateCoin`

  let postData = {
    studentId: uid,
    coin: coin
  }

  let response = await axios.post(apiUrl, postData)

  if (response.data) {
    return response.data
  } else {
    return false
  }
}

const addinventory = async (uid, items) => {

  let apiUrl = `${process.env.API}/addInventory`;

  let postData = {
    studentId: uid,
    items: items,
  }


  let response = await axios.post(apiUrl, postData)


  if (response.data == 'success') {
    return response.data
  } else {
    return false
  }

}


const updatecharacterskincolorcolor = async (uid, skinColor) => {

  let apiUrl = `${process.env.API}/updateCharacterSkinColor`;

  let postData = {
    studentId: uid,
    skinColor: skinColor,
  }

  let response = await axios.post(apiUrl, postData)


  if (response.data == 'success') {
    return response.data
  } else {
    return false
  }
}

const saveminigameslog = async (uid, studentData, score, type) => {

  try {
    let apiURL = `${process.env.API}/saveMinigamesLog`;

    let postData = {
      type: type,
      studentId: uid,
      schoolId: studentData.schoolId,
      score: score,
      class: studentData.class,
      room: studentData.room

    };

    await axios.post(apiURL, postData);

  } catch (error) {
    // console.log(`${error} : API -> saveminigameslog`);
  }
}

const updateminigamesunlock = async (studentId, items) => {
  try {


    let apiUrl = `${process.env.API}/updateMinigamesUnlockByStudentId`;

    let postData = {
      studentId: studentId,
      items: items,
    }

    let response = await axios.post(apiUrl, postData)


    return response.data;

  } catch (e) {
    // console.log(`${error} by API -> updateMinigamesUnlockByStudentId`);
  }
}

const updateminigamesdailycoin = async (uid, coin, type) => {

  try {

    let apiUrl = `${process.env.API}/updateMinigamesDailyCoin`

    let postData = {
      studentId: uid,
      coin: coin,
      type: type,
    }

    let response = await axios.post(apiUrl, postData)

    return response.data

  } catch (error) {
    // console.log(`${error} : API -> updateminigamesdailycoinbystudentid`);
  }

}

export default {
  // Update Data
  updatecurrentpracticelistidbycourseid,
  updatecharacter,
  updateactivecourse,
  updatecoin,
  updatecharacterskincolorcolor,


  // Add Data
  addnewlog,
  addinventory,


  // Minigame
  saveminigameslog,
  updateminigamesdailycoin,
  updateminigamesunlock,
};
