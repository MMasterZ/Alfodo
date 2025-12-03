<template>
  <div
    class="absolute-center animate__animated animate__fadeIn"
    style="animation-duration: 0.7s; z-index: 3"
  >
    <q-img
      width="320px"
      src="/images/dialog_main/dialog-event-start-unit.png"
      no-spinner
      no-transition
    >
      <div
        class="row transparent justify-center"
        style="width: 100%; height: 100%"
        f
      >
        <div class="col-12 q-pt-xs q-px-xs" style="width: 100%; height: 70%">
          <div class="box-title row justify-center items-center">
            <div class="q-px-md" align="center">
              <span class="f24 font-mali-b">
                {{ `${eventData.com.unitData.nameEn}` }}
              </span>
              <div align="center" class="q-pa-xs">
                <span class="f16">
                  {{ `${eventData.com.unitData.nameTh}` }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-1 self-end row justify-center items-center q-pb-sm"
          style="width: 90%"
        >
          <q-img
            width="120px"
            src="/images/button_main/button-start.png"
            class="cursor-pointer"
            no-spinner
            no-transition
            @click="eventData.func.startPractice()"
          ></q-img>
        </div>
      </div>
    </q-img>
  </div>
</template>

<script>
export default {
  props: {
    eventData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.box-title {
  width: 100%;
  height: 100%;
  background-color: #fff2e5;
  border-radius: 25px;
  color: #4b1e0a;
  font-weight: bold;
}
</style>
