<template>
  <div style="z-index: 3" class="">
    <!-- Is Start Practice -->
    <!-- <div class="row" v-show="eventData.isSelectedUnit">
      <div class="col-1" style="width: fit-content">
        <q-btn round flat>
          <q-img
            no-spinner
            no-transition
            src="/images/icon_main/icon-pause.png"
            @click="funcShowDialogSetting()"
          ></q-img>
        </q-btn>
      </div>
      <div class="q-px-md self-center" v-if="eventData.isStartSpeaking">
        <q-img
          class="q-mx-xs"
          no-spinner
          no-transition
          :src="`/images/icon_main/icon-event-star${
            eventData.star >= 1 ? '' : '-backdrop'
          }.png`"
          width="30px"
        ></q-img>
        <q-img
          class="q-mx-xs"
          no-spinner
          no-transition
          :src="`/images/icon_main/icon-event-star${
            eventData.star >= 2 ? '' : '-backdrop'
          }.png`"
          width="30px"
        ></q-img>
        <q-img
          class="q-mx-xs"
          no-spinner
          no-transition
          :src="`/images/icon_main/icon-event-star${
            eventData.star >= 3 ? '' : '-backdrop'
          }.png`"
          width="30px"
        ></q-img>
      </div>
    </div> -->

    <!-- #region Desktop Mode -->
    <div v-if="$q.platform.is.desktop">
      <div
        class="row absolute-top"
        style="width: 100%; padding: 1%"
        v-show="!eventData.isSelectedUnit"
      >
        <!-- #region Button And Name Event -->
        <div class="col self-start brx row">
          <div style="max-width: 3%; width: 100%; min-width: 40px">
            <q-img
              width="100%"
              class="cursor-pointer"
              no-spinner
              no-transition
              src="/images/icon_main/icon-back.png"
              @click="
                eventData.isShop
                  ? (eventData.isShop = false)
                  : $router.replace('/lobby')
              "
            ></q-img>
          </div>

          <div class="brx self-center" style="margin-left: 1.5%">
            <div
              class="text-title text-white font-fredoka"
              v-show="!eventData.isShop"
            >
              {{ `${eventData.name}` }}
            </div>
          </div>
          <div
            class="brx self-start"
            style="
              max-width: 1.25%;
              width: 100%;
              min-width: 17px;
              margin: 0.5% 0.5%;
            "
          >
            <q-img
              width="100%"
              no-spinner=""
              no-transition
              class="cursor-pointer"
              src="/images/event_main/event-icon-info.png"
            ></q-img>
          </div>
        </div>

        <!-- #endregion -->
        <q-space></q-space>
        <!-- #region  -->
        <div
          class="animate__animated animate__fadeIn brx relative-position brx self-start"
          v-show="!eventData.isShop"
          style="max-width: 8.12%; width: 100%; min-width: 100px; margin: 0% 2%"
        >
          <!-- #region Bar icon Diamond -->
          <q-img src="/images/event_main/event-box-icon-reward.png"></q-img>
          <div>
            <q-img
              no-spinner=""
              no-transition
              class="absolute-center"
              :src="eventStore.eventDataInfo.coinUrl"
              width="70%"
              style="left: 10%"
            ></q-img>
          </div>
          <div class="absolute-center text-diamond" style="left: 57%">
            <div class="text-diamond">
              {{
                `${
                  eventData.diamond >= 10000 ? "+9999" : eventData.diamond || 0
                }`
              }}
            </div>

            <q-tooltip
              class="bg-black relative-position text-white"
              style="border-radius: 20px; padding: 0% 1%"
            >
              <div class="text-diamond">
                {{ eventData.diamond }}
              </div>
            </q-tooltip>
          </div>
          <!-- #endregion -->
        </div>
        <!-- #region Button Shop -->
        <div
          class="brx"
          style="max-width: 7.81%; width: 100%; min-width: 90px; z-index: 3"
        >
          <q-img
            no-spinner=""
            no-transition
            width="100%"
            class="cursor-pointer"
            src="/images/button_main/button-event-shop.png"
            @click="eventData.isShop = true"
          ></q-img>
        </div>
        <!-- #endregion -->
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Mobile Mode -->
    <div v-if="!$q.platform.is.desktop">
      <div
        class="absolute-top-left row"
        style="width: 100%; top: 1.5%; padding: 0% 1.5%"
      >
        <div
          class="col-1 self-center"
          style="max-width: 2.91%; width: 100%; min-width: 40px"
        >
          <q-img
            width="100%"
            class="cursor-pointer"
            no-spinner
            no-transition
            src="/images/icon_main/icon-back.png"
            @click="
              eventData.isShop
                ? (eventData.isShop = false)
                : $router.replace('/lobby')
            "
          ></q-img>
        </div>
        <div class="col self-center row" style="padding: 0% 2%">
          <div
            class="text-title text-white row font-fredoka mobile"
            v-show="!eventData.isShop"
          >
            <div class="self-center">
              {{ `Story` }}
            </div>
          </div>
          <div
            class="col-1 self-center"
            style="max-width: 5%; width: 50%; min-width: 20px; margin: 0% 3%"
          >
            <q-img
              width="100%"
              no-spinner=""
              no-transition
              class="cursor-pointer"
              src="/images/event_main/event-icon-info.png"
            ></q-img>
          </div>
        </div>

        <div class="self-center" style="margin: 0% 1.5%">
          <div class="relative-position">
            <q-img
              style="max-width: 40%; width: 50%; min-width: 80px"
              src="/images/event_main/event-box-icon-reward.png"
            >
              <div
                class="transparent absolute-center text-diamond mobile"
                style="left: 57%"
              >
                <div class="">
                  {{
                    `${
                      eventData.diamond >= 10000
                        ? "+9999"
                        : eventData.diamond || `+9999`
                    }`
                  }}
                </div>

                <q-tooltip
                  class="bg-black relative-position text-white"
                  style="border-radius: 20px; padding: 0% 1%"
                >
                  <div class="">
                    {{ eventData.diamond }}
                  </div>
                </q-tooltip>
              </div>
            </q-img>
            <div>
              <q-img
                no-spinner=""
                no-transition
                class="absolute-center"
                :src="eventStore.eventDataInfo.coinUrl"
                style="max-width: 30%; width: 50%; min-width: 60px; left: 5%"
              ></q-img>
            </div>
          </div>
        </div>
        <div class="self-center" style="margin: 0% 1.5%">
          <q-img
            style="min-width: 65px; width: 10.83%"
            src="/images/event_main/event-button-shop-mobile.png"
            @click="eventData.isShop = true"
          ></q-img>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <setting-dialog
      :isDialogSetting="isShowDialogSetting"
      :isLearningAndPractice="true"
      :previousPage="'event'"
      @callback-closeDialog="isShowDialogSetting = false"
      @callback-isBackToCurrentPage="eventData.func.backToMenu()"
    ></setting-dialog>
  </div>
</template>

<script>
import settingDialog from "components/dialog_main/setting-dialog.vue";
import { useEventStore } from "src/stores/event";
import { ref } from "vue";
export default {
  props: {
    eventData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    settingDialog,
  },
  setup(props, { emit }) {
    const eventStore = useEventStore();

    const isShowDialogSetting = ref(false);
    const funcShowDialogSetting = () => {
      isShowDialogSetting.value = true;
    };

    return {
      eventStore,

      // Function
      funcShowDialogSetting,

      // Boolean
      isShowDialogSetting,
    };
  },
};
</script>

<style lang="scss" scoped>
.text-title {
  font-size: max(30px, min(38px, 2.5vw));
  text-shadow: 0px 4px 0px #000, 2px 0px 0px #000, -1px 0px 0px #000;
  line-height: 1;
}

.text-title.mobile {
  font-size: max(12px, min(16px, 5vw));
  text-shadow: 0px 2px 0px #000, 1px 0px 0px #000, -1px 0px 0px #000;
}

.box-diamond {
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
  border: 3px solid #4a261b;
  border-radius: 33px;
  color: #fff;
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px,
    rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px,
    rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
}

.text-diamond {
  color: #fff;
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px,
    rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px,
    rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
  font-size: max(12px, min(20px, 1.3vw));
}

.text-diamond.mobile {
  font-size: max(12px, min(14px, 2.3vw));
}

.box-diamond.desktop {
  width: 120px;
}
.box-diamond.mobile {
  width: 90px;
}

.box-diamond::before {
  content: "";
  position: absolute;
  top: 5px;
  right: 3px;
  width: 8px;
  height: 0px;
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 10px 10px 0px 0px;
  transform: rotate(45deg);
}

.text-oveflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
