<template>
  <div
    align="center"
    class="animate__animated animate__zoomIn"
    style="animation-duration: 0.5s"
  >
    <!-- #region Story Details -->
    <div v-if="!isLetSpeak && isShowStoryDetails">
      <div
        class="box-content-container animate__animated animate__fadeIn"
        style="height: 540px; animation-duration: 1s"
      >
        <div class="box-content-sub" style="height: 100%">
          <div class="box-content-body" style="height: 88%" align="left">
            <!-- #region story details -->
            <div
              class="box-content-scroll story-content"
              style="height: 100% !important"
            >
              <!-- #region Title -->
              <div class="font-prompt-sb f16">
                <div>
                  <div v-html="eventData.storyData.topicEn"></div>
                  <div
                    class="q-my-sm"
                    v-html="eventData.storyData.topicTh"
                  ></div>
                </div>
              </div>
              <!-- #endregion -->
              <!-- #region Content List -->
              <div class="font-prompt-r f14">
                <div
                  v-for="(item, index) in sentenceData.list"
                  :class="index > 0 ? 'q-my-sm' : ''"
                >
                  <div v-html="item.sentenceTh"></div>
                </div>
              </div>
              <!-- #endregion -->
            </div>
            <!-- #endregion -->
          </div>
          <div
            class="col-12 box-content-footer"
            style="height: 12%"
            align="center"
          >
            <q-img
              class="button-speakup-main size-280 active"
              :src="`/images/speakup_main/speakup-button-let-speak.png`"
              no-spinner
              no-transition
              @click="funcLetSpeak()"
            ></q-img>
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Let Speak -->
    <div v-if="isLetSpeak && isShowStoryDetails">
      <div
        class="relative-position box-content-container animate__animated animate__fadeIn"
        style="animation-duration: 1s; z-index: 2"
      >
        <div class="relative-position fit">
          <div class="box-content-sub">
            <div class="box-content-body story-content">
              <!-- #region story details -->
              <!-- #region Title -->
              <div class="font-prompt-sb f16 q-py-xs">
                <div>
                  <div class="row">
                    <div class="col-1 width-fit self-center">
                      <q-img
                        :src="`/images/speakup_main/speakup-button${
                          eventData.isRecording || isPlayAudio
                            ? '-listen-disable'
                            : isListenStoryAudio
                            ? '-playing'
                            : '-listen'
                        }.png`"
                        @click="
                          eventData.isRecording || isPlayAudio
                            ? null
                            : isListenStoryAudio
                            ? funcStopStoryAudio()
                            : funcPlayStoryAudio()
                        "
                        :class="
                          eventData.isRecording || isPlayAudio ? '' : 'active'
                        "
                        class="button-speakup-main size-25"
                        no-spinner
                        no-transition
                      >
                        <div class="transparent no-padding fit">
                          <button-wave-animation
                            v-if="isListenStoryAudio"
                          ></button-wave-animation>
                        </div>
                      </q-img>
                    </div>
                    <div class="col-1 q-pl-xs width-fit self-center">
                      <div class="q-px-xs font-prompt-sb f16">ฟังเสียง</div>
                    </div>
                    <div class="col" align="right">
                      <q-img
                        :src="`/images/speakup_main/speakup-button-read-thai${
                          eventData.isRecording || isPlayAudio ? '-disable' : ''
                        }.png`"
                        @click="
                          eventData.isRecording || isPlayAudio
                            ? null
                            : funcLetSpeak()
                        "
                        :class="
                          eventData.isRecording || isPlayAudio ? '' : 'active'
                        "
                        class="button-speakup-main size-138"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>
                </div>
              </div>
              <!-- #endregion -->
              <div class="box-content-scroll story-content">
                <!-- #region Content List -->
                <div class="font-prompt-r f14" align="left">
                  <div
                    v-for="(item, index) in sentenceData.list"
                    :class="index > 0 ? 'q-my-sm' : ''"
                  >
                    <div v-html="item.sentenceEn"></div>
                  </div>
                </div>
                <!-- #endregion -->
              </div>
              <!-- #endregion -->
            </div>

            <!-- #region footer -->
            <div class="box-content-let-speakup">
              <div class="">
                <div class="font-prompt-r f14 box-count-record">
                  <span v-if="!eventData.isRecording">
                    {{ `จำนวนครั้งที่บันทึก ${eventData.counter}/2` }}
                  </span>
                  <span v-else>
                    {{ `${showRecordTimer}` }}
                  </span>
                </div>
              </div>
              <div class="q-pa-sm" style="height: 70px">
                <q-img
                  width="50px"
                  :src="`/images/speakup_main/speakup-button-microphone${
                    eventData.counter >= 2 ? '-disable' : ''
                  }.png`"
                  class="animate__animated animate__fadeIn animate__delay-1s"
                  v-if="!eventData.isRecording"
                  @click="
                    eventData.counter >= 2
                      ? null
                      : eventData.isHasAudioFile
                      ? funcShowDialogHasFileRecord()
                      : funcStartRecording()
                  "
                  no-spinner
                  no-transition
                  :class="
                    eventData.counter >= 2
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  "
                ></q-img>

                <q-img
                  v-else
                  width="50px"
                  class="cursor-pointer animate__animated animate__pulse animate__infinite"
                  src="/images/speakup_main/speakup-button-stop-microphone.png"
                  no-spinner
                  no-transition
                  @click="
                    eventData.counter >= 2
                      ? null
                      : eventData.func.stopRecording()
                  "
                ></q-img>
              </div>
              <div class="q-pb-xs">
                <audio
                  v-if="eventData.isHasAudioFile"
                  controls
                  style="width: 100%; height: 24px"
                  class="no-padding no-margin"
                  id="audioFile"
                  :style="eventData.isRecording ? 'pointer-events:none' : ''"
                  @play="funcPlayAudioRecord()"
                  @pause="funcStopAudioRecord()"
                  :src="`${eventData.audioUrl}`"
                  preload="auto"
                >
                  <source :src="`${eventData.audioUrl}`" type="audio/mp3" />
                  <source :src="`${eventData.audioUrl}`" type="audio/wav" />
                </audio>
                <audio
                  v-if="!eventData.isHasAudioFile"
                  controls
                  style="width: 100%; height: 24px; pointer-events: none"
                  class="no-padding no-margin"
                ></audio>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
      </div>

      <div
        class="relative-position q-my-md animate__animated animate__fadeInDown"
        align="center"
        style="animation-duration: 1s; animation-delay: 0.5s; z-index: 1"
      >
        <q-img
          :src="`/images/speakup_main/speakup-button-send-audio-file${
            !eventData.isRecording && eventData.isHasAudioFile ? '' : '-disable'
          }.png`"
          :class="
            !eventData.isRecording && eventData.isHasAudioFile ? 'active' : ''
          "
          @click="
            !eventData.isRecording && eventData.isHasAudioFile
              ? funcSendFilePretest()
              : null
          "
          class="button-speakup-main size-280"
          no-spinner
          no-transition
        ></q-img>
      </div>
    </div>
    <!-- #endregion -->
  </div>

  <!-- #region Instruction -->
  <q-dialog v-model="isShowDialogInstruction" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <div class="box-dialog-container">
            <div class="box-dialog-sub">
              <div class="box-dialog-body" align="center">
                <div
                  class="text-title font-prompt-b relative-position"
                  :data-text="`ลองพูดกันก่อน`"
                >
                  {{ `ลองพูดกันก่อน` }}
                </div>
                <div
                  align="center"
                  class="q-mt-sm font-prompt-sb f16"
                  style="color: #4b1e0a; line-height: 2"
                >
                  <div
                    class="q-py-xs"
                    v-html="
                      `ก่อนจะเริ่ม<br>
                      มาลองทดสอบพูดกันก่อน<br>
                      เพื่อเปรียบเทียบความสามารถ<br>
                      หลังจากฝึกฝน`
                    "
                  ></div>
                </div>
              </div>
              <div class="box-dialog-footer">
                <div align="center">
                  <q-img
                    class="button-speakup-main active"
                    :src="`/images/speakup_main/speakup-button-ok.png`"
                    @click="funcNextToStoryDetails()"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Send File -->
  <q-dialog maximized v-model="isShowDialogSendFile" persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-around items-center no-padding">
        <div class="relative-position">
          <div class="box-dialog-container">
            <div class="box-dialog-sub">
              <div class="box-dialog-body">
                <div align="center">
                  <div
                    class="text-title font-prompt-sb"
                    :data-text="`ส่งไฟล์เสียง`"
                  >
                    ส่งไฟล์เสียง
                  </div>

                  <div class="q-pt-sm q-pb-xs font-prompt-m f16 q-my-sm">
                    ใช้ไฟล์เสียงล่าสุดในการส่ง
                  </div>
                </div>
              </div>

              <div class="box-dialog-footer row justify-center">
                <div>
                  <q-img
                    class="q-mx-sm button-speakup-main active"
                    src="/images/speakup_main/speakup-button-cancel.png"
                    v-close-popup
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <div>
                  <q-img
                    class="q-mx-sm button-speakup-main active"
                    src="/images/speakup_main/speakup-button-confirm.png"
                    no-spinner
                    no-transition
                    @click="funcConfirmSendFile()"
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Reward Send File -->
  <q-dialog v-model="isShowDialogRewardSendFile" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="relative-position">
          <div class="box-dialog-container">
            <div class="box-dialog-sub">
              <div class="box-dialog-body" align="center">
                <div class="q-mt-md q-mb-sm">
                  <div>
                    <q-img
                      width="90px"
                      src="/images/speakup_main/speakup-img-success-send-file.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div class="font-prompt-m f16 q-mt-sm q-pt-xs">
                    <div>ส่งไฟล์เสียงสำเร็จ</div>
                    <div>เตรียมฝึกพูดกับ SPEAK UP! กันเลย</div>
                  </div>
                  <div class="row justify-center font-prompt-sb q-mt-xs f16">
                    <div class="self-center">ได้รับ</div>
                    <div class="relative-position self-center">
                      <div class="row q-pl-xs q-pr-sm">
                        <div class="col-1 width-fit">
                          <q-img
                            width="35px"
                            src="/images/speakup_main/speakup-mock-diamond-1.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                        <div class="col-1 self-center">
                          <div class="text-reward font-fredoka f20">300</div>
                        </div>
                      </div>
                    </div>
                    <div class="self-center">สำหรับเข้าครั้งแรก</div>
                  </div>
                </div>
              </div>

              <div class="box-dialog-footer" align="center">
                <q-img
                  src="/images/speakup_main/speakup-button-ok.png"
                  no-spinner
                  no-transition
                  class="button-speakup-main active"
                  @click="funcNextToChapter()"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Has a file record -->
  <q-dialog v-model="isShowDialogHasFileRecord" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div>
          <div class="box-dialog-container">
            <div class="box-dialog-sub">
              <div class="box-dialog-body" style="padding: 20px 5px">
                <div align="center" class="font-prompt-m f16">
                  ไฟล์เสียงใหม่จะถูกแทนที่ไฟล์เสียงปัจจุบัน
                  <br />
                  ต้องการอัดเสียงใหม่หรือไม่
                </div>
              </div>
              <div class="box-dialog-footer row justify-center">
                <div class="q-px-xs">
                  <q-img
                    class="button-speakup-main active"
                    src="/images/speakup_main/speakup-button-cancel.png"
                    no-spinner
                    no-transition
                    v-close-popup
                  ></q-img>
                </div>
                <div class="q-px-xs">
                  <q-img
                    class="button-speakup-main active"
                    src="/images/speakup_main/speakup-button-record.png"
                    no-spinner
                    no-transition
                    @click="funcStartRecording()"
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->
</template>

<script>
import buttonWaveAnimation from "components/speakup_main/speakup-button-wave-animation.vue";
import { useQuasar } from "quasar";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useEventStore } from "src/stores/event";
export default {
  props: {
    eventData: {
      default: () => {},
    },
  },
  components: {
    buttonWaveAnimation,
  },
  setup(props) {
    // Initial Data
    const $q = useQuasar();

    const sentenceData = ref({});

    const isLetSpeak = ref(false);
    const isShowDialogSendFile = ref(false);
    const isShowDialogRewardSendFile = ref(false);
    const isShowDialogInstruction = ref(true);
    const isShowStoryDetails = ref(false);
    const isShowDialogHasFileRecord = ref(false);

    // #region ***** Function *****
    // #region Let Speak
    const funcLetSpeak = () => {
      if (tempAudioUrl != null) {
        tempAudioUrl.pause();
        countListenAudio = 0;
        isListenStoryAudio.value = false;
      }

      isLetSpeak.value = !isLetSpeak.value;

      if (props.eventData.isHasAudioFile) {
        setTimeout(() => {
          let el = document.getElementById("audioFile");
          el.play();
          el.pause();
        }, 500);
      }
    };
    // #endregion

    // #region Listen Story Audio
    let countListenAudio = 0;
    let tempAudioUrl = null;
    const isPlayAudio = ref(false);
    const isListenStoryAudio = ref(false);
    const funcPlayStoryAudio = () => {
      console.log("Listen Story Audio");

      funcStopAudioRecord();

      isListenStoryAudio.value = true;

      if (tempAudioUrl != null) {
        tempAudioUrl.pause();
        countListenAudio = 0;
      }

      funcRunStoryAudio();
    };
    // #endregion

    // #region Stop Story Audio
    const funcStopStoryAudio = () => {
      if (isListenStoryAudio.value) {
        isListenStoryAudio.value = false;
        if (tempAudioUrl != null) {
          tempAudioUrl.pause();
          countListenAudio = 0;
        }
      }
    };
    // #endregion

    // #region Run Story Audio
    const funcRunStoryAudio = () => {
      console.log("Run Story Audio");

      if (countListenAudio >= sentenceData.value.list.length) {
        countListenAudio = 0;
        isListenStoryAudio.value = false;
        return;
      }

      tempAudioUrl = new Audio(
        sentenceData.value.list[countListenAudio].audioUrl
      );

      tempAudioUrl.play();

      tempAudioUrl.onended = () => {
        countListenAudio++;
        funcRunStoryAudio();
      };
    };
    // #endregion

    // #region Play Audio File
    let tempAudioRecord = null;
    const funcPlayAudioRecord = () => {
      funcStopStoryAudio();

      if (tempAudioRecord == null) {
        tempAudioRecord = document.getElementById("audioFile");
      }
      isPlayAudio.value = true;
    };
    // #endregion

    // #region Stop Story Audio
    const funcStopAudioRecord = () => {
      console.log("Stop Story Audio");
      if (isPlayAudio.value) {
        isPlayAudio.value = false;
        tempAudioRecord.pause();
        tempAudioRecord.currentTime = 0;
      }
    };
    // #endregion

    // #region Start Recording
    const funcStartRecording = () => {
      funcStopStoryAudio();
      funcStopAudioRecord();
      isShowDialogHasFileRecord.value = false;
      props.eventData.func.startRecording();
    };
    // #endregion

    // #region Show Dialog Has File Record
    const funcShowDialogHasFileRecord = () => {
      isShowDialogHasFileRecord.value = true;
    };
    // #endregion

    // #region Confirm Send File
    const funcConfirmSendFile = async () => {
      const eventStore = useEventStore();
      $q.loading.show();

      isShowDialogSendFile.value = false;

      try {
        await eventStore.updateSpeakUpCurrentStage("4");
        props.eventData.isSendAudioFile = true;
        isShowDialogRewardSendFile.value = true;
        $q.loading.hide();
      } catch (e) {
        props.eventData.isSendAudioFile = false;
        isShowDialogSendFile.value = true;
        $q.loading.hide();
      }
    };
    // #endregion

    // #region Next to Chapter
    const funcNextToChapter = async () => {
      isShowDialogRewardSendFile.value = false;
      props.eventData.stage = "4";
    };
    // #endregion

    // #region Next to Story Details
    const funcNextToStoryDetails = () => {
      isShowDialogInstruction.value = false;
      isShowStoryDetails.value = true;
    };
    // #endregion

    // #region Format Audio Track
    const funcFormatAudioTrack = (time) => {
      let tempRecordTime = time;

      let minutes = Math.floor(tempRecordTime / 60000);
      let second = ((tempRecordTime % 60000) / 1000).toFixed(0);

      minutes = minutes || 0;
      second = second || 0;

      return {
        minutes,
        second,
      };
    };
    // #endregion

    // #region Get Speak Up Pretest Sentence
    // let randomPath = ;
    const funcGetSpeakUpPretestSentence = async () => {
      $q.loading.show();
      const eventStore = useEventStore();

      const response = await eventStore.getSpeakUpPretestSentence();

      if (response.audioUrl != "-") {
        props.eventData.audioUrl = `${response.audioUrl}`;
        props.eventData.counter = response.counter;
        setTimeout(() => {
          props.eventData.isHasAudioFile = true;
        }, 1000);
      }

      isPlayAudio.value = false;
      isListenStoryAudio.value = false;
      countListenAudio = 0;
      tempAudioUrl = null;

      sentenceData.value = response;

      $q.loading.hide();
    };
    // #endregion

    const funcSendFilePretest = () => {
      funcStopStoryAudio();
      funcStopAudioRecord();

      isShowDialogSendFile.value = true;
    };
    // #endregion ***** Function *****

    // #region ***** Computed *****
    // #region show Duration Audio
    const durationAudio = computed(() => {
      let tempDurationAudio = "00:00";
      let tempTrackPlayer = "0.0";

      let timeData = funcFormatAudioTrack(props.eventData.recordTimer);

      let minutes = timeData.minutes;
      let second = timeData.second;

      minutes = minutes > 9 ? minutes : `0${minutes}`;
      second = second > 9 ? second : `0${second}`;

      tempDurationAudio = `${minutes}:${second}`;
      tempTrackPlayer = `${minutes}.${second}`;

      let newData = {
        duration: tempDurationAudio,
        track: tempTrackPlayer,
      };

      return newData;
    });
    // #endregion
    // #region Show Timer
    const showRecordTimer = computed(() => {
      let tempTimer = "00:00";

      let timeData = funcFormatAudioTrack(props.eventData.recordTimer);

      let minutes = timeData.minutes;
      let second = timeData.second;

      minutes = minutes > 9 ? minutes : `0${minutes}`;
      second = second > 9 ? second : `0${second}`;

      tempTimer = `${minutes}:${second}`;

      return tempTimer;
    });
    // #endregion
    // #endregion ***** Computed *****

    // #region ***** Watch *****
    // #region Watch isRecording
    watch(
      () => props.eventData.isRecording,
      (val) => {}
    );
    // #endregion
    // #endregion ***** Watch *****

    const funcPlay = () => {
      if (props.eventData.isHasAudioFile) {
        let tempAudio = props.eventData.audioUrl;

        tempAudio.play();
      }
    };

    onMounted(() => {
      funcGetSpeakUpPretestSentence();
    });

    onBeforeUnmount(() => {
      funcStopStoryAudio();
      funcStopAudioRecord();
    });

    return {
      // Data
      sentenceData,

      // Boolean
      isLetSpeak,
      isShowStoryDetails,
      isPlayAudio,
      isListenStoryAudio,

      // Dialog
      isShowDialogInstruction,
      isShowDialogSendFile,
      isShowDialogRewardSendFile,
      isShowDialogHasFileRecord,

      // Function
      funcLetSpeak,
      funcFormatAudioTrack,
      funcConfirmSendFile,
      funcNextToChapter,
      funcNextToStoryDetails,
      funcStartRecording,
      funcShowDialogHasFileRecord,

      funcPlayStoryAudio,
      funcStopStoryAudio,
      funcPlayAudioRecord,
      funcStopAudioRecord,
      funcSendFilePretest,

      funcPlay,

      // Computed
      showRecordTimer,
      durationAudio,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-content-let-speakup {
  background-color: #ffe0b4;
  padding: 7px 10px 3px 10px;
  border-radius: 0px 0px 10px 10px;
}

.box-count-record {
  min-width: 60px;
  width: fit-content;
  background-color: #fff;
  color: #4a261b;
  border-radius: 14px;
  padding: 1px 10px;
}

//  Dialog
.text-title {
  position: relative;
  font-size: 24px;
  color: #fff;
  text-shadow: rgb(75, 30, 10) 2px 0px 0px,
    rgb(75, 30, 10) 1.75517px 0.958851px 0px,
    rgb(75, 30, 10) 1.0806px 1.68294px 0px,
    rgb(75, 30, 10) 0.141474px 1.99499px 0px,
    rgb(75, 30, 10) -0.832294px 1.81859px 0px,
    rgb(75, 30, 10) -1.60229px 1.19694px 0px,
    rgb(75, 30, 10) -1.97998px 0.28224px 0px,
    rgb(75, 30, 10) -1.87291px -0.701566px 0px,
    rgb(75, 30, 10) -1.30729px -1.5136px 0px,
    rgb(75, 30, 10) -0.421592px -1.95506px 0px,
    rgb(75, 30, 10) 0.567324px -1.91785px 0px,
    rgb(75, 30, 10) 1.41734px -1.41108px 0px,
    rgb(75, 30, 10) 1.92034px -0.558831px 0px;
}

.text-title::before {
  content: attr(data-text);
  position: absolute;
  text-shadow: 0px 4px 0px rgb(75, 30, 10), 3px 4px 0px rgb(75, 30, 10),
    -1px 4px 0px rgb(75, 30, 10);
}

.text-reward {
  color: #fff;
  text-shadow: rgb(75, 30, 10) 2px 0px 0px,
    rgb(75, 30, 10) 1.75517px 0.958851px 0px,
    rgb(75, 30, 10) 1.0806px 1.68294px 0px,
    rgb(75, 30, 10) 0.141474px 1.99499px 0px,
    rgb(75, 30, 10) -0.832294px 1.81859px 0px,
    rgb(75, 30, 10) -1.60229px 1.19694px 0px,
    rgb(75, 30, 10) -1.97998px 0.28224px 0px,
    rgb(75, 30, 10) -1.87291px -0.701566px 0px,
    rgb(75, 30, 10) -1.30729px -1.5136px 0px,
    rgb(75, 30, 10) -0.421592px -1.95506px 0px,
    rgb(75, 30, 10) 0.567324px -1.91785px 0px,
    rgb(75, 30, 10) 1.41734px -1.41108px 0px,
    rgb(75, 30, 10) 1.92034px -0.558831px 0px;
}

// #region Tag audio file
.box-audio-container {
  width: 100%;
  height: 24px;
  background-color: #fff5e7;
  border-radius: 12.5px;
  color: #4a261b;
  padding: 0px 15px;
}

.box-audio-track {
  width: 90%;
  height: 4px;
  background-color: #ffe0b4;
  border-radius: 2px;
}

.icon-track {
  width: 12px;
  height: 12px;
  background-color: #4a261b;
  border-radius: 50%;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.45);
}

// #endregion
</style>
