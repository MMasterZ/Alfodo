<template>
  <q-dialog
    maximized
    v-model="isDialogTutorial"
    persistent
    class="z-max relative-position"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="row justify-center items-center fit">
        <!-- #region Desktop -->
        <div
          v-if="systemStore.platform.desktop"
          class="col-12 relative-position q-pa-md"
          style="max-width: 1000px; width: 90%"
        >
          <q-img
            no-spinner
            no-transition
            src="/images/dialog_main/dialog-box-tutorial-desktop.png"
          >
            <div class="fit transparent no-padding">
              <div class="fit row q-pa-sm">
                <div class="col-1 self-center" align="left" style="width: 50px">
                  <q-img
                    no-spinner
                    no-transition
                    v-if="selectedIndex != 0"
                    @click="selectedIndex--"
                    class="cursor-pointer"
                    width="20px"
                    src="/images/icon_main/icon-arrow-tutorial-left.png"
                  ></q-img>
                </div>
                <div class="col self-center row full-width" style="height: 90%">
                  <q-tab-panels
                    class="box-image col-12 self-end no-padding"
                    v-model="selectedIndex"
                    animated
                    swipeable
                  >
                    <q-tab-panel
                      class="no-padding"
                      :name="index"
                      v-for="(item, index) in tutorialList"
                    >
                      <q-img
                        width="100%"
                        :src="`${item.imagePath}?${random}`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </q-tab-panel>
                  </q-tab-panels>
                </div>
                <div class="col-1 self-center" align="right" style="width: 50px">
                  <q-img
                    no-spinner
                    no-transition
                    v-if="selectedIndex + 1 != tutorialList.length"
                    @click="selectedIndex++"
                    class="cursor-pointer"
                    width="20px"
                    src="/images/icon_main/icon-arrow-tutorial-right.png"
                  ></q-img>
                </div>

                <div class="col-12 self-center row q-pt-sm justify-center">
                  <div
                    class="col-1 q-mx-xs q-my-sm cursor-pointer"
                    style="width: 14px; height: 14px; border-radius: 50%"
                    :style="
                      selectedIndex == index
                        ? 'background-color: #FFC533;'
                        : 'background-color: white;'
                    "
                    @click="selectedIndex = index"
                    v-for="(item, index) in tutorialList"
                  ></div>
                </div>
              </div>
            </div>
          </q-img>

          <div class="absolute-top-right" style="top: 3px; right: 3px">
            <q-btn round @click="funcSaveTutorial()" v-close-popup>
              <q-img
                src="/images/icon_main/icon-close.png"
                no-spinner
                no-transition
              ></q-img>
            </q-btn>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Mobile -->
        <div
          v-if="systemStore.platform.mobile"
          class="col-12 relative-position"
          style="max-width: 400px; width: 100%; min-width: 300px"
        >
          <q-img
            src="images/dialog_main/dialog-box-tutorial-mobile.png"
            no-spinner
            no-transition
          >
            <div class="fit q-pa-xs row transparent">
              <div class="box-image self-center col-12 bg-white" style="height: 90%">
                <q-tab-panels
                  class="box-image no-padding"
                  v-model="selectedIndex"
                  animated
                  swipeable
                >
                  <q-tab-panel
                    class="no-padding"
                    :name="index"
                    v-for="(item, index) in tutorialList"
                  >
                    <q-img
                      no-spinner
                      no-transition
                      width="100%"
                      :src="`${item.imagePath}?${random}`"
                    ></q-img>
                  </q-tab-panel>
                </q-tab-panels>
              </div>

              <div class="col-12 self-center row justify-center">
                <div class="col-1 self-center" align="left" style="width: 30px">
                  <q-img
                    no-spinner
                    no-transition
                    v-if="selectedIndex != 0"
                    @click="selectedIndex--"
                    class="cursor-pointer"
                    width="20px"
                    src="/images/icon_main/icon-arrow-tutorial-left.png"
                  ></q-img>
                </div>
                <div class="col row self-center justify-center">
                  <q-pagination
                    align="center"
                    v-model="currentPagination"
                    color="white"
                    :max="tutorialList.length"
                    :max-pages="tutorialList.length / 3"
                    boundary-numbers
                    active-color="transparent"
                    active-text-color="yellow"
                    @update:model-value="(index) => (selectedIndex = index - 1)"
                    flat
                  />
                </div>
                <div class="col-1 self-center" align="right" style="width: 30px">
                  <q-img
                    no-spinner
                    no-transition
                    v-if="selectedIndex + 1 != tutorialList.length"
                    @click="selectedIndex++"
                    class="cursor-pointer"
                    width="20px"
                    src="/images/icon_main/icon-arrow-tutorial-right.png"
                  ></q-img>
                </div>
              </div>
            </div>
          </q-img>
          <div class="absolute-top-right" style="top: -7px; right: -7px">
            <q-btn round @click="funcSaveTutorial()" v-close-popup>
              <q-img
                src="/images/icon_main/icon-close.png"
                no-spinner
                no-transition
              ></q-img>
            </q-btn>
          </div>
        </div>
        <!-- #endregion -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useQuasar } from "quasar";
import { useSystemStore } from "src/stores/system";
export default {
  props: {

    typeTutorial: {
      default: "",
    },
    pageName: {
      default: "",
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar();
    const isLoading = ref(true);
    const random = Math.random().toString(36).substr(3);
    const selectedIndex = ref(0);
    const systemStore = useSystemStore();

    const isDialogTutorial = ref(true);

    const tutorialList = computed(() => {
      let temp = tempTutorial.value || [];

      if (props.pageName) {
        temp = tempTutorial.value.filter((item) =>
          item.imagePath.includes(props.pageName)
        );
      }

      return temp;
    });

    const currentPagination = computed(() => {
      return selectedIndex.value + 1;
    });

    const tempTutorial = ref([]);
    const loadTutorial = async () => {
      tempTutorial.value = await systemStore.getTutorial();

      isLoading.value = false;
      emit("callback-isLoaded");
    };

    const funcSaveTutorial = async () => {
      systemStore.saveTutorial(props.pageName);

      isDialogTutorial.value = false;

      setTimeout(() => {
        emit("callback-closeDialog");
      }, 500);
    };

    onMounted(async () => {
      selectedIndex.value = 0;

      const systemStore = useSystemStore();

      systemStore.setPlatform($q.platform.is.desktop ? "desktop" : "mobile");

      setTimeout(async () => {
        await loadTutorial();
      }, 500);
    });

    return {
      systemStore,
      selectedIndex,
      tutorialList,

      random,

      isLoading,

      // Computed
      currentPagination,

      funcSaveTutorial,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-image {
  border-radius: 20px;
  cursor: grab;
  cursor: -moz-grab;
}

.box-image:active {
  cursor: grabbing;
  cursor: -moz-grabbing;
}
</style>
