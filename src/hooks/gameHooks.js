import axios from "axios";

// ข้อมูลตัวละครทั่วไป
// {"hat":2,"bottom":2,"color":6,"star":0,"top":2,"name":"lnwza5678"}
const studentInfomation = async(userId) => {

    let apiUrl =
        `${process.env.API}/getStudentInfo/?studentId=`

    let response = await axios.get(apiUrl + userId);


    if (response.data.isCreateCharacter) {
        return response.data;
    } else {
        return false;
    }
};

const schoolInfomation = async(schoolId) => {

    let apiUrl =
        `${process.env.API}/getSchoolInfo/?schoolId=`

    let response = await axios.get(apiUrl + schoolId);

    if (response.data) {
        return response.data;
    } else {
        return false;
    }
};

const courseInfomation = async(courseId) => {
    let apiUrl =
        `${process.env.API}/getCourseInfo/?courseId=`

    let response = await axios.get(apiUrl + courseId);

    if (response.data) {
        return response.data;
    } else {
        return false;
    }
};

const getallcourse = async(studentId) => {
    let apiUrl =
        `${process.env.API}/getAllCourse/?studentId=`

    let response = await axios.get(apiUrl + studentId);

    if (response.data) {
        return response.data;
    } else {
        return false;
    }

};

const ranking = async(studentId, schoolId) => {

    let apiUrl =
        `${process.env.API}/getRankingBySchoolId`

    let postData = {
        studentId: studentId,
        schoolId: schoolId,
    };

    let response = await axios.post(apiUrl, postData);



    if (response.data) {
        return response.data;
    } else {
        return false;
    }

}

export default {
    studentInfomation,
    schoolInfomation,
    courseInfomation,
    getallcourse,
    ranking,
};