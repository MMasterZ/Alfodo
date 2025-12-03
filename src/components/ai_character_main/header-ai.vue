<template>
  <div>
    <div
      class="box-header relative-position"
      :style="`width:${width}px;height:${height}px;background-color:${background}`"
      v-if="$q.platform.is.desktop"
    >
      <div class="absolute-center" style="width: 85%; top: 70%">
        <ai-character></ai-character>
      </div>
    </div>

    <div
      class="box-header-mobile relative-position"
      v-if="$q.platform.is.mobile"
      :style="`width:${width}px;height:${height}px;background-color:${background};${
        isBorder ? 'border: 2px solid #4b1716;' : ''
      }`"
    >
      <div class="absolute-center" style="width: 85%; top: 70%">
        <ai-character></ai-character>
      </div>
    </div>
  </div>
</template>

<script>
import aiCharacter from "./ai-character.vue";
export default {
  components: {
    aiCharacter,
  },
  props: {
    width: {
      type: String,
      default: "40",
    },
    height: {
      type: String,
      default: "40",
    },
    background: {
      type: String,
      default: "#ffffff",
    },
    isBorder: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {},
};
</script>

<style lang="scss" scoped>
.box-header {
  border-radius: 50%;
  overflow: hidden;
}

.box-header-mobile {
  border-radius: 50%;
  overflow: hidden;
}
</style>
