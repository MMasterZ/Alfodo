<template>
  <q-dialog persistent maximized v-model="isShowDialogLogs">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position" style="max-width: 320px; width: 100%">
          <div
            class="absolute-top"
            style="top: -33px; left: 30px; max-width: 120px; width: 100%"
          >
            <q-img src="/images/icon_main/icon-header-dialogs.png"></q-img>
          </div>
          <q-img src="/images/dialog_main/dialog-content-logs.png">
            <div class="fit transparent">
              <div class="q-pa-md box-content-dialogs">
                <div
                  class="col-12 font-mali-m f14 q-mb-lg"
                  v-if="storyData.dialogs.length"
                  v-for="(item, index) in storyData.dialogs"
                >
                  <div :align="item.isUser ? 'right' : 'left'" class="q-px-sm">
                    <span v-html="item.name" v-if="!item.isUser"></span>
                    <span
                      v-html="studentStore.characterName"
                      v-if="item.isUser"
                    ></span>
                  </div>
                  <div
                    class="box-chat relative-position"
                    :type="item.isUser ? 'user' : 'npc'"
                  >
                    <span v-html="item.message"></span>
                  </div>
                </div>
              </div>
            </div>
          </q-img>
          <div
            class="absolute"
            style="top: -10px; right: -10px; max-width: 45px; width: 100%"
          >
            <q-img
              class="cursor-pointer"
              src="/images/icon_main/icon-close.png"
              @click="$emit('callback-closeDialog')"
              v-close-popup
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    isShowDialogLogs: {
      type: Boolean,
      default: false,
    },
    storyData: {
      type: Object,
      default: () => {},
    },
    studentStore: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.box-chat {
  position: relative;
  max-width: 95%;
  width: fit-content;
  min-width: 70px;
  background-color: #fff;
  color: #4a261b;
  border-radius: 20px;
  padding: 3% 5%;
  z-index: 4;
  line-height: 1;
  box-shadow: 0px 4px 3px 1px #4a261b4d;
}

.box-chat[type="npc"] {
  margin: 2% auto 2% 2%;
}

.box-chat[type="user"] {
  margin: 2% 2% 2% auto;
}

.box-chat[type="npc"]::after {
  content: url("/images/icon_main/icon-chat-message.png");
  position: absolute;
  width: 100%;
  top: 80%;
  left: 7%;
  z-index: 4;
}

.box-chat[type="user"]::after {
  content: url("/images/icon_main/icon-chat-message.png");
  position: absolute;
  width: 100%;
  top: 80%;
  right: 7%;
  transform: rotateY(180deg);
  z-index: 4;
}

.box-content-dialogs {
  height: 98%;
  color: #4a261b;
}
</style>
