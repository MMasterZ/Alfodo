<template>
  <q-dialog maximized v-model="isDialogDisconnect" persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center">
        <div class="col-6 box-dialog self-center q-pa-sm">
          <div
            class="box-sub q-pa-md row justify-center items-center font-mali-b"
            style=""
          >
            <div align="center">
              <span class="self-center"> Internet connection is offline </span>
              <div align="center" class="q-py-md">
                <q-spinner-radio color="primary" size="2em" />
              </div>
              <div>waiting of connection</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    isDialogDisconnect: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.box-dialog {
  width: 300px;
  height: 200px;
  background-color: #f2c043;
  border-radius: 20px;
  border: 4px solid #4a261b;
}

.box-sub {
  height: 100%;
  background-color: #f6f3d3;
  border-radius: 15px;
  color: #4a261b;
}
</style>