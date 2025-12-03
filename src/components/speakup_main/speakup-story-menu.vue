<template>
  <div
    align="center"
    class="animate__animated animate__zoomIn"
    style="animation-duration: 0.5s"
    v-if="eventData.storyList.length"
  >
    <div class="box-content-container relative-position">
      <div class="box-content-sub">
        <div class="box-content-body story-menu">
          <div style="margin-top: 35px">
            <div
              class="button-speakup-main size-270 active"
              style="margin-bottom: 8px"
              v-for="(item, index) in eventData.storyList"
              :key="index"
            >
              <q-img
                width="100%"
                @click="funcSelectStory(item)"
                :src="`/images/speakup_main/speakup-button-story${
                  selectStoryId == item.topicId ? '-select' : ''
                }.png`"
                no-spinner
                no-transition
                class="cursor-pointer"
              >
                <div class="fit transparent relative-position no-padding">
                  <div
                    class="absolute-center row justify-center items-center f14 font-prompt-m text-content-story"
                    style="
                      width: 100%;
                      min-height: 80%;
                      max-height: fit-content;
                    "
                    :class="selectStoryId == item.topicId ? 'selected' : ''"
                  >
                    <div class="col-12 self-center">
                      {{ `${item.topicEn}` }}
                      <!-- {{ `My Dream job Becoming a Police Officer` }} -->
                    </div>
                    <div class="col-12 self-center" style="white-space: nowrap">
                      {{ item.topicTh }}
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
          </div>
          <div class="box-story-footer">
            <div class="font-prompt-m text-hint-story f12">
              *เมื่อเลือกเรื่องแล้ว จะไม่สามารถเปลี่ยนได้ในภายหลัง
            </div>
            <div class="">
              <q-img
                class="button-speakup-main size-200"
                :src="`/images/speakup_main/speakup-button-next-story${
                  isShowButtonNext ? '' : '-disable'
                }.png`"
                :class="isShowButtonNext ? 'active' : ''"
                no-spinner
                no-transition
                @click="funcNextTo()"
              ></q-img>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute-center box-label-header">
        <q-img
          width="250px"
          src="/images/speakup_main/speakup-label-story.png"
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
import { useQuasar } from "quasar";
export default {
  props: {
    eventData: {
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar();
    const isShowButtonNext = ref(false);
    const selectStoryId = ref(null);

    const funcSelectStory = (item) => {
      selectStoryId.value = item.topicId;
      isShowButtonNext.value = true;
    };

    const funcNextTo = async () => {
      const eventStore = useEventStore();

      if (isShowButtonNext.value) {
        $q.loading.show();
        await eventStore.saveSelectedSpeakUpTopics(selectStoryId.value);
        props.eventData.storyId = selectStoryId.value;
        props.eventData.storyData = props.eventData.storyList.find(
          (item) => item.topicId == selectStoryId.value
        );
        await eventStore.updateSpeakUpCurrentStage("3");
        props.eventData.stage = "3";
        $q.loading.hide();
      }
    };

    return {
      selectStoryId,
      isShowButtonNext,

      funcSelectStory,
      funcNextTo,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-story-footer {
  padding-top: 20px;
  padding-bottom: 15px;
}

.text-hint-story {
  color: #4a261b;
}

.text-content-story {
  // white-space: nowrap; /* Prevents text from wrapping */
  color: #4a261b;
  line-height: 1.3;
}

.text-content-story.selected {
  color: #fff;
}
</style>
