<template>
  <div
    :class="
      isDesktop ? '' : 'row justify-between box-mobile-main q-my-sm q-mt-xl'
    "
  >
    <div class="col self-center">
      <div
        :class="
          isDesktop
            ? 'box-score-bar-container'
            : 'box-score-bar-container-mobile'
        "
      >
        <div class="box-progress-bar relative-position">
          <div class="progress-light" :style="`width:${progressBar}%`"></div>
          <div
            v-if="
              practiceData.practice.isIncorrectPractice ||
              practiceData.practice.isIncorrectCurrentUnit
            "
            class="absolute font-mali-m f16"
            style="top: -40px; color: #ffce21"
          >
            <span>
              <span class="fas fa-flag f20"></span>
              <span v-if="practiceData.practice.isIncorrectCurrentUnit">
                ทบทวนคำผิดก่อนหน้านี้
              </span>
              <span v-else> ทบทวนคำผิดจากบทอื่น </span>
            </span>
          </div>

          <div class="progress-bar" :style="`width:${progressBar}%`">
            <q-img
              width="50px"
              class="absolute-center animation-airplane"
              :style="`left: ${progressBar}%`"
              src="/images/icon_main/icon-air-plane.png"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
      </div>
    </div>

    <div
      class="col-2 self-center width-fit row justify-center q-mr-md"
      v-if="!isDesktop"
    >
      <div class="box-time">
        <div class="self-center f16 text-timeout">
          {{ `${showTime.min}:${showTime.sec}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { usePracticeStore } from "src/stores/practice";
import { useQuasar } from "quasar";
export default {
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
    syncData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const $q = useQuasar();
    const isDesktop = ref($q.platform.is.desktop);
    const practiceStore = usePracticeStore();

    const progressBar = computed(() => {
      let totalBar = Math.round(
        (props.practiceData.currentQuestionIndex /
          (props.practiceData.totalQuestion - 1)) *
          100
      );

      return totalBar || 0;
    });

    const showTime = computed(() => {
      let newTime = {
        min: 0,
        sec: 0,
      };

      let min = props.practiceData.time.min;
      let sec = props.practiceData.time.sec;

      newTime.min = min <= 9 ? `0${min}` : min;
      newTime.sec = sec <= 9 ? `0${sec}` : sec;

      return newTime;
    });

    return {
      // Store
      practiceStore,

      // Computed
      progressBar,
      showTime,

      // Boolearn
      isDesktop,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-score-bar-container {
  max-width: 1600px;
  width: 100%;
  min-width: 1200px;
  padding: 50px 25px 25px 25px;
  margin: auto;
}

.box-score-bar-container-mobile {
  width: 100%;
  min-width: 150px;
  padding: 0px 15px;
}

.box-progress-bar {
  max-width: 1150px;
  height: 23px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  box-shadow: inset 0px 2px 5px 1px rgba(0, 0, 0, 0.5);
  margin: auto;
  border: 2px solid #4a261b;
}

.progress-bar {
  background-color: #f4a814;
  height: 100%;
  border-radius: 50px;
  background-image: repeating-linear-gradient(
    40deg,
    transparent,
    transparent 7px,
    #f1c40f 0px,
    #f1c40f 20px
  );
  transition: width 1s;
}
.progress-light {
  position: absolute;
  top: 5px;
  padding: 3px;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  transition: width 1s;
}

.animation-airplane {
  transition: left 1s;
}

// Mobile
.box-mobile-main {
  min-width: 320px;
}

.box-time {
  width: 70px;
  border: 2px solid #4a261b;
  background-color: #fff;
  border-radius: 12px;
  padding: 10px;
  color: #4a261b;
}
</style>
