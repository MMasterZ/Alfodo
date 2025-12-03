<template>
  <div
    class="window-height row justify-center items-center relative-position"
    style="background-color: rgba(0, 0, 0, 0.5); overflow: hidden"
  >
    <!-- #region Banner Crad -->
    <div class="brx relative-position" style="width: 100%; height: 400px">
      <div class="absolute-center" style="width: 80%; height: 90%">
        <div
          class="relative-position brx fit animation-hide-slide-left row justify-center items-center"
        >
          {{ currentPage - 1 == 0 ? 5 : currentPage - 1 }}
        </div>
      </div>

      <div class="absolute-center" style="width: 80%; height: 90%" v-for="i in 5">
        <div
          class="relative-position fit brx row justify-center items-center"
          :class="
            currentPage == i ? 'animation-show-slide-right' : 'animation-hide-slide-right'
          "
        >
          {{ i }}
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- <div class="row">
      <div class="q-px-sm self-center">
        <q-btn round @click="funcStartRecorder()" v-if="!isStartRecorder">
          <q-icon name="fas fa-microphone" size="20px"></q-icon>
        </q-btn>
        <q-btn round @click="funcStopRecorder()" v-if="isStartRecorder">
          <q-icon name="fas fa-stop" size="18px"></q-icon>
        </q-btn>
      </div>
      <div class="q-px-sm self-center">
        <audio controls v-if="audioTemp" id="myAudio" style="display: none">
          <source :src="audioTemp" type="audio/mp3" />
        </audio>
        <q-btn round @click="isPlayAudio ? null : playAudioTemp()">
          <q-icon
            :name="!isPlayAudio ? 'fas fa-play' : 'fas fa-pause'"
            size="18px"
          ></q-icon>
        </q-btn>
      </div>

      <div class="self-center q-px-sm">
        <q-btn label="speechToText" @click="speechToText()"></q-btn>
      </div>
    </div>

    <div class="col-12" align="center">
      <span v-if="!isStartRecorder">ยังไม่มีการอัดเสียง</span>
      <span v-else>กำลังอัดเสียง</span>
    </div>

    <div class="col-12" align="center">
      <div v-for="(item, index) in recordings">
        <audio controls>
          <source :src="item.blobUrl" />
        </audio>
      </div>
    </div>

    <q-btn label="tyest" @click="$router.replace('/test')"></q-btn> -->
    <!--
    <div class="col-12 q-pa-md brx">
      <div class="brx" align="center" style="width: 1000px; margin: auto">
        <video
          autoplay
          id="videoCapture"
          class="brx"
          style="width: 800px"
        ></video>
      </div>
    </div>

    <div class="row" align="center">
      <div class="row" align="center">
        <q-btn id="startCapture" label="Start Capture"></q-btn>
        <q-btn id="stopCapture" label="Stop Capture"></q-btn>
      </div>
    </div>

    <div class="col-12 row justify-center brx">
      <iframe
        src="https://localhost:8080/#/test/microphone"
        width="600"
        height="350"
        allow="display-capture"
      ></iframe>
    </div>

    <div class="col-12 brx"></div> -->
    <!-- test service worker -->

    <!-- <div class="col-3">
      <div>
        <div id="image-sprite" class="image-sprite"></div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useCounter from "../composables/useCounter";
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = SpeechRecognition ? new SpeechRecognition() : false;

const currentPage = ref(1);

const audioTemp = ref("");

const { count, increment } = useCounter();

const temp = ref("");

const isPlayAudio = ref(false);
const playAudioTemp = () => {
  isPlayAudio.value = true;

  let el = document.getElementById("myAudio");

  el.play();

  el.onended = () => {
    isPlayAudio.value = false;
  };
};

const speechToText = () => {
  if (!recognition) {
    console.log(
      "Speech Recognition is not available on this browser. Please use Chrome or Firefox"
    );
    alert("not supported");
  } else {
    alert("supported");
  }
};

const animation = ref(null);

const funcReady = () => {
  console.log(animation.value);
  animation.value.play();
};

const isStartRecorder = ref(false);
const funcStartRecorder = (e) => {
  try {
    isFilesAudio.value = false;
    isStartRecorder.value = true;

    alert(mediaRecorder);
    mediaRecorder.start();

    console.log(mediaRecorder.state);

    console.log("Start Recorder");
  } catch (e) {
    console.log(e);
    alert(e);
  }
};

const funcStopRecorder = () => {
  isStartRecorder.value = false;
  mediaRecorder.stop();
};

let mediaRecorder;

let audioChunks = [];
const isFilesAudio = ref(false);
const funcMediaDevices = async () => {
  try {
    if (!navigator || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Missing support for navigator.mediaDevices.getUserMedia"); // temp: helps when testing for strange issues on ios/safari
      return;
    } else {
      // alert("xxxx");
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.addEventListener("dataavailable", (event) => {
      console.log(event);
      audioChunks.push(event.data);
    });

    mediaRecorder.onstop = (e) => {
      const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
      const audioUrl = URL.createObjectURL(audioBlob);
      audioTemp.value = audioUrl;

      isFilesAudio.value = true;

      console.log("End Recorder");
    };

    // mediaRecorder.addEventListener("stop", () => {

    // });
  } catch (e) {
    alert(e);
  }
};

let enableEchoCancellation = true;
let supportedMimeTypes = [];
let recordings = ref([]);
let cleanupWhenFinished = true;
let addDynamicsCompressor = false;

const startRecording = () => {
  recorderSrvc.value.config.stopTracksAndCloseCtxWhenFinished = cleanupWhenFinished;

  recorderSrvc.value.config.createDynamicsCompressorNode = addDynamicsCompressor;

  recorderSrvc.value.config.enableEchoCancellation = enableEchoCancellation;

  recorderSrvc.value
    .startRecording()
    .then(() => {
      isStartRecorder.value = true;
    })
    .catch((error) => {
      console.error("Exception while start recording: " + error);
      alert("Exception while start recording: " + error.message);
    });
};

const stopRecording = () => {
  recorderSrvc.value.stopRecording();
  isStartRecorder.value = false;
};

const onNewRecording = (evt) => {
  recordings.value.push(evt.detail.recording);
};

const recorderSrvc = ref("");

const dumpOptionsInfo = () => {
  const videoTrack = videoElem.value.srcObject.getVideoTracks()[0];

  console.log(videoTrack);

  console.info("Track settings:");
  console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
  console.info("Track constraints:");
  console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
};

const videoElem = ref("");
const logElem = ref("");
const startCapture = async () => {
  logElem.innerHTML = "";

  var displayMediaOptions = {
    video: {
      cursor: "always",
    },
    audio: true,
  };

  try {
    videoElem.value.srcObject = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );

    let temp = videoElem.value.srcObject.getVideoTracks()[0];

    // temp = window.createObjectURL(temp);

    console.log(window);

    dumpOptionsInfo();
  } catch (err) {
    console.error("Error: " + err);
  }
};

const stopCapture = () => {
  let tracks = videoElem.value.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  videoElem.srcObject = null;
};

onMounted(async () => {
  increment();
  console.log(count.value);

  // Not showing vendor prefixes.
  // var constraints = { audio: true, video: { width: 1280, height: 720 } };
  // videoElem.value = document.getElementById("videoCapture");
  // logElem.value = document.getElementById("log");
  // let startEl = document.getElementById("startCapture");
  // let stopEl = document.getElementById("stopCapture");
  // // try {
  // try {
  //   startEl.addEventListener("click", () => {
  //     startCapture();
  //   });
  //   stopEl.addEventListener("click", () => {
  //     stopCapture();
  //   });
  //         startElem.addEventListener("click", function(evt) {
  //   startCapture();
  // }, false);
  // stopElem.addEventListener("click", function(evt) {
  //   stopCapture();
  // }, false);
  // mediaRecorder = new MediaRecorder(stream);
  // } catch (err) {
  //   console.log(err);
  // }
  // var video = document.querySelector("videoCapture");
  // asdfds;
  // video.srcObject = mediaStream;
  // video.onloadedmetadata = function (e) {};
  // video.play();
  // } catch (err) {
  //   console.log(err.name + ": " + err.message);
  // }
  // funcMediaDevices();
  // animationSprite();
});

const animationSprite = () => {
  let el = document.getElementById("image-sprite");

  let currentPosition = 0;
  setInterval(() => {
    el.style.backgroundPosition = `-${currentPosition}px 0px`;

    if (currentPosition >= 1200) {
      currentPosition = 0;
    } else {
      currentPosition += 151;
    }
  }, 300);
};

// return {
//   funcStartRecorder,
//   playAudioTemp,
//   audioTemp,
//   speechToText,
//   funcStopRecorder,

//   // New Recording
//   startRecording,
//   startCapture,
//   stopRecording,
//   stopCapture,
//   recordings,

//   isStartRecorder,
//   animation,
//   isFilesAudio,
//   isPlayAudio,

//   funcReady,
// };
</script>

<style lang="scss" scoped>
.image-sprite {
  height: 121px;
  width: 151px;
  background: url("/sprite/hand-swipe.png");
  background-repeat: no-repeat;
}

.animation-hide-slide-left {
  animation: slideHideleft 0.5s ease-in-out forwards;
  -webkit-animation: slideHideleft 0.5s ease-in-out forwards;
  -moz-animation: slideHideleft 0.5s ease-in-out forwards;

  transform: translate(0%, 0%) scale(1);
  -webkit-transform: translate(0%, 0%) scale(1);
  -moz-transform: translate(0%, 0%) scale(1);
}

@keyframes slideHideleft {
  0% {
    transform: translate(0%, 0%) scale(1);
    -webkit-transform: translate(0%, 0%) scale(1);
    -moz-transform: translate(0%, 0%) scale(1);
  }
  to {
    transform: translate(-100%, 0%) scale(0.95);
    -webkit-transform: translate(-100%, 0%) scale(0.95);
    -moz-transform: translate(-100%, 0%) scale(0.95);
  }
}

.animation-show-slide-left {
  animation: slideShowLeft 0.5s ease-in-out forwards;
  -webkit-animation: slideShowLeft 0.5s ease-in-out forwards;
  -moz-animation: slideShowLeft 0.5s ease-in-out forwards;

  transform: translate(-100%, 0%) scale(0.95);
  -webkit-transform: translate(-100%, 0%) scale(0.95);
  -moz-transform: translate(-100%, 0%) scale(0.95);
}

@keyframes slideShowLeft {
  0% {
    transform: translate(-100%, 0%) scale(0.95);
    -webkit-transform: translate(-100%, 0%) scale(0.95);
    -moz-transform: translate(-100%, 0%) scale(0.95);

    opacity: 0;
  }
  to {
    transform: translate(0%, 0%) scale(1);
    -webkit-transform: translate(0%, 0%) scale(1);
    -moz-transform: translate(0%, 0%) scale(1);

    opacity: 1;
  }
}

.animation-show-slide-right {
  animation: slideShowRight 0.5s ease-in-out forwards;
  -webkit-animation: slideShowRight 0.5s ease-in-out forwards;
  -moz-animation: slideShowRight 0.5s ease-in-out forwards;

  transform: translate(100%, 0%) scale(0.95);
  -webkit-transform: translate(100%, 0%) scale(0.95);
  -moz-transform: translate(100%, 0%) scale(0.95);

  opacity: 0;
}

@keyframes slideShowRight {
  0% {
    transform: translate(100%, 0%) scale(0.95);
    -webkit-transform: translate(100%, 0%) scale(0.95);
    -moz-transform: translate(100%, 0%) scale(0.95);

    opacity: 0;
  }
  to {
    transform: translate(0%, 0%) scale(1);
    -webkit-transform: translate(0%, 0%) scale(1);
    -moz-transform: translate(0%, 0%) scale(1);

    opacity: 1;
  }
}

.animation-hide-slide-right {
  animation: slideHideRight 0.5s ease-in-out forwards;
  -webkit-animation: slideHideRight 0.5s ease-in-out forwards;
  -moz-animation: slideHideRight 0.5s ease-in-out forwards;

  transform: translate(0%, 0%) scale(1);
  -webkit-transform: translate(0%, 0%) scale(1);
  -moz-transform: translate(0%, 0%) scale(1);
}

@keyframes slideHideRight {
  0% {
    transform: translate(0%, 0%) scale(1);
    -webkit-transform: translate(0%, 0%) scale(1);
    -moz-transform: translate(0%, 0%) scale(1);
  }

  to {
    transform: translate(100%, 0%) scale(0.95);
    -webkit-transform: translate(100%, 0%) scale(0.95);
    -moz-transform: translate(100%, 0%) scale(0.95);
  }
}
</style>
