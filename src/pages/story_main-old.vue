<template>
  <q-page :class="systemStore.platform.desktop ? 'row' : ''">
    <div
      class="col-12 self-center story-container-pc relative-position"
      v-if="systemStore.platform.desktop"
    >
      <background-main-desktop></background-main-desktop>
      <div class="absolute-center fit row">
        <div class="col-12 absolute-top" style="z-index: 3">
          <header-event-desktop
            :TitleEvent="'Event Story'"
          ></header-event-desktop>
        </div>

        <!-- Desktop -->
        <desktop-mode
          :storyData="storyData"
          :studentStore="studentStore"
        ></desktop-mode>
      </div>
    </div>

    <div
      class="col-12 self-start story-container-mobile relative-position"
      v-if="systemStore.platform.mobile"
    >
      <background-main-mobile></background-main-mobile>
      <div class="absolute-center fit row">
        <div class="col-12 absolute-top">
          <header-event-mobile
            :TitleEvent="'Event Story'"
            :storyData="storyData"
          ></header-event-mobile>
        </div>

        <!-- Mobile -->
        <mobile-mode
          :storyData="storyData"
          :studentStore="studentStore"
        ></mobile-mode>
      </div>
    </div>

    <dialog-next-to-speak
      :isShowDialogNextToSpeak="storyData.isDialogNextToSpeak"
      :storyData="storyData"
    ></dialog-next-to-speak>

    <dialog-finish
      :isShowDialogFinish="storyData.isDialogFinish"
      :storyData="storyData"
    ></dialog-finish>

    <dialog-content-logs
      :isShowDialogLogs="storyData.isDialogContentLogs"
      :storyData="storyData"
      :studentStore="studentStore"
      @callback-closeDialog="storyData.isDialogContentLogs = false"
    ></dialog-content-logs>
  </q-page>
</template>

<script>
//  **** Componnent ****
// Desktop
import headerEventDesktop from "components/story_main/header-desktop.vue";
import backgroundMainDesktop from "src/components/story_main/background-desktop.vue";
import desktopMode from "components/story_main/desktop-mode.vue";

// Mobile
import headerEventMobile from "components/story_main/header-mobile.vue";
import backgroundMainMobile from "src/components/story_main/background-mobile.vue";
import mobileMode from "components/story_main/mobile-mode.vue";

// Dialog
import dialogNextToSpeak from "components/story_main/dialog-next-to-speak.vue";
import dialogFinish from "components/story_main/dialog-finish.vue";
import dialogContentLogs from "src/components/story_main/dialog-content-logs.vue";

import npc from "components/character_main/character.vue";
import character from "components/character_main/character.vue";

import { reactive, ref } from "@vue/reactivity";
import DesktopMode from "../components/story_main/desktop-mode.vue";
import { useQuasar } from "quasar";
import { onMounted } from "@vue/runtime-core";
export default {
  components: {
    headerEventDesktop,
    backgroundMainDesktop,
    desktopMode,
    headerEventMobile,
    backgroundMainMobile,
    mobileMode,
    npc,
    character,
    DesktopMode,
    dialogNextToSpeak,
    dialogFinish,
    dialogContentLogs,
  },
  props: {
    systemStore: {
      type: Object,
      default: {},
    },
    studentStore: {
      type: Object,
      default: {},
    },
  },
  setup(props) {
    // Initial Data
    const $q = useQuasar();

    // Data Constructor
    const storyData = reactive({
      // Data
      currentState: 0,
      star: 0,
      type: "practice", // type : practice , roleplay
      question: {},
      list: [
        {
          message: "Hello, what is your name?",
          isQuestion: true,
          type: "translation",
          name: "Jisoo",
          question:
            "You: Hello, [What] [is] [your] [name] ? <br/> Jisoo: Hi. My name is Jisoo.",
          choices: [
            {
              text: "name",
              isSendAnswer: false,
            },
            {
              text: "What",
              isSendAnswer: false,
            },
            {
              text: "is",
              isSendAnswer: false,
            },
            {
              text: "your",
              isSendAnswer: false,
            },
            {
              text: "mother’s",
              isSendAnswer: false,
            },
          ],
          isCorrect: false,
          selected: null,
          hint: "เรียงประโยคที่ถูกต้อง",
          name: "",
        },
        {
          message: "Hello, what is your name?",
          isQuestion: false,
          type: "",
          hint: "",
          name: "Jisoo",
        },
        {
          message: "Hello, my [] name is []",
          answer: "",
          isQuestion: true,
          type: "input",
          hint: "เติมคำตอบที่ถูกต้อง",
          isSendAnswer: false,
          isRecorder: false,
          soundRecorder: "",
        },
        {
          message: "Nice to meet you.",
          isSendAnswer: false,
          isQuestion: false,
          type: "",
          hint: "",
          name: "Jisoo",
        },
        {
          message: "Nice to meet you too",
          answer: "",
          choices: [
            {
              answer: "Nice to meet you too",
              isSendAnswer: false,
            },
            {
              answer: "I am sick.",
              isSendAnswer: false,
            },
            {
              answer: "I’m glad to hear that",
              isSendAnswer: false,
            },
            {
              answer: "No, I am not",
              isSendAnswer: false,
            },
          ],
          isQuestion: true,
          type: "multiplechoices",
          correctAnswer: 0,
          isCorrect: false,
          selected: null,
          hint: "เลือกคำตอบที่ถูกต้อง",
          isRecorder: false,
          soundRecorder: "",
          name: "",
        },
      ],
      chat: [],
      dialogs: [],

      // Boolean
      isSendAnswer: false,
      isDialogNextToSpeak: false,
      isDialogFinish: false,
      isDialogContentLogs: false,

      // Function
      func: {
        checkAnswerTranslation(text, index) {
          let findAnswer = storyData.question.question.find(
            (x) => x.isAnswer && !x.isCorrectAnswer
          );

          if (findAnswer) {
            if (text == findAnswer.text) {
              findAnswer.isCorrectAnswer = true;
            } else {
              return;
            }

            storyData.question.choices[index].isSendAnswer = true;
          }
        },
        setQuestion() {
          let story = storyData.list[storyData.currentState];

          if (storyData.type == "practice") {
            storyData.question = story;

            if (story.type == "input") {
              let newMessage = storyData.func.convertTag(story);
              storyData.question.message = newMessage;
            } else if (story.type == "translation") {
              let findTag = story.question.match(/\[(.*?)\]/gm);

              let setNewQuestion = story.question;

              let reg = /(?:\[(.*?)\])|(?:(<br\s*\/>))/;

              setNewQuestion = story.question
                .split(reg)
                .filter((x) => x != "" && x != " " && x != undefined);

              let tempQuestion = [];

              for (let i = 0; i < setNewQuestion.length; i++) {
                let newData = {
                  isCorrectAnswer: false,
                  isAnswer: false,
                  isNewLine: false,
                  text: setNewQuestion[i],
                };

                if (newData.text == "<br/>") {
                  newData.isNewLine = true;
                }

                let removeTagArr = null;

                if (findTag.length) {
                  for (let ii = 0; ii < findTag.length; ii++) {
                    let newTag = findTag[ii]
                      .replace(/\[/g, "")
                      .replace(/\]/g, "");

                    if (newTag == newData.text) {
                      removeTagArr = ii;

                      findTag.splice(removeTagArr, 1);
                      newData.isAnswer = true;
                      break;
                    }
                  }
                }

                tempQuestion.push(newData);
              }

              storyData.question.question = tempQuestion;
            }
          } else {
            storyData.question = story;
          }
        },
        nextState() {
          let story = storyData.question;
          if (storyData.type == "practice") {
            if (story.isQuestion) {
              // Type : Input
              if (story.type == "input") {
                let setNewMessage = "";
                story.message.map((x) => {
                  if (x.isAnswer) {
                    setNewMessage += `${x.currentAnswer} `;
                  } else {
                    setNewMessage += `${x.message} `;
                  }
                });

                story.message = setNewMessage;

                story.isSendAnswer = true;
              }
              // Type : Multiplechoices
              else if (story.type == "multiplechoices") {
                if (!story.isCorrect) {
                  if (story.selected == null) {
                    $q.notify({
                      message: "กรุณาเลือกคำตอบ",
                      position: "top",
                      color: "red",
                      timeout: 700,
                    });
                    return;
                  }

                  story.choices[story.selected].isSendAnswer = true;

                  if (story.correctAnswer == story.selected) {
                    story.isCorrect = true;
                  } else {
                    story.selected = null;
                    return;
                  }
                }
              }
            }
          }

          let dataChat = {
            message: story.message,
            isUser: false,
            name: story.name || "",
          };

          if (story.isQuestion) {
            dataChat.isUser = true;
          }

          if (storyData.chat.length == 1) {
            storyData.chat.splice(0, 1);
          }

          if (storyData.type == "practice") {
            storyData.dialogs.push(dataChat);
          }

          storyData.chat.push(dataChat);

          if (storyData.currentState + 1 == storyData.list.length) {
            if (storyData.type == "practice") {
              setTimeout(() => {
                storyData.isDialogNextToSpeak = true;
              }, 1500);
            } else {
              storyData.isDialogFinish = true;
            }
          } else {
            storyData.currentState++;
            storyData.func.setQuestion();
          }
        },
        gotoSpeak() {
          storyData.type = "roleplay";
          storyData.isDialogNextToSpeak = false;
          storyData.currentState = 0;
          storyData.chat = [];

          storyData.func.setQuestion();
        },
        convertTag(story) {
          let findTag = story.message.match(/<s*u>(.*?)<s*\/u>/gm);

          let setMessage = story.message.split(/<s*u>(.*?)<s*\/u>/gm);

          setMessage = setMessage
            .filter((x) => x != "" && x != " ")
            .map((x) => x.trim());

          let tempQuestion = [];

          let removeTag = null;

          setMessage.forEach((res, index) => {
            let newData = {
              isAnswer: false,
              message: res,
              currentAnswer: "",
              index: index,
            };

            for (let i = 0; i < findTag.length; i++) {
              let newTag = findTag[i].replace(/<u>/g, "").replace(/<\/u>/g, "");

              if (res == newTag) {
                removeTag = i;
                newData.isAnswer = true;
                findTag.splice(removeTag, 1);
                break;
              }
            }

            tempQuestion.push(newData);
          });

          return tempQuestion;
        },
        startRecord() {
          const recognition = new SpeechRecognition();

          recognition.lang = "en-US";
          recognition.interimResults = false;
          recognition.maxAlternatives = 1;

          recognition.start();
        },
        recordStart() {
          storyData.question.isRecorder = true;

          setTimeout(() => {
            storyData.question.isRecorder = false;
            storyData.question.soundRecorder = "test.mp3";
          }, 2000);
        },
        resetStory() {
          storyData.type = "practice";
          storyData.isDialogFinish = false;
          storyData.isDialogNextToSpeak = false;
          storyData.currentState = 0;
          storyData.chat = [];

          storyData.func.setQuestion();
        },
      },
    });

    onMounted(() => {
      storyData.func.setQuestion();
    });

    return {
      // Data
      storyData,
    };
  },
};
</script>

<style lang="scss" scoped>
.story-container-pc {
  max-width: 1600px;
  margin: auto;
}

.story-container-mobile {
  width: 100%;
  overflow: hidden;
}

.animation-chat {
  position: relative;
  animation: animationChat 0.5s ease-out forwards;
  -webkit-animation: animationChat 0.5s ease-out forwards;
  -moz-animation: animationChat 0.5s ease-out forwards;

  transform: translateY(50%);
  -webkit-transform: translateY(50%);
  -moz-transform: translateY(50%);
  z-index: 3;
}

@keyframes animationChat {
  to {
    transform: translateY(0%);
    -webkit-transform: translateY(0%);
    -moz-transform: translateY(0%);
  }
}
</style>
