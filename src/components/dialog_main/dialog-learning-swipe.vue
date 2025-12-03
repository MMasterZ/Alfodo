<template>
  <div v-if="!systemStore.systemData.isLearningSwipe">
    <q-dialog maximized v-model="isDialoglearningSwipe" persistent>
      <q-card
        class="transparent shadow-0"
        style="overflow: hidden"
        @click="funcClickPass()"
      >
        <q-card-section class="fit row justify-center items-center">
          <div class="absolute-center fit brx" align="center">
            <div class="swipe-hand" id="swipe-hand-id"></div>
            <div class="q-pa-md text-white" align="center">
              คุณสามารถเลื่อนหน้าจอไปเกาะอื่นๆได้
            </div>
            <div class="q-pa-md text-white" align="center">แตะเพื่อนปิด</div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "@vue/runtime-core";
import { useSystemStore } from "src/stores/system";

const emit = defineEmits(["callback-dialogSwipe"]);

const systemStore = useSystemStore();

const funcClickPass = () => {
  if (setTimeSwipeHand) clearInterval(setTimeSwipeHand);

  emit("callback-dialogSwipe");
};

let setTimeSwipeHand;
const animationSwipeHand = () => {
  let el = document.getElementById("swipe-hand-id");

  let currentPosition = 0;
  setTimeSwipeHand = setInterval(() => {
    el.style.backgroundPosition = `-${currentPosition}px 0px`;

    if (currentPosition >= 1200) {
      currentPosition = 0;
    } else {
      currentPosition += 151;
    }
  }, 300);
};

onMounted(() => {
  if (systemStore.systemData.isLearningSwipe) return;
  setTimeout(() => {
    // animationSwipeHand();
  }, 300);
});

onBeforeUnmount(() => {
  if (setTimeSwipeHand) clearInterval(setTimeSwipeHand);
});

// export default {
//   props: {
//     isDialoglearningSwipe: {
//       type: Boolean,
//       default: false,
//     },
//     systemStore: {
//       type: Object,
//       default: () => {},
//     },
//   },
//   setup(props, { emit }) {

//     return {
//       funcClickPass,
//     };
//   },
// };
</script>

<style lang="scss" scoped>
.swipe-hand {
  width: 150px;
  height: 121px;
  background-image: url("/sprite/hand-swipe.png");
  background-repeat: no-repeat;
}
</style>
