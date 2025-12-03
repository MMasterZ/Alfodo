<template>
  <q-page class="background-main row justify-center items-center">
    <!-- #region Desktop -->
    <div class="brx relative-position">
      <background-main></background-main>

      <div class="brx">
        <event-header :eventData="eventData"></event-header>
      </div>

      <div class="brx"></div>
    </div>
    <!-- #endregion -->
  </q-page>
</template>

<script>
import backgroundMain from "components/event_main/event-story-background.vue";

import eventHeader from "components/event_main/event-header.vue";
import { reactive } from "vue";
export default {
  components: {
    backgroundMain,
    eventHeader,
  },
  setup() {
    const eventData = reactive({
      name: "SPEAK UP",
      stage: "",
      eventId: "",
      isStartEvent: false,
    });

    return {
      eventData,
    };
  },
};
</script>

<style lang="scss" scoped>
.background-main {
  background-image: url("/images/background_main/backdrop-lobby.png");
  position: relative;
  box-sizing: inherit;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
