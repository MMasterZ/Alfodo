<template>
  <q-dialog maximized v-model="isShowDialogEvent" persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <q-img
            no-spinner
            no-transition
            width="320px"
            src="/images/dialog_main/dialog-event.png"
          >
            <div class="fit transparent">
              <div class="box-event">
                <div class="q-my-md q-mt-md q-pt-xs"></div>
                <div
                  class="button-event q-mt-md"
                  v-for="(itemEvent, indexEvent) in eventList"
                  :key="indexEvent"
                >
                  <div class="sub-button-event row q-px-sm">
                    <div class="col q-px-xs row">
                      <div class="col-12">
                        <q-img
                          no-spinner
                          no-transition
                          width="100%"
                          height="32px"
                          :src="itemEvent.iconImgUrl"
                          fit="contain"
                        ></q-img>
                      </div>
                      <div class="col-12 q-pb-md q-mb-xs relative-position row">
                        <div class="col-12 text-event font-prompt-m f10 q-pa-xs">
                          <span>{{
                            `${itemEvent.eventTime} ${itemEvent.eventEnd}`
                          }}</span>
                        </div>
                        <div style="width: 140px">
                          <div class="bar-progress relative-position">
                            <div
                              class="progress relative-position"
                              :style="`width:${itemEvent.speakUpProgress}%`"
                            >
                              <div class="progress-shadow"></div>
                            </div>

                            <div
                              class="absolute"
                              :style="`left: ${itemReward.percentage * 100 - 5}%`"
                              v-for="(
                                itemReward, indexReward
                              ) in itemEvent.progressReward"
                              :key="indexReward"
                            >
                              <div class="line-score relative-position">
                                <q-img
                                  class="absolute-center"
                                  style="top: 15px"
                                  width="25px"
                                  :src="`/images/event_main/event-icon-reward-${
                                    itemReward.imageIcon
                                  }${
                                    itemEvent.speakUpProgress >=
                                    itemReward.percentage * 100
                                      ? '-pass'
                                      : ''
                                  }.png`"
                                  no-spinner
                                  no-transition
                                ></q-img>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- Progress Score -->
                        <div class="self-center" style="padding-left: 7px">
                          <div
                            class="font-prompt-b"
                            style="font-size: 10px; color: #5f3b09; margin-top: -3px"
                          >
                            {{ `${itemEvent.speakUpProgress}%` }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-1 sefl-end q-pb-sm row" style="width: 75px">
                      <div class="self-end col-12" align="center">
                        <q-img
                          class="cursor-pointer"
                          width="70px"
                          src="/images/button_main/button-event-go.png"
                          @click="funcGotoEvent(itemEvent.name)"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-img>
          <div class="absolute-center" style="top: 10px">
            <q-img
              width="230px"
              src="/images/label_main/label-dialog-event.png"
              no-spinner
              no-transition
            ></q-img>
          </div>
          <div class="absolute-top-right" style="top: -10px; right: -10px">
            <q-img
              class="cursor-pointer"
              width="45px"
              src="/images/icon_main/icon-close.png"
              v-close-popup
              no-spinner
              no-transition
              @click="funcCloseDialogEvent()"
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useEventStore } from "src/stores/event";
import { useQuasar } from "quasar";
export default {
  emits: ["callback-closeDialog"],
  setup(props, { emit }) {
    // Initial Data

    const $q = useQuasar();
    const router = useRouter();

    const funcGotoEvent = (name, id) => {
      $q.loading.show();
      let routeName = "";
      if (name == "SPEAK UP") {
        routeName = `/event/speakup`;
      }

      setTimeout(() => {
        router.replace(`${routeName}`);
        $q.loading.hide();
      }, 1000);
    };

    // Initial Function

    const eventList = ref([]);
    const isShowDialogEvent = ref(false);
    const funcGetEventList = async () => {
      const eventStore = useEventStore();
      eventList.value = eventStore.eventList;
      isShowDialogEvent.value = true;
    };

    const funcCloseDialogEvent = () => {
      isShowDialogEvent.value = false;

      setTimeout(() => {
        emit("callback-closeDialog");
      }, 500);
    };

    onMounted(async () => {
      await funcGetEventList();
    });

    return {
      // Data
      eventList,

      // Boolean
      isShowDialogEvent,

      // Function
      funcGotoEvent,
      funcCloseDialogEvent,
    };
  },
};
</script>

<style lang="scss" scoped>
.button-event {
  width: 100%;
  height: fit-content;
  background-color: #d4aa75;
  border: 2px solid #9c7241;
  border-radius: 15px;
  overflow: hidden;
  padding-bottom: 5px;
}

.sub-button-event {
  height: 95%;
  background-color: #fbd9af;
  border-radius: 15px;
  padding: 5px;
}

.bar-progress {
  width: 100%;
  height: 10px;
  background-color: #ffffff;
  border: 1px solid #4a261b;
  border-radius: 30px;
}

.progress {
  width: 50%;
  height: 100%;
  background-color: #33dada;
  background-image: repeating-linear-gradient(
    -70deg,
    transparent,
    transparent 6px,
    rgba(67, 255, 255, 1) 0px,
    rgba(67, 255, 255, 1) 10px
  );
  border-radius: 30px;
  overflow: hidden;
}

.progress-shadow {
  position: absolute;
  top: 1px;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 90%;
  height: 2px;
  background-color: #fff;
}

.line-score {
  width: 2px;
  height: 5px;
  background-color: #4a261b;
  border-radius: 5px;
}

.box-event {
  width: 100%;
  height: 97%;
  padding: 7px;
  overflow: auto;
  border-radius: 15px;
}

.box-event::-webkit-scrollbar {
  width: 0px;
}

.text-event {
  color: #5f3b09;
}
</style>
