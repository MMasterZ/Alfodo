<template>
  <!-- Desktop -->
  <div v-if="isDesktop">
    <div
      style="
        top: 50%;
        width: fit-content;
        transform: translate(0%, -50%);
        height: fit-content;
      "
      class="z-top row items-center"
      :class="screenSize.width < 1600 ? 'fixed-left' : 'absolute-center'"
      :style="screenSize.width < 1600 ? '' : 'left:0;'"
    >
      <div>
        <q-img
          @click="funcGoTo(backPractice)"
          class="cursor-pointer item"
          width="175px"
          :src="`/images/icon_main/icon-left-skill-${backPractice.nameImage}.png`"
          no-transition
          no-spinner
        ></q-img>
      </div>
    </div>

    <div
      style="
        top: 50%;
        width: fit-content;
        transform: translate(0%, -50%);
        height: fit-content;
      "
      class="z-top row items-center"
      :class="screenSize.width < 1600 ? 'fixed-right' : 'absolute-right'"
      :style="screenSize.width < 1600 ? '' : 'right:0%;'"
    >
      <div>
        <q-img
          @click="funcGoTo(nextPractice)"
          class="cursor-pointer item"
          width="175px"
          :src="`/images/icon_main/icon-right-skill-${nextPractice.nameImage}.png`"
          no-transition
          no-spinner
        ></q-img>
      </div>
    </div>
  </div>

  <!-- Mobile -->
  <div class="row self-end brx" v-if="!isDesktop">
    <div class="col-1" style="width: fit-content">
      <q-img
        @click="funcGoTo(backPractice)"
        class="cursor-pointer"
        width="120px"
        :src="`/images/icon_main/icon-left-skill-${backPractice.nameImage}.png`"
        no-transition
        no-spinner
      ></q-img>
    </div>
    <q-space></q-space>
    <div class="col-1" style="width: fit-content">
      <q-img
        @click="funcGoTo(nextPractice)"
        class="cursor-pointer"
        width="120px"
        :src="`/images/icon_main/icon-right-skill-${nextPractice.nameImage}.png`"
        no-transition
        no-spinner
      ></q-img>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { usePracticeStore } from "src/stores/practice";
import { useSystemStore } from "src/stores/system";
export default {
  props: {
    screenSize: {
      type: Object,
      default: () => {},
    },
  },

  setup(props, { emit }) {
    // Initialize Router
    const $q = useQuasar();
    const practiceStore = usePracticeStore();
    const router = useRouter();
    const route = useRoute();
    const isDesktop = $q.platform.is.desktop;

    const worldList = ref([
      "Vocabulary",
      "Grammar",
      "Reading",
      "Writing",
      "Phonics",
      "Listening",
    ]);

    const funcGoTo = (data) => {
      const practiceStore = usePracticeStore();
      const systemStore = useSystemStore();
      practiceStore.setPracticeSkill(data.name);
      // systemStore.setRouter(data.name);

      systemStore.playSoundBackground();
    };

    const nextPractice = computed(() => {
      const practiceStore = usePracticeStore();

      let findIndex = practiceStore.skillIsland
        .map((x) => x.name)
        .indexOf(practiceStore.skill);

      let nextWorld = "";
      if (findIndex + 1 === practiceStore.skillIsland.length) {
        nextWorld = practiceStore.skillIsland[0];
      } else {
        nextWorld = practiceStore.skillIsland[findIndex + 1];
      }

      return nextWorld;
    });

    const backPractice = computed(() => {
      const practiceStore = usePracticeStore();

      let findIndex = practiceStore.skillIsland
        .map((x) => x.name)
        .indexOf(practiceStore.skill);

      let backWorld = "";
      if (findIndex === 0) {
        backWorld = practiceStore.skillIsland[practiceStore.skillIsland.length - 1];
      } else {
        backWorld = practiceStore.skillIsland[findIndex - 1];
      }

      return backWorld;
    });

    return {
      practiceStore,
      isDesktop,
      worldList,
      nextPractice,
      backPractice,
      funcGoTo,
    };
  },
};
</script>

<style lang="scss" scoped>
.item {
  transform: scale(1);

  transition: 0.2s;
}

.item:hover {
  transform: scale(0.8);
  transition: 0.2s;
}
</style>
