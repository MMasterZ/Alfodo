import axios from "axios";
import { defineStore } from "pinia";
import { useBuddyStore } from "./buddy";
import { useCourseStore } from "./course";
import { useInventoryStore } from "./inventory";
import { useItemShopStore } from "./item-shop";
import { useNewsStore } from "./news";
import { usePracticeStore } from "./practice";
import { useSchoolStore } from "./school";
import { useStudentStore } from "./student";
import { useSynchronizeStore } from "./synchronize";
import { useEventStore } from "./event";
import { auth, st } from "src/router";
import { useMiniGameStore } from "./minigame";
import { useMysteryBoxStore } from "./mystery-box";

const month_th_mini = [
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

let backgroundAudioList = [
  new Audio("/sound/background/Vocabulary.mp3"),
  new Audio("/sound/background/Grammar.mp3"),
  new Audio("/sound/background/Reading.mp3"),
  new Audio("/sound/background/Writing.mp3"),
  new Audio("/sound/background/Phonics.mp3"),
  new Audio("/sound/background/Listening.mp3"),
];

// Background Music
let backgroundLogin = new Audio("/sound/background/login.mp3");
let backgroundLobby = new Audio("/sound/background/lobby.mp3");
let backgroundVocabulary = new Audio("/sound/background/Vocabulary.mp3");
let backgroundGrammar = new Audio("/sound/background/Grammar.mp3");
let backgroundReading = new Audio("/sound/background/Reading.mp3");
let backgroundWriting = new Audio("/sound/background/Writing.mp3");
let backgroundPhonics = new Audio("/sound/background/Phonics.mp3");
let backgroundListening = new Audio("/sound/background/Listening.mp3");
let backgroundPiggyCoin = new Audio("/sound/background/piggy-coin.mp3");

// Sound Other
const soundCorrect = new Audio("/sound/effects/correct.mp3");
const soundInCorrect = new Audio(`/sound/effects/incorrect.mp3`);
const soundPass = new Audio("/sound/effects/pass.mp3");
const soundFail = new Audio("/sound/effects/fail.mp3");
const soundPig = new Audio("/sound/effects/pig.mp3");

let tempBackground;
let tempEffect;
let tempAudio;

let setVolumeSoundBackground = 0.2;

let pathBackground =
  "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/sound/background";

let pathEffect =
  "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/sound/effect";

export const useSystemStore = defineStore("systemStore", {
  state: () => ({
    systemData: {
      isEnableSoundEffect: false,
      isEnableSoundBackground: false,
      isPlayVideo: false,
      isLearningSwipe: false,
      isChangeAIModel: false,
      routerName: "",
      platform: {
        desktop: false,
        mobile: false,
      },
      tutorial: {
        list: [],
        isLoaded: false,
      },
      tutorialPath:
        "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/",
      status: "online",
      activeState: {
        isShowDialogUnlockLevel: false,
        isShowDialogPackageMenu: false,
        isShowDialogLoading: false,
        isShowDialogLockLevel: false,
        isShowDialogYourLevel: false,
      },
      activeStatus: {
        isHasSelectLevel: false,
        isHasUnlockLevel: false,
        isAutoShowDialogNews: true,
        isShowButtonClose: true,
        isShowDialogEventReward: false,
      },
      parameter: {
        selectedLevel: "",
      },
      processSteps: {
        stage: "",
        route: "",
        isProcess: false,
      },
      registerData: {
        data: "",
        isEncrypted: false,
      },
      datetime: {
        data: null,
        isEncrypted: false,
        isLoaded: false,
      },
    },
    isShowLoading:false,
    isShowLog: true,
    isLogin: false,
    isOnlineLogin: false,
  }),
  getters: {
    isEnableSoundEffect: (state) => {
      if (state.systemData.isPlayVideo) return false;

      return state.systemData.isEnableSoundEffect;
    },
    isEnableSoundBackground: (state) => {
      if (state.systemData.isPlayVideo) return false;

      return state.systemData.isEnableSoundBackground;
    },
    registerStage: (state) => {
      if (!state.systemData.registerData.isEncrypted) return null;

      let decryptedData = state.decryptJSON(state.systemData.registerData.data);

      return decryptedData.stage;
    },
    registerData: (state) => {
      if (!state.systemData.registerData.isEncrypted) return null;

      let decryptedData = state.decryptJSON(state.systemData.registerData.data);

      return decryptedData;
    },
    activeState: (state) => state.systemData.activeState,
    activeStatus: (state) => state.systemData.activeStatus,
    parameter: (state) => state.systemData.parameter,
    routerName: (state) => state.systemData.routerName,
    platform: (state) => state.systemData.platform,
    status: (state) => state.systemData.status,

    datetime: (state) => {
      let temp = null;

      if (state.systemData.datetime.isEncrypted) {
        let decrypt = state.decryptJSON(state.systemData.datetime.data);

        let date = `${decrypt.year}/${decrypt.month}/${decrypt.day}`;

        decrypt.date = date;

        temp = decrypt;

        return temp;
      }

      return temp;
    },
  },

  actions: {
    // Login
    async login(username, password) {
      const studentStore = useStudentStore();

      try {
        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/auth-checkLoginV2`;

        const POSTDATA = {
          username: username,
          password: password,
        };

        const response = await axios.post(APIURL, POSTDATA);

        if (
          response.data.message == "User not found" ||
          response.data.message == "No course found" ||
          response.data.message == "School is not active"
        ) {
          return response.data.message;
        } else {
          window.sessionStorage.setItem(
            "loginKey",
            response.data.loginKey
          );

          studentStore.$patch({
            student: {
              data: response.data,
              uid: response.data.uid || response.data.studentId,
              isLoaded: true,
            },
          });
        }

        this.systemLog({
          api: "auth-checkLogin",
          post: POSTDATA,
          status: "Success Login",
          response: response.data,
          store: this.$id,
        });

        return "success";
      } catch (e) {
        this.systemLog({
          api: "auth-checkLogin",
          status: "Error Login",
          store: this.$id,
          description: e,
          isError: true,
        });
        return "error";
      }
    },

    async loginAuth() {
      const studentStore = useStudentStore();

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/auth-createCustomToken?uid=`;

        // const APIURL = "http://192.168.1.184:5001/winnerenglish2-e0f1b/asia-southeast1/auth-createCustomTokenV2?uid="

        const response = await axios.get(APIURL + studentStore.student.uid);

        if (studentStore.studentData.isCreateCharacter) {
          await studentStore.getCharacterInfo();
        } else {
          studentStore.$patch({
            student: {
              data: {
                character: {
                  head: {
                    itemName: "",

                    isFront: false,
                    isBack: false,
                  },
                  body: {
                    itemName: "",
                    isFront: false,
                    isBack: false,
                  },
                  footer: {
                    itemName: "",
                    isFront: false,
                    isBack: false,
                  },
                  pet: {
                    itemName: "",
                    isFront: false,
                    isBack: false,
                  },
                  ohter: {
                    itemName: "",
                    isFront: false,
                    isBack: false,
                  },
                },
              },
            },
          });
        }

        this.systemLog({
          api: "auth-createCustomToken",
          get: studentStore.student.uid,
          status: "Success Login Auth",
          store: this.$id,
        });

        return response.data;
      } catch (e) {
        this.systemLog({
          api: "auth-createCustomToken",
          status: "Error Login Auth",
          store: this.$id,
          description: e,
          isError: true,
        });

        return e;
      }
    },

    async saveLoginLog(studentId) {
      const studentStore = useStudentStore();

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/auth-saveLoginLog`;

        const POSTDATA = {
          studentId: studentId,
        };

        let response = await axios.post(APIURL, POSTDATA);
        this.systemLog({
          api: "auth-saveLoginLog",
          post: POSTDATA,
          response: response.data,
          status: "Success Save Login Log",
          store: this.$id,
        });
      } catch (e) {
        this.systemLog({
          api: "auth-saveLoginLog",
          status: "Error Save Login Log",
          store: this.$id,
          description: e,
          isError: true,
        });
      }
    },

    async getTutorial() {
      try {
        let mode = "desktop";
        if (this.platform.desktop) mode = "desktop";
        else mode = "mobile";

        console.log('*** mode: ', mode);

        let tempTutorial = [];

        let type = this.setTypeTutorial();

        if (type) {
          let response = await st.child(`/tutorial/${type}/${mode}`).listAll();

          if (response.items.length) {
            let tempName = response.items.map((res) => {
              let nameImage = res.name.split(".")[0];

              let runNumber = nameImage.split("-tutorial-");
              runNumber = runNumber[runNumber.length - 1];

              let newData = {
                imagePath: `${this.systemData.tutorialPath}${res.fullPath}`,
                index: Number(runNumber),
              };

              return newData;
            });

            tempName.sort((a, b) => (a.index > b.index ? 1 : -1));

            tempTutorial = tempName;
          }
        }

        this.systemLog({
          status: "Success Get Tutorial",
          store: this.$id,
        });

        return tempTutorial;
      } catch (e) {
        this.systemLog({
          status: "Error Get Tutorial",
          store: this.$id,
          description: e,
          isError: true,
        });

        return e;
      }
    },

    checkFirstTutorial(page) {
      const studentStore = useStudentStore();

      let findTutorial = studentStore.tutorialData.find((x) => x == page);

      if (findTutorial) {
        return false;
      } else {
        return true;
      }
    },

    // #region Get server time
    async getServerTime() {
      let APIURL = `${process.env.NEWAPI_ASIA}/time-getCurrentTime`;

      try {
        let response = await axios.get(APIURL);

        if (response.status != 200) {
          throw new Error("Error Get Server Time");
        }

        let c_date = new Date(response.data.timestamp)
        c_date.setHours(c_date.getHours() - 7)

        let newDate = {
          date: `${c_date.getFullYear()}/${c_date.getMonth()}/${c_date.getDate()}`,
          day: c_date.getDate(),
          month: c_date.getMonth(),
          year: c_date.getFullYear(),
          hours: c_date.getHours(),
          minutes: c_date.getMinutes(),
          timestamp: c_date.getTime()
        }

        // if(!this.systemData.datetime.isEncrypted){

          let encryptJSON = this.encryptJSON(newDate)

          this.$patch({
            systemData: {
              datetime: {
                data: encryptJSON,
                isEncrypted: true,
                isLoaded: true
              }
            }
          })
        // }

        this.systemLog({
          status: "Success Get Server Time",
          store: this.$id,
          response: response.data,
        });

        return { message: "success", data: response.data };
      } catch (e) {
        this.systemLog({
          status: "Error Get Server Time",
          store: this.$id,
          description: e,
          isError: true,
        });

        return {
          message: "error",
        };
      }
    },
    // #endregion

    // -------------------------------
    async updateTutorial() {
      const practiceStore = usePracticeStore();
      const studentStore = useStudentStore();

      try {
        const APIURL = `${process.env.NEWAPI}/tutorial-finishTutorial`;

        const POSTDATA = {
          practiceType: practiceStore.practiceType,
          routeName: this.routerName,
          studentId: studentStore.studentId,
        };

        studentStore.student.data.tutorial.push(POSTDATA);

        await axios.post(APIURL, POSTDATA);

        this.systemLog({
          api: "tutorial-finishTutorial",
          post: POSTDATA,
          status: "Success Update Tutorial",
          store: this.$id,
        });
      } catch (e) {
        this.systemLog({
          api: "tutorial-finishTutorial",
          status: "Error Update Tutorial",
          store: this.$id,
          description: e,
          isError: true,
        });
        return e;
      }
    },

    async saveTutorial(page) {

      const practiceStore = usePracticeStore();
      const studentStore = useStudentStore();

      try {
        let findTutorial = studentStore.tutorialData.find((x) => x == page);

        if (findTutorial) return;

        studentStore.setTutorialData(page);

        const APIURL = `${process.env.NEWAPI}/tutorial-saveTutorial`;

        const POSTDATA = {
          routeName: page,
          studentId: studentStore.studentId,
          skill: practiceStore.skill,
        };

        let response = await axios.post(APIURL, POSTDATA);

        this.systemLog({
          api: "tutorial-saveTutorial",
          post: POSTDATA,
          status: "Success Save Tutorial",
          response: response,
          store: this.$id,
        });
      } catch (e) {
        this.systemLog({
          api: "tutorial-saveTutorial",
          status: "Error Save Tutorial",
          store: this.$id,
          description: e,
          isError: true,
        });
        return e;
      }
    },

    // -------------------------------------------------------------------
    getSystem(routeName) {
      this.$patch({
        systemData: {
          isEnableSoundEffect: true,
          isEnableSoundBackground: true,
          routerName: routeName,
        },
      });

      this.playSoundBackground();
    },

    funcSetLearningSwipe() {
      if (this.systemData.isLearningSwipe) {
        return;
      }

      this.$patch({
        systemData: {
          isLearningSwipe: true,
        },
      });
    },

    funcEnableSoundEffect(payload) {
      this.$patch({
        systemData: {
          isEnableSoundEffect: payload,
        },
      });
    },

    funcEnableSoundBackground(payload) {
      this.$patch({
        systemData: {
          isEnableSoundBackground: payload,
        },
      });

      this.playSoundBackground();
    },

    playVideo(payload) {
      this.systemData.isPlayVideo = payload;

      this.playSoundBackground();
    },

    playSound(audio) {
      if (tempAudio) {
        tempAudio.pause();
      }

      if (tempBackground) {
        tempBackground.volume = 0;
      }

      tempAudio = audio;

      tempAudio.currentTime = 0;
      tempAudio.volume = 1;

      tempAudio.playbackRate = 1;

      tempAudio.play();

      tempAudio.onended = () => {
        if (tempBackground) {
          tempBackground.volume = setVolumeSoundBackground;
        }
      };
    },

    playSlowSound(audio) {
      if (tempAudio) {
        tempAudio.pause();
      }

      if (tempBackground) {
        tempBackground.volume = 0;
      }

      tempAudio = audio;

      tempAudio.currentTime = 0;
      tempAudio.volume = 1;

      tempAudio.playbackRate = 0.8;

      tempAudio.play();

      tempAudio.onended = () => {
        if (tempBackground) {
          tempBackground.volume = setVolumeSoundBackground;
        }
      };
    },

    // #region Background Music
    playSoundBackground() {
      const practiceStore = usePracticeStore();

      if (tempBackground) {
        tempBackground.pause();
      }

      if (!this.isEnableSoundBackground) return;

      // #region Login & Create Character
      if (this.routerName == "Login" || this.routerName == "create-character") {
        tempBackground = backgroundLogin;

        setVolumeSoundBackground = 0.2;

        tempBackground.volume = setVolumeSoundBackground;
      }
      // #endregion

      // #region Lobby & Practice List
      else if (
        this.routerName == "lobby" ||
        this.routerName == "practice-list"
      ) {
        tempBackground = backgroundLobby;

        setVolumeSoundBackground = 0.5;

        tempBackground.volume = setVolumeSoundBackground;
      }
      // #endregion

      // #region Practice Unit And Skill Vocabulary
      else if (
        (this.routerName == "practice-unit" &&
          practiceStore.skill == "Vocabulary") ||
        this.routerName == "multiplevocab" ||
        this.routerName == "matching" ||
        this.routerName == "spellingbee" ||
        this.routerName == "flashcard"
      ) {
        tempBackground = backgroundVocabulary;
        setVolumeSoundBackground = 0.3;

        tempBackground.volume = setVolumeSoundBackground;
      }
      // #endregion

      // #region Practice Unit And Skill Grammar
      else if (
        (this.routerName == "practice-unit" &&
          practiceStore.skill == "Grammar") ||
        this.routerName == "grammarlesson" ||
        this.routerName == "grammaraction" ||
        this.routerName == "grammarmultiple"
      ) {
        tempBackground = backgroundGrammar;
        setVolumeSoundBackground = 0.3;

        tempBackground.volume = setVolumeSoundBackground;
      }
      // #endregion

      // #region Practice Unit And Skill Writing
      else if (
        (this.routerName == "practice-unit" &&
          practiceStore.skill == "Writing") ||
        this.routerName == "translation"
      ) {
        tempBackground = backgroundWriting;
        setVolumeSoundBackground = 0.3;

        tempBackground.volume = setVolumeSoundBackground;
      }
      // #endregion

      // #region Practice Unit And Skill Reading
      else if (
        (this.routerName == "practice-unit" &&
          practiceStore.skill == "Reading") ||
        this.routerName == "readingmultiple" ||
        this.routerName == "readinglesson"
      ) {
        tempBackground = backgroundReading;
        setVolumeSoundBackground = 0.3;

        tempBackground.volume = setVolumeSoundBackground;
      }
      // #endregion

      // #region Practice Unit And Skill Phonics
      else if (
        (this.routerName == "practice-unit" &&
          practiceStore.skill == "Phonics") ||
        this.routerName == "phonicslesson" ||
        this.routerName == "phonicsmultiple"
      ) {
        tempBackground = backgroundPhonics;
        setVolumeSoundBackground = 0.3;

        tempBackground.volume = setVolumeSoundBackground;
      }
      // #endregion

      // #region Practice Unit And Skill Listening
      else if (
        (this.routerName == "practice-unit" &&
          practiceStore.skill == "Listening") ||
        this.routerName == "languagetips" ||
        this.routerName == "languagetipmultiple" ||
        this.routerName == "conversationlesson" ||
        this.routerName == "conversationmultiple"
      ) {
        tempBackground = backgroundListening;
        setVolumeSoundBackground = 0.3;

        tempBackground.volume = setVolumeSoundBackground;
      }
      // #endregion

      // #region Shop & Equipment
      else if (this.routerName == "Shop" || this.routerName == "Equipment") {
        tempBackground = backgroundLobby;

        setVolumeSoundBackground = 0.5;

        tempBackground.volume = setVolumeSoundBackground;
      }
      // #endregion

      // #region Gachapon
      else if (this.routerName == "gachapon") {
        tempBackground = new Audio(`${pathBackground}/gachapon.mp3`);
        setVolumeSoundBackground = 0.3;
        tempBackground.volume = setVolumeSoundBackground;
      }
      // #endregion
      else {
        tempBackground = backgroundListening;
        setVolumeSoundBackground = 0;
        tempBackground.volume = setVolumeSoundBackground;
      }

      tempBackground.play();

      tempBackground.onended = () => {
        tempBackground.play();
      };
    },
    // #endregion

    playEffectCorrect() {
      if (tempEffect) {
        tempEffect.pause();
      }

      if (!this.isEnableSoundEffect) return;

      if (tempBackground) {
        if (this.isEnableSoundBackground) tempBackground.volume = 0;
      }

      tempEffect = soundCorrect;

      tempEffect.currentTime = 0;
      tempEffect.volume = 0.5;

      tempEffect.play();

      tempEffect.onended = () => {
        if (tempBackground) {
          if (this.isEnableSoundBackground)
            tempBackground.volume = setVolumeSoundBackground;
        }
      };
    },

    playEffectIncorrect() {
      if (tempEffect) {
        tempEffect.pause();
      }

      if (!this.isEnableSoundEffect) return;

      if (tempBackground) {
        if (this.isEnableSoundBackground) tempBackground.volume = 0.01;
      }

      tempEffect = soundInCorrect;

      tempEffect.currentTime = 0;
      tempEffect.volume = 0.5;

      tempEffect.play();

      tempEffect.onended = () => {
        if (tempBackground) {
          if (this.isEnableSoundBackground)
            tempBackground.volume = setVolumeSoundBackground;
        }
      };
    },

    playEffectPass() {
      if (tempEffect) {
        tempEffect.pause();
      }

      if (!this.isEnableSoundEffect) return;

      if (tempBackground) {
        if (this.isEnableSoundBackground) tempBackground.volume = 0;
      }

      tempEffect = soundPass;

      tempEffect.currentTime = 0;
      tempEffect.volume = 0.5;

      tempEffect.play();

      tempEffect.onended = () => {
        if (tempBackground) {
          if (this.isEnableSoundBackground)
            tempBackground.volume = setVolumeSoundBackground;
        }

        tempEffect.pause();
      };
    },

    playEffectFail() {
      if (tempEffect) {
        tempEffect.pause();
      }

      if (!this.isEnableSoundEffect) return;

      if (tempBackground) {
        if (this.isEnableSoundBackground) tempBackground.volume = 0;
      }

      tempEffect = soundFail;

      tempEffect.currentTime = 0;
      tempEffect.volume = 0.5;

      tempEffect.play();

      tempEffect.onended = () => {
        if (tempBackground) {
          if (this.isEnableSoundBackground)
            tempBackground.volume = setVolumeSoundBackground;
        }

        tempEffect.pause();
      };
    },

    playEffectPig() {
      if (tempEffect) {
        tempEffect.pause();
      }

      if (!this.isEnableSoundEffect) return;

      if (tempBackground) {
        if (this.isEnableSoundBackground) tempBackground.volume = 0;
      }

      tempEffect = soundPig;

      tempEffect.currentTime = 0;
      tempEffect.volume = 0.5;

      tempEffect.play();

      tempEffect.onended = () => {
        if (tempBackground) {
          if (this.isEnableSoundBackground)
            tempBackground.volume = setVolumeSoundBackground;
        }

        tempEffect.pause();
      };
    },

    playEffect(name) {
      if (tempEffect) {
        tempEffect.pause();
      }

      if (!this.isEnableSoundEffect) return;

      if (tempBackground) {
        if (this.isEnableSoundBackground) tempBackground.volume = 0;
      }

      tempEffect = new Audio(`${pathEffect}/${name}.mp3`);

      tempEffect.currentTime = 0;
      tempEffect.volume = 0.5;

      tempEffect.play();

      tempEffect.onended = () => {
        if (tempBackground) {
          if (this.isEnableSoundBackground)
            tempBackground.volume = setVolumeSoundBackground;
        }

        tempEffect.pause();
      };
    },

    stopSound() {
      if (tempBackground) {
        tempBackground.pause();
      }

      if (tempEffect) {
        tempEffect.pause();
      }
    },

    // Other
    callbackPathRouterPractice(data) {
      const practiceStore = usePracticeStore();

      let setNewSkill = data.skill;
      let setNewType = data.practiceType || data.page;
      let setPracticeListId = data.id || data.practiceListId;

      let path = "/lobby";
      if (data.skill == "Listening & Speaking") setNewSkill = "Listening";

      if (data.skill == "Vocabulary") {
        if (setNewType == "flashcard") {
          path = "/vocabulary/learning";
        } else if (setNewType == "matching") {
          path = `/matching/${setPracticeListId}`;
        } else if (setNewType == "spellingbee") {
          path = `/spellingbee/${setPracticeListId}`;
        } else {
          path = "/vocabulary/practice";
        }

        return path;
        // }
      } else if (data.skill == "Grammar") {
        if (
          setNewType == "grammarmultiple" ||
          setNewType == "multiplechoices"
        ) {
          path = "/grammarmultiple/";
        } else if (setNewType == "grammaraction") {
          path = "/grammarAction/";
        } else {
          path = "/vdoLesson/";
        }

        path = `${path}${setPracticeListId}`;

        return path;
      }
      // Reading
      else if (data.skill == "Reading") {
        if (
          setNewType == "readingmultiple" ||
          setNewType == "readingmultiplechoices"
        ) {
          path = "/readingmultiple/";
        } else {
          path = "/readinglesson/";
        }
        path = `${path}${setPracticeListId}`;

        return path;
      }
      // Writing
      else if (data.skill == "Writing") {
        if (setNewType == "translation") {
          path = "/translation/";
        }

        path = `${path}${setPracticeListId}`;

        return path;

        // return '/lobby'
      }
      // Phonics
      else if (data.skill == "Phonics") {
        if (setNewType == "vdoLesson" || setNewType == "phonicslesson") {
          path = "/vdoLesson/";
        } else {
          path = "/phonicsMultiple/";
        }

        path = `${path}${setPracticeListId}`;

        return path;

        return "/lobby";
      } // Listening & Speaking
      else if (data.skill == "Listening & Speaking") {
        if (setNewType == "vdoLesson" || setNewType == "languagetips") {
          path = "/vdoLesson/";
        } else if (setNewType == "conversationlesson") {
          path = "/conversationLesson/";
        } else if (setNewType == "roleplay") {
          path = "/roleplay/";
        } else if (
          setNewType == "languagetipmultiple" ||
          setNewType == "multiplechoices"
        ) {
          path = "/languagetipmultiple/";
        } else {
          path = "/conversationMultiple/";
        }

        path = `${path}${setPracticeListId}`;

        return path;

        // return '/lobby'
      } else {
        if (setNewType.includes("multiplechoices")) {
          if (data.skill == "Vocabulary") {
            path = "/multiplevocab/";
          } else if (data.skill == "Grammar") {
            path = "/grammarmultiple/";
          } else if (data.skill == "Phonics") {
            path = "/phonicsMultiple/";
          } else if (data.skill == "Reading") {
            path = "/readingmultiple/";
          } else if (data.skill == "Listening & Speaking") {
            if (setNewType == "multiplechoices(answersound)") {
              path = "/conversationmultiple/";
            } else {
              path = "/languagetipmultiple/";
            }
          }
        } else if (setNewType == "spellingbee") {
          path = "/spellingbee/";
        } else if (
          setNewType == "grammarlesson" ||
          setNewType == "phonicslesson" ||
          setNewType == "languagetips"
        ) {
          path = "/vdoLesson/";
        } else if (setNewType == "grammaraction") {
          path = "/grammarAction/";
        } else if (setNewType == "translation") {
          path = "/translation/";
        } else if (setNewType == "clozetest") {
          path = "/clozeTest/";
        } else if (setNewType == "conversationlesson") {
          path = "/conversationLesson/";
        } else if (setNewType == "roleplay") {
          path = "/roleplay/";
        } else if (setNewType == "readinglesson") {
          path = "/readinglesson/";
        }

        path = `${path}${setPracticeListId}`;

        return path;
      }
    },

    setRegisterData(object) {
      if (this.routerName == "lobby") return;

      let decryptJSON = this.decryptJSON(
        this.$state.systemData.registerData.data
      );

      for (const key in object) {
        decryptJSON[key] = object[key];
      }

      let encryptJSON = this.encryptJSON(decryptJSON);

      this.$patch({
        systemData: {
          registerData: {
            data: encryptJSON,
          },
        },
      });
    },

    setRouter(routerName) {
      this.$patch({
        systemData: {
          routerName: routerName,
        },
      });

      this.playSoundBackground();
    },

    setPlatform(platform) {
      let isDesktop = true;
      let isMobile = true;

      if (platform == "desktop") isDesktop = true;
      else isDesktop = false;

      if (platform == "mobile") isMobile = true;
      else isMobile = false;

      this.$patch({
        systemData: {
          platform: {
            desktop: isDesktop,
            mobile: isMobile,
          },
        },
      });
    },

    async setLogin() {
      this.$patch((state) => {
        state.isLogin = true;
      });
      this.systemLog({ status: `Set Login`, store: this.$id });
    },

    async setToken() {
      const studentStore = useStudentStore();
      const responseIdToken = await auth.currentUser.getIdToken();
      studentStore.student.token = responseIdToken;
    },

    setTypeTutorial() {
      let routerName = this.routerName;
      let type;
      if (routerName == "lobby") {
        type = "lobby";
      } else if (routerName == "practice-list") {
        type = "practice-list";
      } else if (routerName == "practice-unit") {
        type = "practice-unit";
      } else if (routerName == "flashcard") {
        type = "flashcard";
      } else if (routerName == "multiplevocab") {
        type = "multiplevocab";
      } else if (routerName == "speak-up") {
        type = "speak-up";
      } else if (routerName == "gachapon") {
        type = "gachapon";
      } else {
        type = routerName;
      }

      return type;
    },

    setStatus(status) {
      this.$patch((state) => (state.systemData.status = status));
    },

    setLoading(status) {
      this.$patch(
        (state) => (state.systemData.activeState.isShowDialogLoading = status)
      );
    },

    setParameter(object) {
      this.$patch({
        systemData: {
          parameter: {
            ...this.systemData.parameter,
            ...object,
          },
        },
      });
    },

    formatDate(time) {
      let date = new Date(time._seconds * 1000);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear() + 543;

      let fullDate = `${day} ${month_th_mini[month - 1]} ${year}`;

      return {
        day: day,
        month: month,
        year: year,
        date: fullDate,
        timestamp: date.getTime(),
      };
    },

    setDatetime(data){

      // console.log('*** data: ', data);

      if(this.systemData.datetime.isEncrypted){

        let tempDecrypt = this.decryptJSON(this.systemData.datetime.data)

        // console.log('*** tempDecrypt: ', tempDecrypt);

        let c_timestamp = tempDecrypt.timestamp + 1000;

        let c_date = new Date(c_timestamp);

        // console.log('*** c_date: ', c_date);

        let newDate = {
          day: c_date.getDate(),
          month: c_date.getMonth(),
          year: c_date.getFullYear(),
          hours: c_date.getHours(),
          minutes: c_date.getMinutes(),
          timestamp: c_date.getTime()
        }

        let encryptJSON = this.encryptJSON(newDate)

        this.$patch({
          systemData: {
            datetime: {
              data: encryptJSON,
            }
          }
        })
      }


    },

    // #region reset store
    resetStore() {
      //

      // Student Store
      const studentStore = useStudentStore();
      this.systemLog({
        status: `Success`,
        store: studentStore.$id,
        description: "Reset Student Store",
      });
      studentStore.$reset();

      // Buddy Store
      const buddyStore = useBuddyStore();
      this.systemLog({
        status: `Success`,
        store: buddyStore.$id,
        description: "Reset Buddy Store",
      });
      buddyStore.$reset();

      // Practice Store
      const practiceStore = usePracticeStore();
      this.systemLog({
        status: `Success`,
        store: practiceStore.$id,
        description: "Reset Practice Store",
      });

      practiceStore.$reset();

      // Course Store
      const courseStore = useCourseStore();
      this.systemLog({
        status: `Success`,
        store: courseStore.$id,
        description: "Reset Course Store",
      });

      courseStore.$reset();

      // School Store
      const schoolStore = useSchoolStore();
      this.systemLog({
        status: `Success`,
        store: schoolStore.$id,
        description: "Reset School Store",
      });

      schoolStore.$reset();

      // News Store
      const newsStore = useNewsStore();
      this.systemLog({
        status: `Success`,
        store: newsStore.$id,
        description: "Reset News Store",
      });

      newsStore.$reset();

      // Item Shop Store
      const itemshopStore = useItemShopStore();
      this.systemLog({
        status: `Success`,
        store: itemshopStore.$id,
        description: "Reset Items Store",
      });

      itemshopStore.$reset();

      // Inventory Store
      const inventoryStore = useInventoryStore();
      this.systemLog({
        status: `Success`,
        store: inventoryStore.$id,
        description: "Reset Inventory Store",
      });

      inventoryStore.$reset();

      // Synchonize Store
      const synchronizeStore = useSynchronizeStore();
      this.systemLog({
        status: `Success`,
        store: synchronizeStore.$id,
        description: "Reset Synchronize Store",
      });

      synchronizeStore.$reset();

      // Synchonize Store
      const eventStore = useEventStore();
      this.systemLog({
        status: `Success Reset Event Store`,
        store: eventStore.$id,
      });
      eventStore.$reset();

      // Mini Game Store
      const miniGameStore = useMiniGameStore();
      this.systemLog({
        status: `Success`,
        store: miniGameStore.$id,
        description: "Reset Mini Game Store",
      });

      miniGameStore.$reset();

      const mysteryBoxStore = useMysteryBoxStore();
      this.systemLog({
        status: `Success`,
        store: mysteryBoxStore.$id,
        description: "Reset Mystery Box Store",
      });
      mysteryBoxStore.$reset();

      // System Store
      const systemStore = useSystemStore();
      this.systemLog({
        status: `Success`,
        store: systemStore.$id,
        description: "Reset System Store",
      });

      systemStore.$reset();
    },
    // #endregion

    // #region Dispose Store
    disposeStore() {
      //
      // Student Store
      const studentStore = useStudentStore();
      this.systemLog({
        status: `Success`,
        store: studentStore.$id,
        description: "Dispose Student Store",
      });

      studentStore.$dispose();

      // Buddy Store
      const buddyStore = useBuddyStore();
      this.systemLog({
        status: `Success`,
        store: buddyStore.$id,
        description: "Dispose Buddy Store",
      });

      buddyStore.$dispose();

      // Practice Store
      const practiceStore = usePracticeStore();
      this.systemLog({
        status: `Success`,
        store: practiceStore.$id,
        description: "Dispose Practice Store",
      });

      practiceStore.$dispose();

      // Course Store
      const courseStore = useCourseStore();
      this.systemLog({
        status: `Success`,
        store: courseStore.$id,
        description: "Dispose Course Store",
      });

      courseStore.$dispose();

      // School Store
      const schoolStore = useSchoolStore();
      this.systemLog({
        status: `Success`,
        store: schoolStore.$id,
        description: "Dispose School Store",
      });

      schoolStore.$dispose();

      // News Store
      const newsStore = useNewsStore();
      this.systemLog({
        status: `Success`,
        store: newsStore.$id,
        description: "Dispose News Store",
      });

      newsStore.$dispose();

      // Item Shop Store
      const itemshopStore = useItemShopStore();
      this.systemLog({
        status: `Success`,
        store: itemshopStore.$id,
        description: "Dispose Item Shop Store",
      });

      itemshopStore.$dispose();

      // Inventory Store
      const inventoryStore = useInventoryStore();
      this.systemLog({
        status: `Success`,
        store: inventoryStore.$id,
        description: "Dispose Inventory Store",
      });

      inventoryStore.$dispose();

      // Synchonize Store
      const synchronizeStore = useSynchronizeStore();
      this.systemLog({
        status: `Success`,
        store: synchronizeStore.$id,
        description: "Dispose Synchronize Store",
      });

      synchronizeStore.$dispose();

      // Mini Game Store
      const miniGameStore = useMiniGameStore();
      this.systemLog({
        status: `Success`,
        store: miniGameStore.$id,
        description: "Dispose Mini Game Store",
      });

      miniGameStore.$dispose();

      // Event Store
      const eventStore = useEventStore();
      this.systemLog({
        status: `Success Dispose Event Store`,
        store: eventStore.$id,
      });
      eventStore.$dispose();

      const mysteryBoxStore = useMysteryBoxStore();
      this.systemLog({
        status: `Success Dispose Mystery Box Store`,
        store: mysteryBoxStore.$id,
      });
      mysteryBoxStore.$dispose();

      // System Store
      const systemStore = useSystemStore();
      this.systemLog({
        status: `Success`,
        store: systemStore.$id,
        description: "Dispose System Store",
      });

      systemStore.$dispose();
    },
    // #endregion

    // #region Encrypt And Decrypt
    encryptString(data) {
      let cipherText = CryptoJS.AES.encrypt(
        data,
        process.env.WINNER_JSON_KEY
      ).toString();
      return cipherText;
    },
    encryptJSON(data) {
      let cipherJSON = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        process.env.WINNER_JSON_KEY
      ).toString();
      return cipherJSON;
    },
    decryptString(data) {
      var bytes = CryptoJS.AES.decrypt(data, process.env.WINNER_JSON_KEY);
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      return originalText;
    },
    decryptJSON(data) {
      var bytes = CryptoJS.AES.decrypt(data, process.env.WINNER_JSON_KEY);
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    },
    // #endregion

    // #region System Log
    systemLog({
      api = "no api", // api name
      post = "", // post
      get = "", // get
      status = "no status", // status code
      description = "no description", // description
      response = "no response", // data
      store = "no store", // store name
      isError = false,
    }) {
      let headerStoreStyle = `font-weight: bold;font-size: 14px;padding:5px;`;

      switch (store) {
        case "practiceStore":
          headerStoreStyle += `background-color:#0059ff;color:#fff;`;
          break;
        case "studentStore":
          headerStoreStyle += `background-color:#ffe100;color:#000;`;
          break;
        case "schoolStore":
          headerStoreStyle += `background-color:#ff9d00;color:#000;`;
          break;
        case "newsStore":
          headerStoreStyle += `background-color:#ff0044;color:#000;`;
          break;
        case "courseStore":
          headerStoreStyle += `background-color:#ff8c00;color:#000;`;
          break;
        case "itemshopStore":
          headerStoreStyle += `background-color:#cf3a53;color:#000;`;
          break;
        case "inventoryStore":
          headerStoreStyle += `background-color:#00cad1;color:#000;`;
          break;
        case "buddyStore":
          headerStoreStyle += `background-color:#26ff00;color:#000;`;
          break;
        case "synchronizeStore":
          headerStoreStyle += `background-color:#9cffb9;color:#000;`;
          break;
        case "miniGameStore":
          headerStoreStyle += `background-color:#ff73b4;color:#000;`;
          break;
        case "eventStore":
          headerStoreStyle += `background-color:#9647ff;color:#000;`;
          break;
        case "mysteryBoxStore":
          headerStoreStyle += `background-color:#ff00ff;color:#000;`;
          break;
        default:
          headerStoreStyle += `background-color:#d9d9d9;color:#000;`;
          break;
      }

      //       const styleAlertColor = 'color:#9647ff;background-color:#000;font-weight: bold;'
      // console.log(`%c *****  Event Store Log Color  ***** `, `${styleAlertColor}`)

      if (process.env.WINNER_SHOW_LOG) {
        let newResponse = response
          ? JSON.stringify(response).replace(/"/g, "") || "no response"
          : "no response";
        let newPost = post ? JSON.stringify(post).replace(/"/g, "") || "" : "";
        let newGet = get ? JSON.stringify(get).replace(/"/g, "") || "" : "";
        let newDescription = description;
        let newAPI = api;
        let newStatus = status;
        let newStore = store;
        let newTimestamp = new Date().toLocaleString();

        if (!newPost) {
          if (newGet) {
            newPost = "";
          } else {
            newPost = "no post";
          }
        }

        let errorStyle = `color:#f00;font-weight: bold;font-size:12px;padding:3px;`;
        let successStyle = `color:#fff;font-size:12px;padding:3px;`;

        console.log(
          `%c================ ${newStore.toUpperCase()} LOG  ====================`,
          headerStoreStyle
        );
        console.log(
          `%c Store: ${newStore || "no store"} \n API: ${newAPI} \n ${
            newPost == "no post"
              ? `POST&GET: no post and get `
              : newPost
              ? `POST: ${newPost}`
              : ``
          }${
            newGet != "" ? `GET: ${newGet} ` : ""
          } \n Response: ${newResponse} \n Status: ${newStatus} \n Description: ${newDescription} \n Timestamp: ${newTimestamp} `,
          isError ? `${errorStyle}` : `${successStyle}`
        );
      }
    },
    // #endregion

    // #region Show Log in Program
    SLIP(log) {
      if (process.env.WINNER_SHOW_LOG) {
        let debug = document.createElement("div");
        debug.style.position = "fixed";
        debug.style.bottom = "0";
        debug.style.left = "0";
        debug.style.maxWidth = "600px";
        debug.style.width = "100%";
        debug.style.minWidth = "300px";
        debug.style.padding = "10px";
        debug.style.backgroundColor = "rgba(0,0,0,.5)";
        debug.style.height = "auto";
        document.body.appendChild(debug);

        debug.innerHTML = log;
      }
    },
    // #endregion
  },
});
