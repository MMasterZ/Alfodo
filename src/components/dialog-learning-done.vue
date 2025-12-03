<template>
  <div>
    <q-dialog maximized v-model="isShowLearningDone" no-esc-dismiss>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center no-padding">
          <div class="">
            <q-img width="300px" src="/images/dialog-box.png">
              <div class="fit row justify-center items-center transparent no-padding">
                <div class="col-12" style="height: 30px"></div>
                <div class="col-12" align="center">
                  <span class="f18 text-black">
                    คุณทำแบบฝึกหัดครบ <br />
                    จำนวนครั้งที่กำหนด
                  </span>
                </div>
                <div class="col-12" align="center">
                  <q-btn
                    @click="$emit('callback-closedialog')"
                    v-close-popup
                    label="ตกลง"
                    rounded
                    class="bg-amber text-black f14"
                    push
                  ></q-btn>
                </div></div
            ></q-img>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isShowLearningDone: { type: Boolean, default: false },
  },
  emits: ["callback-closedialog"],
  setup(props) {},
};
</script>

<style lang="scss" scoped></style>
