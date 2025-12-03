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
          <div align="center" class="box-content-scroll activity">
            <div
              class="text-title font-prompt-b relative-position"
              :data-text="activityData.titleHeader"
            >
              {{ activityData.titleHeader }}
            </div>

            <div class="font-prompt-sb text-activity-sub-title">เงื่อนไข</div>

            <div align="left" class="font-prompt-r text-activity-content">
              {{ activityData.condition }}
            </div>

            <div class="font-prompt-sb text-activity-sub-title">
              {{ activityData.titleReward }}
            </div>

            <div
              align="left"
              class="font-prompt-r text-activity-content"
              style="padding: 0px 15px"
            >
              <div
                v-for="(item, index) in activityData.textReward"
                :key="index"
                class="row"
              >
                <div class="col-1 width-fit" style="padding-right: 10px">
                  {{ `• ` }}
                </div>
                <div class="col"><span v-html="` ${item}`"></span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="box-content-footer row justify-between items-center">
          <div class="self-center">
            <q-img
              class="button-speakup-main size-45"
              :src="`/images/speakup_main/speakup-activity-button-previous${
                currentIndex == 0 ? '-disable' : ''
              }.png`"
              :class="currentIndex == 0 ? 'disable' : 'active'"
              no-spinner
              no-transition
              @click="currentIndex == 0 ? null : funcPreviousActivity()"
            ></q-img>
          </div>
          <div class="self-center">
            <q-img
              class="button-speakup-main size-180"
              :src="`/images/speakup_main/speakup-button-start-now${
                isShowButtonStartNow ? '' : '-disable'
              }.png`"
              :class="isShowButtonStartNow ? 'active' : ''"
              no-spinner
              no-transition
              @click="isShowButtonStartNow ? funcStartNow() : null"
            ></q-img>
          </div>
          <div class="self-center">
            <q-img
              class="button-speakup-main size-45"
              :src="`/images/speakup_main/speakup-activity-button-next${
                currentIndex + 1 == activityList.length ? '-disable' : ''
              }.png`"
              :class="
                currentIndex + 1 == activityList.length ? 'disable' : 'active'
              "
              no-transition
              no-spinner
              @click="
                currentIndex + 1 == activityList.length
                  ? null
                  : funcNextActivity()
              "
            ></q-img>
          </div>
        </div>
      </div>

      <div class="absolute-center box-label-header">
        <q-img
          width="324px"
          src="/images/speakup_main/speakup-label-activity.png"
          no-spinner
          no-transition
        ></q-img>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useEventStore } from "src/stores/event";
import { useQuasar } from "quasar";
export default {
  props: {
    eventData: {
      default: () => {},
    },
  },
  setup(props) {
    const $q = useQuasar();
    const currentIndex = ref(0);
    const activityList = ref([
      {
        titleHeader: "รอบสมัคร",
        condition: "ผ่านการทดสอบและส่งไฟล์เสียงประกวดจะได้รับรางวัล",
        titleReward: "ของรางวัลรอบสมัคร",
        textReward: [
          "ชุดตัวละครโปรแกรม Winner English Limited่ เฉพาะกิจกรรมนี้เท่านั้น",
          "เกียรติบัตรเข้าร่วมการแข่งขัน",
        ],
      },
      {
        titleHeader: "รอบคัดเลือก",
        condition:
          "ผ่านทุกด่านที่ 80% และส่งไฟล์เสียง คุณครูจะคัดเลือกผู้ผ่านเข้ารอบ และ อัดคลิปเพื่อส่งประกวดชิงแชมป์ระดับชั้น",
        titleReward: "ของรางวัลรอบคัดเลือก",
        textReward: [
          "รางวัลปลอบใจ (อุปกรณ์การเรียน/กระเป๋าผ้า)",
          "เกียรติบัตรผู้ผ่านการคัดเลือก",
        ],
      },
      {
        titleHeader: "รอบตัดสิน",
        condition:
          "ทีมงาน Winner English จะตัดสินผลการประกวดและผู้ชนะเลิศจากผู้ที่คุณครูคัดเลือกส่ง Video เข้าประกวด",
        titleReward: "ของรางวัลรอบตัดสินชนะเลิศ",
        textReward: [
          "ทุนการศึกษามูลค่า 500 บาท",
          "เกียรติบัตรผู้ชนะเลิศประกวด SPEAK UP! ระดับชั้น/กลุ่มโรงเรียน",
        ],
      },
    ]);

    const isShowButtonStartNow = ref(false);
    const funcNextActivity = () => {
      currentIndex.value++;
      if (currentIndex.value + 1 == activityList.value.length) {
        isShowButtonStartNow.value = true;
        return;
      }
    };

    const funcPreviousActivity = () => {
      if (currentIndex.value == 0) {
        return;
      }
      currentIndex.value--;
    };

    const funcStartNow = async () => {
      const eventStore = useEventStore();

      $q.loading.show();

      await eventStore.updateSpeakUpCurrentStage("2");
      props.eventData.stage = "2";

      $q.loading.hide();
    };

    const activityData = computed(() => {
      return activityList.value[currentIndex.value];
    });

    return {
      currentIndex,
      activityList,
      activityData,

      isShowButtonStartNow,

      funcStartNow,
      funcNextActivity,
      funcPreviousActivity,
    };
  },
};
</script>

<style scoped>
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

.text-activity-sub-title {
  padding: 10px;
  font-size: 16px;
}

.text-activity-content {
  padding: 0px 7px;
  font-size: 14px;
}
</style>
