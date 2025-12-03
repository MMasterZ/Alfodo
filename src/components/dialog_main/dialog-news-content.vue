<template>
  <div class="absolute-center fit box-backdrop-main row justify-center items-center z-max">
    <div
      class="box-dialog-main relative-position"
      :class="$q.platform.is.desktop ? '' : 'mobile'"
      data-cy="box-news-content"
    >
      <div class="box-dialog-sub" :class="$q.platform.is.desktop ? '' : 'mobile'">
        <div
          class="box-dialog-scroll"
          id="dialog-scroll"
          :style="isHasScroll ? 'padding-right:clamp(3.75px,0.375cqw,6px);' : ''"
          :class="$q.platform.is.desktop ? '' : 'mobile'"
        >
          <div class="box-dialog-image">
            <q-img :src="newsData.poster" no-spinner no-transition></q-img>
          </div>
          <div class="box-dialog-topic" :class="$q.platform.is.desktop ? '' : 'mobile'" align="center">
            <div class="font-mali-b">
              <span v-html="newsData.titleTh"></span>
            </div>
          </div>
          <!-- <div align="right" class="font-mali-m f12" style="margin: 0px 4px">
            {{ newsData.date.date }}
          </div> -->

          <!-- <div class="box-line-separator"></div> -->

          <div class="box-dialog-content" :class="$q.platform.is.desktop ? '' : 'mobile'">
            <span v-html="newsData.detailTh"></span>
          </div>
        </div>
      </div>

      <div class="absolute-top-right button-main close" :class="$q.platform.is.desktop ? '' : 'mobile'"  @click="funcCloseDialog()">
        <q-img
          src="/images/icon_main/icon-close.png"
          no-spinner
          no-transition
          class="button-main"
          data-cy="button-close-dialog"
        ></q-img>
      </div>
    </div>
  </div>

  <q-dialog v-model="isShowDialogNewsContent" maximized persistent class="z-max" v-if="false">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div
          class="box-dialog-main relative-position"
          :class="$q.platform.is.desktop ? '' : 'mobile'"
          data-cy="box-news-content"
        >
          <div class="box-dialog-sub">
            <div
              class="box-dialog-scroll"
              id="dialog-scroll"
              :style="isHasScroll ? 'padding-right:6px;' : ''"
            >
              <div class="box-dialog-image">
                <q-img :src="newsData.poster" no-spinner no-transition></q-img>
              </div>
              <div class="box-dialog-topic" align="center">
                <div class="font-mali-b" :class="$q.platform.is.desktop ? 'f14' : 'f12'">
                  <span v-html="newsData.titleTh"></span>
                </div>
              </div>
              <!-- <div align="right" class="font-mali-m f12" style="margin: 0px 4px">
                {{ newsData.date.date }}
              </div> -->

              <!-- <div class="box-line-separator"></div> -->

              <div class="box-dialog-content" style="font-size:clamp(7.5px,0.75cqw,12px);">
                <span v-html="newsData.detailTh"></span>
              </div>
            </div>
          </div>

          <div class="absolute-top-right button-main close" @click="funcCloseDialog()">
            <q-img
              src="/images/icon_main/icon-close.png"
              no-spinner
              no-transition
              class="button-main"
              data-cy="button-close-dialog"
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useNewsStore } from "src/stores/news";
import { onMounted, ref } from "vue";

const props = defineProps({
  newsData: {
    type: Object,
    default: () => {},
  },
});

const emits = defineEmits(["callback-closeDialog"]);

const isShowDialogNewsContent = ref(true);

const isHasScroll = ref(false);
const funcHasScroll = () => {
  setTimeout(() => {
    let element = document.getElementById("dialog-scroll");

    if (element) {
      if (element.scrollHeight > element.clientHeight) {
        isHasScroll.value = true;
      } else {
        isHasScroll.value = false;
      }
    }
  }, 500);
};

const funcCloseDialog = () => {
  isShowDialogNewsContent.value = false;

  setTimeout(() => {
    emits("callback-closeDialog");
  }, 500);
};

onMounted(() => {
  funcHasScroll();
});
</script>

<style lang="scss" scoped>
// #region Box
.box-backdrop-main{
  background-color:rgba(0,0,0,.5);
}

.box-dialog-main {
  width: clamp(300.625px,30.0625cqw,480px);
  height: clamp(400px,40cqw,640px);
  padding: clamp(5px,0.5cqw,8px);
  border-radius: clamp(10px,1cqw,16px);
  border: clamp(1.25px,0.125cqw,2px) solid #135061;
  background: #49a4bd;
  box-sizing: border-box;
  color: #4a261b;

  &.mobile {
    width: 320px;
    height: 520px;
    padding:8px;
    border-radius: 16px;
    border-width: 2px;
  }
}

.box-dialog-sub {
  width: 100%;
  height: 100%;
  padding: clamp(5px,0.5cqw,8px);
  border-radius: clamp(5px,0.5cqw,8px);
  background: #f3f5fe;

  &.mobile{
    padding: 8px;
    border-radius: 8px;
  }
}

.box-dialog-scroll {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-right: 0px;
}

.box-dialog-content{
  font-size:clamp(7.5px,0.75cqw,12px);


  &.mobile{
    font-size:12px;
  }
}

.box-dialog-scroll::-webkit-scrollbar {
  width: clamp(3.75px,0.375cqw,6px);
}

.box-dialog-scroll::-webkit-scrollbar-thumb {
  background: #4a261b;
  border-radius: 99px;
}

.box-dialog-scroll::-webkit-scrollbar-track {
  background: #f3f5fe;
}

.box-dialog-image {
  width: 100%;
  border-radius: clamp(5px,0.5cqw,8px);

  &.mobile{
    border-radius: 8px;
  }
}

.box-dialog-topic {
  width: 100%;
  padding: clamp(5px,0.5cqw,8px);
  border-radius: clamp(5px,0.5cqw,8px);
  background: #4a261b;
  color: #fff;
  line-height: clamp(12.5px,1.25cqw,20px);
  margin: clamp(5px,0.5cqw,8px) 0px clamp(3.75px,0.375cqw,6px) 0px;
  font-size:clamp(8.75px,0.875cqw,14px);

  &.mobile{
    font-size:12px;
    padding:8px;
    border-radius: 8px;
    line-height:20px;
    margin:8px 0px 6px 0px;
  }
}

.box-line-separator {
  width: 100%;
  height: 1px;
  background: #4a261b;
  margin: clamp(5px,0.5cqw,8px) 0px;

  &.mobile{
    margin:8px 0px;
  }
}

// #endregion Box

// #region Button

.button-main {
  cursor: pointer;
  border: 0px solid transparent;

  &:active {
    transform: scale(0.95);
    transition: transform 0.1s;
  }
}

.button-main.close {
  width:clamp(28.75px,2.875cqw,46px);
  top: clamp(-16px,-1cqw,-10px);
  right: clamp(-16px,-1cqw,-10px);

  &.mobile{
    width:46px;
    top:-10px;
    right:-10px;
  }
}
</style>
