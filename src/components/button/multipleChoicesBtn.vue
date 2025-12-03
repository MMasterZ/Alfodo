<template>
  <div>
    <q-btn
      class="btn-choice q-px-md q-py-xs relative-position row f14"
      :class="
        practiceData.isSendAnswer
          ? practiceData.currentChoiceIndex == choices.index
            ? practiceData.isCorrectAnswer
              ? 'btn-correct no-pointer-events'
              : 'btn-incorrect no-pointer-events'
            : 'btn-bg no-pointer-events'
          : $route.name == 'phonicsmultiple' ||
            $route.name == 'conversationmultiple'
          ? practiceData.currentChoiceIndex == choices.index
            ? 'btn-active cursor-pointer'
            : 'btn-bg cursor-pointer'
          : $q.platform.is.desktop
          ? 'btn-bg btn-choice-hover cursor-pointer'
          : practiceData.isSendAnswer
          ? practiceData.currentChoiceIndex == choices.index
            ? practiceData.isCorrectAnswer
              ? 'btn-correct no-pointer-events'
              : 'btn-incorrect no-pointer-events'
            : 'btn-bg no-pointer-events'
          : 'btn-bg no-pointer-events'
      "
      :style="
        isSound
          ? 'max-width:300px;width:100%;'
          : 'width: 100%; max-width: 1000px'
      "
      no-caps
      align="left"
    >
      <div
        class="full-width q-px-sm row justify-center items-center"
        :style="$q.platform.is.desktop ? 'height: 150px' : 'height:80px;'"
        v-if="isSound"
      >
        <div align="center">
          <q-icon name="fas fa-volume-up"></q-icon>
          <div class="q-py-sm" v-if="practiceData.isSendAnswer">
            <span style="font-size: 18px" v-html="choices.choice"> </span>
          </div>
        </div>
      </div>
      <div class="row" v-if="!isSound">
        <div
          class="col self-center row justify-center items-center q-pl-md"
          align="left"
          style="display: inline-block"
        >
          <span style="font-size: 18px" v-html="choices.choice"> </span>
        </div>
      </div>

      <div class="absolute-right circle-1" style="top: 10px; right: 10px"></div>
      <div class="absolute-right circle-2" style="top: 23px; right: 12px"></div>
    </q-btn>
  </div>
</template>

<script>
export default {
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
    choices: {
      type: Object,
      defulat: () => {},
    },
    index: {
      type: Number,
      defulat: 0,
    },
    isSound: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["callback-currentchoiceindex"],
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.btn-choice {
  border-radius: 7px;
  min-height: 60px;
  max-height: fit-content;
}

.btn-bg {
  background-image: linear-gradient(#ffd361, #ffbb0d);
}

.btn-active {
  background: linear-gradient(180deg, #85e6ff 0%, #4bccf7 100%);
}

.btn-diable-bg {
  background-image: linear-gradient(#e7e7e7, #ababab);
}

.btn-choice-hover:hover {
  background: linear-gradient(180deg, #85e6ff 0%, #4bccf7 100%);
}

.choice-circle-bg {
  color: #f66287;
}

.choice-square-bg {
  color: #067fd8;
}

.choice-triangle-bg-disable {
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 20px solid #8f8d8c;
}

.choice-triangle-bg {
  border-right: 15px solid transparent;
  border-left: 15px solid transparent;
  border-bottom: 20px solid #991a99;
}

.choice-star-bg {
  color: #8f5839;
}

.icon-diable {
  color: #8f8d8c;
}

.circle-1 {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 1px 1px 1px;
}
.circle-2 {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 1px 1px 1px;
}

.btn-correct {
  background-color: #80ddcc;
}

.btn-incorrect {
  background-color: #ffadad;
}
</style>
