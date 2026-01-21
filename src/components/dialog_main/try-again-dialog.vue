<template>
  <div>
    <q-dialog maximized v-model="isDialogTryAgain" persistent> </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isDialogTryAgain = ref(true);

</script>

<style lang="scss" scoped>
</style>
