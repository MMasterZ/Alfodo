<template>
  <div>
    <q-dialog maximized v-model="isDialogTryAgain" persistent> </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isDialogTryAgain: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>