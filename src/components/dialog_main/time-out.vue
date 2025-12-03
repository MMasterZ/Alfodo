<template>
  <div>
    <q-dialog maximized v-model="isDialogTimerOut" persistent>
      <q-card class="transparent shadow-0 font-mali-m">
        <q-card-section class="fit row items-center q-pa-sm">
          <div class=" dialog-container relative-position q-py-md">
            <q-tab-panels
              class="transparent"
              v-model="selectedStepBuyCourse"
              animated
            >
              <q-tab-panel
                class="no-padding"
                :name="item.name"
                v-for="(item, index) in buyCourseStep"
              >
                <!-- Time Out -->
                <div v-if="index == 0">
                  <div align="center">
                    <q-img
                      width="85px"
                      src="/images/icon_main/icon-clock.png"
                    ></q-img>
                  </div>
                  <div class="q-my-md" align="center">
                    <span class="f20 text-bold">หมดเวลาทดลองเรียน</span>
                  </div>
                  <div class="row q-px-xs">
                    <div class="col q-px-xs">
                      <q-img
                        class="cursor-pointer"
                        src="/images/button_main/button-logout.png"
                      ></q-img>
                    </div>
                    <div class="col q-px-xs">
                      <q-img
                        class="cursor-pointer"
                        @click="item.func()"
                        src="/images/button_main/button-buy-course.png"
                      ></q-img>
                    </div>
                  </div>
                </div>
                <!-- Selected Level -->
                <div v-else-if="index == 1" class="q-px-xs">
                  <div class="" align="center">
                    <div class="row justify-center">
                      <q-icon
                        size="22px"
                        class="self-center q-mx-sm"
                        name="fas fa-shopping-cart"
                      ></q-icon>
                      <div class="q-py-sm">
                        <span class="f20 self-center text-bold">
                          ซื้อคอร์ส
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="
                      row
                      justify-between
                      q-my-xs
                      box-selected-container
                      q-pa-xs
                    "
                  >
                    <div class="self-center">xxx</div>
                    <div class="self-center">
                      <q-btn
                        class="
                          button-main
                          default
                          button-main-radius
                          bubble-selected
                          q-py-sm
                          z-top
                        "
                        style="width: 100px"
                        padding="10px 0px"
                        push
                        no-caps
                      >
                        <span class="q-pl-sm text-black text-bold">
                          {{ `Level ${selectedLevel}` }}
                        </span>
                        <q-space></q-space>
                        <q-icon
                          class="q-mr-xs"
                          size="16px"
                          name="fas fa-caret-down"
                        ></q-icon>

                        <q-menu
                          transition-show="jump-down"
                          transition-hide="jump-up"
                          class="relative-position z-top"
                          fit
                          style="border-radius: 5px; border: 2px solid #4a261b"
                        >
                          <q-list class="box-selected">
                            <div class="q-pa-sm">
                              <div
                                clickable
                                v-close-popup
                                class="options-menu-list q-pa-xs cursor-pointer"
                                v-for="(
                                  item, index
                                ) in courseStore.courseLevelOptions"
                                align="center"
                                :class="{
                                  'active-menu': selectedLevel == item,
                                }"
                                @click="selectedLevel = item"
                              >
                                <span>Level {{ item }}</span>
                              </div>
                            </div>
                          </q-list>
                        </q-menu>
                      </q-btn>
                    </div>
                  </div>
                  <div class="row q-px-xs q-mt-md">
                    <div class="col q-px-xs">
                      <q-img
                        class="cursor-pointer"
                        src="/images/button_main/button-cancel-payment.png"
                      ></q-img>
                    </div>
                    <div class="col q-px-xs">
                      <q-img
                        class="cursor-pointer"
                        @click="item.func()"
                        src="/images/button_main/button-confirm-payment.png"
                      ></q-img>
                    </div>
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue"
import { useCourseStore } from "src/stores/course";
export default {
  props: {
    isDialogTimerOut: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    // Initialize
    const courseStore = useCourseStore();

    const selectedLevel = ref("");

    const selectedStepBuyCourse = ref("timeOut");
    const buyCourseStep = ref([
      {
        name: "timeOut",
        func: () => {
          selectedStepBuyCourse.value = "selectedLevel";
        },
      },
      {
        name: "selectedLevel",
        func: () => {
          selectedStepBuyCourse.value = "selectedUnit";
        },
      },
      {
        name: "selectedUnit",
        func: () => {
          selectedStepBuyCourse.value = "payment";
        },
      },
      {
        name: "payment",
        func: () => {
          selectedStepBuyCourse.value = "receipt";
        },
      },
      {
        name: "receipt",
        func: () => {
          selectedStepBuyCourse.value = "success";
        },
      },
      {
        name: "success",
        func: () => {
          emit("callback-closeDialog");
        },
      },
    ]);

    return {
      // Store
      courseStore,

      // Data
      selectedLevel,
      selectedStepBuyCourse,
      buyCourseStep,
    };
  },
};
</script>

<style lang="scss" scoped>
.dialog-container {
  max-width: 300px;
  width: 100%;
  min-width: 300px;
  margin: auto;
  border: 7px solid#F2C043;
  background-color: #f6f3d3;
  box-shadow: 0px 0px 0px 3px #4a261b;
  border-radius: 20px;
  color: #4a261b;
}

.box-selected-container {
  background-color: #efd080;
  border-radius: 5px;
}
</style>
