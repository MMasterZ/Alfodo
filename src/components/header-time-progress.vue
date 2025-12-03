<template>
  <div class="row relative-position q-pt-sm">
    <div class="self-center row q-py-sm q-pb-md" style="width: 195px">
      <div class="box-current-question self-center q-mx-xs">
        <span class="text-white" style="font-size: 18px">
          {{ `${practiceData.currentQuestion + 1}/${practiceData.totalQuestion}` }}
        </span>
      </div>
      <div class="box-start self-center" align="center">
        <q-rating
          style="font-size: 26px"
          :max="3"
          v-model="practiceData.star"
          color="brown-6"
          color-selected="amber-5"
          class="no-pointer-events"
        >
        </q-rating>
      </div>
    </div>
    <q-space></q-space>
    <div class="self-center q-pb-md q-pt-xs" style="max-width: 120px" align="right">
      <div
        v-if="$route.name == 'readingmultiple' || $route.name == 'clozeTest'"
        align="right"
        class="q-px-md q-mt-sm relative-position"
        style="z-index: 2"
      >
        <q-btn-group rounded push>
          <q-btn
            @click="
              setFontSize == 14 ? null : $emit('callback-resize', (setFontSize -= 2))
            "
            rounded
            class="bg-button"
          >
            <span class="f18"> A <span class="absolute" style="top: 2px">-</span> </span>
          </q-btn>
          <q-btn
            @click="
              setFontSize == 20 ? null : $emit('callback-resize', (setFontSize += 2))
            "
            rounded
            class="bg-button"
          >
            <span class="f18"> A <span class="absolute" style="top: 2px">+</span> </span>
          </q-btn>
        </q-btn-group>

        <!-- <q-btn
          v-if="$route.name == 'readingmultiple'"
          :padding="$q.platform.is.mobile ? '1vw 12px' : '7px 16px'"
          class="bg-button q-ml-md"
          style="border-radius: 7px"
          @click="$emit('playSound')"
        >
          <q-icon size="20px" name="fas fa-volume-up"></q-icon>
        </q-btn> -->
      </div>
    </div>
  </div>
</template>

<script>
import questionStar from "./question-star.vue";
import timeProgress from "./time-progress.vue";
import { ref } from "vue";
export default {
  components: {
    questionStar,
    timeProgress,
  },
  emits: ["increaseFont", "decreaseFont", "playSound"],
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
    setFontSize: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const fontSize = ref(props.setFontSize);
    return { fontSize };
  },
};
</script>

<style lang="scss" scoped>
.box-current-question {
  width: fit-content;
  background-color: #6d4300;
  padding: 3px 10px;
  border-radius: 20px;
  box-shadow: 0 4px 0px #4d2f02;
}

.box-start {
  width: fit-content;
  background-color: #6d4300;
  padding: 3px 10px;
  border-radius: 20px;
  box-shadow: 0 4px 0px #4d2f02;
}

.bg-button {
  background-color: #6d4300;
  border: 1px solid#FFC630;
  color: #ffc630;
}
</style>
