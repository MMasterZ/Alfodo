<template>
  <div v-if="systemStore.platform.desktop"></div>
</template>

<script>
import { useSystemStore } from "src/stores/system";
export default {
  setup(props) {
    const systemStore = useSystemStore();

    return {
      systemStore,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
