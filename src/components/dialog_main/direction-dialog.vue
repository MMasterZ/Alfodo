<template>
  <q-dialog maximized v-model="isDialogDirection" persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center">
        <div class="col self-center" style="max-width: 650px; min-width: 320px">
          <q-img src="/images/dialog_main/dialog-direction.png">
            <div class="relative-position fit no-padding transparent">
              <div
                class="row justify-center"
                style="height: calc(100% - 80%)"
                align="center"
              >
                <span class="self-center text-header font-mali-b"> Direction </span>
              </div>
              <div
                class="row no-padding"
                style="width: 85%; height: calc(100% - 50%); margin: auto; bottom: 25px"
              >
                <div
                  class="col-12 self-start"
                  style="height: 100%; overflow: auto"
                  :class="isDesktop ? 'q-pa-lg' : 'q-pa-sm'"
                >
                  <div>
                    <div class="f20 text-direction">
                      {{ practiceStore.direction.eng }}
                    </div>
                    <div class="f20 text-direction q-mt-md">
                      {{ practiceStore.direction.th }}
                    </div>
                  </div>
                </div>
                <div class="col-12 self-end q-pa-sm" style="height: 50px" align="center">
                  <q-img
                    v-close-popup
                    class="cursor-pointer"
                    @click="
                      $emit('callback-closeDialog'), practiceData.func.startPractice()
                    "
                    style="max-width: 150px; min-width: 100px; width: 30%"
                    src="/images/button_main/button-start.png"
                  ></q-img>
                </div>
              </div>
            </div>
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { usePracticeStore } from "src/stores/practice";
import { useQuasar } from "quasar";
import { ref } from "vue";
export default {
  props: {
    isDialogDirection: {
      type: Boolean,
      default: true,
    },
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const $q = useQuasar();
    const isDesktop = ref($q.platform.is.desktop);
    const practiceStore = usePracticeStore();

    return { practiceStore, isDesktop };
  },
};
</script>

<style lang="scss" scoped>
.text-header {
  font-size: clamp(16px, 5vw, 26px);
  color: #764323;
  text-shadow: rgb(255, 255, 255) 1px 0px 0px,
    rgb(255, 255, 255) 0.540302px 0.841471px 0px,
    rgb(255, 255, 255) -0.416147px 0.909297px 0px,
    rgb(255, 255, 255) -0.989992px 0.14112px 0px,
    rgb(255, 255, 255) -0.653644px -0.756802px 0px,
    rgb(255, 255, 255) 0.283662px -0.958924px 0px,
    rgb(255, 255, 255) 0.96017px -0.279415px 0px;
}

::-webkit-scrollbar {
  width: 10px;
}

.text-direction {
  font-size: clamp(14px, 3vw, 22px);
}
</style>
