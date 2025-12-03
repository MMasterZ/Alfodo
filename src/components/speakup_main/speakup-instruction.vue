<template>
  <div align="center">
    <div
      class="absolute-center box-dialog-container animate__animated animate__fadeIn"
    >
      <div class="relative-position fit">
        <div class="box-dialog-sub relative-position row">
          <div class="col-12 self-start sub-header"></div>
          <div class="col-12 self-center sub-body">
            <div
              class="text-title font-prompt-b relative-position"
              :data-text="`ลองพูดกันก่อน`"
            >
              {{ `ลองพูดกันก่อน` }}
            </div>
            <div
              align="center"
              class="q-mt-sm font-prompt-sb f16"
              style="color: #4b1e0a; line-height: 2"
            >
              <div class="q-py-xs" v-html="instruction"></div>
            </div>
          </div>
          <div
            class="col-12 self-end sub-footer row justify-center items-center"
          >
            <div class="col-1 box-button">
              <q-img
                class="button-instruction-main active"
                :src="`/images/speakup_main/speakup-button-ok.png`"
                @click="funcOk()"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  props: {
    eventData: {
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const instruction = ref(
      "ก่อนจะเริ่มฝึกพูด<br>มาลองทดสอบพูดกันก่อน<br>เพื่อเปรียบเทียบความสามารถ<br>หลังจากฝึกฝน"
    );

    const funcOk = () => {
      props.eventData.stage = "4";
    };

    onMounted(() => {});

    return {
      instruction,

      funcOk,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-dialog-container {
  width: 20%;
  min-width: 320px;
  border: 3px solid #4b1e0a;
  border-radius: 10px;
  background-color: #7f4429;
}

.box-dialog-sub {
  height: 99%;
  background-color: #ba6f4d;
  border-radius: 7px;
  padding: 7px;
}

.sub-header {
  width: 100%;
  height: 0px;
}

.sub-body {
  width: 100%;
  height: fit-content;
  background-color: #fff2e5;
  border-radius: 7px;
  padding: 5px;
}

.sub-footer {
  width: 100%;
  padding-top: 15px;
  padding-bottom: 10px;
}

.box-button {
  width: 34.776%;
  margin: 0% 2%;
}

.button-instruction-main {
  transform: scale(1);
  cursor: pointer;
}

.button-instruction-main.active:active {
  transform: scale(0.95);
}

.text-title {
  position: relative;
  font-size: 24px;
  color: #fff;
  text-shadow: rgb(75, 30, 10) 2px 0px 0px,
    rgb(75, 30, 10) 1.75517px 0.958851px 0px,
    rgb(75, 30, 10) 1.0806px 1.68294px 0px,
    rgb(75, 30, 10) 0.141474px 1.99499px 0px,
    rgb(75, 30, 10) -0.832294px 1.81859px 0px,
    rgb(75, 30, 10) -1.60229px 1.19694px 0px,
    rgb(75, 30, 10) -1.97998px 0.28224px 0px,
    rgb(75, 30, 10) -1.87291px -0.701566px 0px,
    rgb(75, 30, 10) -1.30729px -1.5136px 0px,
    rgb(75, 30, 10) -0.421592px -1.95506px 0px,
    rgb(75, 30, 10) 0.567324px -1.91785px 0px,
    rgb(75, 30, 10) 1.41734px -1.41108px 0px,
    rgb(75, 30, 10) 1.92034px -0.558831px 0px;
}

.text-title::before {
  content: attr(data-text);
  position: absolute;
  text-shadow: 0px 4px 0px rgb(75, 30, 10), 3px 4px 0px rgb(75, 30, 10),
    -1px 4px 0px rgb(75, 30, 10);
}
</style>
