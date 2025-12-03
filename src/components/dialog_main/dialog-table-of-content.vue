<template>
  <!-- #region Dialog Table of Contents -->
  <q-dialog
    maximized
    v-model="isShowDialogTableOfContents"
    persistent
    class="z-max"
    style="background-color: rgba(0, 0, 0, 0.75)"
  >
    <q-card class="transparent shadow-0">
      <q-card-section
        class="fit row justify-center items-center"
        :class="isZoomImage ? 'no-padding' : ''"
      >
        <div
          class="relative-position box-dialog-scroll row justify-center items-center"
          align="center"
          v-if="!isZoomImage"
        >
          <div class="col-12">
            <div
              class="q-px-md"
              align="center"
              v-for="(item, index) in listOfContents"
              :key="index"
            >
              <q-img
                class="q-my-md"
                style="max-width: 750px; width: 100%"
                :src="`https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/levelOfContent/${item}`"
                no-spinner
                no-transition
              >
                <div class="fit relative-position transparent">
                  <div class="absolute-bottom-right q-pa-xs">
                    <q-btn
                      flat
                      round
                      style="background-color: rgba(0, 0, 0, 0.7)"
                      size="10px"
                      @click="funcShowImage(item)"
                    >
                      <q-icon size="20px" name="fas fa-expand"></q-icon>
                    </q-btn>
                  </div>
                </div>
              </q-img>
            </div>
          </div>
        </div>

        <div class="fit relative-position" style="" v-else align="left">
          <div
            class="absolute-center"
            style="width: 80%; height: 80vh; overflow: auto"
            align="center"
          >
            <q-img
              class="q-my-md"
              :style="`width: ${90 + zoomSize}%; margin: auto`"
              :src="`https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/levelOfContent/${selectedImage}`"
              no-spinner
              no-transition
            >
            </q-img>
          </div>

          <div class="fixed-bottom q-pa-md row">
            <div class="col-1 self-center" align="center">
              <q-btn
                @click="funcZoomOut()"
                flat
                round
                style="background-color: #ffc42c"
                size="8px"
              >
                <q-icon size="14px" name="fas fa-minus"></q-icon>
              </q-btn>
            </div>
            <div class="col self-center q-px-md q-py-xs">
              <q-slider
                dense
                class=""
                color="white"
                v-model="zoomSize"
                :min="0"
                :max="100"
              />
            </div>
            <div class="col-1 self-center" align="center">
              <q-btn
                @click="funcZoomIn()"
                flat
                round
                style="background-color: #ffc42c"
                size="8px"
              >
                <q-icon size="14px" name="fas fa-plus"></q-icon>
              </q-btn>
            </div>
          </div>
        </div>

        <div class="fixed-top-left q-py-md q-px-md" v-if="isZoomImage">
          <q-btn flat round @click="isZoomImage = false">
            <q-img src="/images/icon_main/icon-back.png" no-spinner no-transition></q-img>
          </q-btn>
        </div>

        <div class="fixed-top-right q-py-md q-px-md" v-if="!isZoomImage">
          <q-btn flat round @click="$emit('callback-closeTableOfContent')">
            <q-img
              src="/images/icon_main/icon-close.png"
              no-spinner
              no-transition
            ></q-img>
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
export default {
  setup(props) {
    // #region Dialog Show Table of contents

    const $q = useQuasar();

    const isShowDialogTableOfContents = ref(true);
    const isZoomImage = ref(false);
    const selectedImage = ref();
    const zoomSize = ref(0);
    const listOfContents = ref([
      "level-of-content.jpg",
      "level-of-content-1.png",
      "level-of-content-2.png",
      "level-of-content-3.png",
      "level-of-content-4.png",
      "level-of-content-5.png",
      "level-of-content-6.png",
      "level-of-content-7.png",
      "level-of-content-8.png",
      "level-of-content-9.png",
      "level-of-content-10.png",
      "level-of-content-11.png",
      "level-of-content-12.png",
    ]);

    const funcShowImage = (index) => {
      selectedImage.value = index;
      isZoomImage.value = true;

      if ($q.platform.is.mobile) {
        zoomSize.value = 50;
      } else {
        zoomSize.value = 0;
      }
    };

    const funcZoomIn = () => {
      if (zoomSize.value >= 100) {
        return;
      }
      zoomSize.value += 10;

      if (zoomSize.value >= 100) {
        zoomSize.value = 100;
      }
    };

    const funcZoomOut = () => {
      if (zoomSize.value <= 0) {
        zoomSize.value = 0;
        return;
      }
      zoomSize.value -= 10;

      if (zoomSize.value <= 0) {
        zoomSize.value = 0;
      }
    };
    // #endregion

    return {
      zoomSize,
      isShowDialogTableOfContents,
      isZoomImage,
      selectedImage,
      listOfContents,

      // Function
      funcShowImage,
      funcZoomIn,
      funcZoomOut,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-dialog-scroll {
  width: 95%;
  height: 85%;
  overflow: auto;
  margin-top: 70px;
}

.box-dialog-scroll::-webkit-scrollbar {
  width: 10px;
}

.box-dialog-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.box-dialog-scroll::-webkit-scrollbar-thumb {
  background: #f1f1f1;
  border-radius: 4px;
}
</style>
