<template>
  <div class="relative-position" id="canvas-container">
    <div id="waifu" class="row justify-center items-end fit">
      <canvas
        :style="
          $q.platform.is.desktop ? 'margin-bottom: 2.5%' : 'margin-bottom: 10%'
        "
        :class="$q.platform.is.desktop ? '' : 'absolute-bottom'"
        id="live2d4"
      ></canvas>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useSystemStore } from "src/stores/system";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

// Initial Data
const $q = useQuasar();
const pathStorage = ref(
  "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/character-models/"
);

const props = defineProps({
  selectedType: {
    type: String,
    default: "",
  },
  isProcessing: {
    type: Boolean,
    default: false,
  },
  isTalking: {
    type: Boolean,
    default: false,
  },
  isErrorResponse: {
    type: Boolean,
    default: false,
  },
});

watch(props, () => {
  if (!props.isProcessing && !props.isTalking && !props.isErrorResponse) {
    funcSetModelNameStorage("winny");
  }

  if (props.isErrorResponse) {
    funcSetModelNameStorage("winnyFail");
  } else if (props.isTalking) {
    funcSetModelNameStorage("winnyTalking");
  } else {
    if (props.isProcessing) {
      funcSetModelNameStorage("winnyThink");
    }
  }

  funcReloadScript(`/waifu-tips.js`, "module");
});

const systemStore = useSystemStore();

const funcReloadScript = (src, type) => {
  let date = new Date();
  let randomStringId = Math.random().toString(36).slice(-8);
  let elWaifu = document.getElementById("waifu");

  let newScript = document.createElement("script");
  newScript.type = type;
  newScript.src = `${src}?${date.getTime()}`;
  // newScript.id = `script-${randomStringId}`;
  newScript.async = true;

  elWaifu.appendChild(newScript);
  elWaifu.removeChild(newScript);
};

const funcLoadScript = async () => {
  sessionStorage.setItem("modelName", "winny");
  localStorage.setItem("modelName", "winny");
  funcReloadScript(`/live2d_bundle.js`, "text/javascript");
  setTimeout(() => {
    funcReloadScript(`/waifu-tips.js`, "module");
  }, 100);
};

const funcSetModelNameStorage = (name) => {
  const systemStore = useSystemStore();
  sessionStorage.setItem("modelName", name);
  localStorage.setItem("modelName", name);

  systemStore.systemData.isChangeAIModel = true;
};

onMounted(() => {
  sessionStorage.setItem("modelName", "winny");
  localStorage.setItem("modelName", "winny");

  let waifuDisplay = sessionStorage.getItem("waifu-display");

  funcLoadScript();

  let elCanvas = document.getElementById("live2d4");

  if ($q.platform.is.mobile) {
    elCanvas.style.width = "100%";
    elCanvas.style.maxWidth = "1350px";
    elCanvas.style.minWidth = "1100px";

    elCanvas.width = "1350";
    elCanvas.height = "680";
  } else {
    elCanvas.style.width = "84.375%";
    elCanvas.style.maxWidth = "1350px";

    elCanvas.width = "1350";
    elCanvas.height = "680";
  }

  if (waifuDisplay == "true") {
  } else {
    // sessionStorage.setItem("waifu-display", "true");
    // window.location.reload();
  }
});

onBeforeUnmount(() => {
  const systemStore = useSystemStore();
  systemStore.systemData.isChangeAIModel = false;
  sessionStorage.setItem("modelName", "winny");
  localStorage.setItem("modelName", "winny");
  sessionStorage.setItem("waifu-display", "false");
});
</script>

<style lang="scss" scoped>
</style>
