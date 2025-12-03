import axios from "axios";
import { defineStore } from "pinia";
import { useSystemStore } from "src/stores/system";
import { useStudentStore } from "./student";
import { useCourseStore } from "./course";
import { usePracticeStore } from "./practice";

let tempMiniGameList = [
  {
    id: 1,
    name: "piggycoin",
    type: "piggy-coin",
    lockMessage: {},
    isComingSoon: false,
    isUnlock: false,
  },
  {
    id: 2,
    name: "comingsoon",
    type: "coming-soon",
    lockMessage: {},
    isComingSoon: true,
    isUnlock: false,
  },
];

export const useMiniGameStore = defineStore("miniGameStore", {
  state: () => ({
    miniGames: {
      data: {},
      miniGameKey: "",
      isLoaded: false,
    },
  }),
  getters: {
    get: (state) => {
      // Mini game list
      let miniGameList = [];
      if (state.miniGames.isLoaded) {
        let temp = state.stores.system.decryptJSON(state.miniGames.data.list);

        temp.forEach((res, index) => {
          if (!res.isUnlock) {
            if (res.name == "piggycoin") {
              res.details = `ปลดล็อคเมื่อทำ<br>บทเรียน Flashcard <br> ${
                res.lockMessage.flashcardCount || 0
              }/${res.lockMessage.flashcardCriteria} บทเรียน`;
            }
          }
          miniGameList.push(res);
        });
      }

      // Selected Mini Game
      let miniGameDetail = {};
      if (state.miniGames.isLoaded) {
        if (state.miniGames.miniGameKey) {
          let tempKey = state.stores.system.decryptString(
            state.miniGames.miniGameKey
          );
          miniGameDetail = miniGameList.find((item) => item.name == tempKey);
        }
      }

      // Return
      return {
        miniGameList,
        miniGameDetail,
      };
    },
    stores: (state) => {
      const system = useSystemStore();
      const student = useStudentStore();
      const course = useCourseStore();

      return {
        system,
        student,
        course,
      };
    },
  },
  actions: {
    // #region Mini Game Function
    async checkMiniGameUnlock() {
      try {
        let findMiniGame = tempMiniGameList.find(
          (item) => item.name == "piggycoin"
        );

        const APIURL = `${process.env.NEWAPI_ASIA}/miniGame-checkPiggyCoinUnlock?studentId=${this.stores.student.studentId}&courseId=${this.stores.student.courseId}&studentType=${this.stores.student.studentType}`;

        const response = await axios.get(APIURL);

        if (response.data.message == "Success") {
          if (findMiniGame) {
            findMiniGame.isUnlock = response.data.isUnlock;
            findMiniGame.lockMessage = response.data.lockMessage || {};
          }

          this.$patch((state) => {
            state.miniGames.data = {
              list: this.stores.system.encryptJSON(tempMiniGameList),
            };
            state.miniGames.isLoaded = true;
          });

          this.stores.system.systemLog({
            store: this.$id,
            api: "miniGame-checkPiggyCoinUnlock",
            get: {
              studentId: this.stores.student.studentId,
              courseId: this.stores.student.courseId,
              studentType: this.stores.student.studentType,
            },
            status: response.data.message,
            response: response.data,
          });
        } else {
          throw new Error(`Error : ${response.data.message}`);
        }
      } catch (e) {
        this.stores.system.systemLog({
          store: this.$id,
          api: "miniGame-checkPiggyCoinUnlock",
          get: {
            studentId: this.stores.student.studentId,
            courseId: this.stores.student.courseId,
            studentType: this.stores.student.studentType,
          },
          status: "error",
          description: e,
          isError: true,
        });
      }
    },
    async useTicketMiniGame() {
      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/student-useTicket`;

        const POSTDATA = {
          studentId: this.stores.student.studentId,
        };

        let response = await axios.post(APIURL, POSTDATA);

        if (response.data.message == "Success") {
          this.stores.system.systemLog({
            store: this.$id,
            api: "student-useTicket",
            post: POSTDATA,
            status: response.data.message,
            response: response.data,
          });

          return response.data;
        } else {
          throw new Error(`Error : ${response.data.message}`);
        }
      } catch (e) {
        this.stores.system.systemLog({
          store: this.$id,
          api: "student-useTicket",
          post: {
            studentId: this.stores.student.studentId,
          },
          status: "error",
          description: e,
          isError: true,
        });

        return {
          message: "Error",
          description: e,
        };
      }
    },

    // #region Piggy Coin
    async getPiggyCoinRanking() {
      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/miniGame-getPiggyCoinRanking?season=season-2&studentId=${this.stores.student.studentId}&schoolId=${this.stores.student.schoolId}`;

        const response = await axios.get(APIURL);

        if (response.data.message != "Success") {
          throw new Error(`error`);
        }

        this.stores.system.systemLog({
          store: this.$id,
          api: "miniGame-getPiggyCoinRanking",
          get: {
            season: "season-2",
            studentId: this.stores.student.studentId,
            schoolId: this.stores.student.schoolId,
          },
          status: response.data.message,
          response: response.data,
        });

        return {
          message: "success",
          data: response.data,
        };
      } catch (e) {
        this.stores.system.systemLog({
          store: this.$id,
          api: "miniGame-getPiggyCoinRanking",
          get: {
            season: "season-2",
            studentId: this.stores.student.studentId,
            schoolId: this.stores.student.schoolId,
          },
          status: "error",
          description: e,
          isError: true,
        });

        return {
          message: "error",
          data: [],
        };
      }
    },
    async getPiggyCoinQuestion() {
      const practiceStore = usePracticeStore();
      const studentStore = useStudentStore();
      const courseStore = useCourseStore();

      const APIURL = `${process.env.NEWAPI_ASIA}/miniGame-getPiggyCoinQuestionV2?courseId=${this.stores.student.courseId}&studentId=${studentStore.studentId}&studentType=${studentStore.studentType}`;



      try {
        // let studentType = studentStore.studentType
        // let levelByStudent = courseStore.courseList.data
        // let findFlashcard = practiceStore.log.filter((item) => item.practiceType == "flashcard");

        // if (studentType == 'school') {
        //   levelByStudent = levelByStudent.filter(item => item.level == courseStore.courseLevel)

        //   findFlashcard = findFlashcard.filter((item) => {
        //     return practiceStore.list.find(x => x.id == item.practiceListId) ? item : null
        //   })
        // }

        // levelByStudent = levelByStudent.map(x => x.level)
        // levelByStudent = JSON.stringify(levelByStudent)

        // findFlashcard = findFlashcard.map(x => x.practiceListId)
        // findFlashcard = JSON.stringify(findFlashcard);

        const response = await axios.get(APIURL);

        if (response.data.message == "Success") {
          this.stores.system.systemLog({
            store: this.$id,
            api: "miniGame-getPiggyCoinQuestionV2",
            get: {
              courseId: this.stores.student.courseId,
            },
            status: response.data.message,
            response: response.data,
          });

          return response.data;
        } else {
          throw new Error(`Error : ${response.data.message}`);
        }
      } catch (e) {
        this.stores.system.systemLog({
          store: this.$id,
          api: "miniGame-getPiggyCoinQuestionV2",
          get: {
            courseId: this.stores.student.courseId,
          },
          status: "error",
          description: `${APIURL} , ${e}`,
          isError: true,
        });

        return {
          message: "Error",
          description: e,
        };
      }
    },
    async savePiggyCoinScore(practice) {
      try {
        let APIURL = `${process.env.NEWAPI_ASIA}/miniGame-savePiggyCoinScore`;


        let POSTDATA = {
          studentId: this.stores.student.studentId,
          season: "season-2",
          score: practice.score,
          schoolId: this.stores.student.schoolId,
          classroom: this.stores.course.class,
          room: this.stores.course.room,
          coin: practice.totalCoin,
        };

        let response = await axios.post(APIURL, POSTDATA);

        if (response.data.message == "Success") {
          this.stores.system.systemLog({
            store: this.$id,
            api: "miniGame-savePiggyCoinScore",
            post: {
              studentId: this.stores.student.studentId,
              season: "season-2",
              score: practice.score,
              schoolId: this.stores.student.schoolId,
              classroom: this.stores.course.class,
              room: this.stores.course.room,
              coin: practice.totalCoin,
            },
            status: response.data.message,
            response: response.data,
          });

          return response.data;
        } else {
          throw new Error(`Error : ${response.data.message}`);
        }
      } catch (e) {
        this.stores.system.systemLog({
          store: this.$id,
          api: "miniGame-savePiggyCoinScore",
          post: {
            studentId: this.stores.student.studentId,
            season: "season-2",
            score: practice.score,
            schoolId: this.stores.student.schoolId,
            classroom: this.stores.course.class,
            room: this.stores.course.room,
            coin: practice.totalCoin,
          },
          status: "error",
          description: e,
          isError: true,
        });

        return {
          message: "Error",
          description: e,
        };
      }
    },
    async getRankingInSummaryPage() {
      try {
        const APIURL = ` ${process.env.NEWAPI_ASIA}/miniGame-getRankingInSummaryPage?season=season-2&studentId=${this.stores.student.studentId}`;

        const response = await axios.get(APIURL);

        if (response.data.message == "Success") {
          this.stores.system.systemLog({
            store: this.$id,
            api: "miniGame-getRankingInSummaryPage",
            get: {
              season: "season-2",
              studentId: this.stores.student.studentId,
            },
            status: response.data.message,
            response: response.data,
          });

          return response.data;
        } else {
          throw new Error(`Error : ${response.data.message}`);
        }
      } catch (e) {
        this.stores.system.systemLog({
          store: this.$id,
          api: "miniGame-getRankingInSummaryPage",
          get: {
            season: "season-2",
            studentId: this.stores.student.studentId,
          },
          status: "error",
          description: e,
          isError: true,
        });

        return {
          message: "Error",
          description: e,
        };
      }
    },
    // #endregion

    // #endregion

    // #region Mini Game Setter
    setMiniGameSelected(name) {
      let findMiniGame = this.get.miniGameList.find(
        (item) => item.name == name
      );
      if (findMiniGame) {
        this.$patch((state) => {
          state.miniGames.miniGameKey = this.stores.system.encryptString(name);
        });
      }
    },
    // #endregion
  },
});
