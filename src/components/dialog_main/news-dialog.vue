<template>
  <!-- #region Dialog New -->
  <q-dialog maximized v-model="isShowDialogNews" persistent class="z-max">
    <!-- #region Desktop -->
    <q-card class="transparent shadow-0 font-mali-m" v-if="isDesktop">
      <q-card-section class="fit row items-center">
        <div class="dialog-container relative-position">
          <q-img src="/images/dialog_main/dialog-news-pc.webp" no-spinner no-transition>
            <div class="absolute-top q-pa-md row transparent box-news-content text-black">
              <div class="relative-position col-12">
                <div class="col-12 box-news-scroll relative-position">
                  <q-tab-panels
                    swipeable
                    infinite
                    class="transparent no-padding"
                    v-model="selectedNewsIndex"
                    animated
                    v-touch-swipe.mouse="handleSwipe"
                  >
                    <q-tab-panel
                      class="no-padding"
                      :name="index"
                      v-for="(item, index) in newsStore.newsList"
                    >
                      <div align="center" class="relative-position">
                        <q-img
                          @click="funcSelectNews(item)"
                          class="cursor-pointer"
                          :src="item.poster"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </q-tab-panel>
                  </q-tab-panels>
                </div>

                <div
                  class="absolute-top-right"
                  style="width: 45px; top: -15px"
                  v-if="!newsData.isRead"
                >
                  <div class="relative-position animate__animated animate__bounceIn">
                    <q-img
                      height="20px"
                      src="/images/icon_main/icon-new-badge.webp"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>
              </div>
              <div
                class="col-12 row justify-center self-end relative-position items-center box-news-footer"
              >
                <div
                  class="q-pa-xs self-center q-mx-xs button-circle"
                  :class="selectedNewsIndex == index ? 'active' : ''"
                  @click="funcSelectedNewsButton(index)"
                  v-for="(item, index) in newsStore.newsList"
                ></div>
                <div
                  class="absolute-right font-mali-m flex f14 flex-center"
                  style="color: #4a261b"
                >
                  (v.{{ version }})
                </div>
              </div>
            </div>
          </q-img>

          <div
            v-if="selectedNewsIndex != 0"
            class="absolute-center row justify-center items-center button-arrow left"
            align="center"
          >
            <q-img
              @click="funcSelectArrow('left')"
              class="cursor-pointer"
              src="/images/icon_main/icon-news-arrow-left.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>
          <div
            v-if="selectedNewsIndex + 1 != newsStore.newsList.length"
            class="absolute-center row justify-center items-center button-arrow right"
            align="center"
          >
            <q-img
              @click="funcSelectArrow('right')"
              class="cursor-pointer"
              src="/images/icon_main/icon-news-arrow-right.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>

          <div
            @click="funcCloseDialog()"
            v-close-popup
            class="absolute-top-right"
            style="right: 15px; top: 15px"
          >
            <q-btn round flat>
              <q-img
                width="45px"
                src="/images/icon_main/icon-close.png"
                no-spinner
                no-transition
              ></q-img>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <q-card class="transparent shadow-0 font-mali-m" v-else>
      <q-card-section class="fit row justify-center items-center q-pa-sm">
        <div class="relative-position dialog-container-mobile">
          <q-img
            src="/images/dialog_main/dialog-news-mobile.webp"
            no-spinner
            no-transition
          >
            <div
              class="absolute-top box-news-content text-black no-padding transparent"
              mode-mobile="true"
            >
              <div class="relative-position">
                <div class="box-news-scroll relative-position" mode-mobile="true">
                  <q-tab-panels
                    infinite
                    class="transparent no-padding"
                    v-model="selectedNewsIndex"
                    animated
                    v-touch-swipe="handleSwipe"
                  >
                    <q-tab-panel
                      class="no-padding"
                      :name="index"
                      v-for="(item, index) in newsStore.newsList"
                    >
                      <div align="center" class="fit">
                        <q-img
                          fit="cover"
                          width="272px"
                          height="175px"
                          class="cursor-pointer"
                          :src="item.poster"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </q-tab-panel>
                  </q-tab-panels>
                </div>

                <div
                  class="absolute-top-right"
                  style="width: 45px; top: -10px; right: 10px"
                  v-if="!newsData.isRead"
                >
                  <div class="relative-position animate__animated animate__bounceIn">
                    <q-img
                      height="20px"
                      src="/images/icon_main/icon-new-badge.webp"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>

                <div
                  class="box-news-topic row justify-center items-center"
                  align="center"
                >
                  <span v-html="newsData.titleTh"></span>
                </div>

                <div class="box-button-read" @click="funcSelectNews(newsData)">
                  <q-img
                    src="/images/button_main/button-read-news.webp"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>

                <div
                  class="row justify-center self-end q-pa-sm relative-position box-news-footer"
                  mode-mobile="true"
                >
                  <div
                    class="self-center q-mx-xs button-circle"
                    mode-mobile="true"
                    :class="selectedNewsIndex == index ? 'active' : ''"
                    @click="funcSelectedNewsButton(index)"
                    v-for="(item, index) in newsStore.newsList"
                  ></div>
                  <div
                    class="absolute-right flex flex-center"
                    style="color: #4a261b; font-size: 11px"
                  >
                    (v.{{ version }})
                  </div>
                </div>
              </div>
            </div>
          </q-img>

          <!-- #region Arrow left -->
          <div
            v-if="selectedNewsIndex != 0"
            class="absolute-center row justify-center items-center button-arrow left mobile"
            align="center"
          >
            <q-img
              @click="funcSelectArrow('left')"
              class="cursor-pointer"
              src="/images/icon_main/icon-news-arrow-left.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>
          <!-- #endregion -->

          <!-- #region Arrow right -->
          <div
            v-if="selectedNewsIndex + 1 != newsStore.newsList.length"
            class="absolute-center row justify-center items-center button-arrow right mobile"
            align="center"
          >
            <q-img
              @click="funcSelectArrow('right')"
              class="cursor-pointer"
              src="/images/icon_main/icon-news-arrow-right.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>
          <!-- #endregion Arrow right -->

          <!-- #region Button close -->
          <div @click="funcCloseDialog()" v-close-popup class="absolute-top-right">
            <q-btn round flat>
              <q-img
                width="45px"
                src="/images/icon_main/icon-close.png"
                no-spinner
                no-transition
              >
              </q-img>
            </q-btn>
          </div>
          <!-- #endregion Button cloose -->
        </div>
      </q-card-section>
    </q-card>
    <!-- #endregion -->
  </q-dialog>
  <!-- #endregion -->

  <dialog-news-content
    v-if="isShowDialogNewsContent"
    :newsData="newsData"
    @callback-closeDialog="funcCloseDialogNewContent()"
  ></dialog-news-content>
</template>

<script setup>
import dialogNewsContent from "components/dialog_main/dialog-news-content.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useNewsStore } from "src/stores/news";
import { useQuasar } from "quasar";
import p_json from "/package.json";

const emit = defineEmits(["callback-closeDialog"]);

//  Initialize
const $q = useQuasar();
const isDesktop = $q.platform.is.desktop;
const newsStore = useNewsStore();
const version = p_json.version;

const isShowDialogNews = ref(true);
const isShowDialogNewsContent = ref(false);

const timer = ref(null);
const selectedNewsIndex = ref(0);
const funcDialogRuning = () => {
  funcClearTimer();

  // newsStore.funcReadNews(newsStore.newsList[selectedNewsIndex.value]);

  newsData.value = newsStore.newsList[selectedNewsIndex.value];

  timer.value = setInterval(() => {
    if (selectedNewsIndex.value + 1 == newsStore.newsList.length) {
      selectedNewsIndex.value = 0;
    } else {
      selectedNewsIndex.value++;
      // newsStore.funcReadNews(newsStore.newsList[selectedNewsIndex.value]);
    }

    newsData.value = newsStore.newsList[selectedNewsIndex.value];
  }, 5000);
};
let tempSetTimeOut;
const funcSelectedNewsButton = (index) => {
  funcClearTimer();

  tempSetTimeOut = setTimeout(() => {
    funcDialogRuning();
  }, 10000);

  selectedNewsIndex.value = index;

  newsData.value = newsStore.newsList[selectedNewsIndex.value];
};

const funcSelectArrow = (type) => {
  funcClearTimer();

  tempSetTimeOut = setTimeout(() => {
    funcDialogRuning();
  }, 10000);

  if (type == "left") {
    selectedNewsIndex.value--;
  } else {
    selectedNewsIndex.value++;
  }

  newsData.value = newsStore.newsList[selectedNewsIndex.value];
};

const newsData = ref(null);
const funcSelectNews = (item) => {
  newsStore.readNews(item);

  if (item) {
    newsData.value = item;
    newsData.value.isRead = true;
  } else {
    newsData.value = newsStore.newsList[selectedNewsIndex.value];
  }

  isShowDialogNewsContent.value = true;

  funcClearTimer();
};

const funcCloseDialogNewContent = () => {
  isShowDialogNewsContent.value = false;
  funcDialogRuning();
};

const handleSwipe = (e) => {
  funcClearTimer();

  if (e.direction == "left" || e.direction == "right") {
    if (!$q.platform.is.desktop) {
      if (e.direction == "left") {
        if (selectedNewsIndex.value == newsStore.newsList.length - 1) {
          selectedNewsIndex.value = 0;
        } else {
          selectedNewsIndex.value++;
        }
      } else {
        if (selectedNewsIndex.value == 0) {
          selectedNewsIndex.value++;
        } else {
          selectedNewsIndex.value--;
        }
      }
    }

    // newsStore.funcReadNews(newsStore.newsList[selectedNewsIndex.value]);

    newsData.value = newsStore.newsList[selectedNewsIndex.value];

    tempSetTimeOut = setTimeout(() => {
      funcDialogRuning();
    }, 10000);
  }
};

const funcCloseDialog = () => {
  funcClearTimer();

  isShowDialogNews.value = false;

  setTimeout(() => {
    emit("callback-closeDialog");
  }, 500);
};

const funcClearTimer = () => {
  if (tempSetTimeOut) clearTimeout(tempSetTimeOut);
  if (timer.value) clearInterval(timer.value);
};

onMounted(() => {
  funcDialogRuning();
});

onUnmounted(() => {
  funcClearTimer();
});
</script>

<style lang="scss" scoped>
.dialog-container {
  max-width: 770.95px;
  width: 100%;
  min-width: 600px;
  margin: auto;
}

.dialog-container-mobile {
  max-width: 320px;
  width: 100%;
  min-width: 340px;
  margin: auto;
  overflow-x: hidden;
}

.box-news-content {
  top: 21.8%;
  width: 91.318%;
  height: 76%;
  margin: auto;
}

.box-news-content[mode-mobile="true"] {
  top: 23%;
  width: 80%;
  height: 71%;
}

.button-circle {
  width: 12px;
  height: 12px;
  background-color: #d0d8ea;
  border-radius: 50%;
  cursor: pointer;
}

.button-circle[mode-mobile="true"] {
  width: 8px;
  height: 8px;
}

.button-circle:hover {
  background-color: #ffc839;
}

.button-circle.active {
  background-color: #ffc839;
}

.box-news-scroll {
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.box-news-scroll[mode-mobile="true"] {
  width: 100%;
  border-radius: 8px;
  margin: 16px auto 0px auto;
}

.box-news-topic {
  height: 48px;
  padding: 4px 16px;
  border-radius: 8px;
  background: #4a261b;
  color: #fff;
  margin: 8px 0px;
  font-size: 12px;
  line-height: 16px;
}

.box-button-read {
  width: 100%;
}

.box-news-footer {
  height: 10%;
}

.box-news-footer[mode-mobile="true"] {
  height: fit-content;
  margin-top: 14px;
}

.button-arrow {
  width: 64px;
  height: 64px;
  top: 54%;

  &.left {
    left: 3.4%;

    &.mobile {
      left: 5%;
    }
  }

  &.right {
    left: 96.6%;

    &.mobile {
      left: 95%;
    }
  }

  &.mobile {
    width: 48px !important;
    height: 48px !important;
    top: 49% !important;
  }
}
</style>
