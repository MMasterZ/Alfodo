<template>
  <div class="row items-center row" style="height: 10%; padding: 0.5%">
    <div class="col-1 self-center" style="width: 3%">
      <q-img
        class="cursor-pointer"
        src="/images/icon_main/icon-back.png"
      ></q-img>
    </div>
    <div class="col-1 self-center width-fit" style="margin-left: 2%">
      <span class="text-title text-white font-fredoka">
        {{ TitleEvent }}
      </span>
    </div>
    <div class="col-1 self-center" style="width: 1.2%;margin-left:0.6%;:">
      <q-img src="/images/icon_main/icon-info-black.png"></q-img>
    </div>
    <div class="col-1 self-center row" style="margin-left: 1%">
      <div class="col-1" style="width: 22%; margin-left: 3%">
        <q-img src="/images/icon_main/icon-star-event.png"></q-img>
      </div>
      <div class="col-1" style="width: 22%; margin-left: 3%">
        <q-img src="/images/icon_main/icon-star-event.png"></q-img>
      </div>
      <div class="col-1" style="width: 22%; margin-left: 3%">
        <q-img src="/images/icon_main/icon-star-event.png"></q-img>
      </div>
    </div>
    <q-space></q-space>
    <div class="col-1" style="width: 3%">
      <q-img
        class="cursor-pointer"
        src="/images/icon_main/icon-setting.png"
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
  },
};
</script>

<style lang="scss" scoped>
.text-title {
  font-size: clamp(5%, 3vw, 40px);
  text-shadow: 0px 4px 1px #000;
}
</style>
