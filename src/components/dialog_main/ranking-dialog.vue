<template>
  <div v-if="!isLoaded">
    <q-dialog v-model="isShowDialogRanking" maximized persistent class="z-max">
      <q-card class="transparent shadow-0 font-mali">
        <q-card-section class="fit row items-center no-padding">
          <div class="col-12 relative-position q-pa-xs">
            <div align="center" class="relative-position" style="z-index: 1">
              <q-img
                style="max-width: 360px; width: 100%; min-width: 300px"
                src="/images/icon_main/icon-ranking-leaderboard.png"
                no-spinner
                no-transition
              >
                <div
                  class="absolute-bottom-right transparent"
                  style="bottom: 25px; right: -15px"
                >
                  <q-img
                    @click="funcCloseDialog()"
                    width="50px"
                    class="cursor-pointer"
                    src="/images/icon_main/icon-close.png"
                    no-spinner
                    no-transition
                  >
                  </q-img>
                </div>
              </q-img>
            </div>
            <div style="margin-top: -65px">
              <div class="dialog-container relative-position">
                <div class="dialog-content row">
                  <div
                    class="col-12 self-start q-pa-md row justify-around items-center"
                    :style="
                      studentStore.studentType != 'school'
                        ? 'padding-top:30px'
                        : 'padding-top:60px'
                    "
                  >
                    <div
                      class="col-1 self-end"
                      style="width: fit-content"
                      v-if="studentStore.studentType == 'school'"
                    >
                      <q-img
                        width="110px"
                        class="cursor-pointer"
                        @click="selectedType = 'school'"
                        :src="`/images/button_main/button-school-${
                          selectedType == 'school' ? 'selected' : 'disable'
                        }.png`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                    <div
                      class="col-1 self-end"
                      style="width: fit-content"
                      v-if="studentStore.studentType == 'school'"
                    >
                      <q-img
                        width="110px"
                        class="cursor-pointer"
                        @click="selectedType = 'class'"
                        :src="`/images/button_main/button-class-${
                          selectedType == 'class' ? 'selected' : 'disable'
                        }.png`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>

                  <!-- #region Type : School  -->
                  <div
                    class="col-12 box-show-ranking-all-by-school relative-position"
                    v-if="studentStore.studentType == 'school'"
                  >
                    <div
                      class="q-pa-sm"
                      v-if="showRankingBySelectedType.length && isShowCharacterRanking"
                    >
                      <div
                        class="row relative-position"
                        :style="index > 0 ? 'margin-top: 10px' : ''"
                        v-for="(item, index) in showRankingBySelectedType"
                      >
                        <div class="col-12 absolute-center box-character-name"></div>
                        <div
                          class="absolute-center box-show-character-all-back-drop"
                        ></div>
                        <div class="col-1 self-center" style="width: fit-content">
                          <div
                            class="box-show-character-all relative-position"
                            :class="item.isHasCharacter ? 'cursor-pointer' : ''"
                          >
                            <div
                              class="absolute-center"
                              :style="item.isHasCharacter ? 'top:90%' : ''"
                            >
                              <div style="width: 150px" v-if="item.isHasCharacter">
                                <character
                                  :equipment="{ ...item.character }"
                                  :isRanking="true"
                                  :isAnimation="true"
                                  :setId="`character-ranking-${index + 1}`"
                                ></character>
                              </div>
                              <div v-else>
                                <q-img
                                  width="70px"
                                  src="/images/icon_main/icon-character.png"
                                ></q-img>
                              </div>
                            </div>
                            <dialog-character
                              v-if="isDesktop"
                              :characterData="item"
                              :index="index + 1"
                            ></dialog-character>
                          </div>
                        </div>
                        <div
                          class="col relative-position self-center q-px-sm font-mali-b"
                        >
                          <div class="relative-position">
                            <div style="margin-top: 0px" class="text-overflow">
                              <span class="f14" style="color: #804208">
                                {{ item.character.name }}
                              </span>
                            </div>
                            <div class="" style="margin-top: -3px">
                              <q-img
                                width="20px"
                                src="/images/icon_main/icon-star-ranking.png"
                                no-spinner
                                no-transition
                              ></q-img>
                              <span class="absolute text-star f18" style="left: 30px">{{
                                item.star
                              }}</span>
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-1 self-center q-pa-sm relative-position box-ranking-number"
                          align="center"
                        >
                          <div class="score-character relative-position">
                            <q-img
                              class="absolute-center"
                              width="55px"
                              style="top: 75%"
                              :src="`/images/icon_main/icon-ranking-number-${
                                index + 1
                              }.png`"
                              v-if="index + 1 <= 3"
                              no-spinner
                              no-transition
                            ></q-img>
                            <span class="absolute-center" v-else>
                              {{ index + 1 }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="absolute-center"
                      style="width: 100%"
                      align="center"
                      v-if="
                        showRankingBySelectedType.length > 0 && !isShowCharacterRanking
                      "
                    >
                      <span style="color: #4a261b" class="f20 font-mali-m"
                        >กำลังโหลดข้อมูล...</span
                      >
                    </div>
                    <div
                      class="absolute-center"
                      style="width: 100%"
                      align="center"
                      v-if="showRankingBySelectedType.length == 0"
                    >
                      <span style="color: #4a261b" class="f20 font-mali-m"
                        >ยังไม่มีการจัดอันดับ</span
                      >
                    </div>
                  </div>
                  <!-- #endregion -->

                  <!--  -->
                  <div
                    class="col-12 box-show-ranking-all-by-online relative-position"
                    v-if="studentStore.studentType != 'school'"
                  >
                    <div
                      class="q-pa-sm"
                      v-if="showRankingBySelectedType.length && isShowCharacterRanking"
                    >
                      <div
                        :style="index > 0 ? 'margin-top: 10px' : ''"
                        v-for="(item, index) in showRankingBySelectedType"
                      >
                        <div class="row relative-position" v-if="item.isHasCharacter">
                          <div class="col-12 absolute-center box-character-name"></div>
                          <div
                            class="absolute-center box-show-character-all-back-drop"
                          ></div>
                          <div class="col-1 self-center" style="width: fit-content">
                            <div
                              class="box-show-character-all relative-position"
                              :class="item.isHasCharacter ? 'cursor-pointer' : ''"
                            >
                              <div
                                class="absolute-center"
                                :style="item.isHasCharacter ? 'top:90%' : ''"
                              >
                                <div style="width: 150px" v-if="item.isHasCharacter">
                                  <character
                                    :equipment="{ ...item.character }"
                                    :isRanking="true"
                                    :isAnimation="true"
                                    :setId="`character-ranking-online-${index + 1}`"
                                  ></character>
                                </div>
                                <div v-else>
                                  <q-img
                                    width="70px"
                                    src="/images/icon_main/icon-character.png"
                                  ></q-img>
                                </div>
                              </div>
                              <dialog-character
                                v-if="isDesktop"
                                :characterData="item"
                                :index="index + 1"
                              ></dialog-character>
                            </div>
                          </div>
                          <div
                            class="col relative-position self-center q-px-sm font-mali-b"
                          >
                            <div class="relative-position">
                              <div style="margin-top: 0px" class="text-overflow">
                                <span class="f14" style="color: #804208">
                                  {{ item.character.name }}
                                </span>
                              </div>
                              <div class="" style="margin-top: -3px">
                                <q-img
                                  width="20px"
                                  src="/images/icon_main/icon-star-ranking.png"
                                  no-spinner
                                  no-transition
                                ></q-img>
                                <span class="absolute text-star f18" style="left: 30px">{{
                                  item.star
                                }}</span>
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-1 self-center q-pa-sm relative-position box-ranking-number"
                            align="center"
                          >
                            <div class="score-character relative-position">
                              <q-img
                                class="absolute-center"
                                width="55px"
                                style="top: 75%"
                                :src="`/images/icon_main/icon-ranking-number-${
                                  index + 1
                                }.png`"
                                v-if="index + 1 <= 3"
                                no-spinner
                                no-transition
                              ></q-img>
                              <span class="absolute-center" v-else>
                                {{ index + 1 }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="absolute-center"
                      style="width: 100%"
                      align="center"
                      v-if="
                        showRankingBySelectedType.length > 0 && !isShowCharacterRanking
                      "
                    >
                      <span style="color: #4a261b" class="f20 font-mali-m"
                        >กำลังโหลดข้อมูล...</span
                      >
                    </div>
                    <div
                      class="absolute-center"
                      style="width: 100%"
                      align="center"
                      v-if="showRankingBySelectedType.length == 0"
                    >
                      <span style="color: #4a261b" class="f20 font-mali-m"
                        >ยังไม่มีการจัดอันดับ</span
                      >
                    </div>
                  </div>
                  <div class="self-end col-12 box-show-ranking-user row">
                    <div class="col-1" style="width: fit-content; padding: 3px 10px">
                      <div class="box-show-character relative-position">
                        <div class="absolute icon-header-character">
                          <character
                            :setId="`user`"
                            :isAnimation="isAnimation"
                          ></character>
                        </div>
                      </div>
                    </div>
                    <div class="col self-center q-pa-xs font-mali-b">
                      <div>
                        <span class="f16" style="color: #804208">{{
                          `${studentStore.characterName}`
                        }}</span>
                      </div>
                      <div class="relative-position">
                        <q-img
                          width="20px"
                          src="/images/icon_main/icon-star-ranking.png"
                          no-spinner
                          no-transition
                        ></q-img>
                        <span class="absolute text-star f18" style="left: 30px">{{
                          studentCurrentRankingData.star
                        }}</span>
                      </div>
                    </div>
                    <div
                      class="col-1 self-center q-pa-sm relative-position box-ranking-number"
                      align="center"
                    >
                      <q-img
                        class="absolute-center"
                        width="45px"
                        style="top: 50%"
                        :src="`/images/icon_main/icon-ranking-number-${currentPositionRanking}.png`"
                        v-if="currentPositionRanking >= 1 && currentPositionRanking <= 3"
                        no-spinner
                        no-transition
                      ></q-img>
                      <div class="score-character relative-position" v-else>
                        <span class="absolute-center">
                          {{ `${currentPositionRanking || "-"}` }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>

  <loading :isShowLoading="isLoaded"></loading>
</template>

<script setup>
import character from "components/character_main/character.vue";
import dialogCharacter from "components/dialog_main/dialog-character.vue";
import loading from "components/dialog-loading.vue";
import { computed, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useCourseStore } from "src/stores/course";
import { useStudentStore } from "src/stores/student";

const emit = defineEmits(["callback-closeDialog"]);

// Intitialize Data
const $q = useQuasar();
const isAnimation = ref(false);
const selectedType = ref("school");
const isDesktop = ref($q.platform.is.desktop);
const courseStore = useCourseStore();
const studentStore = useStudentStore();

const isLoaded = ref(true);
const rankingList = ref([]);
const isShowCharacterRanking = ref(false);

const showRankingBySelectedType = computed(() => {
  let temp = rankingList.value;
  isShowCharacterRanking.value = false;

  if (selectedType.value == "school") {
    setTimeout(() => {
      isShowCharacterRanking.value = true;
    }, 300);
    return temp.schoolRanking.rankings || [];
  } else {
    setTimeout(() => {
      isShowCharacterRanking.value = true;
    }, 300);
    return temp.classRanking.rankings || [];
  }
});

const currentPositionRanking = computed(() => {
  let temp = rankingList.value;
  if (studentStore.studentType == "online") {
    return temp.currentStudentPosition || 0;
  } else {
    if (selectedType.value == "school") return temp.schoolRanking.currentPosition || 0;
    else return temp.classRanking.currentPosition || 0;
  }
});

const studentCurrentRankingData = computed(() => {
  let temp = rankingList.value;
  const courseStore = useCourseStore();

  if (selectedType.value == "school") {
    let find = temp.schoolRanking.rankings.find(
      (x) => x.studentId == studentStore.studentId
    );

    if (find) {
      return find;
    } else {
      return { star: courseStore.courseData.star };
    }
  } else {
    let find = temp.classRanking.rankings.find(
      (x) => x.studentId == studentStore.studentId
    );

    if (find) {
      return find;
    } else {
      return { star: courseStore.star };
    }
  }
});

const getRanking = async () => {
  if (studentStore.studentType == "school") {
    rankingList.value = await studentStore.getRanking();
  } else {
    rankingList.value = await studentStore.getOnlineRanking();
  }

  // const classRanking = rankingList.value.classRanking;
  // let filterCharacter = [];
  // classRanking.rankings.forEach((element) => {
  //   const character = element.character;
  //   if (character) {
  //   } else {
  //     element.character = {};
  //   }
  //   filterCharacter.push(element);
  // });

  // rankingList.value.classRanking.rankings = filterCharacter;

  isLoaded.value = false;
};

const isShowDialogRanking = ref(true);
const funcCloseDialog = () => {
  isShowDialogRanking.value = false;

  setTimeout(() => {
    emit("callback-closeDialog", false);
  }, 500);
};

onMounted(async () => {
  // $q.loading.show();
  getRanking();

  // $q.loading.hide();
});
</script>

<style lang="scss" scoped>
.dialog-container {
  position: relative;
  min-width: 300px;
  width: 90%;
  max-width: 340px;
  height: 480px;
  background-image: url("/images/background_main/background-ranking.png");
  background-size: cover;
  background-repeat: no-repeat;
  border: 3px solid #804208;
  border-radius: 40px;
  padding: 10px;
  margin: auto;
}

.dialog-content {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  background-image: url("/images/background_main/backdrop-ranking.png");
  border-radius: 35px;
  box-shadow: 0px 0px 5px 1px rgba(55, 55, 55, 0.2);
  overflow: hidden;
}

.box-show-ranking-all-by-school {
  height: calc(100% - 185px);
  overflow: auto;
}

.box-show-ranking-all-by-school::-webkit-scrollbar {
  width: 0px;
}

.box-show-ranking-all-by-online {
  height: calc(100% - 120px);
  overflow: auto;
}

.box-show-ranking-all-by-online::-webkit-scrollbar {
  width: 0px;
}

.box-show-character-all {
  width: 70px;
  height: 70px;
  background-color: #ffffff;
  overflow: hidden;
  border-radius: 50%;
  border-right-color: transparent;
  margin-left: 1px;
  z-index: 1;
}

.box-show-character-all-back-drop {
  left: 36px;
  width: 77px;
  height: 77px;
  overflow: hidden;
  border-radius: 50%;
  border: 3px solid#804208;
  border-right-color: transparent;
  z-index: 1;
}

.icon-header-character-all {
  top: 100%;
}

.box-character-name {
  border: 3px solid #804208;
  width: 100%;
  height: 56px;
  border-radius: 20px;
  background-color: #fff3bf;
}

.box-show-ranking-user {
  background-color: #faeba9;
  box-shadow: -3px 0px 10px 1px rgba(55, 55, 55, 0.3);
}

.box-show-character {
  width: 65px;
  height: 65px;
  background-color: #ffffff;
  overflow: hidden;
  border-radius: 50%;
}

.icon-header-character {
  width: 150px;
  top: -7px;
  left: 50%;
  transform: translateX(-50%);
}

.score-character {
  position: relative;
  background-color: #ffa016;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 16px;
  font-family: fredoka;
  color: #fff3bf;
}

.text-star {
  color: #ffa800;
  text-shadow: rgb(128, 66, 8) 1px 0px 0px, rgb(128, 66, 8) 0.540302px 0.841471px 0px,
    rgb(128, 66, 8) -0.416147px 0.909297px 0px, rgb(128, 66, 8) -0.989992px 0.14112px 0px,
    rgb(128, 66, 8) -0.653644px -0.756802px 0px,
    rgb(128, 66, 8) 0.283662px -0.958924px 0px, rgb(128, 66, 8) 0.96017px -0.279415px 0px;
}

.box-ranking-number {
  width: 60px;
}
</style>
