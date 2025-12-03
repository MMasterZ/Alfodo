<template>
  <div
    class="relative-position box-chat-main animate__animated"
    :class="isShowDialogWinnyChat ? 'animate__bounceIn' : 'animate__bounceOutDown'"
    v-if="$q.platform.is.desktop"
  >
    <!-- #region ชื่อ/ปุ่มปิด -->
    <div class="chat-header row">
      <div
        class="row"
        style="width: 50%"
        v-if="isShowSkillsPage || isShowStartChat || isShowGrammarStart"
      >
        <div class="box-chat-icon relative-position">
          <div class="absolute-center" style="top: 85%; width: 235%">
            <q-img
              src="/images/ai_character_main/winny-character.png"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
        <div class="self-center font-mali-b">Winny</div>
      </div>
      <div v-else class="self-end button-chat-back">
        <q-img
          src="/images/icon_main/icon-back.png"
          no-spinner
          no-transition
          class="cursor-pointer"
          @click="funcBack()"
        ></q-img>
      </div>

      <q-space
        v-if="!isShowSkillsPage && !isShowStartChat && !isShowGrammarStart"
      ></q-space>
      <div
        class="self-center font-mali-b"
        align="center"
        v-if="!isShowSkillsPage && !isShowStartChat && !isShowGrammarStart"
      >
        {{ `Choose Topic` }}
      </div>
      <q-space></q-space>
      <div class="self-center button-chat-close">
        <q-img
          src="/images/icon_main/icon-close.png"
          no-spinner
          no-transition
          class="cursor-pointer"
          @click="funcCloseDialog()"
        ></q-img>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region คอนเท็น -->
    <div class="chat-content">
      <!-- #region หน้าเริ่มต้น -->
      <div class="chat-start" v-if="isShowSkillsPage">
        <div class="chat-message waiting" align="center">
          วันนี้เรียนอะไรเพิ่มเติมดีนะ
        </div>
        <div
          class="absolute-bottom box-button-chat"
          align="right"
          v-if="courseStore.courseLevel != 0"
        >
          <div
            class="button-chat font-mali-r"
            @click="funcGetPracticeListName('Grammar')"
          >
            Grammar Tips
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มเริ่ม -->
      <div class="chat-start row justify-center items-center" v-if="isShowGrammarStart">
        <div class="button-start-winny-chat" @click="funcStartChatWinny()">
          <q-img
            src="/images/button_main/button-start-winny-chat.webp"
            no-spinner
            no-transition
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region รายการแบบฝึกหัด -->
      <div class="chat-scroll" v-if="isShowGrammarContent">
        <div
          v-for="(itemPractice, indexPractice) in practiceListNameBySkill"
          class="button-chat-practice"
          :key="indexPractice"
          @click="funcStartChat(itemPractice)"
        >
          {{ itemPractice.nameEng }}
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region รายการแชท -->
      <div class="chat-scroll" id="scrollAreaRef" v-if="isShowStartChat">
        <div
          v-for="(itemMessage, indexMessage) in messageList"
          :key="indexMessage"
          :align="!itemMessage.isMine ? 'left' : 'right'"
        >
          <div
            class="chat-message"
            :class="itemMessage.isMine ? '' : 'waiting'"
            align="left"
          >
            <div v-html="itemMessage.text"></div>
          </div>
        </div>

        <!-- #region แสดงผลการเล่น Text Animation -->
        <div
          class="chat-message waiting"
          align="left"
          id="displayMessage"
          v-show="isDisplayMessageAnimation"
        ></div>
        <!-- #endregion -->

        <!-- #region รอการตอบกลับจาก API -->
        <div
          class="chat-message waiting row justify-between"
          align="center"
          v-if="isTyping"
        >
          <div
            class="self-center icon-waiting animation-waiting"
            :style="`animation-delay:${ii * 0.2}s`"
            v-for="ii in 3"
          ></div>
        </div>
        <!-- #endregion -->

        <!-- #region ปุ่มเข้าใจแล้ว/ขอแบบฝึกหัดเพิ่ม/ขอตัวอย่างเพิ่ม/อธิบายเพิ่มเติม -->
        <div v-if="isShowReadyPrompt">
          <div align="right" class="font-mali-r">
            <div class="row justify-end">
              <div
                class="relative-position cursor-pointer button-prompt"
                @click="funcSelectedForMore('understand')"
              >
                เข้าใจแล้ว
              </div>
              <div
                class="relative-position cursor-pointer button-prompt"
                @click="funcSelectedForMore('more_explain')"
              >
                อธิบายเพิ่มเติม
              </div>
            </div>

            <div class="row justify-end">
              <span
                class="relative-position cursor-pointer button-prompt"
                @click="funcSelectedForMore('more_example')"
              >
                ขอตัวอย่างเพิ่ม
              </span>
              <span
                class="relative-position cursor-pointer button-prompt"
                @click="funcSelectedForMore('more_exercise')"
              >
                ขอแบบฝึกหัดเพิ่ม
              </span>
            </div>

            <div class="row justify-end" v-if="systemStore.routerName == 'lobby'">
              <span
                class="relative-position cursor-pointer button-prompt other-choice active"
                @click="funcBackToStartChat()"
              >
                เลือกหัวข้ออื่น
              </span>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </div>

  <q-dialog
    v-model="isShowDialogWinnyChat"
    maximized
    persistent
    v-if="!$q.platform.is.desktop"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="relative-position box-chat-main mobile">
          <!-- #region ชื่อ/ปุ่มปิด -->
          <div class="chat-header mobile row">
            <div
              class="col row"
              v-if="isShowSkillsPage || isShowStartChat || isShowGrammarStart"
            >
              <div class="box-chat-icon mobile relative-position">
                <div class="absolute-center" style="top: 35px; width: 235%">
                  <q-img
                    src="/images/ai_character_main/winny-character.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
              <div class="self-center font-mali-b">Winny</div>
            </div>

            <div v-else class="self-end button-chat-back mobile">
              <q-img
                src="/images/icon_main/icon-back.png"
                no-spinner
                no-transition
                class="cursor-pointer"
                @click="funcBack()"
              ></q-img>
            </div>

            <q-space
              v-if="!isShowSkillsPage && !isShowStartChat && !isShowGrammarStart"
            ></q-space>
            <div
              class="self-center font-mali-b"
              align="center"
              v-if="!isShowSkillsPage && !isShowStartChat && !isShowGrammarStart"
            >
              {{ `Choose Topic` }}
            </div>
            <q-space></q-space>
            <div class="self-center button-chat-close mobile">
              <q-img
                src="/images/icon_main/icon-close.png"
                no-spinner
                no-transition
                class="cursor-pointer"
                @click="funcCloseDialog()"
              ></q-img>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region คอนเท็น -->
          <div class="chat-content">
            <!-- #region หน้าเริ่มต้น -->
            <div class="chat-start mobile" v-if="isShowSkillsPage">
              <div class="chat-message waiting mobile" align="center">
                วันนี้เรียนอะไรเพิ่มเติมดีนะ
              </div>
              <div class="absolute-bottom box-button-chat mobile" align="right">
                <div
                  class="button-chat mobile font-mali-r"
                  @click="funcGetPracticeListName('Grammar')"
                >
                  Grammar Tips
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region ปุ่มเริ่ม -->
            <div
              class="chat-start mobile row justify-center items-center"
              v-if="isShowGrammarStart"
            >
              <div class="button-start-winny-chat mobile" @click="funcStartChatWinny()">
                <q-img
                  src="/images/button_main/button-start-winny-chat.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region รายการแบบฝึกหัด -->
            <div class="chat-scroll mobile" v-if="isShowGrammarContent">
              <div
                v-for="(itemPractice, indexPractice) in practiceListNameBySkill"
                class="button-chat-practice mobile"
                :key="indexPractice"
                @click="funcStartChat(itemPractice)"
              >
                {{ itemPractice.nameEng }}
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region รายการแชท -->
            <div class="chat-scroll" id="scrollAreaRef" v-if="isShowStartChat">
              <div
                v-for="(itemMessage, indexMessage) in messageList"
                :key="indexMessage"
                :align="!itemMessage.isMine ? 'left' : 'right'"
              >
                <div
                  class="chat-message mobile"
                  :class="itemMessage.isMine ? '' : 'waiting'"
                  align="left"
                >
                  <div v-html="itemMessage.text"></div>
                </div>
              </div>

              <!-- #region แสดงผลการเล่น Text Animation -->
              <div
                class="chat-message waiting mobile"
                align="left"
                id="displayMessage"
                v-show="isDisplayMessageAnimation"
              ></div>
              <!-- #endregion -->

              <!-- #region รอการตอบกลับจาก API -->
              <div
                class="chat-message waiting mobile row justify-between"
                align="center"
                v-if="isTyping"
              >
                <div
                  class="self-center icon-waiting mobile animation-waiting"
                  :style="`animation-delay:${ii * 0.2}s`"
                  v-for="ii in 3"
                ></div>
              </div>
              <!-- #endregion -->

              <!-- #region ปุ่มเข้าใจแล้ว/ขอแบบฝึกหัดเพิ่ม/ขอตัวอย่างเพิ่ม/อธิบายเพิ่มเติม -->
              <div v-if="isShowReadyPrompt">
                <div align="right" class="font-mali-r">
                  <div class="row justify-end">
                    <div
                      class="relative-position cursor-pointer button-prompt mobile"
                      @click="funcSelectedForMore('understand')"
                    >
                      เข้าใจแล้ว
                    </div>
                    <div
                      class="relative-position cursor-pointer button-prompt mobile"
                      @click="funcSelectedForMore('more_explain')"
                    >
                      อธิบายเพิ่มเติม
                    </div>
                  </div>

                  <div class="row justify-end">
                    <div
                      class="relative-position cursor-pointer button-prompt mobile"
                      @click="funcSelectedForMore('more_example')"
                    >
                      ขอตัวอย่างเพิ่ม
                    </div>
                    <div
                      class="relative-position cursor-pointer button-prompt mobile"
                      @click="funcSelectedForMore('more_exercise')"
                    >
                      ขอแบบฝึกหัดเพิ่ม
                    </div>
                  </div>

                  <div class="row justify-end" v-if="systemStore.routerName == 'lobby'">
                    <div
                      class="relative-position cursor-pointer button-prompt mobile other-choice active"
                      @click="funcBackToStartChat()"
                    >
                      เลือกหัวข้ออื่น
                    </div>
                  </div>
                </div>
              </div>
              <!-- #endregion -->
            </div>
            <!-- #endregion -->
          </div>
          <!-- #endregion -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import axios from "axios";
import { useCourseStore } from "src/stores/course";
import { usePracticeStore } from "src/stores/practice";
import { useSystemStore } from "src/stores/system";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

// Store
const systemStore = useSystemStore();
const practiceStore = usePracticeStore();
const courseStore = useCourseStore();

// Emit
const emits = defineEmits(["callback-closeDialog"]);

// Props
const props = defineProps({
  isShowWinnyChat: Boolean,
});

// Initialize Data
let cancelToken = axios.CancelToken;
let source = cancelToken.source();

// Data
const sessionStage = ref("");
const history = ref([]);
const selectedPracticeListName = ref("");
const messageList = ref([]);
const practiceListNameBySkill = ref([]);
let textTest = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

// Boolean
const isShowSkillsPage = ref(true);
const isShowStartChat = ref(false);
const isShowGrammarContent = ref(false);
const isShowReadyPrompt = ref(false);
const isDisplayMessageAnimation = ref(false);
const isTryAgain = ref(false);
const isTyping = ref(false);
const isEnableAnimationScroll = ref(false);
const isShowDialogWinnyChat = ref(true);
const isShowGrammarStart = ref(false);

// #region Back
const funcBack = () => {
  isShowSkillsPage.value = true;
  isShowGrammarContent.value = false;
};
// #endregion

// #region func Get Practice List Name
const funcGetPracticeListName = (stage) => {
  let filterPracticeNameList = [];

  if (stage == "Grammar") {
    if (courseStore.courseLevel != 0) {
      filterPracticeNameList = practiceStore.listName.Grammar;

      filterPracticeNameList.sort((a, b) => {
        return a.unit - b.unit;
      });

      practiceListNameBySkill.value = filterPracticeNameList;
    }
  } else if (stage == "Homework") {
    // isShowStartChat.value = true;
    // messageList.value.push({
    //   id: messageList.value.length + 1,
    //   text: `อยากให้ ${nameBot.value} สอนอะไรดีละ`,
    //   isMine: false,
    //   displayText: `อยากให้ ${nameBot.value} สอนอะไรดีละ`,
    // });
  }

  isShowSkillsPage.value = false;
  isShowGrammarContent.value = true;
};
// #endregion

// #region Chat
const selectedTempPracticeListName = ref("");
const funcStartChat = (data) => {
  let tempData = data;

  if (!tempData) {
    tempData = selectedTempPracticeListName.value;
  } else {
    selectedTempPracticeListName.value = data;
  }

  selectedPracticeListName.value = tempData.nameEng;

  messageList.value.push({
    id: messageList.value.length + 1,
    text: tempData.nameEng,
    isMine: true,
    displayText: tempData.nameEng,
  });

  isShowStartChat.value = true;

  isShowStartChat.value = true;
  isTyping.value = true;

  isShowGrammarContent.value = false;
  // isTryAgain.value = false;
  isShowReadyPrompt.value = false;
  isDisplayMessageAnimation.value = false;

  // // #region *** Mock up ***

  // setTimeout(() => {
  //   isTyping.value = false;
  //   displayStringLetterByLetter(textTest);
  // }, 1500);

  // return;

  // #endregion *** Mock up ***

  funcResponseChatAPI(tempData.nameEng, "start", tempData.skill);
};
// #endregion

// #region Selected For More
const funcSelectedForMore = (type) => {
  let typeTextTh = "";

  if (type == "start") {
    if (systemStore.routerName == "grammarlesson") {
      let findGrammarLesson = practiceStore.listName.Grammar.find((item) => {
        return item.unit == practiceStore.practiceData.unit;
      });

      typeTextTh = findGrammarLesson.nameEng;

      selectedPracticeListName.value = typeTextTh;
      sessionStage.value = "Grammar";
    }
  } else if (type == "understand") {
    typeTextTh = "เข้าใจแล้ว";
  } else if (type == "more_exercise") {
    typeTextTh = "ขอแบบฝึกหัดเพิ่ม";
  } else if (type == "more_example") {
    typeTextTh = "ขอตัวอย่างเพิ่ม";
  } else if (type == "more_explain") {
    typeTextTh = "อธิบายเพิ่มเติม";
  }

  messageList.value.push({
    id: messageList.value.length,
    text: typeTextTh,
    isMine: true,
    displayText: typeTextTh,
  });

  setTimeout(() => {
    let ele2 = document.getElementById("scrollAreaRef");
    ele2.scrollBy({
      top: ele2.scrollHeight, // could be negative value
      left: 0,
      behavior: "smooth",
    });
    isEnableAnimationScroll.value = true;
  }, 100);

  // // #region *** Mock up ***
  // isShowReadyPrompt.value = false;
  // isDisplayMessageAnimation.value = false;
  // isTyping.value = true;

  // setTimeout(() => {
  //   isTyping.value = false;
  //   displayStringLetterByLetter(textTest);
  // }, 1500);

  // return;

  // // #endregion *** Mock up ***

  funcResponseChatAPI(selectedPracticeListName.value, type, sessionStage.value);
};
// #endregion

// #region Observe Scroll
const observeScroll = () => {
  let ele2 = document.getElementById("scrollAreaRef");

  document.getElementById("scrollAreaRef").addEventListener("wheel", (event) => {
    isEnableAnimationScroll.value = false;
  });

  if (isEnableAnimationScroll.value) {
    ele2.scrollTop = ele2.scrollHeight;
  }
};
// #endregion

// #region Response Chat API
let listenAPI = null;
const funcResponseChatAPI = async (topic, prompt, skill) => {
  try {
    source = cancelToken.source();

    isShowReadyPrompt.value = false;
    isTyping.value = true;

    const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/chat-chatBot`;

    let tempHistory = JSON.stringify(history.value);

    tempHistory = JSON.parse(tempHistory);

    tempHistory = tempHistory.splice(-3);

    const POSTDATA = {
      history: tempHistory,
      skill: skill,
      prompt: prompt,
      topic: topic,
    };

    listenAPI = setTimeout(() => {
      isTryAgain.value = true;
      source.cancel("Timeout");
    }, 45000);

    const response = await axios.post(APIURL, POSTDATA, {
      cancelToken: source.token,
    });

    if (response.data.message == "success") {
      if (listenAPI) {
        clearTimeout(listenAPI);
      }
      isTyping.value = false;
      const answerText = response.data.text.replace(/\n/g, "<br />");
      displayStringLetterByLetter(answerText);
      history.value = response.data.history;
    } else {
      throw new Error(response.data.message);
    }
  } catch (e) {
    if (listenAPI) {
      clearTimeout(listenAPI);
    }

    isTyping.value = false;

    messageList.value.pop();

    if (messageList.value.length > 0) {
      isShowReadyPrompt.value = true;
    } else {
      if (systemStore.routerName == "grammarlesson") {
        isShowGrammarStart.value = true;
      }

      isShowStartChat.value = false;
    }

    // $q.notify({
    //   message: e.message,
    //   color: "negative",
    //   position: "top",
    //   icon: "report_problem",
    //   timeout: 2000,
    // });
  }
};
// #endregion

// #region Display String Letter By Letter
let listenSTO = null;
const displayStringLetterByLetter = (str) => {
  isEnableAnimationScroll.value = true;
  let result = "";
  let i = 0;

  isDisplayMessageAnimation.value = true;

  let ele = document.getElementById("displayMessage");

  function typeWriter() {
    if (i < str.length) {
      result += str.charAt(i);
      ele.innerHTML = result;
      i++;
      listenSTO = setTimeout(typeWriter, 5);
      observeScroll();
    } else {
      messageList.value.push({
        id: messageList.value.length + 1,
        text: result,
        isMine: false,
        displayText: result,
      });

      isShowReadyPrompt.value = true;
      isDisplayMessageAnimation.value = false;

      setTimeout(() => {
        let ele2 = document.getElementById("scrollAreaRef");
        ele2.scrollBy({
          top: ele2.scrollHeight, // could be negative value
          left: 0,
          behavior: "smooth",
        });
        isEnableAnimationScroll.value = true;
      }, 100);

      ele.innerHTML = "";
      clearTimeout(listenSTO);
    }
  }

  typeWriter();
};
// #endregion

// #region Back to Start Chat
const funcBackToStartChat = () => {
  isShowSkillsPage.value = true;

  isShowStartChat.value = false;
  isShowReadyPrompt.value = false;
  isTyping.value = false;
  isDisplayMessageAnimation.value = false;
  messageList.value = [];
  history.value = [];
};
// #endregion

// #region Close Dialog
const funcCloseDialog = () => {
  isShowDialogWinnyChat.value = false;

  if (listenAPI) {
    clearTimeout(listenAPI);
    source.cancel("Close Chat");
  }

  if (listenMessageAi) {
    clearTimeout(listenMessageAi);
  }

  setTimeout(() => {
    emits("callback-closeDialog");
  }, 250);
};
// #endregion

// #region Start Chat Winny (Grammar only)
const funcStartChatWinny = () => {
  isShowGrammarStart.value = false;
  isShowStartChat.value = true;

  let findListName = practiceStore.listName.Grammar.find((item) => {
    return item.unit == practiceStore.practiceData.unit;
  });

  funcStartChat(findListName);
};
// #endregion

// #region

// #region Watch
watch(
  () => props.isShowWinnyChat,
  (val) => {
    if (!val) {
      isShowDialogWinnyChat.value = false;

      if (listenAPI) {
        clearTimeout(listenAPI);
        source.cancel("Close Chat");
      }

      if (listenMessageAi) {
        clearTimeout(listenMessageAi);
      }

      funcBackToStartChat();

      // setTimeout(() => {
      //   emits("callback-closeDialog");
      // }, 450);
    }
  }
);
// #endregion

onMounted(() => {
  if (systemStore.routerName == "grammarlesson") {
    isShowSkillsPage.value = false;
    isShowGrammarStart.value = true;
  }
});

let listenMessageAi = null;
onBeforeUnmount(() => {
  if (listenAPI) {
    clearTimeout(listenAPI);
    source.cancel("Close Chat");
  }

  if (listenMessageAi) {
    clearTimeout(listenMessageAi);
  }
});
</script>

<style lang="scss" scoped>
.box-chat-main {
  width: 100%;
  height: 100%;
  border-radius: clamp(5px, 0.5vw, 8px);
  background: #fff;
  animation-duration: 0.5s;

  &.mobile {
    width: 320px;
    height: 480px;
    border-radius: 8px;
  }

  & .chat-header {
    width: 100%;
    height: 11.67%;
    background: #3f51b5;
    border-radius: clamp(4.375px, 0.4375vw, 7px) clamp(4.375px, 0.4375vw, 7px) 0px 0px;
    padding: clamp(5px, 0.5vw, 8px) clamp(7.5px, 0.75vw, 12px);
    font-size: clamp(8.75px, 0.875vw, 14px);
    color: #fff;

    &.mobile {
      height: 56px;
      padding: 8px 12px;
      font-size: 14px;
    }

    & .box-chat-icon {
      width: 21.28%;
      padding: 0%;
      border-radius: clamp(61.875px, 6.1875vw, 99px);
      background-color: #fff;
      margin-right: clamp(10px, 1vw, 16px);
      overflow: hidden;

      &.mobile {
        width: 40px;
        height: 40px;
        margin-right: 16px;
        border-radius: 50%;
      }
    }

    & .button-chat-back {
      width: 9.31%;

      &.mobile {
        width: 35px;
      }
    }

    & .button-chat-close {
      width: 9.31%;

      &.mobile {
        width: 35px;
      }
    }
  }

  & .chat-content {
    width: 100%;
    height: 88.33%;

    & .chat-start {
      width: 100%;
      height: 100%;
      padding: clamp(10px, 1vw, 16px) clamp(7.5px, 0.75vw, 12px);

      &.mobile {
        padding: 12px;
      }
    }

    & .chat-scroll {
      width: 100%;
      height: 100%;
      overflow: auto;
      padding: clamp(10px, 1vw, 16px) clamp(7.5px, 0.75vw, 12px);

      &.mobile {
        padding: 16px 12px;
      }
    }

    & .button-chat-practice {
      width: 100%;
      border: clamp(0.625px, 0.0625vw, 1px) solid #000;
      padding: clamp(3.75px, 0.375vw, 6px) clamp(6.25px, 0.625vw, 10px);
      border-radius: clamp(3.75px, 0.375vw, 6px);
      cursor: pointer;
      margin-bottom: clamp(5px, 0.5vw, 8px);
      font-size: clamp(8.75px, 0.875vw, 14px);

      transition: 0.2s ease-in-out;

      &.mobile {
        border: 1px solid #000;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 14px;
        margin-bottom: 8px;
      }

      &:hover {
        background: #f0f0f0;
        color: #000;
      }
    }

    & .chat-message {
      max-width: 95%;
      width: fit-content;
      min-width: 19.95%;
      min-height: clamp(21.87px, 2.1875vw, 35px);
      padding: clamp(3.75px, 0.375vw, 6px) clamp(8.75px, 0.875vw, 14px);
      border-radius: clamp(10.93px, 1.09375vw, 17.5px);
      background: #e8e8e8;
      margin-bottom: clamp(10px, 1vw, 16px);
      color: #343434;
      font-size: clamp(8.75px, 0.875vw, 14px);
      line-height: clamp(14.375px, 1.4375vw, 23px);

      &.mobile {
        min-height: 35px;
        padding: 6px 14px;
        border-radius: 17.5px;
        font-size: 14px;
        line-height: 23px;
      }

      &.waiting {
        color: #fff;
        background-color: #235e93;

        & .icon-waiting {
          width: 19.15%;
          padding: 9.6%;
          border-radius: 50%;
          background-color: #fff;

          &.mobile {
            width: 8.857px;
          }

          &.animation-waiting {
            animation: waiting 1s ease-in-out infinite;

            opacity: 0;

            @keyframes waiting {
              0% {
                opacity: 0;
              }
              79% {
                opacity: 1;
              }
              80% {
                opacity: 1;
              }
              99% {
                opacity: 1;
              }
              100% {
                opacity: 1;
              }
            }
          }
        }
      }
    }

    & .box-button-chat {
      padding: clamp(7.5px, 0.75vw, 12px);

      &.mobile {
        padding: 12px;
      }

      & .button-chat {
        width: fit-content;
        border: clamp(0.625px, 0.0625vw, 1px) solid #000;
        padding: clamp(3.75px, 0.375vw, 6px) clamp(6.25px, 0.625vw, 10px);
        border-radius: clamp(3.75px, 0.375vw, 6px);
        cursor: pointer;
        font-size: clamp(8.75px, 0.875vw, 14px);

        transition: 0.2s ease-in-out;

        &.mobile {
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
        }

        &:hover {
          background: #f0f0f0;
          color: #000;
        }
      }
    }

    & .button-prompt {
      width: fit-content;
      border: clamp(0.625px, 0.0625vw, 1px) solid #000;
      padding: clamp(3.75px, 0.375vw, 6px) clamp(6.25px, 0.625vw, 10px);
      border-radius: clamp(3.75px, 0.375vw, 6px);
      cursor: pointer;
      font-size: clamp(8.75px, 0.875vw, 14px);
      margin: 1% 0% 0% 1%;
      transition: 0.2s ease-in-out;

      &.mobile {
        padding: 6px 10px;
        border: 1px solid #000;
        border-radius: 6px;
        font-size: 14px;
        margin: 4px 0% 0% 4px;
      }

      &.other-choice {
        background-color: #ffcf51;

        &:hover {
          background-color: #fadc90;
        }
      }

      &:hover {
        background: #f0f0f0;
        color: #000;
      }
    }

    & .button-start-winny-chat {
      width: 31.915%;
      cursor: pointer;

      transform: scale(1);
      -webkit-transform: scale(1);
      -moz-transform: scale(1);

      transition: 0.1s ease-in-out;

      &.mobile {
        width: 120px;
      }

      &:active {
        transform: scale(0.95);
        -webkit-transform: scale(0.95);
        -moz-transform: scale(0.95);
      }
    }
  }
}
</style>
