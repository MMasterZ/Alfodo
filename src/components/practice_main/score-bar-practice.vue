<template>
  <div
    :class="
      systemStore.platform.desktop
        ? ' q-pb-md'
        : 'row justify-between box-mobile-main q-pt-md'
    "
  >
    <div class="col self-center">
      <div
        :class="
          systemStore.platform.desktop
            ? 'box-score-bar-container'
            : 'box-score-bar-container-mobile'
        "
      >
        <div class="box-progress-bar relative-position">
          <div class="progress-bar" :style="`width:${progressBar}%`">
            <div
              class="absolute-center animation-light light"
              :style="`left:${progressBar}%;opacity:${
                progressBar == 0 ? '0' : '1'
              };`"
            ></div>
            <div class="fit">
              <q-img
                :class="progressBar >= item ? 'animation-star' : ''"
                :style="`left: ${item}%`"
                width="35px"
                class="absolute-center"
                v-for="(item, index) in progressStar"
                :src="`/images/icon_main/icon-star-practice-${
                  progressBar >= item ? 'pass' : 'disable'
                }.png`"
                no-spinner
                no-transition
              >
              </q-img>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="col-2 self-center width-fit row justify-center q-mr-md"
      style="margin-top: -5px"
      v-if="systemStore.platform.mobile && practiceData.isEnableTimer"
    >
      <div class="box-time">
        <div class="self-center f16 text-timeout q-pt-xs">
          {{ `${showTime.min}:${showTime.sec}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { usePracticeStore } from "src/stores/practice";
import { useSystemStore } from "src/stores/system";
export default {
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
    practiceStore: {
      default: () => {},
    },
  },
  setup(props) {
    const systemStore = useSystemStore();
    const practiceStore = usePracticeStore();
    const practiceData = ref(props.practiceData);

    const progressBar = computed(() => {
      let totalBar = Math.round(practiceData.value.score);

      return totalBar;
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

    const progressStar = [60, 65, 80];

    return {
      // Store
      practiceStore,
      systemStore,

      // Computed
      progressBar,
      progressStar,
      showTime,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-score-bar-container {
  max-width: 1600px;
  width: 100%;
  min-width: 320px;
  padding: 25px;
  margin: auto;
}

.box-progress-bar {
  max-width: 1150px;
  height: 23px;
  padding: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  box-shadow: inset 0px 2px 5px 1px rgba(0, 0, 0, 0.5);
  margin: auto;
}

.progress-bar {
  background-color: #f4a814;
  height: 100%;
  border-radius: 50px 20px 20px 50px;
  background-image: repeating-linear-gradient(
    40deg,
    transparent,
    transparent 7px,
    #f1c40f 0px,
    #f1c40f 20px
  );
  transition: width 1s;
}

.light {
  transition: left 1s;
  height: 85%;
  border-radius: 50%;
  width: 7px;
}

.animation-light {
  animation: shadowLight 0.5s ease-in infinite alternate;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 7px 5px rgba(255, 255, 255, 0.3);

  -webkit-animation: shadowLight 0.5s ease-in infinite alternate;
}

@keyframes shadowLight {
  50% {
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 5px 3px rgba(255, 255, 255, 0.5);
  }
}

.animation-star {
  animation: animationStar 0.1s linear forwards 0.5s;
  transform-origin: center;
  transform-box: fill-box;
  transform: scale(1) translate(-50%, -50%);
}

@keyframes animationStar {
  to {
    transform: scale(1.1) translate(-50%, -50%);
  }
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
  padding: 5px 0px 5px 10px;
  color: #4a261b;
}

.box-score-bar-container-mobile {
  width: 100%;
  min-width: 150px;
  padding: 0px 15px;
}
</style>
