<template>
  <q-page
    :class="!isMobile ? 'row justify-center items-center ' : 'row'"
  >
    <!-- background-container -->
     <!-- !isMobile ? '' : 'col-12 background-container-mobile' -->
    <div class="relative-position box-container-main"
      :class="{'mobile':isMobile}"
    >
      <background-homework v-if="!isMobile"></background-homework>

      <!-- #region Character -->
      <div
        class="absolute-center fit"
        v-show="
          !isMobile ||
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

      <!-- #region Desktop -->
      <div v-if="!isMobile && selectedType != ''">
        <!-- #region Box type homework -->
        <div class="fit absolute-center" v-if="selectedType == 'assist'">
          <!-- #region Chat -->
          <div class="absolute-bottom box-homework-chat-main" v-if="!isProcessing">
            <div class="relative-position animate__animated animation-duration-0-5s" :class="{'animate__fadeInUp':isAnimation,'animate__fadeOutDown':!isAnimation}">
              <div class="box-homework-chat relative-position">
                <div class="box-content row">
                  <div class="box-input col">
                    <q-input autogrow v-model.trim="inputHomeWork" borderless="" type="textarea" dense="" placeholder="พิมพ์ข้อความ..." @keydown.enter="funcSendHomeWork()" input-style="font-size:clamp(10px,1cqw,16px);"></q-input>
                  </div>

                  <div class="box-button-send-main self-end row">
                    <div class="self-center col-1 button-import-image" @click="funcImportImage()">
                      <q-img src="/images/homework_main/button-import-image.webp"></q-img>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      style="display: none"
                      ref="fileInputRef"
                      @change="funcOnFileSelect"
                    />
                    <div class="self-center col-1 button-voice">
                      <q-img src="/images/homework_main/button-voice.webp"></q-img>
                    </div>
                    <div class="button-active send-answer" :class="{'disable': !isShowButtonSendAnswer}" @click="funcSendHomeWork()">
                      <q-img :src="`/images/homework_main/button-send-answer${isShowButtonSendAnswer ? '' : '-disable'}.webp`" no-spinner no-transition></q-img>
                    </div>
                  </div>
                </div>
              </div>
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
          <div class="absolute-bottom box-homework-chat-main" v-if="!isProcessing">
            <div class="relative-position animate__animated animation-duration-0-5s" :class="{'animate__fadeInUp':isAnimation,'animate__fadeOutDown':!isAnimation}">
              <div class="box-homework-chat relative-position">
                <div class="box-content row menu" v-if="!isErrorResponse">
                  <div
                    class="button-text font-mali-m self-start"
                    v-for="(itemQuestion, indexQuestion) in questionList"
                    :key="indexQuestion"
                    :class="
                      itemQuestion.isShowDialogTopic ? 'other-menu' : ''
                    "
                    @click="funcSelectedQuestionList(itemQuestion)"
                  >
                    <div>
                      {{ itemQuestion.text }}
                    </div>
                  </div>
                </div>

                <div class="box-content row menu" v-else>
                  <div class="button-text font-mali-m self-start other-menu">
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
              src="/images/homework_main/box-homework-answer-chat-processing.webp"
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
                      src="/images/homework_main/icon-homework-loading.webp"
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
              src="/images/homework_main/box-homework-answer-chat.webp"
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
          <div class="relative-position box-homework-chat-main-mobile" :class="{'homework':selectedType == 'homework'}">
            <!-- #region Chat bot -->
            <div id="scrollAreaRef">
              <!-- #region Chat -->
              <div v-for="(itemChat, indexChat) in scriptList" :key="indexChat">
                <div
                  :class="itemChat.isMe ? 'row reverse' : 'row'"
                  align="right"
                  style="margin-bottom: 10px;"
                >
                  <div
                    class="self-end box-script-character-main-mobile"
                    :style="
                      itemChat.isMe ? 'margin-left:12px;' : 'margin-right:12px'
                    "
                  >
                    <q-img
                      src="/images/box_main/box-character-backdrop.png"
                      no-spinner
                      no-transition
                    >
                      <div class="fit transparent no-padding text-black">
                        <div
                          class="box-script-circle-mobile relative-position row justify-center items-center"
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
                        ? 'border-radius:25px;'
                        : ''
                    "
                    align="left"
                  >
                    <div v-if="itemChat.isMe" v-html="itemChat.text"></div>
                    <div v-if="!itemChat.isMe">
                      <!-- #region Processing -->
                      <div
                        v-if="isProcessing && indexChat == scriptList.length - 1"
                      >
                        <div
                          class="row justify-center items-center"
                          v-if="!isDisplayMessageAnimation"
                        >
                          <div v-for="i in 3" :key="i" class="icon-processing mobile self-end">
                            <div class="animation-processing" style="width:10px; height:10px; border-radius:50%; background-color:#fff;" :style="`animation-delay: ${i * 0.1}s`">
                            </div>
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
                    width: 40px;
                    margin-right: 8px;
                  "
                ></div>
                <div class="box-content menu col row" v-if="!isErrorResponse">
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

            </div>

          <!-- #region Input type homework -->
          <div
            class="absolute-bottom box-input-chat-main-mobile row"
            v-if="selectedType == 'assist'"
          >
            <div class="self-center col">
              <div class="box-input-chat">
                <div class="input-scroll">
                  <q-input
                  rounded
                  borderless
                  dense
                  type="textarea"
                  autogrow
                  input-style="color:#929090"
                  v-model.trim="inputHomeWork"
                  @keydown.enter="funcSendHomeWork()"
                ></q-input>
                </div>
              </div>
            </div>
            <q-space></q-space>
            <div class="self-center button-active import-image">
              <q-img
                :src="`/images/homework_main/button-import-image.webp`"
                no-spinner
                no-transition
                @click="funcSendHomeWork()"
              ></q-img>
            </div>
            <div class="self-center button-active send-mobile">
              <q-img
                style="margin-bottom: -8px"
                :src="`/images/homework_main/button-send-answer${
                  inputHomeWork.length ? '' : '-disable'
                }-mobile.webp`"
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

      <!-- #region Button Select Grammar & Homework -->
      <div
        class="absolute-bottom box-button-main"
        :class="{'mobile':isMobile}"
        v-if="selectedType == ''"
      >
        <div class="relative-position animate__animated fit row justify-center" :class="{'animate__fadeIn': isAnimation,'animate__fadeOut': !isAnimation}">
          <div
            class="col-1 button-active homework-teach"
            :class="!isMobile ? '' : 'mobile'"
            @click="funcSelectedType('teach')"
          >
            <q-img
              src="/images/homework_main/button-grammar.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>
          <div
            class="col-1 button-active homework-teach"
            :class="!isMobile ? '' : 'mobile'"
            @click="funcSelectedType('assist')"
          >
            <q-img
              src="/images/homework_main/button-homework.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>

        <!-- <div
          class="col-1 button-active homework-teach disable"
          :class="!isMobile ? '' : 'mobile'"
        >
          <q-img
            src="/images/homework_main/button-homewor.png"
            no-spinner
            no-transition
          ></q-img>
        </div> -->
      </div>
      <!-- #endregion -->

      <!-- #region Button Script -->
      <div
        class="absolute-top-right button-active script"
        :class="{'mobile':isMobile}"
        @click="isShowDialogScript = true"
        v-if="!isMobile && selectedType != ''"
      >
        <div class="relative-position animate__animated fit" :class="{'animate__fadeInDown': isAnimation,'animate__fadeOutUp': !isAnimation}">
          <q-img
            src="/images/homework_main/button-homework-script.webp"
            no-spinner=""
            no-transition=""
          ></q-img>
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
      </div>
      <!-- #endregion -->

      <!-- #region Button close -->
      <div
        class="absolute-top-left button-active close"
        :class="!isMobile ? '' : 'mobile'"
      >
        <q-img
          src="/images/homework_main/button-back.webp"
          no-spinner
          no-transition
          @click="funcBack()"
        ></q-img>
      </div>
      <!-- #endregion -->

      <!-- #region Dialog Script -->
      <div class="absolute-center fit box-backdrop-main row justify-center items-center" v-if="isShowDialogScript">
        <div class="relative-position box-dialog-script-main animate__animated animate__zoomIn" :class="{'mobile':isMobile}">
          <div class="header font-mali-b relative-position" :class="{'mobile':isMobile}">
            <div>
              Script
            </div>

            <div class="absolute-top-right button-close-dialog" :class="{'mobile':isMobile}" @click="funcCloseDialogScript()">
              <q-img src="/images/icon_main/icon-close.png" no-spinner no-transition></q-img>
            </div>
          </div>

          <div class="body box-script-scroll" :class="{'mobile':isMobile}">
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
      </div>
      <!-- #endregion -->

      <!-- #region Dialog Choose Topic -->
      <div class="absolute-center fit box-backdrop-main row justify-center items-center" v-if="isShowDialogChooseTopic">
        <div class="relative-position box-dialog-choose-topic animate__animated animate__zoomIn" :class="{'mobile':isMobile}">
          <div class="header font-mali-b relative-position" :class="{'mobile':isMobile}">
            <div>
              Choose Topic
            </div>

            <div class="absolute-top-right button-close-dialog" :class="{'mobile':isMobile}" @click="funcCloseDialogChooseTopic()">
              <q-img src="/images/icon_main/icon-close.png" no-spinner no-transition></q-img>
            </div>

          </div>
          <div class="body box-script-scroll" :class="{'mobile':isMobile}">
            <div
              v-for="(
                itemGrammarTopic, indexGrammarTopic
              ) in grammarTopicList"
              :key="indexGrammarTopic"
            >
              <div
                class="box-topic-item"
                :class="!isMobile ? '' : 'mobile'"
                align="left"
                @click="funcSelectedTopic(itemGrammarTopic)"
              >
                {{ itemGrammarTopic.nameEng }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>
  </q-page>

  <!-- #region Dialog Script -->
  <q-dialog v-model="isShowDialogScript" persistent maximized v-if="false">
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
  <q-dialog v-model="isShowDialogChooseTopic" persistent maximized v-if="false">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div
          class="relative-position"
          style="max-width: 1600px; width: 100%; margin: auto"
          align="center"
        >
          <q-img
            class="box-dialog-container"
            :class="!isMobile ? '' : 'mobile'"
            src="/images/box_main/box-homework-dialog.png"
            no-spinner=""
            no-transition=""
          >
            <div class="fit transparent no-padding">
              <!-- Header -->
              <div
                class="box-dialog-header row justify-center items-center"
                :class="!isMobile ? '' : 'mobile'"
              >
                <div
                  :style="
                    !isMobile ? 'width: 7.5555%' : 'width:50px'
                  "
                ></div>
                <div class="col font-mali-b" align="center">Choose Topic</div>
                <div
                  :style="
                    !isMobile ? 'width: 7.5555%' : 'width:50px'
                  "
                >
                  <q-img
                    :width="!isMobile ? '100%' : '35px'"
                    class="button-active close mobile"
                    src="/images/icon_main/icon-close.png"
                    @click="funcCloseDialogChooseTopic()"
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
                    :class="!isMobile ? '' : 'mobile'"
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
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
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

    const isMobile = ref($q.platform.is.mobile);

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
    const isAnimation = ref(true);
    const isShowReadyPrompt = ref(false);

    // Dialog
    const isShowDialogScript = ref(false);
    const isShowDialogChooseTopic = ref(false);

    // #endregion

    // #region Function

    // Import Image
    const fileInputRef = ref(null);

    const funcImportImage = () => {
      fileInputRef.value.click();
    };

    const fileInputFile = ref(null);
    const funcOnFileSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Handle the file here
        console.log("*** Selected file:", file);

        fileInputFile.value = file;
      }
    };

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
        isShowDialogChooseTopic.value = true;
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
        isShowDialogChooseTopic.value = true;
      }
    };

    // Selected Menu Content
    const funcSelectedQuestionList = (data) => {
      if (data.value == "other_menu") {
        isShowDialogChooseTopic.value = true;
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
    const funcCloseDialogChooseTopic = () => {
      isShowDialogChooseTopic.value = false;
    };

    const funcCloseDialogScript = () => {
      isShowDialogScript.value = false;
    }

    // Selected Topic
    const selectedTopic = ref({});
    const funcSelectedTopic = (data) => {
      isShowDialogChooseTopic.value = false;
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
            console.log("*** stoShowReadyPrompt");

            isShowReadyPrompt.value = true;
            displayStringLetterByLetter(answerText);
          }, 2500);

          aiChatMessage.value = answerText;

          history.value = response.data.history;
        } else {
          throw new Error(response.data.message);
        }
      } catch (e) {

        console.log("*** e",e);

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

      isAnimation.value = false;

      setTimeout(() => {
        isAnimation.value = true;
        isErrorResponse.value = false;
        isProcessing.value = false;
        isShowReadyPrompt.value = false;
        isDisplayMessageAnimation.value = false;
        selectedType.value = "";
        history.value = [];
        scriptList.value = [];
      }, 250);


    };
    // #endregion

    const isShowButtonSendAnswer = computed(() => {
      let isShow = false;

      console.log("*** fileInputFile",fileInputFile.value)

      if(inputHomeWork.value.length > 0 || fileInputFile.value){
        isShow = true;
      }

      return isShow
    })

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
      funcCloseDialogChooseTopic,
      funcSelectedQuestionList,
      funcSendHomeWork,
      funcBack,
      funcImportImage,
      funcOnFileSelect,
      fileInputRef,
      fileInputFile,
      funcCloseDialogScript,

      // Boolean
      isMobile,
      isShowButtonSendAnswer,
      isShowDialogScript,
      isShowDialogChooseTopic,
      isShowReadyPrompt,
      isDisplayMessageAnimation,

      // Animation Character
      isAnimation,
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

.box-container-main {
  max-width: 1600px;
  width: calc(100vh * 16 / 9);
  min-width: 1000px;
  min-height: fit-content;
  max-height: fit-content;
  margin: auto;
  container-type: inline-size;
  overflow: hidden;

  &.mobile {
    max-width: 1600px;
    width: 100%;
    min-width: 360px;
    height: 100vh;
    min-height: 100%;
    max-height: 100%;
    background-size: cover;
    background-position: 50% 50%;
    padding: 8px;
    background-image: url("/images/background_main/background-homework.webp");
    background-repeat: no-repeat;
    background-position: bottom;
    overflow: hidden;
  }
}

.box-backdrop-main{
  background-color: rgba(0, 0, 0, 0.5);
}

.box-dialog-choose-topic{
  width:clamp(281.25px,28.125cqw,450px);

  &.mobile{
    width:340px;
  }

  & .header{
    background-color:#79DFFF;
    width:100%;
    color:#014DA4;
    font-size:clamp(12.5px,1.25cqw,20px);
    padding:clamp(7.5px,0.75cqw,12px);
    text-align: center;

    &.mobile{
      font-size:16px;
      padding:10px;
    }
  }

  & .body{
    height:clamp(343.75px,34.375cqw,550px);
    padding:clamp(10px,1cqw,16px);
    background-color:#fff;

    &.mobile{
      height:400px;
      padding:10px;
    }

    &.box-script-scroll {
      width: 100%;
      color: #4a261b;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }

  & .button-close-dialog{
    width: clamp(21.875px,2.1875cqw,35px);
    top: clamp(5px,0.5cqw,8px);
    right: clamp(4.375px,0.4375cqw,7px);

    &.mobile{
      width:30px;
      top:7px;
      right:7px;
    }
  }
}

.box-dialog-script-main{
  width:clamp(281.25px,28.125cqw,450px);

  &.mobile{
    width:340px;
  }

  & .header{
    background-color:#79DFFF;
    width:100%;
    color:#014DA4;
    font-size:clamp(12.5px,1.25cqw,20px);
    padding:clamp(7.5px,0.75cqw,12px);
    text-align: center;

    &.mobile{
      font-size:16px;
      padding:10px;
    }
  }

  & .body{
    height:clamp(343.75px,34.375cqw,550px);
    padding:clamp(10px,1cqw,16px);
    background-color:#fff;

    &.mobile{
      height:400px;
      padding:10px;
    }

    &.box-script-scroll {
      width: 100%;
      color: #4a261b;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }

  & .button-close-dialog{
    width: clamp(21.875px,2.1875cqw,35px);
    top: clamp(5px,0.5cqw,8px);
    right: clamp(4.375px,0.4375cqw,7px);

    &.mobile{
      width:30px;
      top:7px;
      right:7px;
    }
  }
}

.box-homework-chat-main-mobile{
  width:360px;
  height:calc(100vh - 60px);
  margin:60px auto 16px;
  padding:0px 10px;
  overflow: auto;

  &.homework{
    height:calc(100vh - 111px);
  }

  & .box-content{
    width:100%;
    height:100%;
    padding:0px;

    &.menu{
      padding:0px;
    }

    & .button-text{
      padding: 8px;
      border-radius: 5px;
      border: 1px solid #929090;
      background: #fff;
      margin:3px;
      font-size:14px;
      cursor:pointer;

      &.other-menu{
        border-radius: 5px;
        border: 1px solid #014DA4;
        background: #D4F3FF;
        color:#014DA4;
      }
    }

  }
}

// #region Other Css
.user-selected {
  user-select: auto;
}
// #endregion

// #region box button
.box-button-main {
  width: 100%;
  bottom: clamp(43.75px,4.375cqw,70px);

  &.mobile{
    bottom:30px;
  }
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
}

.button-active:not(.disable):active {
  transform: scale(0.9);
  -webkit-transform: scale(0.9);
  -moz-transform: scale(0.9);
}

.button-active.homework-teach {
  width: clamp(160px,16cqw,256px);
  margin: 0% 0.5%;
}

.button-active.homework-teach.mobile {
  max-width: 200px;
  width: 44.44%;
  margin: 0% 2%;
}

.button-active.close {
  width: clamp(31.25px, 3.125cqw,50px);
  top: 2%;
  left: 2%;

  &.mobile{
    top:5px;
    left:5px;
    width:35px;
  }
}

.button-active.close-dialog {
  width: clamp(21.875px,2.1875cqw,35px);
  top: clamp(5px,0.5cqw,8px);
  right: clamp(4.375px,0.4375cqw,7px);
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
  width: clamp(82.5px,8.25cqw,132px);
  margin: clamp(10px,1cqw,16px);
}

.button-active.send-answer {
  width: clamp(85.625px,8.5625cqw,137px);
  margin-left:clamp(5px,0.5cqw,8px);
}

.button-active.import-image {
  width: 39px;
}
// #endregion

// #region box homework chat
.box-homework-chat-main {
  width:clamp(503.125px,50.3125cqw,805px);
  left:50%;
  bottom: clamp(33.125px,3.3125cqw,53px);
  transform:translate(-50%,0%);

  & .box-homework-chat{
    width:100%;
    height:clamp(118.75px,11.875cqw,190px);
    padding: clamp(10px,1cqw,16px);
    border-radius: clamp(6.25px,0.625cqw,10px);
    background-color: #01BFFB;
    border: clamp(1.25px,0.125cqw,2px) solid #014DA4;
    box-shadow:inset 0px clamp(-3px,-0.1875cqw,-1.875px) 1px #014DA4;

    & .box-content{
      width:100%;
      height:100%;
      background-color:#fff;
      padding: clamp(10px,1cqw,16px);

      &.menu{
        padding:clamp(7.5px,0.75cqw,12px);
      }

      & .button-text{
        padding: clamp(5px,0.5cqw,8px);
        border-radius: clamp(3.125px,0.3125cqw,5px);
        border: 1px solid #929090;
        background: #fff;
        margin:0px clamp(2.5px,0.25cqw,4px);
        font-size:clamp(8.75px,0.875cqw,14px);
        cursor:pointer;

        &.other-menu{
          border-radius: clamp(3.125px,0.3125cqw,5px);
          border: 1px solid #014DA4;
          background: #D4F3FF;
          color:#014DA4;
        }
      }

      & .box-input{
        width:100%;
        height:100%;
        overflow: auto;
      }

      & .box-button-send-main{
        padding:clamp(6.25px,0.625cqw,10px) 0px 0px clamp(6.25px,0.625cqw,10px);

        & .button-import-image{
          width:clamp(24.375px,2.4375cqw,39px);
          margin:0px clamp(2.5px,0.25cqw,4px);
          cursor:pointer;
        }

        & .button-voice{
          width:clamp(24.375px,2.4375cqw,39px);
          margin:0px clamp(2.5px,0.25cqw,4px);
          cursor:pointer;
        }

        & .button-menu{
          width:fit-content;
          padding: clamp(5px,0.5cqw,8px);
          border-radius: clamp(3.125px,0.3125cqw,5px);
          border: 1px solid #929090;
          background: #FFF;
          cursor: pointer;

          &.disable{
            cursor:not-allowed;
            opacity: 0.5;
          }
        }
      }
    }
  }
}

.box-homework-chat-main.mobile::-webkit-scrollbar {
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
  font-size: clamp(10px,1cqw,16px);
  color: #014DA4;
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
  width: clamp(3.125px,0.3125cqw,5px);
}

.chat-homework::-webkit-scrollbar-track {
  background-color: #ffdca7;
}

.chat-homework::-webkit-scrollbar-thumb {
  background-color: #ff9900;
  border-radius: clamp(6.25px,0.625cqw,10px);
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
  font-size: clamp(12.5px,1.25cqw,20px);
  padding: 0% 1%;
}

.box-dialog-header.mobile {
  height: 50px;
  font-size: 20px;
}

.box-script-character-main {
  width: 9.34%;
  font-size: clamp(8.75px,0.875cqw,14px);
}

.box-script-character-main-mobile {
  width: 40px;
}

.box-script-circle {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.box-script-circle-mobile {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  background-color: #fff;
  font-size: 14px;
  overflow: hidden;
}

.box-script-chat {
  max-width: 80%;
  min-width: 30%;
  background-color: #e8e8e8;
  border-radius: clamp(11.25px,1.125cqw,18px);
  padding: clamp(3.75px,0.375cqw,6px) clamp(7.5px,0.75cqw,12px);
  font-size: clamp(8.75px,0.875cqw,14px);

  &.mobile{
    max-width: 75%;
    min-width: 30%;
    height: fit-content;
    font-size: 14px;
    padding: 6px 12px;
    line-height: 20px;
    border-radius: 25px;
    word-break: break-all;
  }
}

.box-script-chat.ai {
  max-width: 75%;
  min-width: 30%;
  background-color: #014DA4;
  color: #fff;
  border-radius: clamp(3.125px,0.3125cqw,5px);
  padding: clamp(3.75px,0.375cqw,6px) clamp(7.5px,0.75cqw,12px);
}

.box-script-chat.ai.mobile {
  max-width: 70%;
  min-width: 15%;
  border-radius: 5px;
}

.box-topic-item {
  width: 100%;
  padding: 3% 4%;
  font-size: clamp(8.75px,0.875cqw,14px);
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

.button-text.mobile {
  font-size: min(14px, max(12px, 5vw));
  background-color: #fff;
  padding: min(8px, max(1.1%)) min(15px, max(3%));
  margin: 1%;
  text-align: center;
}

// #endregion

// #region Mobile

.icon-processing {
  width: 15%;
  margin: 0% 5%;

  &.mobile{
    width:fit-content;
    margin:0px 3px;
  }
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
  background-color: #01BFFB;
  padding: 5px 7px;
  // overflow: hidden;
}

.box-input-chat {
  background-color: #fff;
  border-radius: 20px;
  margin:0px 5px 0px 0px;
  padding:0px 5px;

  & .input-scroll{
    max-height:200px;
    height:100%;
    padding:0px 7px;
    overflow: auto;
  }
}

// #endregion
</style>
