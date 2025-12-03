import axios from "axios";
import { defineStore } from "pinia";
import { useBuddyStore } from "./buddy";
import { useStudentStore } from "./student";
import { useSystemStore } from "./system";
import { usePracticeStore } from "./practice";

const months_th = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

const months_mini_th = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

function calculateRemainingDays(expireDate) {
  const systemStore = useSystemStore();

  // สร้างอ็อบเจ็กต์ Date สำหรับวันที่สิ้นสุด
  const endDate = new Date(expireDate._seconds * 1000);

  // สร้างอ็อบเจ็กต์ Date สำหรับวันที่ปัจจุบัน
  const currentDate = new Date(systemStore.datetime.timestamp);

  // คำนวณความแตกต่างระหว่างวันที่สิ้นสุดและวันที่ปัจจุบัน (ในหน่วยมิลลิวินาที)
  const timeDifference = endDate.getTime() - currentDate.getTime();

  // แปลงความแตกต่างจากมิลลิวินาทีเป็นวัน
  const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

  // คืนค่าจำนวนวันที่เหลือ
  return remainingDays;
}

const calculateTotalAVGScore = () => {

  const practiceStore = usePracticeStore()

  let avg_score_per_skill = {
    vocabulary:0,
    grammar:0,
    reading:0,
    writing:0,
    phonics:0,
    listening:0,
  }
  
  let result_practice_log = practiceStore.log.filter(x => {
    return x.practiceType != "flashcard" &&
    x.practiceType != "conversationlesson" &&
    x.practiceType != "grammarlesson" &&
    x.practiceType != "languagetips" &&
    x.practiceType != "phonicslesson"
  })

  let vocabulary_log = result_practice_log.filter(x => x.skill == "Vocabulary" && x.practiceType == "multiplechoices");
  let vocabulary_avg_score = 0;
  if(vocabulary_log.length){
    vocabulary_avg_score = vocabulary_log.map((x) => x.score).reduce((a, b) => a + b, 0) /
    vocabulary_log.length;

    avg_score_per_skill.vocabulary = Math.round(vocabulary_avg_score)
  }

  // Grammar Score AVG
  let grammar_log = result_practice_log.filter((x) => x.skill == "Grammar");
  let grammar_avg_score = 0
  if(grammar_log.length){
    grammar_avg_score = grammar_log.map((x) => x.score).reduce((a, b) => a + b, 0) /
    grammar_log.length;

    avg_score_per_skill.grammar = Math.round(grammar_avg_score)
  }

  // Reading Score AVG
  let reading_log = result_practice_log.filter((x) => x.skill == "Reading");
  let reading_avg_score = 0
  if(reading_log.length){
    reading_avg_score =
    reading_log.map((x) => x.score).reduce((a, b) => a + b, 0) /
    reading_log.length;

    avg_score_per_skill.reading = Math.round(reading_avg_score)
  }

  // Writing Score AVG
  let writing_log = result_practice_log.filter((x) => x.skill == "Writing");
  let writing_avg_score = 0;

  if(writing_log.length){
    writing_avg_score =
    writing_log.map((x) => x.score).reduce((a, b) => a + b, 0) /
    writing_log.length;

    avg_score_per_skill.writing = Math.round(writing_avg_score)
  }

  // Phonics Score AVG
  let phonics_log = result_practice_log.filter((x) => x.skill == "Phonics");
  let phonics_avg_score = 0
  if(phonics_log.length){
    phonics_avg_score =
    phonics_log.map((x) => x.score).reduce((a, b) => a + b, 0) /
    phonics_log.length;

    avg_score_per_skill.phonics = Math.round(phonics_avg_score)
  }

  // Listening & Speaking Score AVG
  let listening_log = result_practice_log.filter(
    (x) => x.skill == "Listening & Speaking"
  );
  let listening_avg_score =0 
  if(listening_log.length){
    listening_avg_score = listening_log.map((x) => x.score).reduce((a, b) => a + b, 0) /
    listening_log.length;

    avg_score_per_skill.listening = Math.round(listening_avg_score)
  }

  // avg_score_per_skill object key
  let avg_score_over_all = 0
  let avg_score_over_all_length = 0
  Object.keys(avg_score_per_skill).forEach(x => {
    if(avg_score_per_skill[x] == 0){
      delete avg_score_per_skill[x]
    }else avg_score_over_all_length += 1
    console.log("***",avg_score_per_skill[x]);
    avg_score_over_all += avg_score_per_skill[x] || 0
  })

  avg_score_over_all = Math.round(avg_score_over_all / avg_score_over_all_length)

  return {
    totalAVGScore: avg_score_over_all,
    scoreAVG: avg_score_per_skill,
  }

}

export const useCourseStore = defineStore("courseStore", {
  state: () => {
    return {
      course: {
        data: {},
        selectedCourseLevel: "",
        isLoaded: false,
        isUpdate: false,
        profileNotiStatus: false,
        isShowDialogLevelExpired: false,
      },
      courseList: {
        data: [],
        isLoaded: false,
        isUpdate: false,
      },
    };
  },

  getters: {
    // #region Course Level
    courseLevel: (state) => {
      const studentStore = useStudentStore();

      let findCourse = state.courseList.data.find(
        (x) => x.courseId == studentStore.courseId
      );

      if (findCourse) {
        return findCourse.level;
      }

      return "";
    },
    // #endregion

    // #region List
    list: (state) => {
      let temp = [];

      if (state.courseList.data.length) {
        state.courseList.data
          .filter((x) => x.level != 0)
          .map((res) => {
            let newData = {
              ...res,
            };

            let expireDate = res.expireDate;

            if (!expireDate) {
              expireDate = null;
            }

            let remainingTime = calculateRemainingDays(expireDate);

            if (remainingTime <= 0 || !remainingTime) {
              newData.isExpired = true;

              newData.expireDateFull = "หมดอายุแล้ว";
              newData.remainingTime = 0;
            } else {
              newData.isExpired = false;

              let e_date = new Date(res.expireDate._seconds * 1000);

              if (e_date) {
                let e_day = e_date.getDate();
                e_day = e_day < 10 ? `0${e_day}` : e_day;
                let e_month = e_date.getMonth();
                let e_year = e_date.getFullYear();
                let e_hours = e_date.getHours();
                e_hours = e_hours < 10 ? `0${e_hours}` : e_hours;
                let e_minutes = e_date.getMinutes();
                e_minutes = e_minutes < 10 ? `0${e_minutes}` : e_minutes;

                newData.expireDateFull = `${e_day} ${months_th[e_month]} ${e_year} | ${e_hours}:${e_minutes}`;
              }

              newData.remainingTime = remainingTime;
            }

            temp.push(newData);
          });
      }

      temp.sort((a, b) => Number(a.level) - Number(b.level));

      return temp;
    },
    // #endregion

    // #region Course Level Options
    courseLevelOptions: (state) => {
      let temp = [];

      if (state.courseList.data.length) {
        state.courseList.data
          .filter((x) => x.level != "0")
          .map((x) => {
            let newData = {
              label: x.level,
              value: x.level,
              id: x.courseId,
            };
            temp.push(newData);
          });
      }
      return temp;
    },
    // #endregion

    // #region Course Data
    courseData: (state) => {
      const studentStore = useStudentStore();

      let data = null;

      let findCourseData = state.courseList.data.find(
        (x) => x.courseId == studentStore.courseId
      );

      function daysAndHoursRemainingToDate(data) {
        const systemStore = useSystemStore();

        const now = new Date(systemStore.datetime.timestamp);

        const targetDate = new Date(
          `${data.startDate.year}/${data.startDate.month}/${data.startDate.day} ${data.startDate.hours}:${data.startDate.minutes}`
        );
        targetDate.setDate(targetDate.getDate() + 15);

        if (targetDate <= now) {
          return {
            days: 0,
            hours: 0,
            remainingTime: 0,
          };
        }

        const diffMs = targetDate - now;

        const timeDifference = targetDate.getTime() - now.getTime();
        const totalHours = timeDifference / (1000 * 60 * 60);

        const remainingDays = Math.floor(totalHours / 24);
        const remainingHours = Math.floor(totalHours % 24);

        const remainingTime = Math.ceil(timeDifference / (1000 * 3600 * 24));

        return {
          days: remainingDays,
          hours: remainingHours,
          remainingTime: remainingTime,
        };
      }

      if (findCourseData) {
        data = {
          isLockChangeLevel: false,
          isExpired: false,
          ...findCourseData,
          textChangeLevel: "",
        };

        let remainingTime = {
          days: 0,
          hours: 0,
          remainingTime: 0,
        };

        if (data.expireDate) {
          remainingTime = daysAndHoursRemainingToDate(data);

          if (
            remainingTime.remainingTime <= 0 ||
            !remainingTime.remainingTime
          ) {
            data.textChangeLevel = `หมดอายุแล้ว`;
            data.isExpired = true;
            data.remainingTime = 0;
            data.isLockChangeLevel = true;
          } else {
            data.textChangeLevel = `เวลาเหลือ : `;

            let days = remainingTime.days;
            let hours = remainingTime.hours;

            if (days > 0) {
              data.textChangeLevel += `${remainingTime.days} วัน`;
            }

            if (hours > 0) {
              data.textChangeLevel += ` ${remainingTime.hours} ชั่วโมง`;
            }
          }
        } else {
          data.textChangeLevel = `หมดอายุแล้ว`;
          data.isExpired = true;
          data.remainingTime = 0;
          data.isLockChangeLevel = true;
        }
      }

      return data;
    },
    // #endregion

    // #region Level Options
    levelOptions: (state) => {
      const practiceStore = usePracticeStore();

      let temp = [];

      for (let i = 1; i <= 12; i++) {
        let level = i.toString();

        let newData = {
          label: `Level ${level}`,
          value: level,
          id: "",
          isLock: true,
          isSuccess: false,
        };

        let findCourse = state.courseList.data.find((x) => x.level == level);

        if (findCourse) {
          newData.id = findCourse.courseId;

          let remainingTime = calculateRemainingDays(findCourse.expireDate);

          if (remainingTime <= 0 || !remainingTime) {
            newData.isLock = true;
          } else {
            newData.isLock = false;
          }

          if (practiceStore.practiceProgressObject.isEncrypted) {
            let findPracticeProgress = practiceStore.practiceProgressData.find(
              (x) => x.level == level
            );
            if (findPracticeProgress) {
              if (findPracticeProgress.unitProgress.length >= 16) {
                newData.isSuccess = findPracticeProgress.unitProgress.every(
                  (x) => x.progress >= 100
                );
              }
            }
          }
        }

        temp.push(newData);
      }

      return temp;
    },
    // #endregion

    // #region Class
    class: (state) => state.course.data.class || "",
    // #endregion

    // #region Room
    room: (state) => state.course.data.room || "",
    // #endregion

    // #region Term
    term: (state) => state.course.data.term || "",
    // #endregion

    // #region Year
    year: (state) => state.course.data.year || "",
    // #endregion

    // #region Star
    star: (state) =>
      state.courseList.data.map((x) => x.star).reduce((a, b) => a + b, 0) || 0,
    // #endregion

    // #region High Progress List
    highProgressList: (state) => {
      let temp = null;

      if (state.courseList.data.length) {
        temp = state.courseList.data.filter((x) => x.progressAVG >= 10);
      }

      return temp || null;
    },
    // #endregion

    // #region Is All Course Expired
    isAllCourseExpired: (state) => {
      let isCheck = false;
      const studentStore = useStudentStore();
      if (
        studentStore.studentType == "school" ||
        studentStore.username.startsWith("nitademo")
      )
        return false;

      let tempCourse = state.courseList.data.filter((x) => x.level != "0");

      if (tempCourse.length) {
        let temp = tempCourse.filter((course) => {
          let isExpired = false;

          if (course.expireDate) {
            let remainingTime = calculateRemainingDays(course.expireDate);
            if (remainingTime <= 0 || !remainingTime) {
              isExpired = true;
            }
          } else {
            isExpired = true;
          }

          return !isExpired;
        });

        if (temp.length == 0) {
          isCheck = true;
        }
      }

      return isCheck;
    },
    // #endregion

    // #region Is Current Course Expired
    isCurrentCourseExpired: (state) => {
      const studentStore = useStudentStore();

      if (
        studentStore.studentType == "school" ||
        studentStore.username.startsWith("nitademo")
      )
        return false;

      let isCheck = false;

      let tempCourse = state.courseList.data.filter((x) => x.level != "0");

      if (tempCourse.length) {
        let findCourse = tempCourse.find(
          (x) => x.courseId == studentStore.courseId
        );

        if (findCourse) {
          let remainingTime = calculateRemainingDays(findCourse.expireDate);

          if (remainingTime <= 0 || !remainingTime) {
            isCheck = true;
          }
        }
      }

      return isCheck;
    },
    // #endregion

    // #region Is Trial
    isTrial: (state) => {

      let isTrial = false;

      if(state.course.data?.level != '0'){
        if(state.course.data?.isTrial){
          isTrial = true
        }
      }

      return isTrial;
    },
    // #endregion

    // #region Trial Expired
    trialExpireData: (state) => {

      let expire_date = {
        isExpired:false,
        remainingTime:0,
      }

      if(state.course.data?.isTrial){

        let current_course = state.courseList.data.find((x) => x.level == state.course.data.level);

        if(current_course?.expireDate){
          const remainingTime =  calculateRemainingDays(current_course?.expireDate);

          expire_date.remainingTime = remainingTime;

          if(remainingTime <= 0 || !remainingTime){
            expire_date.isExpired = true;
          }

          return expire_date;
        }

      }

      return expire_date;

    },
    // #endregion

    // #region Course Data Progress
    currentCourseDataProgress: (state) => {
      console.clear();

      let init_data = {
        vocabulary:0,
        grammar:0,
        writing:0,
        reading:0,
        phonics:0,
        listening:0,
      }

      let temp_data = {
        scoreAVG:init_data,
        skillProgress:init_data,
        skillScore:init_data,
        progressAVG:0,
        totalAVGScore:0,
        totalProgress:0,
      }

      let current_course = state.courseList.data.find((x) => x.level == state.course.data.level);

      if(current_course){
        temp_data = {
          ...temp_data,
          ...calculateTotalAVGScore()
        }
      }

      return temp_data
    },
    // #endregion

    // #region Is Loading
    isLoading: (state) => {
      if (state.course.isUpdate || state.courseList.isUpdate) return true;
      else return false;
    },
    // #endregion
  },
  actions: {
    // #region Get Course
    async getCourse() {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/course-getCourseByCourseId?courseId=${studentStore.courseId}`;

        const response = await axios.get(APIURL);

        if (response.status != 200) {
          throw new Error("Error Get Course");
        }

        this.$patch({
          course: {
            data: response.data,
            isLoaded: true,
            isUpdate: false,
          },
        });

        systemStore.systemLog({
          store: this.$id,
          api: "course-getCourseByCourseId",
          status: "Success Get Course",
          get: {
            courseId: studentStore.courseId,
          },
          response: response.data,
        });
      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "course-getCourseByCourseId",
          status: "Error Get Course",
          description: e,
          isError: true,
        });
        return "error";
      }
    },
    // #endregion

    // #region Get All Course
    async getAllCourse() {

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()
      const buddyStore = useBuddyStore()

      try {

        if (buddyStore.isBuddy) {

          const APIURL2 = `${process.env.NEWAPI_ASIA}/course-getAllCourseByStudentId?studentId=${buddyStore.studentId}`

          await axios.get(APIURL2)

          systemStore.systemLog({
            store: this.$id,
            api: "course-getAllCourseByStudentId",
            status: "Success Get All Course Buddy",
            get: {
              studentId: buddyStore.studentId
            },
            response: response.data,
          })
        }

        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/course-getAllCourseByStudentId?studentId=${studentStore.studentId}`

        const response = await axios.get(APIURL)

        if(response.status != 200) {
          throw new Error("Error Get All Course")
        }

        this.$patch({
          courseList: {
            data: response.data,
            isLoaded: true,
            isUpdate: false,
          }
        })

        systemStore.systemLog({
          store: this.$id,
          api: "course-getAllCourseByStudentId",
          status: "Success Get All Course",
          get: {
            studentId: studentStore.studentId
          },
          response: response.data,
        })

        return 'success'
      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "course-getAllCourseByStudentId",
          status: "Error Get All Course",
          description: e,
          isError: true,
        })

        return 'error'
      }
    },
    // #endregion

    // #region Update Profile Noti Status
    async updateProfileNotiStatus(status) {
      const systemStore = useSystemStore();

      try {
        const POSTDATA = {
          courseId: this.courseData.courseId,
          status: status,
        };

        const APIURL = `${process.env.NEWAPI_ASIA}/course-updateProfileNoti`;

        const response = await axios.post(APIURL, POSTDATA);

        this.$patch({
          course: {
            profileNotiStatus: status,
          },
        });

        systemStore.systemLog({
          store: this.$id,
          api: "course-updateProfileNoti",
          status: "Success Update Profile Noti Status",
          post: POSTDATA,
          response: response.data,
        });
      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "course-updateProfileNoti",
          status: "Error Update Profile Noti Status",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Reset Course For Demo
    async resetCourseForDemo() {
      const systemStore = useSystemStore();

      try {
        const studentStore = useStudentStore();

        let APIURL = `${process.env.NEWAPI}/odysseyRegister-resetCourseForDemo?studentId=${studentStore.studentId}`;

        let response = await axios.get(APIURL);

        if (response.data.message != "success") {
          throw new Error("Error Reset Course");
        }

        systemStore.systemLog({
          store: this.$id,
          api: "odysseyRegister-resetCourseForDemo",
          status: "Success Reset Course",
          get: {
            studentId: studentStore.studentId,
          },
          response: response.data,
        });
      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "odysseyRegister-resetCourseForDemo",
          status: "Error Reset Course",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Add Course
    async addCourse(level) {
      const studentStore = useStudentStore();
      const systemStore = useSystemStore();

      try {
        if (!studentStore.studentData.isSelectedLevel) {
          await this.resetCourseForDemo();
        }

        let APIURL = `${process.env.NEWAPI}/odysseyRegister-addCourse`;

        let POSTDATA = {
          studentId: studentStore.studentId,
          level: level.toString(),
        };

        let response = await axios.post(APIURL, POSTDATA);

        if (response.data != "success") {
          throw new Error("Error");
        }

        this.courseList.isUpdate = true;
        this.course.isUpdate = true;

        await studentStore.getStudentData();
        await this.getCourse();
        await this.getAllCourse();

        systemStore.systemLog({
          store: this.$id,
          api: "odysseyRegister-addCourse",
          status: "Success Add Course",
          post: POSTDATA,
          response: response.data,
        });

        return response.data;
      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "odysseyRegister-addCourse",
          status: "Error Add Course",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Add Trial Course
    async addTrialLearning(level){

      const systemStore = useSystemStore();
      const studentStore = useStudentStore();

      try{

        const API_URL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/tiral-trialLearning`;

        // const API_URL = `http://192.168.1.38:5001/winnerenglish2-e0f1b/asia-southeast1/tiral-trialLearning`;

        const POST_DATA = {
          studentId:studentStore.studentId,
          level:level,
        }

        const RESPONSE = await axios.post(API_URL,POST_DATA);

        if(RESPONSE.data.message != 'success') throw new Error(RESPONSE.data.message);

        systemStore.systemLog({
          store: this.$id,
          api: "tiral-trialLearning",
          status: "Success Add Trial Learning",
          post: POST_DATA,
          response: RESPONSE.data,
        });

        return RESPONSE.data.message;

      }catch(e){
        systemStore.systemLog({
          store: this.$id,
          api: "tiral-trialLearning",
          status: "Error Add Trial Learning",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Change Course Level
    async changeLevel(level) {
      const studentStore = useStudentStore();
      const systemStore = useSystemStore();

      const POSTDATA = {
        studentId: studentStore.studentId,
        courseId: this.courseData.courseId,
        newLevel: level,
      };

      const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/OMS-changeLevel`;

      try {
        const response = await axios.post(APIURL, POSTDATA);

        if (response.data.message !== "success") {
          throw new Error("Error Change Course Level");
        }

        systemStore.systemLog({
          api: "OMS-changeLevel",
          store: this.$id,
          status: "Change Course Level",
          post: POSTDATA,
          description: `Selected Level : ${level}`,
          response: response.data,
        });
      } catch (e) {
        systemStore.systemLog({
          store: this.$id,
          api: "OMS-changeLevel",
          post: POSTDATA,
          status: "Error Change Course Level",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Update Focus Status
    async updateFocusStatus(status) {
      const systemStore = useSystemStore();

      try {
        let APIURL = `${process.env.NEWAPI_ASIA}/course-updateFocusStatus`;

        let POSTDATA = {
          courseId: this.courseData.courseId,
          status: status,
        };

        let response = await axios.post(APIURL, POSTDATA);

        systemStore.systemLog({
          api: "course-updateFocusStatus",
          status: "Success Update Focus Status",
          post: POSTDATA,
          response: response.data,
        });
      } catch (e) {
        systemStore.systemLog({
          api: "course-updateFocusStatus",
          status: "Error Update Focus Status",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Course Update
    courseUpdate() {
      const systemStore = useSystemStore();

      this.$patch({
        course: {
          isUpdate: true,
        },
      });

      systemStore.systemLog({
        store: this.$id,
        status: "Course Update",
      });
    },
    // #endregion

    // #region Set Course Level
    async setCourseLevel() {

      let course = this.list[0];

      if(course){
        const studentStore = useStudentStore();
        const systemStore = useSystemStore();
        const practiceStore = usePracticeStore();

        systemStore.setParameter({
          level: course.level,
        });

        // practiceStore.setLockPracticeData(item);
        practiceStore.setPracticeUnit("1");
        practiceStore.setPracticelevel(course.level);
        await studentStore.updateCurrentCourseId(course.courseId);
        practiceStore.practiceUpdateByLevel();
        await practiceStore.getPracticeLog();
        // practiceStore.clearPracticeComplete();
      }

    },
    // #endregion

  },
});
