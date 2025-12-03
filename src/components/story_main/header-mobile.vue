<template>
  <div
    class="row items-center row relative-position"
    style="height: 10%; padding: 2%; z-index: 3"
  >
    <div class="col-1 self-center" style="max-width: 40px; width: 15%">
      <q-img
        class="cursor-pointer"
        src="/images/icon_main/icon-pause.png"
      ></q-img>
    </div>

    <div class="col self-center row" style="width: 30%; margin-left: 3%">
      <div class="col-1" style="max-width: 25px; width: 10%; margin-left: 1%">
        <q-img src="/images/icon_main/icon-star-practice-event.png"></q-img>
      </div>
      <div class="col-1" style="max-width: 25px; width: 10%; margin-left: 1%">
        <q-img
          src="/images/icon_main/icon-star-practice-event-default.png"
        ></q-img>
      </div>
      <div class="col-1" style="max-width: 25px; width: 10%; margin-left: 1%">
        <q-img
          src="/images/icon_main/icon-star-practice-event-default.png"
        ></q-img>
      </div>
    </div>
    <q-space></q-space>
    <div class="col-1 self-center" style="max-width: 40px; width: 15%">
      <q-img
        class="cursor-pointer"
        @click="storyData.isDialogContentLogs = true"
        src="/images/icon_main/icon-log-dialog.png"
      ></q-img>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    TitleEvent: {
      type: String,
      default: "",
    },
    storyData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

  <style lang="scss" scoped>
.text-title {
  font-size: clamp(5%, 7vw, 40px);
  text-shadow: 0px 4px 1px #000;
}
</style>
