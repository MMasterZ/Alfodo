<template>
  <div>
    <!-- Dialog Finish Practice -->
    <q-dialog maximized v-model="practiceData.isFinishPractice" persistent class="z-max">
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <!-- จบแบบฝึกหัดแบบไม่ Sync -->
          <div
            class="absolute-center"
            v-if="!synchronizeStore.isSync && practiceData.star > 0"
          >
            <div style="margin-bottom: -40px">
              <animation-star-top></animation-star-top>
            </div>
            <div class="box-content-finish row" align="center">
              <div class="col-12 relative-position">
                <div class="relative-position" style="margin-top: 5px">
                  <q-img fit="contain" width="319px" src="/images/bg-success-start.png">
                    <div
                      class="absolute-center transparent full-width"
                      style="top: 40%"
                      align="center"
                    >
                      <q-rating
                        v-model="practiceData.star"
                        size="4em"
                        color="brown-9"
                        icon-selected="star"
                        color-selected="amber"
                        max="3"
                        readonly
                        no-dimming
                      />
                    </div>
                  </q-img>
                </div>
                <div class="box-finish q-pt-md">
                  <div align="center">
                    <div class="f16">
                      <span>จบแบบฝึกหัด</span>
                      <br />
                      <span
                        >ระดับที่ {{ practiceStore.level }} - บทที่
                        {{ practiceStore.unit }}</span
                      >
                    </div>
                    <div class="box-coin q-mt-sm">
                      <q-img
                        src="/images/coin.png"
                        style="width: 30px"
                        class="animation-rotate"
                      ></q-img>
                      <span class="relative-position q-mx-sm text-bold f16">
                        x{{ practiceData.correct }}
                      </span>
                    </div>
                    <div>
                      <span style="font-size: 10px"
                        >จำนวนครั้งในการทำ : {{ practiceData.numOfPractice }}/2</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 q-pb-md">
                <div align="center">
                  <q-btn
                    icon="fas fa-list-ul"
                    class="q-mx-xs bg-btn text-white"
                    rounded
                    @click="$router.replace('/practice/list')"
                    push
                    style="width: 70px"
                  ></q-btn>
                  <q-btn
                    v-if="practiceData.numOfPractice != 2"
                    icon="fas fa-redo-alt"
                    class="q-mx-xs bg-btn text-white"
                    rounded
                    @click="$emit('callback-restart')"
                    push
                    style="width: 70px"
                  ></q-btn>
                  <q-btn
                    icon="fas fa-angle-double-right"
                    class="q-mx-xs bg-amber"
                    rounded
                    push
                    style="width: 70px"
                    @click="funcGotoNextPractice()"
                  ></q-btn>
                </div>
              </div>
            </div>

            <div style="margin-top: -30px">
              <animation-star-bottom></animation-star-bottom>
            </div>
          </div>

          <div
            class="absolute-center"
            v-if="!synchronizeStore.isSync && practiceData.star == 0"
          >
            <div class="box-finish-fail relative-position row">
              <div class="col-12 q-pb-md"></div>
              <div align="center" class="col-12 self-center">
                <span style="font-size: 20px" v-if="practiceData.numOfPractice != 2"
                  >คะแนนไม่ผ่านเกณฑ์</span
                >
                <span style="font-size: 20px" v-else
                  >คุณทำแบบฝึกหัดครบตามจำนวนครั้งแล้ว</span
                >
              </div>
              <div class="col-12 self-end q-pb-lg" align="center">
                <q-btn
                  icon="fas fa-redo-alt"
                  rounded
                  style="width: 70px"
                  class="bg-btn text-white q-mx-sm"
                  push
                  @click="$emit('callback-restart')"
                  v-if="practiceData.numOfPractice != 2"
                ></q-btn>
                <q-btn
                  icon="fas fa-list-ul"
                  class="bg-btn text-white q-mx-sm"
                  style="width: 70px"
                  rounded
                  @click="$router.replace('/practice/list')"
                  push
                  v-if="practiceData.numOfPractice != 2"
                ></q-btn>
                <q-btn
                  class="bg-btn text-white q-mx-sm"
                  style="width: fit-content"
                  rounded
                  @click="$router.replace('/practice/list')"
                  push
                  label="กลับหน้าหลัก"
                  v-if="practiceData.numOfPractice == 2"
                ></q-btn>
              </div>
            </div>
          </div>

          <!-- จบแบบฝึกหัดแบบ Sync -->
          <div class="absolute-center" v-if="synchronizeStore.isSync">
            <div style="margin-bottom: -40px" v-if="practiceData.star > 0">
              <animation-star-top></animation-star-top>
            </div>
            <div class="box-content-finish row" align="center">
              <div class="col-12 relative-position">
                <div class="relative-position" style="margin-top: 5px">
                  <q-img fit="contain" width="319px" src="/images/bg-success-start.png">
                    <div
                      class="absolute-center transparent full-width"
                      style="top: 40%"
                      align="center"
                    >
                      <q-rating
                        v-model="practiceData.star"
                        size="4em"
                        color="brown-9"
                        icon-selected="star"
                        color-selected="amber"
                        max="3"
                        readonly
                        no-dimming
                      />
                    </div>
                  </q-img>
                </div>
              </div>
              <div class="col-12 self-center q-pb-md" align="center">
                <div class="f20">
                  <div class="f16 q-mb-md">
                    <span>จบแบบฝึกหัด</span>
                    <br />
                    <span
                      >ระดับที่ {{ practiceStore.level }} - บทที่
                      {{ practiceStore.unit }}</span
                    >
                  </div>
                  <div class="box-coin q-mb-sm">
                    <q-img
                      src="/images/coin.png"
                      style="width: 30px"
                      class="animation-rotate"
                    ></q-img>
                    <span class="relative-position q-mx-sm text-bold f16">
                      x{{ practiceData.correct }}
                    </span>
                  </div>
                  <div align="center" class="q-pb-md">
                    <span class="f16"
                      >กรุณารอคุณครูเลือก <br />
                      บทเรียนหรือแบบฝึกหัดถัดไป</span
                    >
                  </div>
                </div>
              </div>
              <!-- <div class="col-12 q-py-lg"></div> -->
            </div>

            <div style="margin-top: -30px" v-if="practiceData.star > 0">
              <animation-star-bottom></animation-star-bottom>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import animationStarTop from "../components/finishPractice/animation-star-top.vue";
import animationStarBottom from "../components/finishPractice/animation-star-bottom.vue";
import { useRouter } from "vue-router";
import { useSystemStore } from "src/stores/system";
import { onMounted } from "@vue/runtime-core";
export default {
  components: {
    animationStarTop,
    animationStarBottom,
  },
  props: {
    practiceData: {
      default: () => {},
    },
    practiceStore: {
      default: () => {},
    },
    practiceData: {
      default: () => {},
    },
    synchronizeStore: {
      default: () => {},
    },
  },
  setup(props) {
    // Initial Data
    const router = useRouter();

    const funcGotoNextPractice = () => {
      router.replace("/landing/");
    };

    onMounted(() => {
      const systemStore = useSystemStore();
      if (props.practiceData.star > 0) {
        systemStore.playEffectPass();
      } else {
        systemStore.playEffectFail();
      }
    });

    return { funcGotoNextPractice };
  },
};
</script>

<style lang="scss" scoped>
.box-finish {
  font-size: 16px;
  color: #000;
}

.box-content-finish {
  position: relative;
  background-image: url("/images/dialog-finish.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 320px;
  height: 290px;
}

.box-finish-fail {
  position: relative;
  background-image: url("/images/box-finish-fail.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 290px;
  height: 250px;
}

.box-coin {
  width: fit-content;
  background-color: #f3e0c2;
  padding: 5px 20px;
  border-radius: 10px;
}
.animation-rotate {
  animation: flipCoin 1s linear infinite;
}

@keyframes flipCoin {
  to {
    transform: rotateY(360deg);
  }
}

.bg-btn {
  background: linear-gradient(180deg, #015e9e 0%, #014474 100%);
}
</style>
