<template>
  <div
    class="relative-position button-active-main"
    :class="synchronizeStore.isSync ? 'disable' : ''"
  >
    <div class="relative-position">
      <q-img
        :src="`/images/button_main/button-icon-alfie.webp`"
        no-spinner=""
        no-transition=""
      >
        <div class="fit no-padding transparent" style="overflow: hidden"></div>
      </q-img>
    </div>

    <div
      class="absolute-bottom-right box-icon-arrow right"
      :class="$q.platform.is.mobile ? 'mobile' : ''"
    >
      <div class="animation-name-left" :class="synchronizeStore.isSync ? 'disable' : ''">
        <q-img
          :src="`/images/icon_main/icon-arrow-winny${
            synchronizeStore.isSync ? '-disable' : ''
          }.webp`"
          no-spinner
          no-transition
        ></q-img>
      </div>
    </div>

    <div
      class="absolute-bottom font-mali-b text-name-winny"
      align="center"
      :class="{
        disable: synchronizeStore.isSync,
        mobile: $q.platform.is.mobile,
      }"
    >
      Alfie
    </div>

    <div
      class="absolute-bottom-left box-icon-arrow left"
      :class="$q.platform.is.mobile ? 'mobile' : ''"
    >
      <div class="animation-name-right" :class="synchronizeStore.isSync ? 'disable' : ''">
        <q-img
          style="transform: rotateY(180deg)"
          :src="`/images/icon_main/icon-arrow-winny${
            synchronizeStore.isSync ? '-disable' : ''
          }.webp`"
          no-spinner
          no-transition
        ></q-img>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useSynchronizeStore } from "src/stores/synchronize";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const synchronizeStore = useSynchronizeStore();

const $q = useQuasar();
const $router = useRouter();

const funcReloadScript = (src, type) => {
  let date = new Date();
  let randomStringId = Math.random().toString(36).slice(-8);
  let elWaifu = document.getElementById("waifu");

  let newScript = document.createElement("script");
  newScript.type = type;
  newScript.src = `${src}?${date.getTime()}`;
  newScript.async = true;

  elWaifu.appendChild(newScript);
  elWaifu.removeChild(newScript);
};

onMounted(() => {
  // sessionStorage.setItem("modelName", "winny");
  // localStorage.setItem("modelName", "winny");
  // funcReloadScript(`/live2d_bundle.js`, "text/javascript");
  // setTimeout(() => {
  //   funcReloadScript(`/waifu-tips.js`, "module");
  // }, 100);

  // let elCanvas = document.getElementById("live2d4");

  // elCanvas.style.width = "470%";
  // elCanvas.width = "1350";
  // elCanvas.height = "680";
});

const funcOpenChat = () => {
  // $router.push("/homework");
};
</script>

<style lang="scss" scoped>
.box-character-container {
  width: 91%;
  height: 91%;
  border: clamp(1.875px, 0.1875vw, 3px) solid transparent;
  // border: clamp(2.5px, 0.25vw, 4px) solid #083880;
  border-radius: 50%;
  overflow: hidden;
}

.box-character-mobile {
  width: 85px;
  height: 85px;
  border: 3px solid #083880;
  border-radius: 50%;
  overflow: hidden;
}

.text-name-winny {
  bottom: 7%;
  color: #fff;
  text-shadow: rgb(8, 56, 128) 3px 0px 0px, rgb(8, 56, 128) 2.83487px 0.981584px 0px,
    rgb(8, 56, 128) 2.35766px 1.85511px 0px, rgb(8, 56, 128) 1.62091px 2.52441px 0px,
    rgb(8, 56, 128) 0.705713px 2.91581px 0px, rgb(8, 56, 128) -0.287171px 2.98622px 0px,
    rgb(8, 56, 128) -1.24844px 2.72789px 0px, rgb(8, 56, 128) -2.07227px 2.16926px 0px,
    rgb(8, 56, 128) -2.66798px 1.37182px 0px, rgb(8, 56, 128) -2.96998px 0.42336px 0px,
    rgb(8, 56, 128) -2.94502px -0.571704px 0px, rgb(8, 56, 128) -2.59586px -1.50383px 0px,
    rgb(8, 56, 128) -1.96093px -2.27041px 0px, rgb(8, 56, 128) -1.11013px -2.78704px 0px,
    rgb(8, 56, 128) -0.137119px -2.99686px 0px, rgb(8, 56, 128) 0.850987px -2.87677px 0px,
    rgb(8, 56, 128) 1.74541px -2.43999px 0px, rgb(8, 56, 128) 2.44769px -1.73459px 0px,
    rgb(8, 56, 128) 2.88051px -0.838247px 0px;
  font-size: clamp(12.5px, 1.25vw, 20px);
  line-height: 0;

  &.disable {
    text-shadow: rgb(74, 74, 74) 3px 0px 0px, rgb(74, 74, 74) 2.83487px 0.981584px 0px,
      rgb(74, 74, 74) 2.35766px 1.85511px 0px, rgb(74, 74, 74) 1.62091px 2.52441px 0px,
      rgb(74, 74, 74) 0.705713px 2.91581px 0px, rgb(74, 74, 74) -0.287171px 2.98622px 0px,
      rgb(74, 74, 74) -1.24844px 2.72789px 0px, rgb(74, 74, 74) -2.07227px 2.16926px 0px,
      rgb(74, 74, 74) -2.66798px 1.37182px 0px, rgb(74, 74, 74) -2.96998px 0.42336px 0px,
      rgb(74, 74, 74) -2.94502px -0.571704px 0px,
      rgb(74, 74, 74) -2.59586px -1.50383px 0px, rgb(74, 74, 74) -1.96093px -2.27041px 0px,
      rgb(74, 74, 74) -1.11013px -2.78704px 0px,
      rgb(74, 74, 74) -0.137119px -2.99686px 0px,
      rgb(74, 74, 74) 0.850987px -2.87677px 0px, rgb(74, 74, 74) 1.74541px -2.43999px 0px,
      rgb(74, 74, 74) 2.44769px -1.73459px 0px, rgb(74, 74, 74) 2.88051px -0.838247px 0px;
  }

  &.mobile {
    font-size: 12px;
  }
}

.box-icon-arrow {
  width: 15%;
  bottom: -3%;

  &.mobile {
    width: 10px;
    bottom: -7px;
  }

  &.right {
    right: -3%;

    &.mobile {
      right: -7px;
    }
  }

  &.left {
    left: -3%;

    &.mobile {
      left: -7px;
    }
  }
}

.button-active-main {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  cursor: pointer;

  &.disable {
    cursor: default !important;
  }

  &:not(.disable):active {
    transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -moz-transform: scale(0.95);
  }
}

.animation-name-left {
  animation: nameLeft 0.5s forwards alternate-reverse infinite;
  -webkit-animation: nameLeft 0.5s forwards alternate-reverse infinite;
  -moz-animation: nameLeft 0.5s forwards alternate-reverse infinite;

  transform: translateX(-5px);
  -webkit-transform: translateX(-5px);
  -moz-transform: translateX(-5px);

  &.disable {
    animation-play-state: paused;
  }

  @keyframes nameLeft {
    to {
      transform: translateX(0px);
      -webkit-transform: translateX(0px);
      -moz-transform: translateX(0px);
    }
  }
}

.animation-name-right {
  animation: nameRight 0.5s forwards alternate-reverse infinite;
  -webkit-animation: nameRight 0.5s forwards alternate-reverse infinite;
  -moz-animation: nameRight 0.5s forwards alternate-reverse infinite;

  transform: translateX(5px);
  -webkit-transform: translateX(5px);
  -moz-transform: translateX(5px);

  &.disable {
    animation-play-state: paused;
  }

  @keyframes nameRight {
    to {
      transform: translateX(0px);
      -webkit-transform: translateX(0px);
      -moz-transform: translateX(0px);
    }
  }
}
</style>
