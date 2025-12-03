<template>
  <q-page
    :class="$q.platform.is.desktop ? 'row justify-center items-center ' : 'row'"
  >
    <!-- background-container -->
    <div
      class="relative-position"
      style=""
      :style="$q.platform.is.desktop ? 'overflow: hidden' : 'overflow: hidden'"
      :class="
        $q.platform.is.desktop ? '' : 'col-12 background-container-mobile'
      "
    >
      <background-homework v-if="$q.platform.is.desktop"></background-homework>

      <!-- #region Character -->
      <div
        class="absolute-center fit"
        v-show="
          $q.platform.is.desktop ||
          ($q.platform.is.mobile && selectedType == '')
        "
      >
        <winny-character
          :isProcessing="isProcessing"
          :isTalking="isTalking"
          :selectedType="selectedType"
          :isErrorResponse="isErrorResponse"
        ></winny-character>
      </div>
      <!-- #endregion -->

      <!-- #region Button Select Grammar & Homework -->
      <div
        class="absolute-center box-button-main justify-center row"
        :class="$q.platform.is.desktop ? '' : 'mobile'"
        v-if="selectedType == ''"
      >
        <div
          class="col-1 button-active homework-teach"
          :class="$q.platform.is.desktop ? '' : 'mobile'"
          @click="funcSelectedType('teach')"
        >
          <q-img
            src="/images/button_main/button-homework-teach.png"
            no-spinner
            no-transition
          ></q-img>
        </div>
        <div
          class="col-1 button-active homework-teach"
          :class="$q.platform.is.desktop ? '' : 'mobile'"
          @click="funcSelectedType('assist')"
        >
          <q-img
            src="/images/button_main/button-homework-assist.png"
            no-spinner
            no-transition
          ></q-img>
        </div>

        <div
          class="col-1 button-active homework-teach disable"
          :class="$q.platform.is.desktop ? '' : 'mobile'"
        >
          <q-img
            src="/images/button_main/button-homework-chat.png"
            no-spinner
            no-transition
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Desktop -->
      <div v-if="$q.platform.is.desktop && selectedType != ''">
        <!-- #region Box type homework -->
        <div class="fit absolute-center" v-if="selectedType == 'assist'">
          <!-- #region Chat -->
          <div class="absolute-center box-homework-chat" v-if="!isProcessing">
            <div class="animate__animated animate__fadeInUp">
              <q-img
                src="/images/box_main/box-homework-chat.png"
                no-spinner
                no-transition
              >
                <div class="transparent fit no-padding">
                  <div class="fit" style="padding: 2%">
                    <div class="box-chat relative-position">
                      <div class="chat-homework">
                        <q-input
                          autogrow
                          v-model.trim="inputHomeWork"
                          borderless=""
                          type="textarea"
                          dense=""
                          placeholder="พิมพ์ข้อความ..."
                          @keydown.enter="funcSendHomeWork()"
                          input-style="font-size:min(16px, 1vw);padding:0.5%;margin:0%;"
                        />
                      </div>
                      <div class="absolute-bottom-right button-active send">
                        <q-img
                          src="/images/button_main/button-homework-send.png"
                          no-spinner
                          no-transition
                          @click="funcSendHomeWork()"
                        ></q-img>
                      </div>
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
          </div>
          <!-- #endregion -->
        </div>
        <!-- #endregion -->

        <!-- #region Box type teach -->
        <div
          class="absolute-center fit"
          v-if="selectedType == 'teach' && isShowReadyPrompt"
        >
          <div class="absolute-center box-homework-chat" v-if="!isProcessing">
            <div class="animate__animated animate__fadeInUp">
              <q-img
                src="/images/box_main/box-homework-chat.png"
                no-spinner
                no-transition
              >
                <div class="transparent fit no-padding">
                  <div class="fit" style="padding: 2%">
                    <div
                      class="box-chat relative-position row"
                      v-if="!isErrorResponse"
                    >
                      <div
                        class="button-text font-mali-r self-start"
                        v-for="(itemQuestion, indexQuestion) in questionList"
                        :key="indexQuestion"
                        style="margin: 0% 0.5%"
                        :class="
                          itemQuestion.isShowDialogTopic ? 'other-menu' : ''
                        "
                      >
                        <div @click="funcSelectedQuestionList(itemQuestion)">
                          {{ itemQuestion.text }}
                        </div>
                      </div>
                    </div>

                    <div class="box-chat relative-position row" v-else>
                      <div
                        class="button-text font-mali-r self-start other-menu"
                        style="margin: 0% 0.5%"
                      >
                        <div
                          @click="
                            funcSelectedQuestionList({
                              value: 'other_menu',
                            })
                          "
                        >
                          {{ `เลือกหัวข้ออื่น` }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region processing -->
        <!-- #region Answer Chat Processing -->
        <div
          class="absolute-center box-homework-answer-chat-processing"
          v-if="!isShowReadyPrompt && isProcessing"
        >
          <div class="animate__animated animate__fadeIn">
            <q-img
              src="/images/box_main/box-homework-answer-chat-processing.png"
              no-spinner
              no-transition
            >
              <div class="fit transparent no-padding relative-position">
                <div
                  class="absolute-center row justify-center items-center fit"
                >
                  <div
                    v-for="i in 3"
                    class="icon-homework-loading animation-homework-loading"
                    :style="`animation-delay: ${i * 0.1}s`"
                  >
                    <q-img
                      src="/images/icon_main/icon-homework-loading.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>
              </div>
            </q-img>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Answer Chat -->
        <div
          class="absolute-center box-homework-answer-chat"
          v-if="isShowReadyPrompt"
        >
          <div class="animate__animated animate__fadeIn">
            <q-img
              src="/images/box_main/box-homework-answer-chat.png"
              no-spinner
              no-transition
            >
              <div class="fit transparent no-padding">
                <div class="box-answer-main">
                  <div class="box-answer-scroll font-mali-r" id="scrollAreaRef">
                    <div
                      v-show="isDisplayMessageAnimation"
                      id="displayMessage"
                    ></div>
                    <div v-show="!isDisplayMessageAnimation">
                      <div v-html="aiChatMessage"></div>
                    </div>
                  </div>
                </div>
              </div>
            </q-img>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <!-- #region Mobile -->
      <div v-if="$q.platform.is.mobile && selectedType != ''">
        <div class="absolute-center fit relative-position">
          <!-- #region Chat bot -->
          <div id="scrollAreaRef" class="absolute-top box-homework-chat mobile">
            <!-- #region Chat -->
            <div v-for="(itemChat, indexChat) in scriptList" :key="indexChat">
              <div
                :class="itemChat.isMe ? 'row reverse' : 'row'"
                align="right"
                style="margin-bottom: 3%"
              >
                <div
                  class="self-end box-script-character-main mobile"
                  :style="
                    itemChat.isMe ? 'margin-left:2.5%;' : 'margin-right:2.5%'
                  "
                >
                  <q-img
                    src="/images/box_main/box-character-backdrop.png"
                    no-spinner
                    no-transition
                  >
                    <div class="fit transparent no-padding text-black">
                      <div
                        class="box-script-circle mobile relative-position row justify-center items-center"
                      >
                        <div
                          class="absolute-center"
                          style="top: 100%; width: 225%"
                        >
                          <character
                            :isAnimation="false"
                            v-if="itemChat.isMe"
                          ></character>

                          <winny-header-icon
                            v-if="!itemChat.isMe"
                          ></winny-header-icon>
                        </div>
                      </div>
                    </div>
                  </q-img>
                </div>
                <div
                  class="self-center font-mali-r box-script-chat mobile"
                  :class="itemChat.isMe ? '' : 'ai user-selected'"
                  :style="
                    !itemChat.isMe &&
                    isProcessing &&
                    !isDisplayMessageAnimation &&
                    indexChat == scriptList.length - 1
                      ? 'border-radius:4em;'
                      : ''
                  "
                  align="left"
                >
                  <div v-if="itemChat.isMe" v-html="itemChat.text"></div>
                  <div v-if="!itemChat.isMe">
                    <!-- #region Processing -->
                    <div
                      v-if="isProcessing && indexChat == scriptList.length - 1"
                      class=""
                    >
                      <div
                        class="row justify-center items-center"
                        v-if="!isDisplayMessageAnimation"
                      >
                        <div v-for="i in 3" :key="i" class="icon-processing">
                          <q-img
                            class="animation-processing"
                            :style="`animation-delay: ${i * 0.1}s`"
                            src="/images/icon_main/icon-processing.png"
                            no-spinner=""
                            no-transition=""
                          ></q-img>
                        </div>
                      </div>

                      <!-- #region Animation Display text -->
                      <div v-show="isDisplayMessageAnimation">
                        <div id="displayMessage"></div>
                      </div>
                      <!-- #endregion -->
                    </div>
                    <!-- #endregion -->

                    <div v-else>
                      <div v-html="itemChat.text"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Question List Type Grammar  -->
            <div class="row" v-if="!isProcessing && selectedType == 'teach'">
              <div
                class="col-1"
                style="
                  max-width: 40px;
                  width: min(40px, max(26px, 11.645%));
                  margin-right: 1.5%;
                "
              ></div>
              <div class="col row" v-if="!isErrorResponse">
                <div
                  class="button-text mobile font-mali-r self-start"
                  v-for="(itemQuestion, indexQuestion) in questionList"
                  :key="indexQuestion"
                  :class="itemQuestion.isShowDialogTopic ? 'other-menu' : ''"
                >
                  <div @click="funcSelectedQuestionList(itemQuestion)">
                    {{ itemQuestion.text }}
                  </div>
                </div>
              </div>
              <div class="col row" v-else>
                <div
                  class="button-text mobile font-mali-r self-start other-menu"
                >
                  <div
                    @click="
                      funcSelectedQuestionList({
                        value: 'other_menu',
                      })
                    "
                  >
                    {{ `เลือกหัวข้ออื่น` }}
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>
          <!-- #endregion -->

          <!-- #region Input type homework -->
          <div
            class="absolute-bottom box-input-chat-main-mobile row"
            v-if="selectedType == 'assist'"
          >
            <div class="self-center col">
              <div class="box-input-chat">
                <q-input
                  rounded
                  borderless
                  dense
                  input-class="q-px-md "
                  type="textarea"
                  autogrow
                  v-model.trim="inputHomeWork"
                  @keydown.enter="funcSendHomeWork()"
                ></q-input>
              </div>
            </div>
            <div class="self-end button-active send-mobile">
              <q-img
                style="margin-bottom: -8px"
                :src="`/images/button_main/button-homework-send-mobile${
                  inputHomeWork.length ? '' : '-disable'
                }.png`"
                no-spinner
                no-transition
                @click="funcSendHomeWork()"
              ></q-img>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region button right -->
      <div
        class="absolute-top-right box-button-homework-right row justify-end"
        v-if="selectedType != ''"
      >
        <!-- <div
          class="col-1 button-active language"
          v-if="selectedType == 'homework'"
          @click="funcChangeType('teach')"
        >
          <q-img
            src="/images/button_main/button-homework-type-teach.png"
            no-spinner=""
            no-transition=""
          ></q-img>
        </div>
        <div
          class="col-1 button-active language"
          v-if="selectedType == 'teach'"
          @click="funcChangeType('homework')"
        >
          <q-img
            src="/images/button_main/button-homework-type-homework.png"
            no-spinner=""
            no-transition=""
          ></q-img>
        </div> -->
        <div
          class="col-1 button-active script"
          @click="isShowDialogScript = true"
          v-if="$q.platform.is.desktop"
        >
          <q-img
            src="/images/button_main/button-homework-script.png"
            no-spinner=""
            no-transition=""
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Button close -->
      <div
        class="absolute-top-left button-active close"
        :class="$q.platform.is.desktop ? '' : 'mobile'"
      >
        <q-img
          src="/images/icon_main/icon-back.png"
          no-spinner
          no-transition
          @click="funcBack()"
        ></q-img>
      </div>
      <!-- #endregion -->
    </div>
  </q-page>

  <!-- #region Dialog Script -->
  <q-dialog v-model="isShowDialogScript" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div
          class="relative-position"
          style="max-width: 1600px; width: 100%; margin: auto"
          align="center"
        >
          <q-img
            class="box-dialog-container"
            src="/images/box_main/box-homework-dialog.png"
            no-spinner=""
            no-transition=""
          >
            <div class="fit transparent no-padding">
              <!-- Header -->
              <div class="box-dialog-header row justify-center items-center">
                <div class="col-1" style="width: 7.5555%"></div>
                <div class="col font-mali-b" align="center">Script</div>
                <div class="col-1" style="width: 7.5555%">
                  <q-img
                    width="100%"
                    class="button-active"
                    src="/images/icon_main/icon-close.png"
                    @click="isShowDialogScript = false"
                    v-close-popup
                    no-spinner=""
                    no-transition=""
                  ></q-img>
                </div>
              </div>

              <!-- Conten -->
              <div class="box-script-scroll">
                <div
                  v-for="(itemChat, indexChat) in scriptList"
                  :key="indexChat"
                >
                  <div
                    :class="itemChat.isMe ? 'row reverse' : 'row'"
                    align="right"
                    style="margin-bottom: 4%"
                    v-show="itemChat.text != ''"
                  >
                    <div
                      class="self-center box-script-character-main"
                      :style="
                        itemChat.isMe
                          ? 'margin-left:2.5%;'
                          : 'margin-right:2.5%'
                      "
                    >
                      <q-img
                        src="/images/box_main/box-character-backdrop.png"
                        no-spinner
                        no-transition
                      >
                        <div class="fit transparent no-padding text-black">
                          <div
                            class="box-script-circle relative-position row justify-center items-center"
                          >
                            <div
                              class="absolute-center"
                              style="top: 100%; width: 250%"
                            >
                              <character
                                :isAnimation="false"
                                v-if="itemChat.isMe"
                              ></character>

                              <winny-header-icon
                                v-if="!itemChat.isMe"
                              ></winny-header-icon>
                            </div>
                          </div>
                        </div>
                      </q-img>
                    </div>
                    <div
                      class="self-center font-mali-r box-script-chat"
                      :class="itemChat.isMe ? '' : 'ai user-selected'"
                      align="left"
                    >
                      <div v-html="itemChat.text"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Grammar Topic -->
  <q-dialog v-model="isShowDialogTopicGrammar" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div
          class="relative-position"
          style="max-width: 1600px; width: 100%; margin: auto"
          align="center"
        >
          <q-img
            class="box-dialog-container"
            :class="$q.platform.is.desktop ? '' : 'mobile'"
            src="/images/box_main/box-homework-dialog.png"
            no-spinner=""
            no-transition=""
          >
            <div class="fit transparent no-padding">
              <!-- Header -->
              <div
                class="box-dialog-header row justify-center items-center"
                :class="$q.platform.is.desktop ? '' : 'mobile'"
              >
                <div
                  :style="
                    $q.platform.is.desktop ? 'width: 7.5555%' : 'width:50px'
                  "
                ></div>
                <div class="col font-mali-b" align="center">Choose Topic</div>
                <div
                  :style="
                    $q.platform.is.desktop ? 'width: 7.5555%' : 'width:50px'
                  "
                >
                  <q-img
                    :width="$q.platform.is.desktop ? '100%' : '35px'"
                    class="button-active close mobile"
                    src="/images/icon_main/icon-close.png"
                    @click="funcCloseDialogTopicGrammar()"
                    v-close-popup
                    no-spinner=""
                    no-transition=""
                  ></q-img>
                </div>
              </div>

              <div class="box-script-scroll">
                <div
                  v-for="(
                    itemGrammarTopic, indexGrammarTopic
                  ) in grammarTopicList"
                  :key="indexGrammarTopic"
                >
                  <div
                    class="box-topic-item"
                    :class="$q.platform.is.desktop ? '' : 'mobile'"
                    align="left"
                    @click="funcSelectedTopic(itemGrammarTopic)"
                  >
                    {{ itemGrammarTopic.nameEng }}
                  </div>
                </div>
              </div>
            </div>
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->
</template>

<script>
import winnyCharacter from "components/ai_character_main/winny-character.vue";
import winnyHeaderIcon from "components/ai_character_main/winny-header-icon.vue";
import character from "components/character_main/character.vue";
import backgroundHomework from "components/background_main/background-homework.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import axios from "axios";
import { usePracticeStore } from "src/stores/practice";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  components: {
    backgroundHomework,
    character,
    winnyCharacter,
    winnyHeaderIcon,
  },
  setup(props) {
    // #region Initial data
    const $q = useQuasar();
    const $router = useRouter();

    // #region Variable data
    const selectedType = ref("");
    const inputHomeWork = ref("");
    const aiChatMessage = ref(``);
    const scriptList = ref([]);
    const questionList = ref([
      {
        text: "เข้าใจแล้ว",
        value: "understand",
        isShowDialogTopic: false,
      },
      {
        text: "ขอแบบฝึกหัดเพิ่ม",
        value: "more_exercise",
        isShowDialogTopic: false,
      },
      {
        text: "ขอตัวอย่างเพิ่ม",
        value: "more_example",
        isShowDialogTopic: false,
      },
      {
        text: "อธิบายเพิ่มเติม",
        value: "more_explain",
        isShowDialogTopic: false,
      },
      {
        text: "เลือกหัวขออื่น",
        value: "other_menu",
        isShowDialogTopic: true,
      },
    ]);

    // Boolern
    const isShowReadyPrompt = ref(false);

    // Dialog
    const isShowDialogScript = ref(false);
    const isShowDialogTopicGrammar = ref(false);

    // #endregion

    // #region Function
    // Get Grammar Topic
    const grammarTopicList = ref([]);
    const funcGetGrammarTopic = () => {
      const practiceStore = usePracticeStore();

      let filterPracticeNameList = practiceStore.listName.Grammar;

      filterPracticeNameList.sort((a, b) => {
        return a.unit - b.unit;
      });

      grammarTopicList.value = filterPracticeNameList;
    };

    // Selected Topic
    const funcSelectedType = (type) => {
      if (type == "teach") {
        isShowDialogTopicGrammar.value = true;
        return;
      }

      selectedType.value = type;

      if (!$q.platform.is.desktop) {
        setTimeout(() => {
          observeScroll();
        }, 500);
      }

      isShowReadyPrompt.value = false;
    };

    // Send Home Work
    const funcSendHomeWork = () => {
      if (inputHomeWork.value == "") {
        return;
      }

      if (listenAPI) {
        clearTimeout(listenAPI);
        source.cancel("Timeout");
      }

      setTimeout(() => {
        scriptList.value.push({
          id: scriptList.value.length + 1,
          text: inputHomeWork.value,
          isMe: true,
        });

        selectedTopic.value = {
          nameEng: inputHomeWork.value,
          skill: "",
        };

        if (!$q.platform.is.desktop) {
          setTimeout(() => {
            observeScroll();
          }, 500);
        }

        funcResponseHomeworkAPI();
      }, 100);
    };

    // Change Type
    const funcChangeType = (type) => {
      selectedType.value = type;

      if (type == "teach") {
        isShowDialogTopicGrammar.value = true;
      }
    };

    // Selected Menu Content
    const funcSelectedQuestionList = (data) => {
      if (data.value == "other_menu") {
        isShowDialogTopicGrammar.value = true;
        isProcessing.value = false;
        return;
      }

      isShowReadyPrompt.value = false;

      scriptList.value.push({
        id: scriptList.value.length + 1,
        text: data.text,
        isMe: true,
      });

      funcResponseChatAPI(data.value);

      if (!$q.platform.is.desktop) {
        setTimeout(() => {
          observeScroll();
        }, 500);
      }
    };

    // Close Dialog Topic Grammar
    const funcCloseDialogTopicGrammar = () => {
      isShowDialogTopicGrammar.value = false;
    };

    // Selected Topic
    const selectedTopic = ref({});
    const funcSelectedTopic = (data) => {
      isShowDialogTopicGrammar.value = false;
      isShowReadyPrompt.value = false;

      selectedType.value = "teach";

      scriptList.value.push({
        id: scriptList.value.length + 1,
        text: data.nameEng,
        isMe: true,
      });

      selectedTopic.value = data;

      if (!$q.platform.is.desktop) {
        setTimeout(() => {
          observeScroll();
        }, 500);
      }

      funcResponseChatAPI("start");
    };

    // response Teach API
    let cancelToken = axios.CancelToken;
    let source = cancelToken.source();
    let listenAPI = null;
    const history = ref([]);

    const isProcessing = ref(false);
    const isTalking = ref(false);
    const isErrorResponse = ref(false);

    const funcResponseChatAPI = async (prompt) => {
      aiChatMessage.value = "";
      isProcessing.value = true;
      isShowReadyPrompt.value = false;
      isErrorResponse.value = false;
      isDisplayMessageAnimation.value = false;
      source = cancelToken.source();

      const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/chat-chatBot`;

      let tempHistory = JSON.stringify(history.value);

      tempHistory = JSON.parse(tempHistory);

      tempHistory = tempHistory.splice(-3);

      const POSTDATA = {
        history: tempHistory,
        skill: selectedTopic.value.skill,
        prompt: prompt,
        topic: selectedTopic.value.nameEng,
      };

      // listenAPI = setTimeout(() => {
      //   source.cancel("Timeout");
      //   isProcessing.value = false;
      // }, 45000);

      listenAPI = setTimeout(() => {
        source.cancel("Timeout");
        isProcessing.value = false;
        isErrorResponse.value = true;
        throw new Error("Timeout");
      }, 60000);

      scriptList.value.push({
        id: scriptList.value.length + 1,
        text: "กรุณารอสักครู่ ....",
        isMe: false,
      });

      try {
        const response = await axios.post(APIURL, POSTDATA, {
          cancelToken: source.token,
        });

        if (response.data.message == "success") {
          if (listenAPI) {
            clearTimeout(listenAPI);
          }

          isTalking.value = true;

          const answerText = response.data.text.replace(/\n/g, "<br />");

          stoShowReadyPrompt = setTimeout(() => {
            isShowReadyPrompt.value = true;
            displayStringLetterByLetter(answerText);
          }, 2500);

          aiChatMessage.value = answerText;

          history.value = response.data.history;
        } else {
          throw new Error(response.data.message);
        }
      } catch (e) {
        if (listenAPI) {
          clearTimeout(listenAPI);
        }

        isTalking.value = false;
        isProcessing.value = false;
        isErrorResponse.value = true;
        isShowReadyPrompt.value = true;
        isDisplayMessageAnimation.value = false;

        const answerText =
          "โอ๊ะ! ดูเหมือนมีบางอย่างเกิดข้อผิดพลาดขึ้น ไม่ต้องห่วงนะ มาลองใหม่อีกครั้งกัน";

        scriptList.value[scriptList.value.length - 1].text = answerText;

        displayStringLetterByLetter(answerText);

        aiChatMessage.value = answerText;
      }
    };

    // response Homework API
    let listenAPIHomework = null;
    const funcResponseHomeworkAPI = async () => {
      aiChatMessage.value = "";
      isProcessing.value = true;
      isShowReadyPrompt.value = false;
      isErrorResponse.value = false;
      isDisplayMessageAnimation.value = false;
      source = cancelToken.source();

      const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/chat-chatBotHomework`;

      const POSTDATA = {
        history: history.value,
        prompt: inputHomeWork.value,
      };

      listenAPIHomework = setTimeout(() => {
        source.cancel("Timeout");
        isProcessing.value = false;
        isErrorResponse.value = true;
        throw new Error("Timeout");
      }, 60000);

      scriptList.value.push({
        id: scriptList.value.length + 1,
        text: "กรุณารอสักครู่ ....",
        isMe: false,
      });

      inputHomeWork.value = "";

      try {
        const response = await axios.post(APIURL, POSTDATA, {
          cancelToken: source.token,
        });

        if (response.data.message == "success") {
          if (listenAPI) {
            clearTimeout(listenAPI);
          }

          isTalking.value = true;

          const answerText = response.data.text.replace(/\n/g, "<br />");

          stoShowReadyPrompt = setTimeout(() => {
            isShowReadyPrompt.value = true;
            displayStringLetterByLetter(answerText);
          }, 2500);

          aiChatMessage.value = answerText;

          history.value = response.data.history;

          // const answerText = response.data.text.replace(/\n/g, "<br />");

          // scriptList.value.push({
          //   id: scriptList.value.length + 1,
          //   text: answerText,
          //   isMe: false,
          // });

          // aiChatMessage.value = answerText;

          // history.value = response.data.history;
        } else {
          throw new Error(response.data.message);
        }
      } catch (e) {
        if (listenAPI) {
          clearTimeout(listenAPI);
        }

        isTalking.value = false;
        isProcessing.value = false;
        isErrorResponse.value = true;
        isShowReadyPrompt.value = true;
        isDisplayMessageAnimation.value = false;

        const answerText =
          "โอ๊ะ! ดูเหมือนมีบางอย่างเกิดข้อผิดพลาดขึ้น ไม่ต้องห่วงนะ มาลองใหม่อีกครั้งกัน";

        scriptList.value[scriptList.value.length - 1].text = answerText;

        displayStringLetterByLetter(answerText);

        aiChatMessage.value = answerText;
      }
    };

    // #region animation scroll
    const isDisplayMessageAnimation = ref(false);
    const isEnableAnimationScroll = ref(false);
    let sto = null;
    let stoShowReadyPrompt = null;
    let stoShowTextWriter = null;
    const displayStringLetterByLetter = (str) => {
      isEnableAnimationScroll.value = true;
      let result = "";
      let i = 0;

      isDisplayMessageAnimation.value = true;

      stoShowTextWriter = setTimeout(() => {
        let ele = document.getElementById("displayMessage");

        function typeWriter() {
          if (i < str.length) {
            result += str.charAt(i);
            ele.innerHTML = result;
            i++;
            sto = setTimeout(typeWriter, 10);
            observeScroll();
          } else {
            scriptList.value[scriptList.value.length - 1].text = result;
            aiChatMessage.value = result;

            isProcessing.value = false;
            isDisplayMessageAnimation.value = false;

            if (!$q.platform.is.desktop) {
              setTimeout(() => {
                let ele2 = document.getElementById("scrollAreaRef");
                ele2.scrollBy({
                  top: ele2.scrollHeight, // could be negative value
                  left: 0,
                  behavior: "auto",
                });
                isEnableAnimationScroll.value = true;
              }, 100);
            }

            ele.innerHTML = "";
            clearTimeout(sto);
            clearTimeout(stoShowTextWriter);
            clearTimeout(stoShowReadyPrompt);
            isTalking.value = false;
          }
        }

        typeWriter();
      }, 500);
    };

    const observeScroll = () => {
      let ele2 = document.getElementById("scrollAreaRef");

      document
        .getElementById("scrollAreaRef")
        .addEventListener("wheel", (event) => {
          isEnableAnimationScroll.value = false;
        });

      if (isEnableAnimationScroll.value) {
        ele2.scrollBy({
          top: ele2.scrollHeight, // could be negative value
          left: 0,
          behavior: "auto",
        });
      }
    };
    // #endregion

    const funcBack = () => {
      if (selectedType.value == "") {
        $router.replace(`/lobby`);
        return;
      }

      if (listenAPI) {
        clearTimeout(listenAPI);
        source.cancel("Timeout");
      }

      if (sto) {
        clearTimeout(sto);
      }

      if (stoShowTextWriter) {
        clearTimeout(stoShowTextWriter);
      }

      if (stoShowReadyPrompt) {
        clearTimeout(stoShowReadyPrompt);
      }

      isErrorResponse.value = false;
      isProcessing.value = false;
      isShowReadyPrompt.value = false;
      isDisplayMessageAnimation.value = false;
      selectedType.value = "";
      history.value = [];
      scriptList.value = [];
    };
    // #endregion

    onMounted(() => {
      funcGetGrammarTopic();
    });

    onBeforeUnmount(() => {
      if (listenAPI) {
        clearTimeout(listenAPI);
        source.cancel("Timeout");
      }

      if (sto) {
        clearTimeout(sto);
      }

      if (stoShowTextWriter) {
        clearTimeout(stoShowTextWriter);
      }

      if (stoShowReadyPrompt) {
        clearTimeout(stoShowReadyPrompt);
      }
    });

    return {
      // Data
      aiChatMessage,
      inputHomeWork,
      scriptList,
      selectedType,
      questionList,
      grammarTopicList,

      // Function
      funcSelectedType,
      funcSelectedTopic,
      funcChangeType,
      funcCloseDialogTopicGrammar,
      funcSelectedQuestionList,
      funcSendHomeWork,
      funcBack,

      // Boolean
      isShowDialogScript,
      isShowDialogTopicGrammar,
      isShowReadyPrompt,
      isDisplayMessageAnimation,

      // Animation Character
      isProcessing,
      isErrorResponse,
      isTalking,
    };
  },
};
</script>

<style lang="scss" scoped>
.background-container {
  min-width: 1600px;
}

// #region Other Css
.user-selected {
  user-select: auto;
}
// #endregion

// #region box button
.box-button-main {
  width: 100%;
  top: 88.5%;
}

.button-active {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  cursor: pointer;
}

.button-active.disable {
  cursor: not-allowed;
}

.button-active.send-mobile {
  width: 72px;
  margin-left: 5px;
}

.button-active:not(.disable):active {
  transform: scale(0.9);
  -webkit-transform: scale(0.9);
  -moz-transform: scale(0.9);
}

.button-active.homework-teach {
  width: 15.625%;
  margin: 0% 0.5%;
}

.button-active.homework-teach.mobile {
  max-width: 200px;
  width: 44.44%;
  margin: 0% 2%;
}

.button-active.close {
  width: 2.8125%;
  top: 2%;
  left: 2%;
}

.button-active.close.mobile {
  max-width: 50px;
  width: 10%;
  top: 1%;
  left: 2%;
}

.button-active.send {
  width: 16.25%;
  bottom: 6%;
  right: 1%;
}

.button-active.language {
  width: 3.25%;
  margin: 0% 0.3%;
}

.button-active.script {
  width: 8.75%;
  margin: 0% 0.3%;
}
// #endregion

// #region box homework chat
.box-homework-chat {
  width: 50%;
  top: 85%;
}
.box-homework-chat.mobile {
  width: 100%;
  height: 92.5%;
  top: 7.5%;
  padding: 2% 2% 20% 2%;
  overflow: auto;
}

.box-homework-chat.mobile::-webkit-scrollbar {
  width: 0.5em;
}

.box-homework-answer-chat {
  width: 50%;
  top: 25%;
}

.box-homework-answer-chat-processing {
  width: 11.25%;
  top: 32%;
  left: 63.6%;
}

.icon-homework-loading {
  width: 8.889%;
  margin: -20% 2% 0% 2%;
}

.animation-homework-loading {
  animation: homeworkLoading 1s infinite;
}

@keyframes homeworkLoading {
  to {
    opacity: 0.1;
  }
}

.box-answer-main {
  width: 100%;
  height: 100%;
  padding: 2%;
}

.box-answer-scroll {
  width: 100%;
  height: 85%;
  padding-right: 3%;
  font-size: min(16px, 1vw);
  color: #4a261b;
  overflow-y: auto;
  overflow-x: hidden;
}

.box-answer-scroll::-webkit-scrollbar {
  width: 0.4em;
  height: 0.4em;
}

.box-answer-scroll::-webkit-scrollbar-track {
  background-color: #ffdca7;
}

.box-answer-scroll::-webkit-scrollbar-thumb {
  background-color: #ff9900;
}

.box-chat {
  width: 100%;
  height: 99%;
  background-color: #ffffff;
  padding: 1%;
}

.chat-homework {
  width: 82%;
  height: 100%;
  overflow: auto;
}

.chat-homework::-webkit-scrollbar {
  width: 0.3em;
}

.chat-homework::-webkit-scrollbar-track {
  background-color: #ffdca7;
}

.chat-homework::-webkit-scrollbar-thumb {
  background-color: #ff9900;
  border-radius: 10px;
}

.box-button-homework-right {
  width: 100%;
  top: 2%;
  right: 1%;
}
// #endregion

// #region Dialog
.box-dialog-container {
  width: 28.125%;
}

.box-dialog-container.mobile {
  max-width: 450px;
  width: 100%;
}

.box-dialog-header {
  height: 8.33%;
  color: #4a261b;
  background-color: #f6bf46;
  font-size: min(20px, 1.25vw);
  padding: 0% 1%;
}

.box-dialog-header.mobile {
  height: 50px;
  font-size: 20px;
}

.box-script-scroll {
  width: 100%;
  height: 91.66%;
  padding: 2%;
  color: #4a261b;
  overflow-y: scroll;
  overflow-x: hidden;
}

.box-script-character-main {
  width: 9.34%;
  font-size: min(14px, 0.87vw);
}

.box-script-character-main.mobile {
  max-width: 40px;
  width: min(40px, max(26px, 11.645%));
}

.box-script-circle {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.box-script-circle.mobile {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  background-color: #fff;
  font-size: min(14px, max(12px, 5vw));
  overflow: hidden;
}

.box-script-chat {
  max-width: 80%;
  min-width: 30%;
  background-color: #e8e8e8;
  border-radius: 4em;
  padding: 2% 3%;
  font-size: min(14px, 0.87vw);
}

.box-script-chat.mobile {
  max-width: 75%;
  min-width: 30%;
  font-size: min(14px, max(12px, 5vw));
  padding: min(10px, max(2%)) min(20px, max(4%));
}

.box-script-chat.ai {
  max-width: 75%;
  min-width: 30%;
  background-color: #235e93;
  color: #fff;
  border-radius: 0.3em;
  padding: min(10px, max(2%));
}

.box-script-chat.ai.mobile {
  max-width: 70%;
  min-width: 15%;
  border-radius: min(0.3em, max(4em, 0.3em));
}

.box-topic-item {
  width: 100%;
  padding: 3% 4%;
  font-size: min(14px, 0.87vw);
  color: #4a261b;
  border: 1px solid #818181;
  margin-bottom: 2%;
  border-radius: 0.5em;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  transition: 0.1s;
  cursor: pointer;
}

.box-topic-item.mobile {
  font-size: 14px;
}

.box-topic-item:active {
  transform: scale(0.9);
  -webkit-transform: scale(0.9);
  -moz-transform: scale(0.9);
}

.button-text {
  width: fit-content;
  font-size: min(14px, 0.87vw);
  color: #000;
  border: 1px solid #818181;
  border-radius: 0.5em;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  transition: 0.1s;
  padding: 0.7% 1%;
  margin: 0% 0.5%;
  cursor: pointer;
}

.button-text.mobile {
  font-size: min(14px, max(12px, 5vw));
  background-color: #fff;
  padding: min(8px, max(1.1%)) min(15px, max(3%));
  margin: 1%;
  text-align: center;
}

.button-text.other-menu {
  background-color: #ffcf51;
}

.button-text:active {
  transform: scale(0.9);
  -webkit-transform: scale(0.9);
  -moz-transform: scale(0.9);
}

// #endregion

// #region Mobile
.background-container-mobile {
  background-image: url("/images/background_main/background-homework-mobile.png");
  background-size: cover;
  background-position: center bottom;
}

.icon-processing {
  width: 15%;
  margin: 0% 5%;
}

.animation-processing {
  animation: processing 1s infinite;
}

@keyframes processing {
  to {
    opacity: 0.1;
  }
}

.box-input-chat-main-mobile {
  background-color: #f6bf46;
  padding: 5px 7px;
  overflow: hidden;
}

.box-input-chat {
  background-color: #fff;
  border-radius: 2em;
}

// #endregion
</style>
