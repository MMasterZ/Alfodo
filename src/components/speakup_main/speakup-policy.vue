<template>
  <div
    align="center"
    class="animate__animated animate__zoomIn"
    style="animation-duration: 0.5s"
  >
    <div class="box-content-container relative-position">
      <div class="box-content-sub">
        <div class="box-content-header"></div>
        <div class="box-content-body">
          <div
            class="box-content-scroll font-prompt-r"
            id="policy-scroll"
            align="left"
            @scroll="funcScrollPolicy()"
          >
            <span v-html="policyData"></span>
          </div>
        </div>
        <div class="box-content-footer row justify-center items-center">
          <div class="q-mx-sm">
            <q-img
              class="button-speakup-main active"
              src="/images/speakup_main/speakup-button-decline.png"
              no-spinner
              no-transition
              @click="funcBackToLobby()"
            ></q-img>
          </div>
          <div class="q-mx-sm">
            <q-img
              class="button-speakup-main"
              :src="`/images/speakup_main/speakup-button-accept${
                isShowButtonAccept ? '' : '-disable'
              }.png`"
              :class="isShowButtonAccept ? 'active' : ''"
              @click="funcAccept()"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
      </div>

      <div class="absolute-center box-label-header">
        <q-img
          width="324px"
          src="/images/speakup_main/speakup-label-policy.png"
          no-spinner
          no-transition
        ></q-img>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useEventStore } from "src/stores/event";
import terms from "src/js/terms";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
export default {
  props: {
    eventData: {
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar();
    const router = useRouter();
    const isShowButtonAccept = ref(false);
    const policyData = ref(terms.list[1].content);

    const funcAccept = async () => {
      const eventStore = useEventStore();

      $q.loading.show();

      try {
        if (isShowButtonAccept.value) {
          await eventStore.updateSpeakUpCurrentStage("2");
          props.eventData.stage = "2";
          $q.loading.hide();
        }
      } catch (e) {
        props.eventData.stage = "0";
        $q.loading.hide();
      }
    };

    const funcBackToLobby = () => {
      router.replace(`/lobby`);
    };

    const funcScrollPolicy = () => {
      let el = document.getElementById("policy-scroll");

      let currentScroll = Math.floor(
        el.scrollHeight - (el.scrollTop + el.clientHeight)
      );

      if (currentScroll >= 0 && currentScroll <= 200) {
        isShowButtonAccept.value = true;
      }
    };

    onMounted(() => {});

    return {
      policyData,

      isShowButtonAccept,

      funcAccept,
      funcScrollPolicy,
      funcBackToLobby,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
