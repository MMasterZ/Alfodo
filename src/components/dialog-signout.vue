<template>
  <div>
    <q-dialog maximized v-model="isShowSignoutDialog" no-esc-dismiss>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center">
          <div class="">
            <q-img width="300px" src="/images/dialog-box.png">
              <div class="fit row justify-center items-center transparent no-padding">
                <div class="col-12" style="height: 30px"></div>
                <div class="col-12" align="center">
                  <span class="f18 text-black"> คุณต้องการออกจากระบบ </span>
                </div>
                <div class="col-12" align="center">
                  <q-btn
                    @click="$emit('callback-closedialog')"
                    v-close-popup
                    label="ยกเลิก"
                    rounded
                    class="bg-blue-10 text-white f14 q-mx-sm"
                    push
                  ></q-btn>
                  <q-btn
                    @click="$emit('callback-signout')"
                    label="ตกลง"
                    rounded
                    class="bg-amber text-black f14 q-mx-sm"
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
    isShowSignoutDialog: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["callback-closedialog", "callback-signout"],
};
</script>

<style lang="scss" scoped></style>
