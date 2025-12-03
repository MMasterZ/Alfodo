<template>
  <q-dialog persistent maximized v-model="isShowDialogNextToSpeak">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog relative-position">
          <q-img src="/images/dialog_main/dialog-box-next-to-speak.png">
            <div class="fit transparent">
              <div class="fit row">
                <div class="col-12 box-content row justify-center items-center">
                  <div class="col-12" align="center">
                    <div>
                      <span class="text-header f26 font-fredoka">
                        NEXT TO SPEAK
                      </span>
                    </div>
                    <div class="q-pt-md" align="center">
                      <span class="text-message font-mali-b f16">
                        ต่อไปฝึกสนทนา <br />
                        พูดออกเสียงตามกันเถอะ
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="
                    col-12
                    self-end
                    row
                    justify-center
                    items-end
                    box-button
                    q-pb-sm
                  "
                  align="center"
                >
                  <q-img
                    @click="storyData.func.gotoSpeak()"
                    width="120px"
                    src="/images/button_main/button-lets-go.png"
                    class="cursor-pointer"
                  ></q-img>
                </div>
              </div>
            </div>
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    isShowDialogNextToSpeak: {
      type: Boolean,
      deefault: false,
    },
    storyData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.box-dialog {
  width: 320px;
}

.box-content {
  height: 70%;
  background-color: #fff2e5;
  border-radius: 25px;
}
.box-button {
  height: 30%;
}

.text-message {
  color: #4b1e0a;
}

.text-header {
  position: relative;
  color: #ba6f4d;
  font-size: 26px;
  text-shadow: 1px 1px 1px #4b1e0a, 2px 2px 1px #4b1e0a, 0px 0px 1px #4b1e0a;
}
</style>
