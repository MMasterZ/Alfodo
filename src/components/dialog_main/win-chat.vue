<template>
  <!-- #region Video Grammar Lesson -->
  <div v-if="!isShowChatBox && systemStore.routerName == 'grammarlesson'">
    <div class="relative-position fit">
      <!-- #region Menu In Video Lesson Page -->
      <div class="z-max animate__animated animate__fadeInUp">
        <div
          align="right"
          @click="funcOpenWinChat()"
          class="cursor-pointer relative-position"
          v-ripple
        >
          <ai-character></ai-character>
          <div class="absolute-center" style="top: -10%">
            <div
              class="relative-position animate__animated animate__fadeIn"
              v-if="isShowMessageAi"
            >
              <q-img
                width="13%"
                class="absolute-center"
                style="top: 115%; right: 20%"
                src="/images/icon_main/icon-message-ai.png"
                no-transition=""
                no-spinner=""
              ></q-img>
              <div class="box-message-ai grammar" align="center">
                <div
                  class="font-mali-b"
                  :style="
                    $q.platform.is.desktop
                      ? 'font-size: clamp(8px,0.87vw,14px)'
                      : 'font-size: 12px'
                  "
                >
                  {{ `${aiSpeaks}` }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </div>
  <!-- #endregion -->

  <!-- #region lobby Page -->
  <div
    class="absolute-top-right"
    :class="synchronizeStore.isSync ? '' : 'cursor-pointer'"
    v-if="!isShowChatBox && systemStore.routerName == 'lobby'"
    :style="
      $q.platform.is.desktop
        ? 'right: 5%; top: 30%;z-index:1'
        : 'right: 8px; top: 84px;z-index:1'
    "
  >
    <div
      class="row justify-center items-center relative-position animate__animated animate__fadeIn"
    >
      <div align="center" class="" @click="funcOpenWinChat()">
        <div class="relative-position" align="right">
          <ai-character v-if="$q.platform.is.desktop"></ai-character>
          <header-ai
            :width="`50`"
            :height="`50`"
            :background="'rgba(0,0,0,.5)'"
            :isBorder="true"
            v-if="$q.platform.is.mobile"
          ></header-ai>
          <div
            :class="$q.platform.is.desktop ? 'absolute-center' : 'absolute-top-right'"
            :style="$q.platform.is.desktop ? 'top: -25px' : 'top: 5px;right:55px;'"
          >
            <div
              class="relative-position animate__animated animate__fadeIn"
              v-if="!synchronizeStore.isSync && isShowMessageAi"
            >
              <q-img
                width="30px"
                class="absolute-bottom"
                style="bottom: -15px; transform: translateX(-50%)"
                :style="$q.platform.is.desktop ? 'left: 50%' : ''"
                src="/images/icon_main/icon-message-ai.png"
                v-if="$q.platform.is.desktop"
              ></q-img>
              <div class="box-message-ai row">
                <div
                  class="col-12 self-center font-mali-b row justify-center"
                  align="left"
                  :style="$q.platform.is.desktop ? 'font-size:16px' : 'font-size:12px'"
                >
                  {{ `${aiSpeaks}` }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- #endregion -->

  <q-dialog v-model="isShowDialogMenuPracticeListNameBySkill" persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div style="width: 450px">
          <div style="height: 50px; background-color: #f6bf46" class="row justify-center">
            <div class="col-1" style="width: 50px"></div>
            <div class="self-center col" align="center">
              <span class="f20 font-mali-b">Choose Topic</span>
            </div>
            <div class="self-center col-1" align="center" style="width: 50px">
              <q-btn
                round
                flat=""
                @click="isShowDialogMenuPracticeListNameBySkill = false"
              >
                <q-img
                  src="/images/icon_main/icon-close.png"
                  no-transition=""
                  no-spinner=""
                ></q-img>
              </q-btn>
            </div>
          </div>
          <div class="bg-white">
            <div class="box-scroll-practice-list">
              <div class="q-mt-md">
                <div
                  v-for="(itemListName, indexListName) in practiceListNameBySkill"
                  :key="indexListName"
                  class="q-pb-sm q-px-md"
                >
                  <div
                    class="button-practice-list-name relative-position font-mali-r f14"
                    v-ripple
                    @click="funcSelectedPracticeListNameBySkill(itemListName)"
                  >
                    <div class="q-pa-sm">
                      <span>
                        {{ itemListName.nameEng }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="isShowChatBox"
    maximized
    persistent
    transition-show="fade"
    transition-hide="fade"
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit no-padding">
        <!-- #region Box chat Winchat -->
        <div
          v-if="isShowChatBox"
          class="z-max box-win-chat-start fixed-bottom-right"
          style="animation-duration: 0.3s"
          :class="
            systemStore.routerName == 'lobby'
              ? 'animate__fadeInUp'
              : 'animate__fadeInRight'
          "
        >
          <!-- #region Header -->
          <div style="width: 100%; height: 50px; background-color: #f6bf46" class="row">
            <div class="self-center q-px-sm">
              <header-ai></header-ai>
            </div>
            <div class="self-center">
              <span class="q-mx-xs font-mali-b" style="color: #343434; font-size: 14px">
                {{ nameBot }}
              </span>
            </div>
            <q-space />
            <div class="col self-center" align="right">
              <q-btn flat @click="funcCloseChat()" round>
                <q-img
                  style="width: 35px"
                  src="/images/button_main/close-chat-btn.png"
                  no-transition=""
                  no-spinner=""
                ></q-img>
              </q-btn>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Body -->
          <div>
            <!-- #region Scroll message box -->
            <div
              ref="scrollAreaRef"
              id="scrollAreaRef"
              class="box-scroll-chat shadow-3 relative-position"
              align="left"
            >
              <div class="q-pa-sm" v-if="isStartChat">
                <!-- #region Message list -->
                <div
                  v-for="(itemMessage, indexMessage) in messageList"
                  :key="indexMessage"
                  class="row items-start q-mb-sm"
                  :class="itemMessage.isMine ? 'justify-end' : 'justify-start'"
                >
                  <!-- <div class="q-pr-sm" v-if="!itemMessage.isMine" align="left">
                  <q-img
                    style="width: 30px"
                    src="/images/button_main/chat-bot-icon.png"
                    no-transition=""
                    no-spinner=""
                  ></q-img>
                </div> -->
                  <div class="col" :align="itemMessage.isMine ? 'right' : 'left'">
                    <div
                      :class="
                        itemMessage.isMine ? 'chat-box-ai-self' : 'chat-box-ai width-fit'
                      "
                      :style="itemMessage.isMine ? '' : 'border-radius: 18px'"
                      align="left"
                    >
                      <span v-html="itemMessage.displayText"></span>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Message animation -->
                <div class="row items-start" v-show="isDisplayMessageAnimation">
                  <!-- <div class="q-pr-sm" align="left">
                  <q-img
                    style="width: 30px"
                    src="/images/button_main/chat-bot-icon.png"
                    no-transition=""
                    no-spinner=""
                  ></q-img>
                </div> -->
                  <div
                    id="displayMessage"
                    ref="displayMessageRef"
                    class="chat-box-ai"
                  ></div>
                </div>
                <!-- #endregion -->

                <!-- #region Typing animation -->
                <div v-if="isTyping" class="row items-start">
                  <!-- <div class="q-pr-sm" align="left">
                  <q-img
                    style="width: 30px"
                    src="/images/button_main/chat-bot-icon.png"
                    no-transition=""
                    no-spinner=""
                  ></q-img>
                </div> -->
                  <div
                    class="chat-box-ai row justify-center items-center relative-position"
                    style="border-radius: 30px"
                    :style="
                      systemStore.routerName == 'lobby'
                        ? 'width: 50px; height: 20px;'
                        : 'width: 75px; height: 35px;'
                    "
                  >
                    <q-spinner-dots color="white" class="absolute-center" size="40px" />
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Home Work -->
                <div v-if="sessionStage == 'Homework'">
                  <div style="height: 35px"></div>
                  <div
                    class="row fixed-bottom q-px-xs"
                    style="border-top: 1px solid #235e93; background-color: #fff"
                  >
                    <div class="col">
                      <q-input
                        class=""
                        input-class="q-pa-sm"
                        dense
                        borderless=""
                        square=""
                        placeholder="พิมพ์ข้อความที่นี่"
                        v-model="inputHomeWork"
                        @keyup.enter="funcHomeWork()"
                        autofocus=""
                      ></q-input>
                    </div>
                    <div class="col-1 self-center width-fit">
                      <q-btn
                        flat
                        clas
                        dense
                        square
                        class="q-px-sm"
                        style="color: #54a2e6"
                        @click="funcHomeWork()"
                      >
                        <q-icon name="fas fa-long-arrow-alt-right"></q-icon>
                      </q-btn>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->
              </div>

              <!-- #region Start menu in video lesson Page -->
              <div
                class="fit relative-position row justify-center items-center"
                v-if="!isStartChat && systemStore.routerName == 'grammarlesson'"
              >
                <div align="center">
                  <q-img
                    @click="funcSelectedForMore('start')"
                    class="relative-position cursor-pointer"
                    v-ripple
                    style="width: 120px"
                    :src="`${
                      isTryAgain
                        ? '/images/button_main/button-tryagain-chat-gpt.png'
                        : '/images/button_main/start-chat.png'
                    }`"
                    no-transition=""
                    no-spinner=""
                  ></q-img>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Start menu in lobby page -->
              <div
                class="fit relative-position"
                v-if="!isStartChat && systemStore.routerName == 'lobby'"
              >
                <div class="row fit">
                  <div align="left" class="col-12">
                    <div class="q-pa-sm">
                      <div class="chat-box-ai width-fit" style="border-radius: 18px">
                        <span class="font-mali-r f14">
                          วันนี้เรียนอะไรเพิ่มเติมดีนะ
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 self-end" align="left">
                    <div class="row justify-center q-pa-sm" align="left">
                      <div class="col-12 row justify-end" align="right">
                        <div class="col-5 width-fit" v-if="isTryAgain">
                          <div class="q-pa-xs">
                            <div
                              class="buttton-chat-tip width-fit"
                              @click="funcSelectedPracticeListNameBySkill()"
                            >
                              {{ `ลองอีกครั้ง` }}
                            </div>
                          </div>
                        </div>
                        <!-- <div class="col-5 width-fit">
                        <div class="q-pa-xs">
                          <div
                            class="buttton-chat-tip width-fit"
                            @click="funcSelectedChatTips('Homework')"
                          >
                            {{ `สอนการบ้าน` }}
                          </div>
                        </div>
                      </div> -->
                        <div class="col-5 width-fit">
                          <div class="q-pa-xs">
                            <div
                              class="buttton-chat-tip width-fit"
                              @click="funcSelectedChatTips('Grammar')"
                            >
                              {{ `Grammar Tips` }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Button question -->
              <div class="relative-position" align="center" v-if="isShowReadyPrompt">
                <div class="q-py-sm">
                  <div v-if="isStartChat" class="">
                    <div v-if="isShowReadyPrompt" align="right">
                      <div class="row justify-end">
                        <span
                          class="relative-position cursor-pointer width-fit button-chat-active"
                          @click="funcSelectedForMore('understand')"
                        >
                          เข้าใจแล้ว
                        </span>
                        <span
                          class="relative-position cursor-pointer width-fit button-chat-active"
                          @click="funcSelectedForMore('more_explain')"
                        >
                          อธิบายเพิ่มเติม
                        </span>
                      </div>
                      <div class="row justify-end">
                        <span
                          class="relative-position cursor-pointer width-fit button-chat-active"
                          @click="funcSelectedForMore('more_example')"
                        >
                          ขอตัวอย่างเพิ่ม
                        </span>
                        <span
                          class="relative-position cursor-pointer width-fit button-chat-active"
                          @click="funcSelectedForMore('more_exercise')"
                        >
                          ขอแบบฝึกหัดเพิ่ม
                        </span>
                      </div>
                      <div
                        class="row justify-end"
                        v-if="systemStore.routerName == 'lobby'"
                      >
                        <span
                          class="relative-position cursor-pointer width-fit button-chat-active active"
                          @click="funcBackToStartChat()"
                        >
                          เลือกหัวข้ออื่น
                        </span>
                      </div>
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
        <!-- #endregion -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import aiCharacter from "src/components/ai_character_main/ai-character.vue";
import headerAi from "src/components/ai_character_main/header-ai.vue";
import { usePracticeStore } from "src/stores/practice";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useCourseStore } from "src/stores/course";
import axios from "axios";
import { useSystemStore } from "src/stores/system";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { useSynchronizeStore } from "src/stores/synchronize";
export default {
  components: {
    aiCharacter,
    headerAi,
  },
  setup(props) {
    const synchronizeStore = useSynchronizeStore();

    // Initial Quasar
    const $q = useQuasar();
    const $router = useRouter();
    const $route = useRoute();
    let cancelToken = axios.CancelToken;
    let source = cancelToken.source();
    const nameBot = ref("Winny");

    const isShowChatBox = ref(false);
    const messageList = ref([]);

    const isStartChat = ref(false);
    const funcSelectedForMore = (type) => {
      const systemStore = useSystemStore();
      const practiceStore = usePracticeStore();

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

      funcResponseChatAPI(selectedPracticeListName.value, type, sessionStage.value);
    };

    const history = ref([]);
    const isTyping = ref(false);

    const displayMessageRef = ref(null);
    const isEnableAnimationScroll = ref(false);
    const observeScroll = () => {
      let ele2 = document.getElementById("scrollAreaRef");

      document.getElementById("scrollAreaRef").addEventListener("wheel", (event) => {
        isEnableAnimationScroll.value = false;
      });

      if (isEnableAnimationScroll.value) {
        ele2.scrollTop = ele2.scrollHeight;
      }
    };

    let listenAPI = null;
    const isTryAgain = ref(false);
    const funcResponseChatAPI = async (topic, prompt, skill) => {
      try {
        source = cancelToken.source();

        isTryAgain.value = false;
        isTyping.value = true;
        isShowReadyPrompt.value = false;
        isShowDialogMenuPracticeListNameBySkill.value = false;
        isStartChat.value = true;

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
          isStartChat.value = false;
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

    const isShowReadyPrompt = ref(false);

    const isDisplayMessageAnimation = ref(false);
    let sto = null;
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
          sto = setTimeout(typeWriter, 5);
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
          clearTimeout(sto);
        }
      }

      typeWriter();
    };

    const scrollAreaRef = ref(null);

    const funcOpenWinChat = () => {
      if (synchronizeStore.isSync) return;

      // isShowChatBox.value = true;
      // sessionStage.value = "";
      // isStartChat.value = false;
    };

    const isShowDialogMenuPracticeListNameBySkill = ref(false);
    const practiceListNameBySkill = ref([]);
    const sessionStage = ref("");
    const selectedTempPracticeListName = ref({});
    const inputHomeWork = ref("");
    const funcSelectedChatTips = (stage) => {
      sessionStage.value = stage;

      const practiceStore = usePracticeStore();
      let filterPracticeNameList = [];

      if (stage == "Grammar") {
        filterPracticeNameList = practiceStore.listName.Grammar;

        filterPracticeNameList.sort((a, b) => {
          return a.unit - b.unit;
        });

        practiceListNameBySkill.value = filterPracticeNameList;

        isShowDialogMenuPracticeListNameBySkill.value = true;
      } else if (stage == "Homework") {
        isStartChat.value = true;

        messageList.value.push({
          id: messageList.value.length + 1,
          text: `อยากให้ ${nameBot.value} สอนอะไรดีละ`,
          isMine: false,
          displayText: `อยากให้ ${nameBot.value} สอนอะไรดีละ`,
        });
      }
    };

    const selectedPracticeListName = ref("");
    const funcSelectedPracticeListNameBySkill = (data) => {
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

      funcResponseChatAPI(tempData.nameEng, "start", tempData.skill);
    };

    const funcHomeWork = () => {
      if (inputHomeWork.value == "") return;

      messageList.value.push({
        id: messageList.value.length + 1,
        text: inputHomeWork.value,
        isMine: true,
        displayText: inputHomeWork.value,
      });

      inputHomeWork.value = "";

      setTimeout(() => {
        let ele2 = document.getElementById("scrollAreaRef");
        ele2.scrollBy({
          top: ele2.scrollHeight, // could be negative value
          left: 0,
          behavior: "smooth",
        });
        isEnableAnimationScroll.value = true;
      }, 100);

      // funcResponseChatAPI(tempData.nameEng, "start", tempData.skill);
    };

    const funcBackToStartChat = () => {
      isShowDialogMenuPracticeListNameBySkill.value = false;
      isStartChat.value = false;
      isShowChatBox.value = true;
      isShowReadyPrompt.value = false;
      isTyping.value = false;
      isDisplayMessageAnimation.value = false;
      messageList.value = [];
      history.value = [];
    };

    const funcCloseChat = () => {
      if (listenAPI) {
        clearTimeout(listenAPI);
        source.cancel("Close Chat");
      }

      isShowChatBox.value = false;
      isStartChat.value = false;
      sessionStage.value = "";
      inputHomeWork.value = "";
      isShowReadyPrompt.value = false;
      isShowDialogMenuPracticeListNameBySkill.value = false;
      isDisplayMessageAnimation.value = false;
      isTyping.value = false;
      isTryAgain.value = false;
      messageList.value = [];
      history.value = [];
    };

    const isShowMessageAi = ref(false);
    // Ai Talk
    const aiSpeaks = ref("");
    let listenMessageAi = null;
    const funcSetAiMessage = () => {
      const systemStore = useSystemStore();
      let random = Math.floor(Math.random() * 4) + 1;

      let speaks = [
        "สงสัยอะไรก็ถามได้นะ",
        "มีอะไรสงสัยลองคลิกเลย",
        "ให้ฉันช่วยมั้ย",
        "สวัสดี! มีอะไรให้ช่วยมั้ย",
        "ปรึกษาฉันได้นะ",
        "คุยได้นะ",
        "มาทบทวนด้วยกันมั้ย",
      ];

      if (systemStore.routerName == "grammarlesson") {
        speaks.push(...["แกรมม่าแกรมใจ", "ยากไปมั้ย ถามได้นะ"]);
      }

      speaks.sort(() => Math.random() - 0.5);

      aiSpeaks.value = speaks[0];

      let setShowTimeout = random * 1000;

      listenMessageAi = setTimeout(() => {
        isShowMessageAi.value = true;

        setTimeout(() => {
          isShowMessageAi.value = false;
          funcSetAiMessage();
        }, 10000);
      }, setShowTimeout);
    };

    onMounted(() => {
      const systemStore = useSystemStore();

      if (
        systemStore.routerName == "lobby" ||
        systemStore.routerName == "grammarlesson"
      ) {
        funcSetAiMessage();
      }
    });

    onBeforeUnmount(() => {
      if (listenAPI) {
        clearTimeout(listenAPI);
        source.cancel("Close Chat");
      }

      if (listenMessageAi) {
        clearTimeout(listenMessageAi);
      }
    });

    return {
      // Data
      nameBot,
      aiSpeaks,
      messageList,
      practiceListNameBySkill,
      sessionStage,
      inputHomeWork,

      // Store
      synchronizeStore,
      practiceStore: usePracticeStore(),
      systemStore: useSystemStore(),
      courseStore: useCourseStore(),

      // Function
      funcSelectedForMore,
      funcOpenWinChat,
      displayStringLetterByLetter,
      funcSelectedChatTips,
      funcSelectedPracticeListNameBySkill,
      funcCloseChat,
      funcBackToStartChat,
      funcHomeWork,

      // Boolean
      isShowChatBox,
      isStartChat,
      isDisplayMessageAnimation,
      isTyping,
      scrollAreaRef,
      isShowReadyPrompt,
      displayMessageRef,
      isShowMessageAi,
      isShowDialogMenuPracticeListNameBySkill,
      isTryAgain,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-win-chat-main {
  max-width: 400px;
  width: 100%;
  min-width: 300px;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px 10px 0px 0px;
}

.box-win-chat-start {
  max-width: 400px;
  min-width: 300px;
  width: 100%;
}

.chat-box-ai {
  width: 90%;
  background-color: #235e93;
  border-radius: 5px;
  color: #ffffff;
  padding: 8px 15px;
}

.chat-box-ai-self {
  max-width: 80%;
  width: fit-content;
  background-color: #d9d9d9;
  border-radius: 18px;
  color: #343434;
  padding: 8px 15px;
}
.row-height {
  height: calc((100vh - 50px));
}

.scroll-area-height {
  height: calc((100vh - 100px));
}

.text-color {
  color: #6c6c6c;
}

.button-chat-active {
  border: 1px solid #818181;
  border-radius: 5px;
  transition: transform 0.5s;
  transform: scale(1);
  padding: 5px 10px;
  margin: 5px;
  box-shadow: 0px 1px 2px 0px #00000029;
  font-family: Mali-R;
}
.button-chat-active:hover {
  transition: transform 0.5s;
  transform: scale(0.95);
}

.button-chat-active.active {
  background-color: #ffcf51;
}

.box-scroll-chat {
  height: 350px;
  margin: auto;
  background-color: white;
  overflow-y: auto;
}

.box-scroll-chat::-webkit-scrollbar {
  width: 10px;
  height: 0;
}

.box-scroll-chat::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.box-scroll-chat::-webkit-scrollbar-thumb {
  background: #888;
}

.buttton-chat-tip {
  border: 1px solid #818181;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-family: Mali-R;
  transition: 0.3s;
}

.buttton-chat-tip:hover {
  background-color: #ddd;
  transition: 0.3s;
}

.button-practice-list-name {
  border: 1px solid #818181;
  cursor: pointer;
  font-family: Mali-R;
  transition: 0.3s;
  width: 100%;
  text-align: left;
  border-radius: 5px;
}

.button-practice-list-name:hover {
  background-color: #ddd;
  transition: 0.3s;
}

.box-scroll-practice-list {
  height: 550px;
  margin: auto;
  background-color: white;
  overflow-y: auto;
}

.box-button-question-main {
  width: 100%;
  box-shadow: 0px -3px 5px 0px rgba(0, 0, 0, 0.2);
}

.box-message-ai {
  min-width: 100px;
  max-width: fit-content;
  width: 100%;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
}

.box-message-ai.grammar {
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
}
</style>
