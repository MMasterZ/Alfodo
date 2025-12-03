<template>
  <q-dialog maximized v-model="isShowDialog" persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-next-to-speaking">
          <div class="box-sub-next-to-speaking q-pa-sm">
            <div align="center" class="q-pb-sm">
              <span class="text-title f24 font-mali-b"> NEXT TO SPEAK </span>
            </div>
            <div class="box-content-chat q-px-sm q-py-xs">
              <div class="row">
                <div
                  class="col-12 self-start q-my-sm"
                  :class="itemChat.isQuestion ? 'row ' : 'row reverse'"
                  v-for="(itemChat, indexChat) in eventData.chatList"
                  :key="indexChat"
                >
                  <div>
                    <div class="box-character relative-position">
                      <div
                        class="absolute-center"
                        style="width: 80px; top: 95%"
                      >
                        <character
                          :equipment="eventData.com.showCharacterData"
                          :isShop="!itemChat.isQuestion ? false : true"
                          :isPet="false"
                          :setId="`character-${
                            itemChat.isQuestion ? 'bot' : 'student'
                          }-${indexChat}`"
                          :isAnimation="false"
                        ></character>
                      </div>
                    </div>
                    <div class="q-mt-xs f12 font-mali-m" align="center">
                      <span v-show="!itemChat.isQuestion">You</span>
                      <span v-show="itemChat.isQuestion">{{
                        eventData.com.showCharacterData.name
                      }}</span>
                    </div>
                  </div>

                  <div
                    class="q-mx-sm box-chat relative-position q-mt-xs"
                    :position="itemChat.isQuestion ? 'left' : 'right'"
                  >
                    <div :class="itemChat.isQuestion ? 'q-pr-sm' : 'q-pl-sm'">
                      {{ itemChat.sentenceEn }}
                    </div>

                    <div
                      class="absolute-center"
                      :style="itemChat.isQuestion ? 'left: 100%' : 'left: 0'"
                    >
                      <q-btn
                        round
                        flat
                        size="7px"
                        @click="eventData.func.playAudio(itemChat.soundUrl)"
                      >
                        <q-img
                          width="25px"
                          src="/images/icon_main/icon-sound-audio.png"
                          no-spinner
                          no-transition
                        ></q-img>
                      </q-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="q-px-md q-mt-sm q-pt-xs" align="center">
              <div style="height: 45px">
                <q-img
                  @click="eventData.func.playAudioChat()"
                  v-show="!eventData.isPlayAudioChat"
                  width="200px"
                  class="cursor-pointer"
                  src="/images/button_main/button-event-play-chat-all.png"
                  no-spinner
                  no-transition
                ></q-img>
                <q-img
                  @click="eventData.func.stopAudioChat()"
                  v-show="eventData.isPlayAudioChat"
                  width="200px"
                  class="cursor-pointer"
                  src="/images/button_main/button-event-pause-chat-all.png"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <div>
                <q-img
                  width="200px"
                  class="cursor-pointer"
                  src="/images/button_main/button-event-next-to-speak.png"
                  no-spinner
                  no-transition
                  @click="eventData.func.startSpeaking()"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import Character from "components/character_main/character.vue";
import { reactive } from "@vue/reactivity";
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false,
    },
    eventData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Character,
  },
  setup(props) {
    const characterData = reactive({
      head: {
        itemName: "ghost-hair",
        isFront: true,
        isBack: true,
        FPS: "6",
        duration: "1",
      },
      body: {
        itemName: "ghost-dress",
        isFront: true,
        isBack: false,
        FPS: "6",
        duration: "1",
      },
      footer: {
        itemName: "ghost-pants",
        isFront: true,
        isBack: false,
        FPS: "6",
        duration: "1",
      },
      pet: {
        itemName: "",
        isFront: true,
        isBack: false,
        FPS: "6",
        duration: "1",
      },
      other: {
        itemName: "",
        isFront: true,
        isBack: false,
        FPS: "6",
        duration: "1",
      },
    });

    return {
      characterData,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-next-to-speaking {
  width: 500px;
  height: 500px;
  background-color: #7f4429;
  border: 3px solid #4b1e0a;
  border-radius: 20px;
  padding-bottom: 5px;
}

.box-next-to-speaking .box-sub-next-to-speaking {
  width: 100%;
  height: 100%;
  background-color: #ba6f4d;
  border-radius: 20px;
}

.text-title {
  color: #fff;
  text-shadow: rgb(75, 30, 10) 3px 0px 0px,
    rgb(75, 30, 10) 2.83487px 0.981584px 0px,
    rgb(75, 30, 10) 2.35766px 1.85511px 0px,
    rgb(75, 30, 10) 1.62091px 2.52441px 0px,
    rgb(75, 30, 10) 0.705713px 2.91581px 0px,
    rgb(75, 30, 10) -0.287171px 2.98622px 0px,
    rgb(75, 30, 10) -1.24844px 2.72789px 0px,
    rgb(75, 30, 10) -2.07227px 2.16926px 0px,
    rgb(75, 30, 10) -2.66798px 1.37182px 0px,
    rgb(75, 30, 10) -2.96998px 0.42336px 0px,
    rgb(75, 30, 10) -2.94502px -0.571704px 0px,
    rgb(75, 30, 10) -2.59586px -1.50383px 0px,
    rgb(75, 30, 10) -1.96093px -2.27041px 0px,
    rgb(75, 30, 10) -1.11013px -2.78704px 0px,
    rgb(75, 30, 10) -0.137119px -2.99686px 0px,
    rgb(75, 30, 10) 0.850987px -2.87677px 0px,
    rgb(75, 30, 10) 1.74541px -2.43999px 0px,
    rgb(75, 30, 10) 2.44769px -1.73459px 0px,
    rgb(75, 30, 10) 2.88051px -0.838247px 0px;
}

.box-content-chat {
  height: 70%;
  background-color: #fff2e5;
  border-radius: 14px;
  overflow-y: auto;
}

.box-character {
  width: 40px;
  height: 40px;
  background-color: rgba(168, 168, 168, 0.452);
  border-radius: 50%;
  overflow: hidden;
}

.direction-left {
  direction: ltr;
}

.direction-right {
  direction: rtl;
}

.box-chat {
  position: relative;
  width: fit-content;
  max-width: 70%;
  min-width: 50px;
  height: fit-content;
  padding: 10px 15px;
  background-color: #fff;
  color: #4b1e0a;
  border-radius: 30px;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.2);
  animation-duration: 0.7s;
  -webkit-animation-duration: 0.7s;
}

.box-chat[position="left"]::before {
  content: "";
  position: absolute;
  bottom: -11px;
  left: 7px;
  background-image: url("/images/icon_main/icon-chat-arrow.png");
  background-size: 25px 15px;
  background-repeat: no-repeat;
  display: inline-block;
  width: 25px;
  height: 15px;
}

.box-chat[position="right"]::before {
  content: "";
  position: absolute;
  bottom: -11px;
  right: 7px;
  background-image: url("/images/icon_main/icon-chat-arrow.png");
  transform: rotateY(180deg);
  background-size: 25px 15px;
  background-repeat: no-repeat;
  display: inline-block;
  width: 25px;
  height: 15px;
}
</style>
