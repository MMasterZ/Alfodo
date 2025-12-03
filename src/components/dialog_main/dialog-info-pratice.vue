<template>
  <q-dialog maximized v-model="isDialogInfoPractice" persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <q-img
          width="320px"
          src="/images/dialog_main/dialog-alert-practice-details.png"
        >
          <div
            class="row transparent"
            style="width: 100%; height: 67%; bottom: 3%"
          >
            <div class="col-12" align="center">
              <div class="q-pb-md q-pt-lg">
                <span class="f20 text-color font-mali-b"
                  >ตั้งใจทำแบบฝึกหัดนะ</span
                >
              </div>
              <div class="text-color f14 font-mali-m">
                <!-- <div>คุณมีเวลาในการทำ 6 นาที</div> -->
                <div>แบบฝึกหัดนี้จะมีการเก็บคะแนน</div>
              </div>
            </div>
            <div class="col-12 self-end q-pb-sm" align="center">
              <q-img
                v-close-popup
                width="160px"
                class="cursor-pointer"
                @click="$emit('callback-closeDialog')"
                src="/images/button_main/button-info-ok.png"
              ></q-img>
            </div>
          </div>
        </q-img>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    isDialogInfoPractice: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {},
};
</script>

<style lang="scss" scoped>
.text-color {
  color: #512a08;
}
</style>
