<template>
  <div>
    <q-dialog maximized v-model="isDialogCompletePractice" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center">
          <div
            class="
              self-center
              box-complete-practice-main
              q-pa-sm
              relative-position
            "
          >
            <div
              class="
                box-complete-practice-content
                row
                items-center
                justify-center
              "
            >
              <div class="self-center q-pa-md q-mt-sm" align="center">
                <span class="f20 text-bold font-mali-b">
                  คุณทำแบบฝึกหัดครบ จำนวนครั้งที่กำหนด
                </span>
              </div>
            </div>

            <div class="absolute-top-right" style="top: -15px; right: -15px">
              <q-btn round flat v-close-popup>
                <q-img
                  width="50px"
                  src="/images/icon_main/icon-close.png"
                ></q-img>
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isDialogCompletePractice: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.box-complete-practice-main {
  width: 320px;
  height: 250px;
  border: 3px solid #4a261b;
  background-color: #f2c043;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
}

.box-complete-practice-content {
  height: 100%;
  background-color: #f6f3d3;
  border-radius: 20px;
  color: #4a261b;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);
}
</style>