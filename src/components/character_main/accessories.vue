<template>
  <g>
    <image
      v-if="item.isFront"
      :href="`https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory/${item.itemName}-front.png`"
    ></image>
  </g>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped></style>