import axios from "axios";
import { defineStore } from "pinia";

import vocabularyPracticePosition from "../js/position-vocabulary-practice";
import grammarPracticePosition from "../js/position-grammar-practice";
import readingPracticePosition from "../js/position-reading-practice";
import writingPracticePosition from "../js/position-writing-practice";
import phonicsPracticePosition from "../js/position-phonics-practice";
import listeningPracticePosition from "../js/position-listening-practice";
import { useStudentStore } from "./student";
import { useSynchronizeStore } from "./synchronize";
import { useSystemStore } from "./system";
import { useBuddyStore } from "./buddy";
import { useCourseStore } from "./course";
import { useInventoryStore } from "./inventory";
import p_json from "/package.json";

let months_th_mini = [
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

let tempSkillIsland = [
  {
    name: "Vocabulary",
    nameImage: "vocabulary",
    position: `top: 6%; left: 9%;`,
    isLock: false,
    textValidate: "",
  },
  {
    name: "Grammar",
    nameImage: "grammar",
    position: `top: 9%; left: 40.3%;`,
    isLock: false,
    textValidate: "",
  },
  {
    name: "Writing",
    nameImage: "writing",
    position: `top: 9.3%; left: 70.5%;`,
    isLock: false,
    textValidate: "",
  },
  {
    name: "Reading",
    nameImage: "reading",
    position: `top: 52%; left: 7.8%;`,
    isLock: false,
    textValidate: "",
  },
  {
    name: "Phonics",
    nameImage: "phonics",
    position: `top: 50%; left: 39.3%;`,
    isLock: false,
    textValidate: "",
  },
  {
    name: "Listening",
    nameImage: "listening",
    position: `top: 52.5%; left: 70.5%;`,
    isLock: false,
    textValidate: "",
  },
];

/**
 * @name practiceStore
 */
export const usePracticeStore = defineStore("practiceStore", {
  state: () => ({
    practiceListName: {
      data: {},
      isLoaded: false,
      isUpdate: false,
    },
    practiceList: {
      data: [],
      isLoaded: false,
      isUpdate: false,
    },
    practiceLog: {
      data: [],
      isLoaded: false,
      isUpdate: false,
    },
    // Practice Data
    practiceDataObject: {
      data: {},
      isHasData: false,
    },
    // Practice Lock
    practiceLockObject: {
      data: {},
      isHasData: false,
    },

    // Pretest & Posttest
    prePostObject: {
      data: {},
      type: "",
      isHasData: false,
      currentQuestion: 0,
      status: {
        isStartPrePostTest: false,
        isSendAnswer: false,
        isFinishPrePostTest: false,
        isTimeout: false,
        isGetRewardCoin: false,
        isGetRewardItem: false,
      },
      timer: "",
      timerSendAnswer: "",
    },
    prePostRewardObject: {
      data: {},
      isHasData: false,
      isGetRewarded: false,
    },
    questionnaireObject: {
      data: {},
      status: {
        isFinish: false,
      },
      isHasData: false,
    },
    practiceCompleteObject: {
      data: [],
      isFirstTime: true,
      isEncrypted: false,
      isShowRewardDialog: false,
      isLoaded: false,
    },
    practiceProgressObject: {
      data: [],
      isEncrypted: false,
    },
  }),

  // #region ***** Getters *****
  getters: {
    // #region Practice Data
    practiceData: (state) => {
      const systemStore = useSystemStore();

      let temp = {
        counter: 0,
        type: "",
        id: "",
        skill: "Vocabulary",
        level: "",
        unit: "1",
      };

      if (state.practiceDataObject.isHasData) {
        temp = systemStore.decryptJSON(state.practiceDataObject.data);
      }

      return temp;
    },
    // #endregion

    // #region List Name
    listName: (state) => state.practiceListName.data,
    // #endregion

    // #region Practice List
    list: (state) => state.practiceList.data,
    // #endregion

    // #region Practice Log
    log: (state) => state.practiceLog.data,
    // #endregion

    // #region Practice Skill
    skill: (state) => {
      const systemStore = useSystemStore();

      let temp = "Vocabulary";

      if (state.practiceDataObject.isHasData) {
        temp = systemStore.decryptJSON(state.practiceDataObject.data);
        temp = temp.skill;
      }

      return temp;
    },
    // #endregion

    // #region Skill island
    skillIsland: (state) => {
      const studentStore = useStudentStore();

      let temp = tempSkillIsland;

      let findPracticeList = state.list.filter(
        (x) => x.unit == state.unit && x.level == state.level
      );

      // if(studentStore.studentType == 'school'){

      //   temp.forEach(res => {

      //     // Condition Writing is Lock
      //     if(res.name == 'Writing'){

      //       let vocabComplete = 0
      //       let grammarComplete = 0

      //       let tempVocab = findPracticeList.filter(x => x.skill == 'Vocabulary')
      //       tempVocab.map(item => {
      //         let findLog = state.log.find(x => x.practiceListId == item.id)
      //         if(findLog){
      //           vocabComplete++
      //         }
      //       })

      //       let tempGrammar = findPracticeList.filter(x => x.skill == 'Grammar')
      //       tempGrammar.map(item => {
      //         let findLog = state.log.find(x => x.practiceListId == item.id)
      //         if(findLog){
      //           grammarComplete++
      //         }
      //       })

      //       if(vocabComplete == tempVocab.length && grammarComplete == tempGrammar.length){
      //         res.isLock = false
      //         res.textValidate = ''
      //       }else{
      //         res.isLock = true
      //         res.textValidate = 'ปลดล็อกเมื่อจบ Vocabulary <br> และ Grammar'
      //       }
      //     }

      //   })

      // }

      return temp;
    },
    // #endregion

    // #region current skill island
    currentSkillIsland: (state) => {
      let temp = tempSkillIsland.find((x) => x.name == state.skill);

      if (temp) {
        return temp;
      }

      return temp;
    },
    // #endregion

    // #region Check Lock Practice
    isCheckLockPractice: (state) => {
      let isCheck = false;

      let findSkillIsland = state.skillIsland.find(
        (x) => x.name == state.skill
      );

      if (findSkillIsland) {
        isCheck = findSkillIsland.isLock;
      }

      return isCheck;
    },
    // #endregion

    // #region Practice Progress Data
    practiceProgressData: (state) => {
      const systemStore = useSystemStore();

      let temp = [];

      if (state.practiceProgressObject.isEncrypted) {
        let tempDecrypt = systemStore.decryptJSON(
          state.practiceProgressObject.data
        );

        temp = tempDecrypt;
      }

      return temp;
    },
    // #endregion

    // #region Practice Unit
    unit: (state) => state.practiceData.unit,
    // #endregion

    // #region Practice Unit Options
    unitOptions: (state) => {
      let temp = [];

      for (let i = 1; i <= 16; i++) {
        let resUnit = i.toString();

        let findPracticeInUnit = state.list.filter((x) => x.unit == resUnit);

        let numOfComplete = 0;

        let newData = {
          value: resUnit,
          label: `Unit ${resUnit}`,
          isLock: false,
          isSuccess: false,
          id: "",
        };

        let findReadingSkill = findPracticeInUnit.find(
          (x) => x.skill == "Reading"
        );

        if (findReadingSkill) {
          let newLesson = {
            ...findReadingSkill,
            practiceType: "readinglesson",
          };
          findPracticeInUnit.unshift(newLesson);
        }

        for (let ii = 0; ii < findPracticeInUnit.length; ii++) {
          let resPractice = findPracticeInUnit[ii];

          let findPracticeInLog;

          if (resPractice.practiceType == "readinglesson") {
            findPracticeInLog = state.log.find(
              (x) => x.practiceListId == `${resPractice.id}-lesson`
            );
          } else {
            findPracticeInLog = state.log.find(
              (x) => x.practiceListId == resPractice.id
            );
          }

          if (findPracticeInLog) {
            numOfComplete++;
          }

          let progress = Math.round(
            (numOfComplete / findPracticeInUnit.length) * 100
          );

          if (progress >= 100) {
            newData.isSuccess = true;
          }
        }

        temp.push(newData);
      }

      return temp;
    },
    // #endregion

    // #region Practice Level
    level: (state) => state.practiceData.level,
    // #endregion

    // #region Practice Level Options
    levelOptions: (state) => {
      const courseStore = useCourseStore();

      let temp = [];

      let levelList = courseStore.list;

      for (let i = 1; i <= 12; i++) {
        let resLevel = i.toString();

        let newData = {
          value: resLevel,
          label: `Level ${resLevel}`,
          isLock: true,
          isSuccess: false,
          id: "",
        };

        let findCourseLevel = levelList.find((x) => x.level == resLevel);

        if (findCourseLevel) {
          newData.isLock = false;

          if (state.practiceProgressObject.isEncrypted) {
            let findPracticeProgress = state.practiceProgressData.find(
              (x) => x.level == resLevel
            );
            if (findPracticeProgress) {
              if (findPracticeProgress.unitProgress.length >= 16) {
                newData.isSuccess = findPracticeProgress.unitProgress.every(
                  (x) => x.progress >= 100
                );
              }
            }
          }
          newData.id = findCourseLevel.courseId;
        }

        temp.push(newData);
      }

      return temp;
    },
    // #endregion

    // #region Practice Type
    practiceType: (state) => state.practiceData.type,
    // #endregion

    // #region Practice List Id
    practiceListId: (state) => state.practiceData.id,
    // #endregion

    // #region Next Practice
    nextPractice: (state) => {
      let temp = state.listBySkill;

      let lessonList = [
        "flashcard",
        "grammarlesson",
        "phonicslesson",
        "languagetips",
        "conversationlesson",
        "readinglesson",
      ];

      let findIndexOfCurrentPractice = [];

      if (state.practiceData.skill == "Reading") {
        findIndexOfCurrentPractice = temp
          .map((x) => x.practiceType)
          .indexOf(state.practiceData.type);
      } else {
        findIndexOfCurrentPractice = temp
          .map((x) => x.id)
          .indexOf(state.practiceData.id);
      }

      temp = temp.filter((x) => findIndexOfCurrentPractice + 1 < x.index);

      let tempHavePractice = temp.filter(
        (x) =>
          lessonList.includes(x.practiceType) ||
          (x.counter < 2 && !lessonList.includes(x.practiceType))
      );

      if (tempHavePractice.length) {
        let findNextPractice = tempHavePractice[0];

        return findNextPractice;
      }

      return null;

      // let findPracticeByUnit = [
      //   ...state.practiceList.data.filter(
      //     x =>
      //       x.level == state.practiceData.level &&
      //       x.unit == state.practiceData.unit
      //   )
      // ]

      // let findIndexOfPracticeList = findPracticeByUnit
      //   .map(x => x.id)
      //   .indexOf(state.practiceData.id)

      // // let nextPracticeData = null

      // for (
      //   let i = findIndexOfPracticeList + 1;
      //   i < findPracticeByUnit.length;
      //   i++
      // ) {
      //   let practice = findPracticeByUnit[i]

      //   practice.counter = 0

      //   if (
      //     practice.practiceType == 'flashcard' ||
      //     practice.practiceType == 'grammarlesson' ||
      //     practice.practiceType == 'phonicslesson' ||
      //     practice.practiceType == 'languagetips' ||
      //     practice.practiceType == 'conversationlesson'
      //   ) {
      //     nextPracticeData = practice
      //     break
      //   } else {
      //     let findLog = state.practiceLog.data.find(
      //       x => x.practiceListId == practice.id
      //     )

      //     if (findLog) {
      //       if (findLog.counter >= 2) {
      //         continue
      //       } else {
      //         practice.counter = findLog.counter
      //         nextPracticeData = practice
      //         break
      //       }
      //     } else {
      //       nextPracticeData = practice
      //       break
      //     }
      //   }
      // }

      // return nextPracticeData
    },
    // #endregion

    // #region Current Practice Data
    currentPracticeData: (state) => {
      let temp = null;

      if (state.listBySkill.length) {
        if (state.practiceType == "readinglesson") {
          temp = state.listBySkill.find(
            (x) =>
              x.id == `${state.practiceListId}` &&
              state.practiceType == x.practiceType
          );
        } else {
          temp = state.listBySkill.find(
            (x) =>
              x.id == state.practiceListId &&
              state.practiceType == x.practiceType
          );
        }
      }

      return temp;
    },
    // #endregion

    // #region Practice Current Counter
    practiceCurrentCounter: (state) => {
      let type = state.practiceType;
      let id = state.practiceListId;

      let counter = 0;

      let tempLog = state.log;

      let findLog = null;

      if (type == "readinglesson") {
        findLog = tempLog.find((x) => x.practiceListId == `${id}-lesson`);
      } else {
        findLog = tempLog.find((x) => x.practiceListId == id);
      }

      if (findLog) {
        counter = findLog.counter;
      }

      return counter;
    },
    // #endregion

    // #region Practice List By Skill
    listBySkill: (state) => {
      const studentStore = useStudentStore();

      let temp = [];
      let tempSkillPosition = [];
      let skillName = state.practiceData.skill;

      if (state.practiceData.skill == "Vocabulary") {
        tempSkillPosition = vocabularyPracticePosition.list;
      } else if (state.practiceData.skill == "Grammar") {
        tempSkillPosition = grammarPracticePosition.list;
      } else if (state.practiceData.skill == "Reading") {
        tempSkillPosition = readingPracticePosition.list;
      } else if (state.practiceData.skill == "Writing") {
        tempSkillPosition = writingPracticePosition.list;
      } else if (state.practiceData.skill == "Phonics") {
        tempSkillPosition = phonicsPracticePosition.list;
      } else {
        tempSkillPosition = listeningPracticePosition.list;
        skillName = "Listening & Speaking";
      }

      let findPractice = state.practiceList.data.filter(
        (x) => x.unit == state.practiceData.unit && x.skill == skillName
      );

      if (state.skill == "Reading") {
        let newLesson = {
          ...findPractice[0],
          practiceType: "readinglesson",
        };

        findPractice.unshift(newLesson);
      }

      let findPracticePosition = tempSkillPosition.filter(
        (x) => x.length == findPractice.length
      );

      let tempLog = state.log;

      findPractice.forEach((res, index) => {
        let isLesson = false;
        let isLearn = false;
        let isDisable = false;
        let star = 0;
        let isRoleplay = false;
        let counter = 0;
        let textValidate = "";
        let isFirstTimeReward = true;

        let findLog;

        if (res.practiceType == "readinglesson") {
          findLog = tempLog.find((x) => x.practiceListId == `${res.id}-lesson`);
        } else {
          findLog = tempLog.find((x) => x.practiceListId == res.id);
        }

        if (
          res.practiceType == "flashcard" ||
          res.practiceType == "grammarlesson" ||
          res.practiceType == "phonicslesson" ||
          res.practiceType == "languagetips" ||
          res.practiceType == "conversationlesson" ||
          res.practiceType == "readinglesson"
        ) {
          isLesson = true;

          if (findLog) {
            isLearn = true;
          }
        } else if (res.practiceType == "roleplay") {
          isRoleplay = true;
        }

        if (index > 0) {
          if (temp[index - 1].isLearn) {
            isDisable = false;
            if (findLog) {
              if (findLog.star != 0 || findLog.counter > 0) {
                isLearn = true;
              }

              if (!isLesson) {
                if (findLog.isBuddy || findLog.isSync) {
                  textValidate = `เคยผ่านแบบฝึกหัดนี้แล้ว <br> จากโหมดควบคุมการเรียนหรือโหมด Buddy`;
                }
              } else {
                if (findLog.isBuddy || findLog.isSync) {
                  textValidate = `เคยผ่านเนื้อหาการเรียนนี้แล้ว <br>
                  จากโหมดควบคุมการเรียนหรือโหมด Buddy`;
                }
              }
            }
          } else {
            if (studentStore.studentType == "school") {
              isDisable = true;

              if (findLog) {
                // Mockup
                // isLearn = true

                if (!isLesson) {
                  if (findLog.isBuddy || findLog.isSync) {
                    textValidate = `เคยผ่านแบบฝึกหัดนี้แล้ว <br> จากโหมดควบคุมการเรียนหรือโหมด Buddy`;
                  }
                } else {
                  if (findLog.isBuddy || findLog.isSync) {
                    textValidate = `เคยผ่านเนื้อหาการเรียนนี้แล้ว <br>
                  จากโหมดควบคุมการเรียนหรือโหมด Buddy`;
                  }
                }
              }
            } else {
              if (res.skill == "Vocabulary") {
                isDisable = true;
              }

              if (findLog) {
                // if(findLog.star != 0){
                isLearn = true;
                // }
              }
            }
          }
        } else {
          if (findLog) {
            if (!isLesson) {
              if (findLog.isBuddy || findLog.isSync) {
                textValidate = `เคยผ่านแบบฝึกหัดนี้แล้ว <br> จากโหมดควบคุมการเรียนหรือโหมด Buddy`;
              }

              if (findLog.star != 0) {
                isLearn = true;
              }
            } else {
              if (findLog.isBuddy || findLog.isSync) {
                textValidate = `เคยผ่านเนื้อหาการเรียนนี้แล้ว <br>
                จากโหมดควบคุมการเรียนหรือโหมด Buddy`;
              }

              isLearn = true;
            }
          }
        }

        if (findLog) {
          star = findLog.star;
          counter = findLog.counter;
          isFirstTimeReward = false;
        }

        if (isRoleplay) {
          isDisable = false;
          if (findLog) {
            isLearn = true;
          }
        }

        let newData = {
          ...findPracticePosition[0][index],
          ...res,
          star: star,
          index: index + 1,
          isLesson: isLesson,
          isLearn: isLearn,
          isRoleplay: isRoleplay,
          isDisable: isDisable,
          counter: counter,
          textValidate: textValidate,
          isFirstTimeReward: isFirstTimeReward,
          isHover: false,
        };

        temp.push(newData);
      });

      return temp;
    },
    // #endregion

    // #region Direction
    direction: (state) => {
      if (state.practiceData.id) {
        let instruction = {
          eng: "",
          th: "",
        };

        let findInstruction = state.practiceList.data.find(
          (x) => x.id == state.practiceData.id
        );

        if (state.practiceData.type == "flashcard") {
          instruction = {
            eng: "Let's start reviewing VOCABULARY!!",
            th: "มาเริ่มทบทวนคำศัพท์กัน!",
          };
        } else if (state.practiceData.type == "roleplay") {
          instruction = {
            eng: "Please listen to the dialogue and repeat after it.",
            th: "โปรดฟังเสียงบทสนทนาและพูดตาม",
          };
        } else {
          if (findInstruction)
            instruction = {
              eng: findInstruction.instructionEng,
              th: findInstruction.instructionTh,
            };
        }

        return instruction;
      }
      return null;
    },
    // #endregion

    // #region Practice Lock Data
    practiceLockData: (state) => {
      const systemStore = useSystemStore();
      let setData = {
        isLock: false,
        level: "",
        id: "",
      };
      if (state.practiceLockObject.isHasData) {
        let temp = systemStore.decryptJSON(state.practiceLockObject.data);
        return temp || setData;
      }
      return setData;
    },
    // #endregion

    // #region Pretest & Posttest
    prePostArray: (state) => {
      const systemStore = useSystemStore();
      let tempData = [];
      if (state.prePostObject.isHasData) {
        tempData = systemStore.decryptJSON(state.prePostObject.data);
      }
      return tempData;
    },
    // #endregion

    // #region Pretest & Posttest Status
    prePostStatus: (state) => {
      let setData = {
        ...state.prePostObject.status,
      };
      return setData;
    },
    // #endregion

    // #region Pretest & Posttest Reward
    prePostReward: (state) => {
      const systemStore = useSystemStore();
      let setData = [];
      if (state.prePostRewardObject.isHasData) {
        let temp = systemStore.decryptJSON(state.prePostRewardObject.data);
        return temp || setData;
      }
      return setData;
    },
    // #endregion

    // #region Questionnaire Data
    questionnaireData: (state) => {
      let findData = "";
      if (state.questionnaireObject.isHasData) {
        findData = state.questionnaireObject.data.find((x) => x.isOpen);
        if (findData) {
          return findData;
        }
      }
      return findData;
    },
    // #endregion

    // #region Questionnaire Status
    questionStatus: (state) => {
      return state.questionnaireObject.status;
    },
    // #endregion

    // #region Current unit Data
    currentUnitData: (state) => {
      let practiceByUnitData = {
        vocabulary: {},
        grammar: {},
        reading: {},
        writing: {},
        phonics: {},
        listening: {},
      };

      let findVocabualaryData = state.listName.Vocabulary.find(
        (x) => x.level == state.level && x.unit == state.unit
      );
      if (findVocabualaryData) {
        practiceByUnitData.vocabulary = findVocabualaryData;
      }

      let findGrammarData = state.listName.Grammar.find(
        (x) => x.level == state.level && x.unit == state.unit
      );
      if (findGrammarData) {
        practiceByUnitData.grammar = findGrammarData;
      }

      let findReadingData = state.listName.Reading.find(
        (x) => x.level == state.level && x.unit == state.unit
      );
      if (findReadingData) {
        practiceByUnitData.reading = findReadingData;
      }

      let findWritingData = state.listName.Writing.find(
        (x) => x.level == state.level && x.unit == state.unit
      );
      if (findWritingData) {
        practiceByUnitData.writing = findWritingData;
      }

      let findPhonicsData = state.listName.Phonics.find(
        (x) => x.level == state.level && x.unit == state.unit
      );
      if (findPhonicsData) {
        practiceByUnitData.phonics = findPhonicsData;
      }

      let findListeningData = state.listName.Listening.find(
        (x) => x.level == state.level && x.unit == state.unit
      );
      if (findListeningData) {
        practiceByUnitData.listening = findListeningData;
      }

      return practiceByUnitData;
    },
    // #endregion

    // #region Total Learning Practice By Skill and Unit
    currentTotalLearningPracticeBySkillAndUnit: (state) => {
      const studentStore = useStudentStore();

      let skillList = [
        "Vocabulary",
        "Grammar",
        "Writing",
        "Reading",
        "Phonics",
        "Listening",
      ];

      let skillData = {
        Vocabulary: {
          total: 0,
          name: "Vocabulary",
        },
        Grammar: {
          total: 0,
          name: "Grammar",
        },
        Writing: {
          total: 0,
          name: "Writing",
        },
        Reading: {
          total: 0,
          name: "Reading",
        },
        Phonics: {
          total: 0,
          name: "Phonics",
        },
        Listening: {
          total: 0,
          name: "Listening & Speaking",
        },
      };

      for (let i = 0; i < skillList.length; i++) {
        let resSkill = skillList[i];

        resSkill = resSkill == "Listening" ? "Listening & Speaking" : resSkill;

        let findPracticeInSkill = state.list.filter(
          (x) => x.unit == state.unit && x.skill == resSkill
        );

        if (resSkill == "Reading") {
          let newData = {
            ...findPracticeInSkill[0],
            practiceType: "readinglesson",
          };

          findPracticeInSkill.unshift(newData);
        }

        for (let ii = 0; ii < findPracticeInSkill.length; ii++) {
          let resPractice = findPracticeInSkill[ii];

          let findPracticeInLog;

          if (resPractice.practiceType == "readinglesson") {
            findPracticeInLog = state.log.find(
              (x) => x.practiceListId == `${resPractice.id}-lesson`
            );
          } else {
            findPracticeInLog = state.log.find(
              (x) => x.practiceListId == resPractice.id
            );
          }

          if (findPracticeInLog) {
            if (
              findPracticeInLog.practiceType == "flashcard" ||
              findPracticeInLog.practiceType == "grammarlesson" ||
              findPracticeInLog.practiceType == "phonicslesson" ||
              findPracticeInLog.practiceType == "languagetips" ||
              findPracticeInLog.practiceType == "conversationlesson" ||
              findPracticeInLog.practiceType == "readinglesson"
            ) {
              skillData[skillList[i]].total++;
              // total++;
            } else {
              if (studentStore.studentType == "online") {
                if (findPracticeInLog.star != 0) {
                  // total++;
                  skillData[skillList[i]].total++;
                }
              } else {
                if (
                  findPracticeInLog.counter != 0 ||
                  findPracticeInLog.star != 0
                ) {
                  // total++;
                  skillData[skillList[i]].total++;
                }
              }
            }
          }
        }
      }

      return skillData;
    },
    // #endregion

    // #region Total All Practice By Skill and Unit
    currentTotalAllPracticeBySkillAndUnit: (state) => {
      let skillList = [
        "Vocabulary",
        "Grammar",
        "Writing",
        "Reading",
        "Phonics",
        "Listening",
      ];

      let skillData = {
        Vocabulary: {
          total: 0,
          name: "Vocabulary",
        },
        Grammar: {
          total: 0,
          name: "Grammar",
        },
        Writing: {
          total: 0,
          name: "Writing",
        },
        Reading: {
          total: 0,
          name: "Reading",
        },
        Phonics: {
          total: 0,
          name: "Phonics",
        },
        Listening: {
          total: 0,
          name: "Listening & Speaking",
        },
      };

      for (let i = 0; i < skillList.length; i++) {
        let resSkill = skillList[i];

        resSkill = resSkill == "Listening" ? "Listening & Speaking" : resSkill;

        let findPracticeInSkill = state.list.filter(
          (x) => x.unit == state.unit && x.skill == resSkill
        );

        if (resSkill == "Reading") {
          let newLesson = {
            ...findPracticeInSkill[0],
            practiceType: "readinglesson",
          };
          findPracticeInSkill.unshift(newLesson);
        }

        skillData[skillList[i]].total = findPracticeInSkill.length;
      }

      return skillData;
    },
    // #endregion

    // #region Practice Complete Reward
    practiceCompleteList: (state) => {
      const systemStore = useSystemStore();

      let temp = [];

      if (state.practiceCompleteObject.isEncrypted) {
        let tempDecrypt = systemStore.decryptJSON(
          state.practiceCompleteObject.data
        );

        tempDecrypt = tempDecrypt.filter((x) => x.level != "0");

        temp = tempDecrypt;
      }

      return temp;
    },
    // #endregion

    // #region Show Dialog Practice Complete
    isShowDialogPracticeComplete: (state) => {
      let isShow = state.practiceCompleteObject.isShowRewardDialog;

      return isShow;
    },
    // #endregion

    // #region Current Progress by unit
    currentProgressByUnit: (state) => {
      let progress = 0;

      let findPracticeInUnit = state.list.filter((x) => x.unit == state.unit);

      let findReadingSkill = findPracticeInUnit.find(
        (x) => x.skill == "Reading"
      );

      if (findReadingSkill) {
        let newLesson = {
          ...findReadingSkill,
          practiceType: "readinglesson",
        };
        findPracticeInUnit.push(newLesson);
      }

      let numOfComplete = 0;

      for (let i = 0; i < findPracticeInUnit.length; i++) {
        let resPractice = findPracticeInUnit[i];

        let findPracticeInLog;

        if (resPractice.practiceType == "readinglesson") {
          findPracticeInLog = state.log.find(
            (x) => x.practiceListId == `${resPractice.id}-lesson`
          );
        } else {
          findPracticeInLog = state.log.find(
            (x) => x.practiceListId == resPractice.id
          );
        }

        if (findPracticeInLog) {
          numOfComplete++;
        }
      }

      progress = (numOfComplete / findPracticeInUnit.length) * 100;

      progress = Number(progress.toFixed(0));

      return progress;
    },
    // #endregion

    // #region Current Progress This level
    currentProgressThisLevel: (state) => {
      let unitProgressList = [];
      let progress = 0;

      for (let index = 1; index <= 16; index++) {
        let findPracticeInUnit = state.list.filter((x) => x.unit == index);

        let findReadingSkill = findPracticeInUnit.find(
          (x) => x.skill == "Reading"
        );

        if (findReadingSkill) {
          let newLesson = {
            ...findReadingSkill,
            practiceType: "readinglesson",
          };
          findPracticeInUnit.push(newLesson);
        }

        let numOfComplete = 0;

        for (let i = 0; i < findPracticeInUnit.length; i++) {
          let resPractice = findPracticeInUnit[i];

          let findPracticeInLog;

          if (resPractice.practiceType == "readinglesson") {
            findPracticeInLog = state.log.find(
              (x) => x.practiceListId == `${resPractice.id}-lesson`
            );
          } else {
            findPracticeInLog = state.log.find(
              (x) => x.practiceListId == resPractice.id
            );
          }

          findPracticeInLog = state.log.find(
            (x) => x.practiceListId == resPractice.id
          );

          if (findPracticeInLog) {
            numOfComplete++;
          }
        }

        progress = (numOfComplete / findPracticeInUnit.length) * 100;
        progress = Number(progress.toFixed(0));
        unitProgressList.push(progress);
      }

      const sum = unitProgressList.reduce((acc, num) => acc + num, 0);
      const maxPossible = unitProgressList.length * 100; // 12 * 100
      const averagePercentage = (sum / maxPossible) * 100;
      progress = Number(averagePercentage.toFixed(0));

      return { progress, unitProgressList };
    },
    // #endregion

    // #region first time load lesson achievement
    isFirstLoadingLessonAchievement: (state) =>
      state.practiceCompleteObject.isFirstTime,
    // #endregion

    // #region Is Check reward
    isHaveReward: (state) => {
      const systemStore = useSystemStore();

      let isHave = false;

      if (state.practiceCompleteObject.isEncrypted) {
        let tempDecrypt = systemStore.decryptJSON(
          state.practiceCompleteObject.data
        );

        let temp = tempDecrypt.find((x) => x.reward.length > 0);

        if (temp) {
          isHave = true;
        }
      }

      return isHave;
    },
    // #endregion

    // #region Current Reward
    currentProgressByLevel: (state) => {
      const systemStore = useSystemStore();

      let temp = {};

      if (state.practiceCompleteObject.isEncrypted) {
        let tempDecrypt = systemStore.decryptJSON(
          state.practiceCompleteObject.data
        );
        tempDecrypt = tempDecrypt.find((x) => x.level == state.level);
        if (tempDecrypt) {
          temp = tempDecrypt;
        }
      }

      return temp;
    },
    // #endregion

    // #region Practice Complete Reward Is Loaded
    isLoadedPracticeCompleteReward: (state) =>
      state.practiceCompleteObject.isLoaded,
    // #endregion

    // #region Is Loading
    isLoading: (state) => {
      if (
        !state.practiceList.isLoaded ||
        !state.practiceLog.isLoaded ||
        !state.practiceListName.isLoaded ||
        state.practiceList.isUpdate ||
        state.practiceListName.isUpdate ||
        state.practiceLog.isUpdate
      ) {
        return true;
      } else return false;
    },
    // #endregion
  },
  // #endregion

  // #region ***** Mutations *****
  actions: {
    // #region ***** Get Data *****

    // #region Get Practice List Name
    async getPracticeListName() {
      const systemStore = useSystemStore();

      try {
        if (this.practiceListName.isLoaded && !this.practiceListName.isUpdate) {
          systemStore.systemLog("Has Practice List Name", this.$id);
          return;
        }

        this.practiceListName.isUpdate = false;

        const APIURL = `${process.env.NEWAPI_ASIA}/practiceListName-getPracticeListNameByLevel?level=${this.level}`;

        const response = await axios.get(APIURL);

        this.$patch({
          practiceListName: {
            data: response.data,
            isLoaded: true,
          },
        });

        systemStore.systemLog({
          api: "practiceListName-getPracticeListNameByLevel",
          store: this.$id,
          status: "Success Get Practice List Name",
          get: {
            level: this.level,
          },
          response: response.data,
        });
      } catch (e) {
        systemStore.systemLog({
          api: "practiceListName-getPracticeListNameByLevel",
          store: this.$id,
          status: "Error Get Practice List Name",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Get Practice List
    async getPracticeList() {
      const systemStore = useSystemStore();

      try {
        if (this.practiceList.isLoaded && !this.practiceList.isUpdate) {
          return;
        }

        this.practiceList.isUpdate = false;

        const APIURL = `${process.env.NEWAPI}/practiceList-getPracticeListByLevel?level=${this.level}`;

        const response = await axios.get(APIURL);

        this.$patch({
          practiceList: {
            data: response.data,
            isLoaded: true,
          },
        });

        systemStore.systemLog({
          api: "practiceList-getPracticeListByLevel",
          store: this.$id,
          status: "Success Get Practice List",
          get: {
            level: this.level,
          },
          response: response.data,
        });
      } catch (e) {
        systemStore.systemLog({
          api: "practiceList-getPracticeListByLevel",
          store: this.$id,
          status: "Error Get Practice List",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Get Practice Log
    async getPracticeLog() {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();

      try {
        // if (!this.practiceLog.isLoaded) {
        //   systemStore.systemLog({
        //     api: "practiceLog-getPracticeLogByStudentIdAndCourseId",
        //     store: this.$id,
        //     status: "Has Practice Log",
        //   })
        //   return
        // }

        this.practiceLog.isUpdate = false;

        const APIURL = `${process.env.NEWAPI_ASIA}/practiceLog-getPracticeLogByStudentIdAndCourseId?studentId=${studentStore.studentId}&courseId=${studentStore.courseId}`;

        const response = await axios.get(APIURL);

        this.$patch({
          practiceLog: {
            data: response.data,
            isLoaded: true,
          },
        });

        systemStore.systemLog({
          api: "practiceLog-getPracticeLogByStudentIdAndCourseId",
          store: this.$id,
          status: "Success Get Practice Log",
          get: {
            studentId: studentStore.studentId,
            courseId: studentStore.courseId,
          },
          response: response.data,
        });
      } catch (e) {
        systemStore.systemLog({
          api: "practiceLog-getPracticeLogByStudentIdAndCourseId",
          store: this.$id,
          status: "Error Get Practice Log",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Get Flashcard Learning Practice
    async getFlashcardLearningPractice() {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();
      const synchronizeStore = useSynchronizeStore();

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/practice-getFlashcardLearningPractice?practiceListId=${this.practiceData.id}&studentId=${studentStore.studentId}&unit=${this.unit}&isSync=${synchronizeStore.isSync}&token=${studentStore.tokenId}`;

        const response = await axios.get(APIURL);

        let temp = [];

        response.data.forEach((res) => {
          let newData = {
            ...res,
            tagAudioUrl: new Audio(res.audioUrl),
          };

          temp.push(newData);
        });

        systemStore.systemLog({
          api: "practice-getFlashcardLearningPractice",
          store: this.$id,
          status: "Success Get Flashcard Learning Practice",
          get: {
            practiceListId: this.practiceData.id,
            studentId: studentStore.studentId,
            unit: this.unit,
            isSync: synchronizeStore.isSync,
          },
          response: response.data,
        });

        return temp;
      } catch (e) {
        systemStore.systemLog({
          api: "practice-getFlashcardLearningPractice",
          store: this.$id,
          status: "Error Get Flashcard Learning Practice",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Get Vocab Multiple By Practice List Id
    async getVocabMultipleByPracticeListId() {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/practice-getVocabMultipleByPracticeListId?practiceListId=${this.practiceData.id}&token=${studentStore.tokenId}`;

        const response = await axios.get(APIURL);

        if (response.status != 200) {
          throw new Error("Error Get Vocab Multiple By Practice List Id");
        }

        let temp = response.data;

        temp.forEach((res) => {
          res.isCorrect = false;
        });

        temp.sort(() => Math.random() - 0.5);

        if (studentStore.studentType == "school") {
          temp = temp.slice(0, 8);
        }

        systemStore.systemLog({
          api: "practice-getVocabMultipleByPracticeListId",
          store: this.$id,
          status: "Success Get Vocab Multiple By Practice List Id",
          get: {
            practiceListId: this.practiceData.id,
          },
          response: response.data,
        });
        return temp;
      } catch (e) {
        systemStore.systemLog({
          api: "practice-getVocabMultipleByPracticeListId",
          store: this.$id,
          status: "Error Get Vocab Multiple By Practice List Id",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Get Flashcard
    async getFlashcard() {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/practice-getFlashcard?practiceListId=${this.practiceData.id}&token=${studentStore.tokenId}`;

        const response = await axios.get(APIURL);

        if (response.status == 401) {
          return 401;
        }

        let temp = [];

        response.data.forEach((res) => {
          let newData = {
            ...res,
            tagAudioSentenceUrl: res.soundSentenceUrl
              ? new Audio(res.soundSentenceUrl)
              : "",
            tagAudioSpellUrl: res.soundSpellUrl
              ? new Audio(res.soundSpellUrl)
              : "",
            tagAudioVocabUrl: res.soundVocabUrl
              ? new Audio(res.soundVocabUrl)
              : "",
          };

          temp.push(newData);
        });

        systemStore.systemLog({
          api: "practice-getFlashcard",
          store: this.$id,
          status: "Success Get Flashcard",
          get: {
            practiceListId: this.practiceData.id,
          },
          response: response.data,
        });

        return temp;
      } catch (e) {
        systemStore.systemLog({
          api: "practice-getFlashcard",
          store: this.$id,
          status: "Error Get Flashcard",
          description: e,
          isError: true,
        });

        return e;
      }
    },
    // #endregion

    // #region Get Placement Test
    async getPlacementTest() {
      const systemStore = useSystemStore();

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/placement-getPlacementNewPlacementTest`;

        const response = await axios.get(APIURL);

        if (response.status != 200) {
          throw new Error("Error Get Placement");
        }

        systemStore.systemLog({
          api: "placement-getPlacementNewPlacementTest",
          store: this.$id,
          status: "Success Get Placement",
          response: response.data,
        });

        return {
          data: response.data,
          message: "success",
        };
      } catch (e) {
        systemStore.systemLog({
          api: "placement-getPlacementNewPlacementTest",
          store: this.$id,
          status: "Error Get Placement",
          description: e,
          isError: true,
        });
        return {
          data: [],
          message: "error",
        };
      }
    },
    // #endregion

    // #region Get Check Daily Practice Quota
    async getCheckDailyPracticeQuota() {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();
      const buddyStore = useBuddyStore();

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/dailyPracticeQuota-checkDailyPracticeQuota?courseId=${studentStore.courseId}&studentId=${studentStore.studentId}&practiceType=${this.practiceType}&practiceListId=${this.practiceListId}`;

        const response = await axios.get(APIURL);

        if (buddyStore.isBuddy) {
          const APIURL = `${process.env.NEWAPI_ASIA}/dailyPracticeQuota-checkDailyPracticeQuota?courseId=${buddyStore.courseId}&studentId=${buddyStore.studentId}&practiceType=${this.practiceType}&practiceListId=${this.practiceListId}`;

          const response = await axios.get(APIURL);
          buddyStore.$patch({
            buddy: {
              practiceData: {
                quota: response.data,
              },
            },
          });
        }

        systemStore.systemLog({
          api: "dailyPracticeQuota-checkDailyPracticeQuota",
          store: this.$id,
          status: "Success Check Daily Practice Quota",
          get: {
            courseId: studentStore.courseId,
            studentId: studentStore.studentId,
            practiceType: this.practiceType,
            practiceListId: this.practiceListId,
          },
          response: response.data,
        });
        return response.data;
      } catch (e) {
        systemStore.systemLog({
          api: "dailyPracticeQuota-checkDailyPracticeQuota",
          store: this.$id,
          status: "Error Check Daily Practice Quota",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Check Testing Mode
    async checkTestingMode() {
      const courseStore = useCourseStore();
      const systemStore = useSystemStore();

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/prePostTest-checkTestingMode?courseId=${courseStore.courseData.courseId}`;

        let response = await axios.get(APIURL);

        if (response.status == 200) {
          let newData = {
            testType: "",
            isShowPopupPretest: false,
            testEndDate: "",
            isContinue: false,
          };

          if (response.data.message == "notPassed") {
            newData.testType = response.data.data.testMode;

            let date = response.data.data.settings.endDate.split("/");
            let d = Number(date[2]);
            let m = months_th_mini[Number(date[1]) - 1];
            let y = Number(date[0]) + 543;

            newData.testEndDate = `${d} ${m} ${y}`;

            newData.isShowPopupPretest = true;
          } else if (response.data.message == "notOpen") {
            newData.isShowPopupPretest = false;
          } else if (response.data.message == "continue") {
            newData.testType = response.data.data.testMode;
            newData.isContinue = true;
            newData.isShowPopupPretest = true;
          }

          systemStore.systemLog({
            api: "prePostTest-checkTestingMode",
            store: this.$id,
            status: "Success Check Testing Mode",
            get: {
              courseId: courseStore.courseData.courseId,
            },
            response: newData,
            description: `Status Code : ${response.status}`,
          });

          return newData;
        } else {
          throw new Error("Error Check Testing Mode");
        }
      } catch (e) {
        systemStore.systemLog({
          api: "prePostTest-checkTestingMode",
          store: this.$id,
          status: "Error Check Testing Mode",
          get: {
            courseId: courseStore.courseData.courseId,
          },
          response: {
            testType: "",
            isShowPopupPretest: false,
            testEndDate: "",
          },
          description: `Status Code : Error`,
        });
      }
    },
    // #endregion

    // #region Get Pre Post Test Question
    async getEncryptedTestQuestions(routename) {
      const courseStore = useCourseStore();
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();

      try {
        const API = `${process.env.NEWAPI_ASIA}/prePostTest-getEncryptedTestQuestions?level=${courseStore.courseLevel}&type=${routename}&courseId=${studentStore.courseId}`;

        const response = await axios.get(API);

        if (response.status == "200") {
          let temp = [];

          let decryptTemp = systemStore.decryptJSON(response.data.data);

          decryptTemp.forEach((res) => {
            let newData = {
              ...res,
              isSelectedAnswer: false,
              selectedAnswer: null,
              selectedAnswerIndex: null,
              isMark: false,
              isCorrectAnswer: false,
            };

            if (res?.isDone) {
              let answerIndex = Number(res.userAnswer);

              newData.isCorrectAnswer = res.isCorrect;
              newData.isSelectedAnswer = true;
              newData.selectedAnswer = res.choices.find(
                (x) => x.index == answerIndex
              ).choice;
              newData.selectedAnswerIndex = res.choices
                .map((x) => x.index)
                .indexOf(answerIndex);
            }

            temp.push(newData);
          });

          if (routename == "quizMid" || routename == "quizPost") {
            let findQuestionDone = temp.filter((x) => x.isDone);

            temp = temp.filter((x) => !x.isDone);

            temp = [...findQuestionDone, ...temp];

            this.prePostObject.currentQuestion = findQuestionDone.length || 0;
          }

          this.setTestQuestionObject(
            temp,
            routename,
            response.data.remainingTime
          );

          systemStore.systemLog({
            api: "prePostTest-getEncryptedTestQuestions",
            store: this.$id,
            status: "Success Get Pre Post Test Question",
            get: {
              level: courseStore.courseLevel,
              type: routename,
            },
            response: temp,
            description: `Status Code : ${response.status}`,
          });

          return temp;
        } else {
          throw new Error("Error Get Pre Post Test Question");
        }
      } catch (e) {
        systemStore.systemLog({
          api: "prePostTest-getEncryptedTestQuestions",
          store: this.$id,
          status: "Error Pre Post Test Question",
          response: "Error",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Get Test Reward
    async getTestReward(routename) {
      const systemStore = useSystemStore();

      try {
        const API = `${process.env.NEWAPI_ASIA}/prePostTest-getTestReward?type=${routename}`;

        const response = await axios.get(API);

        if (response.status == "200") {
          this.setPrePostReward(response.data.data);

          systemStore.systemLog({
            api: "prePostTest-getTestReward",
            store: this.$id,
            status: "Get Question Test Reward",
            get: {
              type: routename,
            },
            response: response.data.data,
            description: `Status Code : ${response.status}`,
          });
          return response.data.data;
        } else {
          throw new Error("Error Get Question Test Reward");
        }
      } catch (e) {
        systemStore.systemLog({
          api: "prePostTest-getTestReward",
          store: this.$id,
          status: "Error Get Question Test Reward",
          get: {
            type: routename,
          },
          response: "Error",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Check Questionnaire
    async checkQuestionnaire() {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/questionnaire-checkQuestionnaireStatus?courseId=${studentStore.courseId}`;

        const response = await axios.get(APIURL);

        if (response.data.message == "success") {
          let temp = [];

          response.data.data.forEach((res) => {
            let date = res.startDate.split("/");

            let newData = {
              ...res,
              formatDate: `${date[2]} ${months_th_mini[Number(date[1]) - 1]} ${
                Number(date[0]) + 543
              }`,
            };

            if (!newData.isDone) {
              temp.push(newData);
            }
          });

          systemStore.systemLog({
            api: "questionnaire-checkQuestionnaireStatus",
            store: this.$id,
            status: "Success Check Questionnaire",
            get: {
              courseId: studentStore.courseId,
            },
            response: response.data.data,
          });

          this.$patch({
            questionnaireObject: {
              data: temp,
              isHasData: true,
            },
          });

          return temp;
        }
      } catch (e) {
        systemStore.systemLog({
          api: "questionnaire-checkQuestionnaireStatus",
          store: this.$id,
          status: "Error Check Questionnaire",
          get: {
            courseId: studentStore.courseId,
          },
          description: e,
          isError: true,
        });
      }
    },
    // #endregion

    // #region Get Questionnaire
    async getQuestionnaire() {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/questionnaire-getQuestionnaire?questionnaireSetId=${this.questionnaireData.questionnaireSetId}&courseId=${studentStore.courseId}`;

        const response = await axios.get(APIURL);

        if (response.data.message == "success") {
          let temp = [];

          response.data.data.forEach((res) => {
            let newData = {
              selected: null,
              description: "",
              ...res,
            };

            if (res.type == "multipleChoices") {
              newData.selected = [];
            }

            if (res.isDone) {
              newData.selected = res.userAnswer;
              newData.description = res.description;
            }

            temp.push(newData);
          });

          systemStore.systemLog({
            api: "questionnaire-getQuestionnaire",
            store: this.$id,
            status: "Success Get Questionnaire",
            get: {
              questionnaireSetId: this.questionnaireData.questionnaireSetId,
              courseId: studentStore.courseId,
            },
            description: response.data.data,
          });

          return temp;
        } else {
          throw new Error("Error Get Questionnaire");
        }
      } catch (e) {
        systemStore.systemLog({
          api: "questionnaire-getQuestionnaire",
          store: this.$id,
          status: "Error Get Questionnaire",
          get: {
            questionnaireSetId: this.questionnaireData.questionnaireSetId,
            courseId: studentStore.courseId,
          },
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Check Unit Progress
    async checkUnitProgress(courseId) {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();
      const courseStore = useCourseStore();

      let courseLevel = courseStore.list.find((x) => x.courseId == courseId);

      if (courseLevel) {
        courseLevel = courseLevel.level;
      }

      try {
        const APIURL = `${process.env.NEWAPI}/unitProgress-unitProgress?courseId=${courseId}&studentId=${studentStore.studentId}&mode=checkReward`;

        const response = await axios.get(APIURL);

        if (response.data.message != "success") {
          throw new Error("Error Get Unit Progress");
        }

        if (response.data.isShowRewardDialog) {
          this.$patch({
            practiceCompleteObject: {
              isShowRewardDialog: response.data.isShowRewardDialog,
            },
          });
        }

        const progress = (response.data.numOfReceivedReward / 16) * 100;

        const responseData = {
          level: courseLevel,
          unit: response.data.latestCompleteUnit || 0,
          rewardStep: response.data.rewardStep || 0,
          reward: response.data.reward || [],
          totalCoinReward: response.data.totalCoinReward || 0,
          totalKeyReward: response.data.totalKeyReward || 0,
          progressComplete: progress || 0,
          progressAnimation: progress || 0,
          numOfReceivedReward: response.data.numOfReceivedReward || 0,
          isLoaded: true,
          courseId: courseId,
          isShowRewardDialog: response.data.isShowRewardDialog,
        };

        let tempDecrypt = [];

        if (this.practiceCompleteObject.isEncrypted) {
          tempDecrypt = systemStore.decryptJSON(
            this.practiceCompleteObject.data
          );

          let findProgressLevel = tempDecrypt.find(
            (x) => x.level == courseLevel
          );

          if (findProgressLevel) {
            let findProgressLevelIndex = tempDecrypt
              .map((x) => x.level)
              .indexOf(courseLevel);

            tempDecrypt[findProgressLevelIndex].progressComplete = progress;
            tempDecrypt[findProgressLevelIndex].progressAnimation = progress;
            tempDecrypt[findProgressLevelIndex].reward = response.data.reward;
            tempDecrypt[findProgressLevelIndex].rewardStep =
              response.data.rewardStep;
            tempDecrypt[findProgressLevelIndex].numOfReceivedReward =
              response.data.numOfReceivedReward;
            tempDecrypt[findProgressLevelIndex].courseId = courseId;
            tempDecrypt[findProgressLevelIndex].isLoaded = true;
            tempDecrypt[findProgressLevelIndex].isShowRewardDialog =
              response.data.isShowRewardDialog;

            (tempDecrypt[findProgressLevelIndex].unit =
              response.data.latestCompleteUnit || 0),
              tempDecrypt.push([]);
            tempDecrypt.pop();
          } else {
            tempDecrypt.push(responseData);
          }
        } else {
          tempDecrypt.push(responseData);
        }

        tempDecrypt.sort((a, b) => a.level - b.level);

        if (studentStore.studentType == "school") {
          tempDecrypt.map((x) => {
            x.progressAnimation = x.progressComplete;

            return x;
          });

          let tempEncrypt = systemStore.encryptJSON(tempDecrypt);

          this.$patch({
            practiceCompleteObject: {
              data: tempEncrypt,
              isEncrypted: true,
            },
          });

          setTimeout(() => {
            tempDecrypt.map((x) => {
              x.progressAnimation = (x.rewardStep / 16) * 100;

              return x;
            });

            tempEncrypt = systemStore.encryptJSON(tempDecrypt);

            this.$patch({
              practiceCompleteObject: {
                data: tempEncrypt,
                isEncrypted: true,
              },
            });
          }, 1500);
        }

        let tempEncrypt = systemStore.encryptJSON(tempDecrypt);

        this.$patch({
          practiceCompleteObject: {
            data: tempEncrypt,
            isEncrypted: true,
          },
        });

        systemStore.systemLog({
          api: "unitProgress",
          store: this.$id,
          status: "Success Check Unit Progress",
          get: {
            courseId: courseId,
            studentId: studentStore.studentId,
            mode: "checkReward",
          },
          response: response.data,
        });

        if (studentStore.studentType == "school") {
          this.$patch({
            practiceCompleteObject: {
              isLoaded: true,
            },
          });
        }

        return "success";
      } catch (e) {
        systemStore.systemLog({
          api: "unitProgress",
          store: this.$id,
          get: {
            courseId: courseId,
            studentId: studentStore.studentId,
            mode: "checkReward",
          },
          status: "Error Check Unit Progress",
          description: e,
          isError: true,
        });

        return "error";
      }
    },
    // #endregion

    // #region Get Unit Progress for Student online
    async getUnitProgressForStudentOnline() {
      const courseStore = useCourseStore();
      const systemStore = useSystemStore();

      let courseList = courseStore.list;

      try {
        if (this.practiceCompleteObject.isEncrypted) {
          let tempDecrypt = systemStore.decryptJSON(
            this.practiceCompleteObject.data
          );

          tempDecrypt.map((x) => {
            x.progressAnimation = x.progressComplete;
            x.isLoaded = false;

            return x;
          });

          let tempEncrypt = systemStore.encryptJSON(tempDecrypt);

          this.$patch({
            practiceCompleteObject: {
              data: tempEncrypt,
            },
          });
        }

        this.$patch({
          practiceCompleteObject: {
            isLoaded: false,
          },
        });

        const promises = courseList.map(async (resCourse) => {
          const response = await this.checkUnitProgress(resCourse.courseId);

          if (response !== "success") {
            throw new Error("Error Get Unit Progress");
          }
          return response; // Ensure we return something to resolve the promise
        });

        try {
          await Promise.all(promises);
          // console.log("All unit progress checks completed successfully.");
        } catch (error) {
          console.error(
            "An error occurred while checking unit progress:",
            error.message
          );
        }

        // if(countFor == courseList.length){
        systemStore.systemLog({
          api: "unitProgress",
          store: this.$id,
          status: "Success Get Unit Progress Online",
          get: {
            courseId: courseList.map((x) => x.courseId).join(","),
            studentId: useStudentStore().studentId,
            mode: "checkReward",
          },
        });

        let tempDecrypt = systemStore.decryptJSON(
          this.practiceCompleteObject.data
        );

        setTimeout(() => {
          tempDecrypt.map((x) => {
            x.progressAnimation = (x.rewardStep / 16) * 100;

            return x;
          });

          let tempEncrypt = systemStore.encryptJSON(tempDecrypt);

          this.$patch({
            practiceCompleteObject: {
              data: tempEncrypt,
            },
          });
        }, 1500);

        this.$patch({
          practiceCompleteObject: {
            isLoaded: true,
          },
        });

        return "success";
        // }
      } catch (e) {
        systemStore.systemLog({
          api: "unitProgress",
          store: this.$id,
          get: {
            courseId: courseList.map((x) => x.courseId).join(","),
            studentId: useStudentStore().studentId,
            mode: "checkReward",
          },
          status: "Error Get Unit Progress Online",
          description: e,
          isError: true,
        });

        return "error";
      }
    },
    // #endregion

    // #region Get Unit Progress
    async getUnitProgress() {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/unitProgress-getUnitProgress?studentId=${studentStore.studentId}`;

        const response = await axios.get(APIURL);

        if (response.status != "200") {
          throw new Error(response.data.message);
        }

        let tempEncrypt = systemStore.encryptJSON(response.data);

        this.$patch({
          practiceProgressObject: {
            data: tempEncrypt,
            isEncrypted: true,
          },
        });

        systemStore.systemLog({
          api: "getUnitProgress",
          store: this.$id,
          get: {
            studentId: studentStore.studentId,
          },
          status: "Success Get Unit Progress",
        });

        return "success";
      } catch (e) {
        systemStore.systemLog({
          api: "getUnitProgress",
          store: this.$id,
          status: "Error Get Unit Progress",
          description: e,
          isError: true,
        });

        return "error";
      }
    },
    // #endregion

    // #region Check First time load lesson achievement
    async checkFirstTimeShowDialogLessonAchievement() {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();

      try {
        const response = await systemStore.getServerTime();

        if (response.message != "success") {
          throw new Error("error get time");
        }

        let date = new Date(response.data.timestamp);
        let d = date.getDate();
        let m = `${date.getMonth() + 1 < 10 ? "0" : ""}${date.getMonth() + 1}`;
        let y = date.getFullYear();

        let tempDate = `${d}/${m}/${y}`;

        if (studentStore.studentData.latestViewedUnitProgress == tempDate) {
          this.$patch({
            practiceCompleteObject: {
              isFirstTime: false,
            },
          });
        } else {
          this.$patch({
            practiceCompleteObject: {
              isFirstTime: true,
            },
          });
        }

        systemStore.systemLog({
          api: "getServerTime",
          store: this.$id,
          status: "Success Check First Time Show Dialog Lesson Achievement",
          response: response.data,
        });
      } catch (e) {
        systemStore.systemLog({
          api: "getServerTime",
          store: this.$id,
          status: "Error Check First Time Show Dialog Lesson Achievement",
          description: e,
          isError: true,
        });
      }
    },
    // #endregion

    // #region Check eExam
    async checkExam() {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();
      const courseStore = useCourseStore();

      let tempExam = [];

      const APIURL = `${process.env.NEWAPI}/eExam-checkExamOpen`;

      const POSTDATA = {
        studentId: studentStore.studentId,
        class: courseStore.class,
        schoolId: studentStore.schoolId,
      };

      try {
        const getServerTime = await systemStore.getServerTime();

        if (getServerTime.message != "success") {
          throw new Error("Error Get Server Time");
        }

        const response = await axios.post(APIURL, POSTDATA);

        if (response.data === "exam not found") {
          throw new Error(response.data);
        }

        response.data.forEach((element) => {
          let startDate = element.startDate;
          let endDate = element.endDate;
          let currentDate = new Date().getTime();

          // let currentDate = element.currentTime;
          if (currentDate >= startDate && currentDate <= endDate) {
            if (element.roomSelected.includes(courseStore.room)) {
              let examId = element.examId;

              let timeoutSec =
                Number(element.timeBalance.min) * 60 +
                Number(element.timeBalance.sec);

              tempExam.push({
                examId: examId,
                title: element.title,
                startTime: element.startTime,
                endTime: element.endTime,
                timeoutSec: timeoutSec,
              });
            }
          }
        });

        systemStore.systemLog({
          api: "eExam-checkExamOpen",
          store: this.$id,
          post: POSTDATA,
          status: "Success Check eExam",
          description: e,
        });

        return tempExam;
      } catch (e) {
        systemStore.systemLog({
          api: "eExam-checkExamOpen",
          store: this.$id,
          post: POSTDATA,
          status: "Error Check eExam",
          description: e,
          isError: true,
        });

        return tempExam;
      }
    },
    // #endregion

    // #endregion

    // #region ***** Function Save And Update *****

    // #region Save Incorrect Vocab
    async saveIncorrectVocab(practice) {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();
      const buddyStore = useBuddyStore();

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/incorrectPracticeLog-saveIncorrectVocab`;

        let POSTDATA = {
          studentId: studentStore.studentId,
          courseId: studentStore.courseId,
          practiceListId: this.practiceListId,
          flashcardId: practice.flashcardId,
          vocab: practice.vocab,
          unit: this.unit,
        };

        axios.post(APIURL, POSTDATA);

        if (buddyStore.isBuddy) {
          let POSTDATA2 = {
            studentId: buddyStore.studentId,
            courseId: buddyStore.courseId,
            practiceListId: this.practiceListId,
            flashcardId: practice.flashcardId,
            vocab: practice.vocab,
            unit: this.unit,
          };

          axios.post(APIURL, POSTDATA2);
        }

        systemStore.systemLog({
          api: "incorrectPracticeLog-saveIncorrectVocab",
          store: this.$id,
          status: "Success Save Incorrect Vocab",
          post: POSTDATA,
        });
      } catch (e) {
        systemStore.systemLog({
          api: "incorrectPracticeLog-saveIncorrectVocab",
          store: this.$id,
          status: "Error Save Incorrect Vocab",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Save Synchronize Flashcard Practice
    async saveSynchronizeFlashcardPractice(isFinish, score, progress, temp) {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();
      const buddyStore = useBuddyStore();
      try {
        let tempScore = Math.round(score);

        const APIURL = `${process.env.NEWAPI_ASIA}/course-saveSynchronizeFlashcardPractice`;

        let newTempData = temp.map((x) => {
          return { vocab: x.vocab, score: x.score || 0 };
        });

        const POSTDATA = {
          courseId: studentStore.courseId,
          isFinish: isFinish,
          progress: progress || 0,
          scoreAvg: tempScore || 0,
          vocab: newTempData,
          name: studentStore.studentFullName,
          practiceListId: this.practiceListId,
        };

        axios.post(APIURL, POSTDATA);

        if (buddyStore.isBuddy) {
          const POSTDATA2 = {
            courseId: buddyStore.courseId,
            isFinish: isFinish,
            progress: progress || 0,
            scoreAvg: tempScore || 0,
            vocab: newTempData,
            name: buddyStore.studentFullName,
            practiceListId: this.practiceListId,
          };

          axios.post(APIURL, POSTDATA2);
        }
        systemStore.systemLog({
          api: "course-saveSynchronizeFlashcardPractice",
          store: this.$id,
          status: "Success Save Synchronize Flashcard Practice",
          post: POSTDATA,
        });
      } catch (e) {
        systemStore.systemLog({
          api: "course-saveSynchronizeFlashcardPractice",
          store: this.$id,
          status: "Error Save Synchronize Flashcard Practice",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Update Synchronize Flashcard Progress
    async updateSynchronizeFlashcardProgress(practice) {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();
      const buddyStore = useBuddyStore();

      try {
        let totalSum =
          Math.round((practice.totalCorrect / practice.totalNext) * 100) || 0;

        const APIURL = `${process.env.NEWAPI_ASIA}/course-updateSynchronizeFlashcardProgress`;

        const POSTDATA = {
          courseId: studentStore.courseId,
          flashcardProgress: practice.progress,
          score: totalSum || 0,
        };

        axios.post(APIURL, POSTDATA);

        if (buddyStore.isBuddy) {
          const POSTDATA2 = {
            courseId: buddyStore.courseId,
            flashcardProgress: practice.progress,
            score: totalSum || 0,
          };

          axios.post(APIURL, POSTDATA2);
        }

        systemStore.systemLog({
          api: "course-updateSynchronizeFlashcardProgress",
          store: this.$id,
          status: "Success Update Synchronize Flashcard Progress",
          post: POSTDATA,
          response: "Success",
        });
      } catch (e) {
        systemStore.systemLog({
          api: "course-updateSynchronizeFlashcardProgress",
          store: this.$id,
          status: "Error Update Synchronize Flashcard Progress",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Save Update Course Sync
    async saveUpdateCourseSync(currentQuestion, tempAnswer, score) {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();
      const buddyStore = useBuddyStore();

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/course-updateCourseSync`;

        let POSTDATA = {
          courseId: studentStore.courseId,
          currentQuestion: currentQuestion,
          currentPracticeListId: this.practiceListId,
          answer: tempAnswer,
          currentScore: score,
        };

        axios.post(APIURL, POSTDATA);

        if (buddyStore.isBuddy) {
          let POSTDATA2 = {
            courseId: buddyStore.courseId,
            currentQuestion: currentQuestion,
            currentPracticeListId: this.practiceListId,
            answer: tempAnswer,
            currentScore: score,
          };

          axios.post(APIURL, POSTDATA2);
        }

        systemStore.systemLog({
          api: "course-updateCourseSync",
          store: this.$id,
          status: "Success Save Update Course Sync",
          post: POSTDATA,
        });
      } catch (e) {
        systemStore.systemLog({
          api: "course-updateCourseSync",
          store: this.$id,
          status: "Error Save Update Course Sync",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Save Test Reward
    async saveTestReward(testType, reward) {
      const courseStore = useCourseStore();
      const studentStore = useStudentStore();
      const systemStore = useSystemStore();
      const inventoryStore = useInventoryStore();

      try {
        const API = `${process.env.NEWAPI_ASIA}/prePostTest-saveTestReward`;

        const POSTDATA = {
          courseId: courseStore.courseData.courseId,
          studentId: studentStore.studentId,
          testType: testType,
          reward: reward,
        };

        const response = await axios.post(API, POSTDATA);

        if (
          response.data.message == "already get reward" ||
          response.data.message == "Success"
        ) {
          systemStore.systemLog({
            api: "prePostTest-saveTestReward",
            store: this.$id,
            status: "Success Save Test Reward",
            post: POSTDATA,
            description: response.data.message,
          });
        } else if (response.data.message == "Error") {
          systemStore.systemLog({
            api: "prePostTest-saveTestReward",
            store: this.$id,
            status: "Error Save Test Reward",
            description: response.data.data,
            isError: true,
          });
        }

        inventoryStore.inventory.isUpdate = true;
      } catch (e) {
        systemStore.systemLog({
          api: "prePostTest-saveTestReward",
          store: this.$id,
          status: "Error Save Test Reward",
          description: e,
          isError: true,
        });
      }
    },
    // #endregion

    // #region Remove Incorrect Practice
    async removeIncorrectPractice(incorrectId) {
      const systemStore = useSystemStore();
      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/incorrectPracticeLog-removeVocabularyLogs?vocabLogId=${incorrectId}`;

        await axios.get(APIURL);

        systemStore.systemLog({
          api: "incorrectPracticeLog-removeVocabularyLogs",
          store: this.$id,
          status: "Success remove incorrect practice log",
          get: {
            vocabLogId: incorrectId,
          },
        });
      } catch (e) {
        systemStore.systemLog({
          api: "incorrectPracticeLog-removeVocabularyLogs",
          store: this.$id,
          status: "Error remove incorrect practice log",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Save Practice Log
    async savePracticeLog(practice, platform) {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();
      const buddyStore = useBuddyStore();
      const synchronizeStore = useSynchronizeStore();
      const courseStore = useCourseStore();

      try {
        let responseTime = await systemStore.getServerTime();

        if (responseTime.message != "success") {
          throw new Error("error get time");
        }

        let getTime = Math.round(responseTime.data.timestamp / 1000).toFixed(0);

        let setScore = Math.round(practice.score);

        if (this.practiceType == "roleplay") {
          if (setScore < 50) {
            return;
          }
        }

        let practiceMode = practice.mode;

        let POSTDATA = {
          counter: 0,
          courseId: "",
          practiceListId: this.practiceListId,
          score: 0,
          star: 0,
          studentId: studentStore.studentId,
          schoolId: studentStore.schoolId,
          practiceType: "",
          browser: platform.name,
          platform: platform.platform,
          mode: practiceMode,
          coin: 0,
          isSync: synchronizeStore.isSync,
          isBuddy: buddyStore.isBuddy || false,
        };

        let findPracticeLog;

        if (this.practiceType == "readinglesson") {
          findPracticeLog = this.log.find(
            (x) => x.practiceListId == `${this.practiceListId}-lesson`
          );
        } else {
          findPracticeLog = this.log.find(
            (x) => x.practiceListId == this.practiceListId
          );
        }

        let tempLog = [];

        // มี Log แล้ว
        if (findPracticeLog) {
          POSTDATA = {
            counter: findPracticeLog.counter,
            courseId: studentStore.courseId,
            practiceListId: this.practiceListId,
            score: setScore,
            star: practice.star,
            studentId: studentStore.studentId,
            schoolId: studentStore.schoolId,
            practiceType: this.practiceType,
            browser: platform.name,
            platform: platform.platform,
            mode: findPracticeLog.mode,
            coin: practice.coin,
            isSync: findPracticeLog.isSync,
            isBuddy: buddyStore.isBuddy || false,
          };
        }
        // ไม่มี Log
        else {
          if (
            // this.practiceType != 'flashcard' &&
            this.practiceType != "grammarlesson" &&
            this.practiceType != "phonicslesson" &&
            this.practiceType != "languagetips" &&
            this.practiceType != "conversationlesson" &&
            this.practiceType != "readinglesson"
          ) {
            practiceMode = "practice";
          } else {
            practiceMode = "lesson";
          }

          let setCounter = 0;

          if (!synchronizeStore.isSync) {
            if (practice.star != 0) {
              setCounter = 1;
            }
          } else if (synchronizeStore.isSync) {
            if (this.practiceType == "flashcard") setCounter = 1;
          }

          POSTDATA = {
            counter: setCounter,
            courseId: studentStore.courseId,
            practiceListId: this.practiceListId,
            score: setScore,
            star: practice.star,
            studentId: studentStore.studentId,
            schoolId: studentStore.schoolId,
            practiceType: this.practiceType,
            browser: platform.name,
            platform: platform.platform,
            mode: practiceMode,
            coin: practice.coin,
            isSync: synchronizeStore.isSync,
            isBuddy: buddyStore.isBuddy || false,
          };
        }

        let totalCorrectQuestion = practice.totalCorrectQuestion || 0;
        let tempTotalExp = 0;
        let firstTimeExp = 1500;
        let sumTotalExp = 0;

        if (this.currentPracticeData.isLesson) {
          firstTimeExp = 2500;

          if (practice.isFirstTimeReward) {
            sumTotalExp = firstTimeExp;
          } else {
            if (this.practiceData.type == "flashcard") {
              sumTotalExp = practice.totalCorrect;
            }
          }
        } else {
          firstTimeExp = 1500;

          sumTotalExp = totalCorrectQuestion;

          if (practice.isFirstTimeReward) {
            sumTotalExp = totalCorrectQuestion * firstTimeExp;
          }
        }

        tempTotalExp = sumTotalExp;

        POSTDATA.pendingEXP = sumTotalExp;

        POSTDATA.version = p_json.version;

        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/practiceLog-savePracticeLogV4`;

        let response = await axios.post(APIURL, POSTDATA);

        if (response.status != 200) {
          throw new Error("Error Save Practice Log");
        }

        studentStore.updateTotalExp(tempTotalExp);

        tempLog = this.practiceLog.data;

        if (findPracticeLog) {
          // console.log("B");
          if (!synchronizeStore.isSync) {
            // console.log("C");

            if (findPracticeLog.counter == 0 && practice.star == 0) {
              // console.log("C-1");
              return "success";
            } else {
              if (findPracticeLog.counter != 2) findPracticeLog.counter++;
            }
          } else {
            // console.log("D");

            if (this.practiceType == "flashcard") {
              findPracticeLog.counter++;
            }
          }

          // console.log("E");

          if (setScore > findPracticeLog.score) {
            findPracticeLog.score = setScore || 0;
          }

          if (practice.star > findPracticeLog.star) {
            findPracticeLog.star = practice.star || 0;
          }

          findPracticeLog.schoolId = studentStore.schoolId;
          findPracticeLog.practiceType = this.practiceType;
          findPracticeLog.browser = platform.name;
          findPracticeLog.platform = platform.platform;
          findPracticeLog.coin = practice.coin;
          findPracticeLog.isLocal = false;

          if (!findPracticeLog.lastTimestamp) {
            findPracticeLog.lastTimestamp = {
              _seconds: getTime,
            };

            findPracticeLog.isLocal = true;
          }
        } else {
          // console.log('A');
          // if ((!synchronizeStore.isSync && practice.star != 0) || (!synchronizeStore.isSync && practiceMode == "lesson") || synchronizeStore.isSync) {
          // console.log('B');

          if (this.practiceType == "readinglesson") {
            tempLog.push({
              ...POSTDATA,
              practiceListId: `${POSTDATA.practiceListId}-lesson`,
              firstTimestamp: {
                _seconds: getTime,
              },
              isLocal: true,
            });
          } else {
            tempLog.push({
              ...POSTDATA,
              firstTimestamp: {
                _seconds: getTime,
              },
              isLocal: true,
            });
          }

          this.$patch({
            practiceLog: {
              data: tempLog,
              isUpdate: true,
            },
          });
          // }
        }

        // this.setPracticeCounter(response.data)

        if (buddyStore.isBuddy) {
          let POSTDATA2 = {
            ...POSTDATA,
            studentId: buddyStore.studentId,
            courseId: buddyStore.courseId,
            coin: practice.buddyCoin || practice.coin,
            isBuddy: buddyStore.isBuddy || false,
          };

          await axios.post(APIURL, POSTDATA2);
        }

        courseStore.updateProfileNotiStatus(true);

        this.$patch({
          practiceLog: {
            isUpdate: true,
          },
        });

        systemStore.systemLog({
          api: "practiceLog-savePracticeLogV4",
          store: this.$id,
          status: "Save Practice Log V4",
          post: POSTDATA,
          response: "Success",
        });

        return POSTDATA;
      } catch (e) {
        systemStore.systemLog({
          api: "practiceLog-savePracticeLogV4",
          store: this.$id,
          status: "Error Save Practice Log V4",
          response: "Error",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Save Progress Log
    async saveProgressLog(practiceId, practiceListId) {
      const studentStore = useStudentStore();
      const buddyStore = useBuddyStore();
      const systemStore = useSystemStore();
      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/progressLog-saveProgressLog`;

        const POSTDATA = {
          studentId: studentStore.student.uid,
          practiceListId: practiceListId || this.practiceListId,
          practiceId: practiceId,
          courseId: studentStore.courseId,
          schoolId: studentStore.schoolId,
          requestHash: window.location.hash,
        };

        axios.post(APIURL, POSTDATA);

        if (buddyStore.isBuddy) {
          const POSTDATA2 = {
            studentId: buddyStore.studentId,
            practiceListId: practiceListId || this.practiceListId,
            practiceId: practiceId,
            courseId: buddyStore.courseId,
            schoolId: buddyStore.schoolId,
            requestHash: window.location.hash,
          };
          axios.post(APIURL, POSTDATA2);
        }

        systemStore.systemLog({
          api: "progressLog-saveProgressLog",
          store: this.$id,
          status: "Success Save Progress Log",
          post: POSTDATA,
          response: "Success",
        });
      } catch (e) {
        systemStore.systemLog({
          api: "progressLog-saveProgressLog",
          store: this.$id,
          status: "Error Save Progress Log",
          response: "Error",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Update Dialy Practice Quota
    async updateDailyPracticeQuota(id) {
      const systemStore = useSystemStore();

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/dailyPracticeQuota-updateDailyPracticeQuota`;

        const POSTDATA = {
          dailyPracticeQuotaId: id,
        };

        await axios.post(APIURL, POSTDATA);

        systemStore.systemLog({
          api: "dailyPracticeQuota-updateDailyPracticeQuota",
          store: this.$id,
          status: "Success Update Daily Practice Quota",
          post: POSTDATA,
          response: "Success",
        });
      } catch (e) {
        systemStore.systemLog({
          api: "dailyPracticeQuota-updateDailyPracticeQuota",
          store: this.$id,
          status: "Error Update Daily Practice Quota",
          response: "Error",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // #endregion

    // #region Save Placement Log
    async savePlacementLog(placementData) {
      const studentStore = useStudentStore();
      const systemStore = useSystemStore();

      try {
        // const APIURL = `${process.env.NEWAPI_ASIA}/placement-savePlacementLog`

        const POSTDATA = {
          studentId: studentStore.student.uid,
          vocabLevel: placementData.vocabularyLevel,
          grammarLevel: placementData.grammarLevel,
          schoolId: studentStore.schoolId,
          courseId: studentStore.courseId,
          studentType: studentStore.studentType,
        };

        // await axios.post(APIURL, POSTDATA)

        systemStore.systemLog({
          api: "placement-savePlacementLog",
          store: this.$id,
          status: "Save Placement Log",
          post: POSTDATA,
          response: "Success",
        });
      } catch (e) {
        systemStore.systemLog({
          api: "placement-savePlacementLog",
          store: this.$id,
          status: "Error Save Placement Log",
          response: "Error",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    // ==================== Function Save Incorrect Practice and Remove Incorrect Practice ====================

    // #region
    async saveQuestionnaireLog(temp) {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();

      const POSTDATA = {
        question: temp.question,
        courseId: studentStore.courseId,
        answer: temp.selected,
        schoolId: studentStore.schoolId,
        studentId: studentStore.studentId,
        questionId: temp.id,
        description: temp.description,
      };

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/questionnaire-saveQuestionnaireLog`;

        const response = await axios.post(APIURL, POSTDATA);

        if (response.data.message == "success") {
          systemStore.systemLog({
            api: "questionnaire-saveQuestionnaireLog",
            store: this.$id,
            status: "Success Save questionnaire Log",
            post: POSTDATA,
            response: "Success",
          });
        } else {
          throw new Error("Error Save Questionnaire Log");
        }
      } catch (e) {
        systemStore.systemLog({
          api: "questionnaire-saveQuestionnaireLog",
          store: this.$id,
          status: "Error Save questionnaire Log",
          post: POSTDATA,
          response: "Error",
          description: e,
          isError: true,
        });
      }
    },
    // #endregion

    // #region Save Questionnaire set log
    async saveQuestionnaireSetLog() {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();

      const POSTDATA = {
        questionnaireSetId: this.questionnaireData.questionnaireSetId,
        courseId: studentStore.courseId,
        schoolId: studentStore.schoolId,
        studentId: studentStore.studentId,
      };

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/questionnaire-saveQuestionnaireSetLog`;

        const RESPONSE = await axios.post(APIURL, POSTDATA);

        if (RESPONSE.data.message == "success") {
          systemStore.systemLog({
            api: "questionnaire-saveQuestionnaireSetLog",
            store: this.$id,
            status: "Success Save questionnaire Set Log",
            post: POSTDATA,
            response: RESPONSE.data.data,
          });

          this.$patch({
            questionnaireObject: {
              status: {
                isFinish: true,
              },
            },
          });
        } else {
          throw new Error("Error Save Questionnaire Set Log");
        }
      } catch (e) {
        systemStore.systemLog({
          api: "questionnaire-saveQuestionnaireSetLog",
          store: this.$id,
          status: "Error Save questionnaire Set Log",
          post: POSTDATA,
          response: "Error",
          description: e,
          isError: true,
        });
      }
    },
    // #endregion

    // #region Save Quiz test
    async saveQuizByQuestion(questionId, answerIndex, type) {
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();

      const POSTDATA = {
        questionId: questionId,
        courseId: studentStore.courseId,
        studentId: studentStore.studentId,
        schoolId: studentStore.schoolId,
        answerIndex: answerIndex.toString(),
        type: type,
        remainingTime: this.prePostObject.timer,
      };

      try {
        const APIURL = `${process.env.NEWAPI_ASIA}/prePostTest-saveQuizByQuestion`;

        const response = await axios.post(APIURL, POSTDATA);

        if (
          response.data.message == "Success" ||
          response.data.message == "Update asnwer"
        ) {
          systemStore.systemLog({
            api: "prePostTest-saveQuizByQuestion",
            store: this.$id,
            status: "Save Quiz By Question",
            post: POSTDATA,
            description: response.data.message,
          });
        } else {
          throw new Error("Error Save Quiz By Question");
        }
      } catch (e) {
        systemStore.systemLog({
          api: "prePostTest-saveQuizByQuestion",
          store: this.$id,
          status: "Error Save Quiz By Question",
          post: POSTDATA,
          description: e,
          isError: true,
        });
      }
    },
    // #endregion
    // #endregion ==================== Save And Update ====================

    // #region Get Reward
    async getRewardComplete(courseId) {
      const studentStore = useStudentStore();
      const systemStore = useSystemStore();

      const APIURL = `${process.env.NEWAPI_ASIA}/unitProgress-unitProgress?courseId=${courseId}&studentId=${studentStore.studentId}&mode=getReward`;

      try {
        const response = await axios.get(APIURL);

        if (
          response.data.message != "success" &&
          response.data != "success get reward"
        ) {
          throw new Error(response.data);
        }

        systemStore.systemLog({
          api: "unitProgress",
          store: this.$id,
          status: "Success Get Reward Complete",
          get: {
            courseId: courseId,
            studentId: studentStore.studentId,
            mode: "getReward",
          },
          response: response.data,
        });

        return "success";
      } catch (e) {
        systemStore.systemLog({
          api: "unitProgress",
          store: this.$id,
          status: "Error Get Reward Complete",
          get: {
            courseId: courseId,
            studentId: studentStore.studentId,
            mode: "getReward",
          },
          description: e,
          isError: true,
        });

        return "error";
      }
    },
    // #endregion

    // #region Get Current Reward Complete
    async getCurrentRewardComplete(courseId) {
      const systemStore = useSystemStore();

      try {
        let response = await this.getRewardComplete(courseId);

        if (response != "success") {
          throw new Error(response);
        }

        this.clearPracticeComplete();

        systemStore.systemLog({
          api: "-",
          store: this.$id,
          status: "Success Get Current Reward Complete",
        });

        return "success";
      } catch (e) {
        systemStore.systemLog({
          api: "-",
          store: this.$id,
          status: "Error Get Current Reward Complete",
          description: e,
          isError: true,
        });

        return "error";
      }
    },
    // #endregion

    // #region Get Reward All Course
    async getRewardAllComplete(array) {
      const systemStore = useSystemStore();

      try {
        let isBreak = false;
        for (let i = 0; i < array.length; i++) {
          let resPractice = array[i];

          let response = await this.getRewardComplete(resPractice.courseId);

          if (response != "success") {
            isBreak = true;
            break;
          }
        }

        if (isBreak) {
          throw new Error("Error Get Reward All Complete");
        }

        systemStore.systemLog({
          api: "-",
          store: this.$id,
          status: "Success Get Reward All Complete",
        });

        this.clearPracticeComplete();

        return "success";
      } catch (e) {
        systemStore.systemLog({
          api: "-",
          store: this.$id,
          status: "Error Get Reward All Complete",
          description: e,
          isError: true,
        });

        return "error";
      }
    },
    // #endregion

    // #endregion

    // #region ***** Setter Store *****

    // #region Setter Practice Update By Level
    practiceUpdateByLevel() {
      const systemStore = useSystemStore();
      this.$patch((state) => {
        state.practiceList.isUpdate = true;
        state.practiceListName.isUpdate = true;
        // state.practiceLog.isUpdate = true
      });
    },
    // #endregion

    // #region Setter Practice Skill
    setPracticeSkill(skill) {
      const systemStore = useSystemStore();

      let tempData = systemStore.decryptJSON(this.practiceDataObject.data);

      tempData.skill = skill;

      this.setPracticeDataObjectEncrypt(tempData);

      // systemStore.setRouter(skill)
    },
    // #endregion

    // #region Setter Practice Data
    setPracticeData(data) {
      const courseStore = useCourseStore();


      let newSkill =
        data.skill === "Listening & Speaking" ? "Listening" : data.skill;

      let practiceId = data.id || data.practiceListId;

      let findListBySkill = this.listBySkill.find(
        (x) => x.id == practiceId && x.practiceType == data.practiceType
      );

      let getUnit = this.list.find((x) => x.id == practiceId);

      let tempData = {
        counter: findListBySkill ? findListBySkill.counter || 0 : 0,
        id: practiceId,
        type: data.practiceType || this.practiceType,
        skill: newSkill,
        level: data.level || courseStore.courseLevel,
        unit: getUnit.unit || this.unit,
        isLesson: findListBySkill ? findListBySkill.isLesson : false,
        isFirstTimeReward: findListBySkill
          ? findListBySkill.isFirstTimeReward
          : false,
      };

      // let tempData = {
      //   counter: 0,
      //   id: "",
      //   type: '',
      //   skill: "",
      //   level: "",
      //   unit: "",
      //   isLesson: false,
      //   isFirstTimeReward: true,
      // }

      // if(data.id == this.practiceData.id){

      //   tempData = {
      //     counter: this.currentPracticeData.counter,
      //     id: data.id,
      //     type: data.practiceType,
      //     skill: data.skill,
      //     level: courseStore.courseLevel,
      //     unit: this.currentPracticeData.unit,
      //     isLesson: this.currentPracticeData.isLesson,
      //     isFirstTimeReward: this.currentPracticeData.isFirstTimeReward
      //   }

      // }else{

      //   let findListBySkill = this.listBySkill.find(x => x.id == practiceId && x.practiceType == data.practiceType)

      //   let getUnit = this.list.find(x => x.id == practiceId);

      // }

      this.setPracticeDataObjectEncrypt(tempData);
    },
    // #endregion

    // #region Setter Practice Level
    setPracticelevel(level) {
      let tempData = {
        counter: 0,
        id: "",
        type: "",
        skill: "Vocabulary",
        level: level,
        unit: "1",
      };

      this.setPracticeDataObjectEncrypt(tempData);
    },
    // #endregion

    // #region Setter Practice Unit
    setPracticeUnit(unit) {
      const systemStore = useSystemStore();

      let tempData = this.practiceData;

      tempData.unit = unit;

      this.setPracticeDataObjectEncrypt(tempData);
    },
    // #endregion

    // #region Setter Practice Counter
    setPracticeCounter(counter) {
      const systemStore = useSystemStore();

      let tempData = this.practiceData;

      tempData.counter = counter;

      this.setPracticeDataObjectEncrypt(tempData);
    },
    // #endregion

    // #region Setter Lock Practice Data
    setLockPracticeData(data) {
      const systemStore = useSystemStore();
      let temp = systemStore.encryptJSON(data);
      this.$patch({
        practiceLockObject: {
          data: temp,
          isHasData: true,
        },
      });
    },
    // #endregion

    // #region Setter Test Question Object
    setTestQuestionObject(data, type, timer) {
      const systemStore = useSystemStore();

      let temp = systemStore.encryptJSON(data);
      this.$patch({
        prePostObject: {
          data: temp,
          isHasData: true,
          type: type,
          status: {
            isStartPrePostTest: false,
            isFinishPrePostTest: false,
            isTimeout: false,
            isGetRewardCoin: false,
            isGetRewardItem: false,
            isSendAnswer: false,
          },
          timer: timer || "",
          timerSendAnswer: "",
        },
      });
    },
    // #endregion

    // #region Setter Test Question Array
    setTestQuestionArray(data) {
      const systemStore = useSystemStore();
      let temp = systemStore.encryptJSON(data);
      this.$patch({
        prePostObject: {
          data: temp,
        },
      });
    },
    // #endregion

    // #region Setter Pre Post Status
    setPrePostStatus(status) {
      this.$patch({
        prePostObject: {
          status: status,
        },
      });
    },
    // #endregion

    // #region Setter Pre Post Timer
    setPrePostTimer(timer) {
      this.$patch({
        prePostObject: {
          timer: timer,
        },
      });
    },
    // #endregion

    // #region Setter Pre Post Timer Send Answer
    setPrePostTimerSendAnswer(timer) {
      this.$patch({
        prePostObject: {
          timerSendAnswer: timer,
        },
      });
    },
    // #endregion

    // #region Setter Pre Post Current Question
    setPrePostCurrentQuestion(current) {
      this.$patch({
        prePostObject: {
          currentQuestion: current,
        },
      });
    },
    // #endregion

    // #region Setter Pre Post Reward
    setPrePostReward(data) {
      const systemStore = useSystemStore();
      let temp = systemStore.encryptJSON(data);
      this.$patch({
        prePostRewardObject: {
          data: temp,
          isHasData: true,
          isGetRewarded: false,
        },
      });
    },
    // #endregion

    // #region Set Question Status
    setQuestionStatus(status) {
      this.$patch({
        questionnaireObject: {
          status: status,
        },
      });
    },
    // #endregion

    // #region Set Practice Log Update
    setPracticeLogUpdate(boolean) {
      this.$patch({
        practiceLog: {
          isUpdate: boolean,
        },
      });
    },
    // #endregion

    // #region Clear Pre Post
    clearPrePost() {
      this.$patch({
        prePostObject: {
          data: {},
          type: "",
          isHasData: false,
          currentQuestion: 0,
          status: {
            isStartPrePostTest: false,
            isFinishPrePostTest: false,
            isTimeout: false,
            isGetRewardCoin: false,
            isGetRewardItem: false,
            isSendAnswer: false,
          },
          timer: "",
          timerSendAnswer: "",
        },
      });
    },
    // #endregion

    // #region Clear Practice Complete
    clearPracticeComplete() {
      this.$patch({
        practiceCompleteObject: {
          isLoaded: false,
          isFirstTime: false,
          isShowRewardDialog: false,
        },
      });
    },
    // #endregion

    // #region Encrypt Decrypt
    setPracticeDataObjectEncrypt(data) {
      const systemStore = useSystemStore();
      let temp = systemStore.encryptJSON(data);
      this.$patch({
        practiceDataObject: {
          data: temp,
          isHasData: true,
        },
      });
    },
    // #endregion

    // #endregion
  },
  // #endregion
});
