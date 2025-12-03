<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <!-- <div style="font-size: 30vh">
        404
      </div> -->

      <div class="text-h2" style="opacity: 0.4">
        <div class="q-pa-sm">
          {{ `Platform : ${this.$q.platform.is.platform}` }}
        </div>
        <div class="q-pa-sm">
          {{ `Webkit : ${this.$q.platform.is.webkit || false}` }}
        </div>
        <div class="q-pa-sm">
          {{ `Version : ${this.$q.platform.is.versionNumber}` }}
        </div>
        <div class="q-pa-sm">
          {{ `Full Path : ${this.$route.fullPath}` }}
        </div>
        <div class="q-pa-sm">
          {{ `Path : ${this.$route.path}` }}
        </div>
        <div class="q-pa-sm">
          {{ `Hash : ${this.$route.hash}` }}
        </div>
        <div class="q-pa-sm">
          {{ `Href : ${this.$route.href}` }}
        </div>
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        icon="home"
        no-caps
        size="xl"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404",
  mounted() {
    // console.log(this.$q.platform.is);
  },
};
</script>
